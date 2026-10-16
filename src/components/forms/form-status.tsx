import { CheckCircle2, CircleAlert } from "lucide-react";
import type { FormState } from "@/lib/schemas";
import { cn } from "@/lib/utils";

export function FormStatus({ state }: { state: FormState }) {
  return (
    <div role="status" aria-live="polite" className="min-h-0">
      {state.status !== "idle" && state.message && (
        <p
          className={cn(
            "flex items-start gap-2 rounded-xl px-4 py-3 text-sm font-medium",
            state.status === "success" ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive",
          )}
        >
          {state.status === "success" ? <CheckCircle2 className="mt-0.5 size-4 shrink-0" aria-hidden /> : <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden />}
          {state.message}
        </p>
      )}
    </div>
  );
}

export function SubmitButton({ pending, children }: { pending: boolean; children: string }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex h-12 w-full items-center justify-center rounded-full bg-primary px-6 font-semibold text-primary-foreground shadow-soft transition hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:opacity-60"
    >
      {pending ? "Sending…" : children}
    </button>
  );
}
