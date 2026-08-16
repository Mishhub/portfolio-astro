# Visitor analytics

Two independent layers, both free, neither setting a cookie.

| Layer                    | What it answers                                                  | Where you read it          |
| ------------------------ | ---------------------------------------------------------------- | -------------------------- |
| Cloudflare Web Analytics | How much traffic, from where, how fast the site is               | Cloudflare dashboard       |
| First-party log → D1     | _Who_ is looking: city, network operator, page order, dwell time | D1 console (queries below) |

There is deliberately no admin page on the site. Adding one would mean putting an
auth surface — and other people's location data — on a site whose entire job is
to be publicly crawled.

---

## One-time setup

### Layer 1 — Cloudflare Web Analytics

1. Cloudflare dashboard → **Web Analytics** → add `mishhub.com`.
2. Copy the token out of the JS snippet it shows you.
3. Paste it into `CF_BEACON_TOKEN` in [`src/config/site.ts`](../src/config/site.ts).

The token is public by design (it ships in the HTML of every page), so it belongs
in source, not in a secret. An empty string disables the beacon.

> If your domain is proxied through Cloudflare DNS you may instead be offered
> _automatic_ injection. Use one or the other — enabling both double-counts.

### Layer 2 — the D1 visitor log

```bash
npm run db:create          # prints a database_id
```

Paste that id into `d1_databases[0].database_id` in
[`wrangler.jsonc`](../wrangler.jsonc), replacing `PASTE_DATABASE_ID_HERE`. Then:

```bash
npm run db:init            # creates the tables + views on the remote DB
```

Set the hash salt as a Worker secret (any long random string — it never needs to
be memorable, and rotating it unlinks all previously recorded repeat visits):

```bash
openssl rand -hex 32
npx wrangler secret put VISITOR_SALT
```

Add the same value to your local `.dev.vars` if you want to exercise the endpoint
locally. Deploy, and rows start arriving.

---

## Reading it in the D1 console

Cloudflare dashboard → **Workers & Pages** → **D1** → `portfolio-analytics` →
**Console**. Three views ship with the schema so the common questions are
one-liners. All three exclude bots.

**Recent visits — the raw feed**

```sql
SELECT * FROM v_recent LIMIT 50;
```

**Sessions — what each person actually read, in order**

```sql
SELECT * FROM v_sessions LIMIT 30;
```

`journey` reads like `/ > /experience > /case-studies/spovio > /resume`, which is
the single most informative column in the database.

**Networks — who is looking**

```sql
SELECT * FROM v_networks LIMIT 40;
```

Consumer ISPs (du, Etisalat, Jio, Comcast) dominate the top. The interesting rows
are corporate and university networks — that is a recruiter or an engineer
reading from the office.

### Ad-hoc queries worth keeping

Anyone who read the résumé, and what they looked at first:

```sql
SELECT * FROM v_sessions WHERE journey LIKE '%/resume%';
```

Someone who came back on a different day — the strongest hiring signal there is:

```sql
SELECT visitor_id,
       COUNT(DISTINCT substr(ts, 1, 10)) AS days,
       COUNT(*)                          AS views,
       MAX(asn_org)                      AS network,
       substr(MAX(ts), 1, 16) || 'Z'     AS last_seen
FROM visits
WHERE is_bot = 0
GROUP BY visitor_id
HAVING days > 1
ORDER BY days DESC;
```

Where traffic comes from:

```sql
SELECT COALESCE(referrer, utm_source, 'direct') AS source,
       COUNT(*) AS views
FROM visits
WHERE is_bot = 0
GROUP BY source
ORDER BY views DESC;
```

Pages that hold attention, versus pages people bounce off:

```sql
SELECT path,
       COUNT(*)                              AS views,
       ROUND(AVG(dwell_ms) / 1000.0, 1)      AS avg_seconds
FROM visits
WHERE is_bot = 0 AND dwell_ms IS NOT NULL
GROUP BY path
ORDER BY avg_seconds DESC;
```

Last 24 hours only:

```sql
SELECT * FROM v_recent WHERE at > strftime('%Y-%m-%dT%H:%M', 'now', '-1 day');
```

---

## How it works

Every page is prerendered and served from the `ASSETS` binding, so the Worker
never runs on a page load and there is nothing for middleware to observe. Instead
[`Analytics.astro`](../src/components/analytics/Analytics.astro) posts to
[`/api/track`](../src/pages/api/track.ts), which writes to D1.

Details that are easy to get wrong, and how they're handled:

- **Geo and network data are free.** They come off `request.cf`, which the
  Workers runtime attaches to every request — no IP-geolocation API, no key, no
  rate limit. `asOrganization` is the field that names the employer.
- **No IP is ever stored.** `visitor_id` is `SHA-256(VISITOR_SALT | ip | ua)`
  truncated to 16 hex chars — enough to link repeat visits, not reversible.
- **View transitions.** The beacon listens for `astro:page-load`, which fires on
  the first load _and_ after every client-side navigation. Using
  `DOMContentLoaded` would record only the first page of each session.
- **Speculative prerendering.** `experimental.clientPrerender` renders pages
  before anyone clicks them. The beacon waits on `document.prerendering` /
  `prerenderingchange`, so a prerender is not counted as a visit.
- **Dwell time** is sent via `sendBeacon` when the page is hidden or navigated
  away from. The `UPDATE` is guarded by `dwell_ms IS NULL`, so a page that's
  hidden, revealed and hidden again keeps its first honest measurement. Anything
  under a second isn't written at all.
- **Same-origin only.** `/api/track` compares the `Origin` header against its own
  URL, which covers production, previews and localhost without special cases.
- **Local runs are skipped** so development doesn't pollute the table. Set
  `localStorage["track-debug"]` to override.
- **Writes are detached** via `ctx.waitUntil` — the visitor's browser never waits
  on the insert.

### Cost

D1's free tier is 5 GB storage, 5 M row reads/day and 100 k row writes/day.
A page view costs two writes (insert + dwell). A portfolio will not come close.

### Privacy

IP-derived location is personal data under GDPR even though the IP itself is
discarded. The salted hash is the reason this stays proportionate. If you want to
respect Do Not Track, add this to `skip()` in `Analytics.astro`:

```ts
navigator.doNotTrack === "1";
```
