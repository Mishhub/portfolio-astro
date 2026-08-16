-- First-party visitor log (Cloudflare D1).
--
-- Apply with:  npm run db:init          (remote / production)
--              npm run db:init:local    (local .wrangler state for `astro dev`)
--
-- Everything here is written by src/pages/api/track.ts. Re-running this file is
-- safe: every statement is IF NOT EXISTS.

CREATE TABLE IF NOT EXISTS visits (
  -- Generated in the browser so the dwell-time update (sent later, during
  -- unload) can address the row without waiting for the insert to respond.
  id           TEXT PRIMARY KEY,
  ts           TEXT NOT NULL,             -- ISO-8601 UTC; sorts lexicographically

  -- Pseudonymous, non-reversible: SHA-256(VISITOR_SALT | ip | user-agent).
  -- Stable across days, so repeat visits link up without storing an IP.
  visitor_id   TEXT NOT NULL,
  -- sessionStorage id: groups the pages of one browsing session.
  session_id   TEXT NOT NULL,

  path         TEXT NOT NULL,
  referrer     TEXT,                      -- external referrers only
  utm_source   TEXT,
  utm_medium   TEXT,
  utm_campaign TEXT,

  -- From `request.cf` — free on the Workers runtime, no lookup API involved.
  country      TEXT,
  region       TEXT,
  city         TEXT,
  postal_code  TEXT,
  timezone     TEXT,
  asn          INTEGER,
  asn_org      TEXT,                      -- ISP *or* employer network name
  colo         TEXT,                      -- Cloudflare edge that served it

  browser      TEXT,
  os           TEXT,
  device       TEXT,                      -- desktop | mobile | tablet
  screen       TEXT,                      -- "1920x1080"
  lang         TEXT,

  is_bot       INTEGER NOT NULL DEFAULT 0,
  dwell_ms     INTEGER,                   -- NULL until the page is left
  ua           TEXT
);

CREATE INDEX IF NOT EXISTS idx_visits_ts      ON visits (ts DESC);
CREATE INDEX IF NOT EXISTS idx_visits_visitor ON visits (visitor_id);
CREATE INDEX IF NOT EXISTS idx_visits_session ON visits (session_id);
CREATE INDEX IF NOT EXISTS idx_visits_org     ON visits (asn_org);
CREATE INDEX IF NOT EXISTS idx_visits_human   ON visits (is_bot, ts DESC);

-- ---------------------------------------------------------------------------
-- Views. These exist so the Cloudflare dashboard's D1 console is useful with a
-- one-line query -- `SELECT * FROM v_recent LIMIT 50` -- instead of a join you
-- have to retype every time. All three exclude bots.
-- ---------------------------------------------------------------------------

-- Raw feed: one row per page view, newest first.
CREATE VIEW IF NOT EXISTS v_recent AS
SELECT
  substr(ts, 1, 16) || 'Z'                                AS at,
  COALESCE(city, '?') || ', ' || COALESCE(country, '?')   AS location,
  asn_org                                                 AS network,
  path,
  ROUND(dwell_ms / 1000.0, 1)                             AS seconds,
  COALESCE(referrer, utm_source, 'direct')                AS source,
  device, browser, os,
  visitor_id, session_id
FROM visits
WHERE is_bot = 0
ORDER BY ts DESC;

-- One row per session: how many pages, in what order, for how long.
--
-- `journey` goes through a subquery rather than a plain GROUP_CONCAT because
-- SQLite feeds an aggregate in scan order, and idx_visits_human is DESC -- a
-- direct GROUP_CONCAT silently returns the path list backwards. The
-- `ORDER BY ... ` inside an aggregate that would fix that needs SQLite 3.44+,
-- which is not safe to assume of D1, so the ordered subselect is the portable
-- way to get chronological order on every version.
CREATE VIEW IF NOT EXISTS v_sessions AS
SELECT
  substr(MIN(ts), 1, 16) || 'Z'                               AS started,
  MAX(COALESCE(city, '?') || ', ' || COALESCE(country, '?'))  AS location,
  MAX(asn_org)                                                AS network,
  COUNT(*)                                                    AS pages,
  ROUND(SUM(COALESCE(dwell_ms, 0)) / 1000.0, 1)               AS seconds,
  (
    SELECT GROUP_CONCAT(path, ' > ')
    FROM (SELECT path FROM visits x WHERE x.session_id = v.session_id ORDER BY x.ts)
  )                                                           AS journey,
  -- MAX skips NULLs, so any page carrying a referrer wins over the rest.
  COALESCE(MAX(referrer), MAX(utm_source), 'direct')          AS source,
  session_id,
  visitor_id
FROM visits v
WHERE is_bot = 0
GROUP BY session_id
ORDER BY started DESC;

-- Who is looking, grouped by network. Consumer ISPs dominate the top of this
-- list; the interesting rows are corporate and university networks.
CREATE VIEW IF NOT EXISTS v_networks AS
SELECT
  asn_org                      AS network,
  COUNT(DISTINCT visitor_id)   AS visitors,
  COUNT(*)                     AS views,
  substr(MAX(ts), 1, 16) || 'Z' AS last_seen,
  GROUP_CONCAT(DISTINCT country) AS countries
FROM visits
WHERE is_bot = 0 AND asn_org IS NOT NULL
GROUP BY asn_org
ORDER BY views DESC;
