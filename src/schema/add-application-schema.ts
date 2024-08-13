import { z } from "zod";

export const workTypes = [
    "Onsite",
    "Remote"
]

export const applicationStatuses = [
    "Bookmarked",
    "Applied",
]

export const addApplicationSchema = z.object({
  jobPostLink: z.string().min(1),
  jobRole: z.string().min(1),
  companyName: z.string().min(1),
  currency: z.enum(["INR", "USD", "EUR"]).optional().nullable(),
  salary: z.coerce.number().optional(),
  jobCountry: z.string().optional(),
  jobLocation: z.string().optional(),
  workType: z.enum(["Onsite", "Remote"]),
  applicationStatus: z.enum(["Bookmarked", "Applied"]),
});