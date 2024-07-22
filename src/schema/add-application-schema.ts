import { z } from "zod";

export const workTypes = [
    "Onsite",
    "Remote"
]

export const applicationStatuses = [
    "Bookmarked",
    "Applied",
    "Interview Scheduled",
    "Got Offer",
    "Declined"
]

export const addApplicationSchema = z.object({
  jobPostLink: z.string().min(1),
  jobRole: z.string().min(1),
  companyName: z.string().min(1),
  salary: z.coerce.number(),
  jobCountry: z.string().min(1),
  jobLocation: z.string().min(1),
  workType: z.enum(["Onsite", "Remote"]),
  applicationStatus: z.enum(["Bookmarked", "Applied", "Interview Scheduled", "Got Offer", "Declined"]),
});