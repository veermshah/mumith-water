"use client";

import { useActionState } from "react";
import { joinWaitlist } from "@/app/actions";
import { Input } from "@/components/ui/input";
import { useCases } from "@/lib/content";
import type { FormState } from "@/lib/schemas";
import { cn } from "@/lib/utils";
import { Field, Honeypot, inputClass } from "./field";
import { FormStatus, SubmitButton } from "./form-status";

const initial: FormState = { status: "idle" };

export function WaitlistForm() {
  const [state, action, pending] = useActionState(joinWaitlist, initial);
  const err = state.fieldErrors ?? {};

  if (state.status === "success") return <FormStatus state={state} />;

  return (
    <form action={action} className="relative flex flex-col gap-5" noValidate={false}>
      <Honeypot />
      <Field id="wl-name" label="Name" error={err.name}>
        <Input id="wl-name" name="name" autoComplete="name" required maxLength={120} className={inputClass} aria-invalid={!!err.name} aria-describedby={err.name ? "wl-name-error" : undefined} />
      </Field>
      <Field id="wl-email" label="Email" error={err.email}>
        <Input id="wl-email" name="email" type="email" autoComplete="email" required maxLength={254} className={inputClass} aria-invalid={!!err.email} aria-describedby={err.email ? "wl-email-error" : undefined} />
      </Field>
      <fieldset>
        <legend className="text-sm font-semibold">
          Where would you use it? <span className="font-normal text-muted-foreground">(optional)</span>
        </legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {useCases.map((u) => (
            <label key={u.value} className="cursor-pointer">
              <input type="radio" name="use_case" value={u.value} className="peer sr-only" />
              <span
                className={cn(
                  "inline-flex h-10 items-center rounded-full border border-input px-4 text-sm font-medium transition",
                  "peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-foreground",
                  "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ring hover:border-foreground/40",
                )}
              >
                {u.label}
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      <FormStatus state={state} />
      <SubmitButton pending={pending}>Join the waitlist</SubmitButton>
      <p className="text-xs text-muted-foreground">We’ll only use your email to tell you about Mumith Water’s launch.</p>
    </form>
  );
}
