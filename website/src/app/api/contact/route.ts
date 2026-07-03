import { sendContactEmail } from "@/lib/email";

const isEmail = (v: string) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v);

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const company = String(body.company ?? "").trim();
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();
  const honeypot = String(body.company_url ?? ""); // bots fill this

  // Honeypot tripped → pretend success, drop silently.
  if (honeypot) return Response.json({ ok: true });

  const errors: Record<string, string> = {};
  if (!name) errors.name = "Please add your name.";
  if (!email || !isEmail(email)) errors.email = "Enter a valid email.";
  if (!message) errors.message = "Add a short message.";
  if (Object.keys(errors).length) {
    return Response.json({ ok: false, errors }, { status: 422 });
  }

  const result = await sendContactEmail({ name, company, email, message });
  if (!result.ok) {
    return Response.json(
      { ok: false, error: "Something went wrong. Please email directly." },
      { status: 502 },
    );
  }
  return Response.json({ ok: true });
}
