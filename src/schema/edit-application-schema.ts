import { z } from "zod";

export const editApplicationSchema = z.object({
    jobPostLink: z.string().min(1, "Required"),
    jobRole: z.string().min(1, "Required"),
    companyName: z.string().min(1, "Required"),
    currency: z.enum(["INR", "USD", "EUR"]).nullable(),
    salary: z.coerce.number().nullable(),
    jobCountry: z.string().nullable(),
    jobLocation: z.string().nullable(),
    workType: z.enum(["Onsite", "Remote"]),
    applicationStatus: z.enum(["Bookmarked", "Applied"]),
});