"use server";

import type { z } from "zod";
import { getSupabase } from "@/lib/supabase";
import { sponsorSchema, waitlistSchema, type FormState } from "@/lib/schemas";

const HONEYPOT = "website";

function blank(value: FormDataEntryValue | null) {
  return typeof value === "string" && value.trim() !== "" ? value : undefined;
}

function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    out[key] ??= issue.message;
  }
  return out;
}

async function insert(table: "waitlist" | "sponsor_leads", row: Record<string, unknown>, success: string): Promise<FormState> {
  const supabase = getSupabase();
  if (!supabase) {
    console.error(`[${table}] Supabase is not configured (SUPABASE_URL / SUPABASE_ANON_KEY).`);
    return { status: "error", message: "Sign-ups aren’t connected yet. Please try again later." };
  }
  const { error } = await supabase.from(table).insert(row);
  if (error) {
    if (error.code === "23505") return { status: "success", message: "You’re already on the list — thanks!" };
    console.error(`[${table}] insert failed`, error.message);
    return { status: "error", message: "Something went wrong saving your details. Please try again." };
  }
  return { status: "success", message: success };
}

export async function joinWaitlist(_prev: FormState, formData: FormData): Promise<FormState> {
  if (blank(formData.get(HONEYPOT))) return { status: "success", message: "Thanks — you’re on the list." };
  const parsed = waitlistSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    use_case: blank(formData.get("use_case")),
  });
  if (!parsed.success) return { status: "error", message: "Please fix the highlighted fields.", fieldErrors: fieldErrors(parsed.error) };
  return insert("waitlist", parsed.data, "Thanks — you’re on the list. We’ll only email you with real launch news.");
}

export async function registerSponsor(_prev: FormState, formData: FormData): Promise<FormState> {
  if (blank(formData.get(HONEYPOT))) return { status: "success", message: "Thanks — we’ll be in touch." };
  const parsed = sponsorSchema.safeParse({
    name: formData.get("name"),
    company: formData.get("company"),
    email: formData.get("email"),
    company_size: formData.get("company_size"),
    bottle_quantity: formData.get("bottle_quantity"),
    message: blank(formData.get("message")),
  });
  if (!parsed.success) return { status: "error", message: "Please fix the highlighted fields.", fieldErrors: fieldErrors(parsed.error) };
  return insert("sponsor_leads", parsed.data, "Thanks — we’ve got your details and will reach out as sponsorship takes shape.");
}
