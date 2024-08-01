import { z } from "zod";

export const SetInterviewDateSchema = z.object({
  date: z.date({
    required_error: "Date is required.",
  }),
  sendEmail: z.boolean().optional(),
});