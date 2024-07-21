import { z } from "zod";

export const otpSchema = z.object({
  code: z.string().length(6, {message: ""}),
});