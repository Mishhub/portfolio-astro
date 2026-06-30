import type { APIRoute } from "astro";
import { SITE } from "@/config/site";

// Run on-demand (Cloudflare Pages Function) rather than being prerendered.
export const prerender = false;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

export const POST: APIRoute = async ({ request, locals }) => {
  let data: FormData;
  try {
    data = await request.formData();
  } catch {
    return json({ ok: false, error: "Invalid request." }, 400);
  }

  // Honeypot: real users never see this field; bots happily fill it. Pretend
  // success so the bot moves on without learning it was blocked.
  if (data.get("botcheck")) return json({ ok: true });

  const name = String(data.get("name") ?? "").trim();
  const email = String(data.get("email") ?? "").trim();
  const message = String(data.get("message") ?? "").trim();

  if (!name || !message || !EMAIL_RE.test(email)) {
    return json({ ok: false, error: "Please complete all fields with a valid email." }, 400);
  }

  // Secret is injected by Cloudflare at runtime (locals.runtime.env). In other
  // environments fall back to import.meta.env so local builds don't crash.
  const apiKey = locals.runtime?.env?.RESEND_API_KEY ?? import.meta.env.RESEND_API_KEY;
  if (!apiKey) {
    return json({ ok: false, error: "Mail is not configured yet." }, 500);
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // Resend's shared sender works on the free tier with no domain setup.
      from: `${SITE.name} Portfolio <onboarding@resend.dev>`,
      to: [SITE.email],
      reply_to: email,
      subject: `Portfolio contact — ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    }),
  });

  if (!res.ok) {
    return json({ ok: false, error: "Couldn't send right now — please email directly." }, 502);
  }

  return json({ ok: true });
};
