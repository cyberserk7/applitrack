import { z } from "zod";

export const editApplicationSchema = z.object({
    jobPostLink: z.string().min(1, "Required"),
    jobRole: z.string().min(1, "Required"),
    companyName: z.string().min(1, "Required"),
    currency: z.enum(["INR", "USD", "EUR"]).optional(),
    salary: z.coerce.number().optional(),
    jobCountry: z.string().optional(),
    jobLocation: z.string().optional(),
    workType: z.enum(["Onsite", "Remote"]),
});