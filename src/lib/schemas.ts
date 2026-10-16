import { z } from "zod";
import { bottleQuantities, companySizes } from "./content";

const name = z.string().trim().min(1, "Please enter your name.").max(120, "Name is too long.");
const email = z.string().trim().toLowerCase().max(254, "Email is too long.").email("Please enter a valid email address.");

export const waitlistSchema = z.object({
  name,
  email,
  use_case: z.enum(["campus", "gym", "events", "other"]).optional(),
});

export const sponsorSchema = z.object({
  name,
  company: z.string().trim().min(1, "Please enter your company.").max(160, "Company name is too long."),
  email,
  company_size: z.enum(companySizes, { error: "Please choose a company size." }),
  bottle_quantity: z.enum(bottleQuantities, { error: "Please choose an estimated quantity." }),
  message: z.string().trim().max(2000, "Message must be under 2,000 characters.").optional(),
});

export type FormState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Record<string, string>;
};
