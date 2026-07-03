import { site } from "@/content/site";

/**
 * Email delivery for the contact form.
 *
 * Uses Resend's REST API directly (no SDK — keeps the bundle lean). Configure
 * with env vars (see .env.example):
 *   CONTACT_PROVIDER_API_KEY  — Resend API key. Without it, submissions are
 *                               logged and accepted (dev/UX flow stays testable).
 *   CONTACT_TO_EMAIL          — destination inbox (defaults to site.contactEmail)
 *   CONTACT_FROM_EMAIL        — verified sender; onboarding@resend.dev works for
 *                               testing until a domain is verified.
 *
 * Replies go to the visitor (reply_to), so answering is one click.
 */
export type ContactPayload = {
  name: string;
  company?: string;
  email: string;
  message: string;
};

export async function sendContactEmail(
  data: ContactPayload,
): Promise<{ ok: boolean; error?: string }> {
  const apiKey = process.env.CONTACT_PROVIDER_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? site.contactEmail;
  const from =
    process.env.CONTACT_FROM_EMAIL ??
    "Rahul Jakhar Portfolio <onboarding@resend.dev>";

  if (!apiKey) {
    console.info("[contact] no email provider configured; would deliver to", to, {
      name: data.name,
      company: data.company || "—",
      email: data.email,
      message: data.message.slice(0, 80) + (data.message.length > 80 ? "…" : ""),
    });
    return { ok: true };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: data.email,
        subject: `New enquiry — ${data.name}${data.company ? ` · ${data.company}` : ""}`,
        text: [
          `Name:    ${data.name}`,
          `Company: ${data.company || "—"}`,
          `Email:   ${data.email}`,
          "",
          data.message,
        ].join("\n"),
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("[contact] provider error", res.status, detail);
      return { ok: false, error: "send_failed" };
    }
    return { ok: true };
  } catch (err) {
    console.error("[contact] send exception", err);
    return { ok: false, error: "send_exception" };
  }
}
