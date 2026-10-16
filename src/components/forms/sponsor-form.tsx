"use client";

import { useActionState } from "react";
import { registerSponsor } from "@/app/actions";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { bottleQuantities, companySizes } from "@/lib/content";
import type { FormState } from "@/lib/schemas";
import { Field, Honeypot, inputClass, selectClass } from "./field";
import { FormStatus, SubmitButton } from "./form-status";

const initial: FormState = { status: "idle" };

export function SponsorForm() {
  const [state, action, pending] = useActionState(registerSponsor, initial);
  const err = state.fieldErrors ?? {};
  const describe = (id: string, key: string) => (err[key] ? `${id}-error` : undefined);

  if (state.status === "success") return <FormStatus state={state} />;

  return (
    <form action={action} className="relative flex flex-col gap-5">
      <Honeypot />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="sp-name" label="Name" error={err.name}>
          <Input id="sp-name" name="name" autoComplete="name" required maxLength={120} className={inputClass} aria-invalid={!!err.name} aria-describedby={describe("sp-name", "name")} />
        </Field>
        <Field id="sp-company" label="Company" error={err.company}>
          <Input id="sp-company" name="company" autoComplete="organization" required maxLength={160} className={inputClass} aria-invalid={!!err.company} aria-describedby={describe("sp-company", "company")} />
        </Field>
      </div>
      <Field id="sp-email" label="Work email" error={err.email}>
        <Input id="sp-email" name="email" type="email" autoComplete="email" required maxLength={254} className={inputClass} aria-invalid={!!err.email} aria-describedby={describe("sp-email", "email")} />
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="sp-size" label="Company size" error={err.company_size}>
          <select id="sp-size" name="company_size" required defaultValue="" className={selectClass} aria-invalid={!!err.company_size} aria-describedby={describe("sp-size", "company_size")}>
            <option value="" disabled>Select…</option>
            {companySizes.map((s) => (
              <option key={s} value={s}>{s} employees</option>
            ))}
          </select>
        </Field>
        <Field id="sp-qty" label="Estimated bottles" error={err.bottle_quantity}>
          <select id="sp-qty" name="bottle_quantity" required defaultValue="" className={selectClass} aria-invalid={!!err.bottle_quantity} aria-describedby={describe("sp-qty", "bottle_quantity")}>
            <option value="" disabled>Select…</option>
            {bottleQuantities.map((q) => (
              <option key={q} value={q}>{q}</option>
            ))}
          </select>
        </Field>
      </div>
      <Field id="sp-message" label="Message" optional error={err.message} hint="Where you’d want bottles to go, timing, anything else.">
        <Textarea id="sp-message" name="message" rows={4} maxLength={2000} className="rounded-xl bg-background px-4 py-3 text-base" aria-invalid={!!err.message} aria-describedby={err.message ? "sp-message-error" : "sp-message-hint"} />
      </Field>
      <FormStatus state={state} />
      <SubmitButton pending={pending}>Register interest</SubmitButton>
      <p className="text-xs text-muted-foreground">No commitment — this just tells us you’d like to hear more.</p>
    </form>
  );
}
