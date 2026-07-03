"use client";

import { useEffect, useRef, useState } from "react";
import { track } from "@vercel/analytics";
import { cn } from "@/lib/cn";
import { site } from "@/content/site";

type Errors = Partial<Record<"name" | "email" | "message", string>>;
type Status = "idle" | "submitting" | "success" | "error";

const isEmail = (v: string) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v);

const fieldBase =
  "w-full rounded-sm border bg-transparent px-4 py-3 text-[0.95rem] text-[var(--color-ink)] placeholder:text-[var(--color-ink-mute)] transition-colors duration-[240ms] outline-none focus-visible:border-[var(--color-gold-text)]";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const successRef = useRef<HTMLDivElement>(null);

  /* Move focus to the confirmation so success is announced (SR) and the
     keyboard user isn't dropped on <body> when the form unmounts. */
  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  function validate(fd: FormData): Errors {
    const e: Errors = {};
    if (!String(fd.get("name") ?? "").trim()) e.name = "Please add your name.";
    const email = String(fd.get("email") ?? "").trim();
    if (!email || !isEmail(email)) e.email = "Enter a valid email.";
    if (!String(fd.get("message") ?? "").trim())
      e.message = "Add a short message.";
    return e;
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);
    const form = event.currentTarget;
    const fd = new FormData(form);

    const clientErrors = validate(fd);
    setErrors(clientErrors);
    if (Object.keys(clientErrors).length) {
      // Derive the target from the just-computed errors (the DOM hasn't
      // re-rendered yet, so querying [aria-invalid] here would be stale).
      const first = (["name", "email", "message"] as const).find(
        (k) => clientErrors[k],
      );
      if (first) document.getElementById(first)?.focus();
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(fd)),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        track("contact_submitted");
        setStatus("success");
        return;
      }
      if (data.errors) setErrors(data.errors);
      setFormError(data.error ?? "Please check the fields and try again.");
      setStatus("error");
    } catch {
      setFormError("Network error. Please email me directly.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="rounded-md border border-[var(--color-line)] bg-[var(--color-raised)] p-8"
      >
        <p className="mb-2 text-[var(--color-gold-text)]">
          Message sent. Thank you.
        </p>
        <p className="text-[0.95rem] text-[var(--color-ink-soft)]">
          I&apos;ll reply from my inbox shortly. You can also reach me on{" "}
          <a
            className="text-[var(--color-ink)] underline underline-offset-4"
            href={site.socials.find((s) => s.platform === "linkedin")?.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      {/* Honeypot — hidden from users, bots fill it */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company_url">Company URL</label>
        <input id="company_url" name="company_url" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Name" error={errors.name} required />
        <Field id="company" label="Company" />
      </div>
      <Field id="email" label="Email" type="email" error={errors.email} required />

      <div>
        <FieldLabel htmlFor="message" label="Message" required />
        <textarea
          id="message"
          name="message"
          rows={4}
          aria-invalid={errors.message ? "true" : undefined}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={cn(
            fieldBase,
            "resize-y",
            errors.message
              ? "border-[var(--color-error)]"
              : "border-[var(--color-line)] hover:border-[var(--color-line-strong)]",
          )}
        />
        {errors.message && <FieldError id="message-error">{errors.message}</FieldError>}
      </div>

      {formError && (
        <p role="alert" className="text-[0.875rem] text-[var(--color-error)]">
          {formError}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className={cn(
          "group inline-flex items-center justify-center gap-2.5 self-start rounded-md border border-[var(--color-line-strong)] px-7 py-4 font-[family-name:var(--font-mono)] text-[0.75rem] font-medium uppercase tracking-[0.14em] transition-colors duration-[240ms]",
          "hover:bg-[var(--color-ink)] hover:text-[var(--color-base)] disabled:opacity-60 disabled:hover:bg-transparent disabled:hover:text-[var(--color-ink)]",
        )}
      >
        {status === "submitting" ? "Sending…" : "Send message"}
        {status !== "submitting" && (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="transition-transform duration-[240ms] group-hover:translate-x-1">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>
    </form>
  );
}

function FieldLabel({
  htmlFor,
  label,
  required,
}: {
  htmlFor: string;
  label: string;
  required?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="kicker mb-2.5 block"
    >
      {label}
      {required && <span className="text-[var(--color-gold-text)]"> *</span>}
    </label>
  );
}

function FieldError({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} className="mt-2 text-[0.8125rem] text-[var(--color-error)]">
      {children}
    </p>
  );
}

function Field({
  id,
  label,
  type = "text",
  error,
  required,
}: {
  id: "name" | "company" | "email";
  label: string;
  type?: string;
  error?: string;
  required?: boolean;
}) {
  return (
    <div>
      <FieldLabel htmlFor={id} label={label} required={required} />
      <input
        id={id}
        name={id}
        type={type}
        autoComplete={id === "email" ? "email" : id === "name" ? "name" : "organization"}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          fieldBase,
          error
            ? "border-[var(--color-error)]"
            : "border-[var(--color-line)] hover:border-[var(--color-line-strong)]",
        )}
      />
      {error && <FieldError id={`${id}-error`}>{error}</FieldError>}
    </div>
  );
}
