import { z } from "zod";

export const setPasswordSchema = z.object({
  password: z.string().min(6, {message: "Password must be at least 6 characters"}),
  confirmPassword: z.string(),
}).refine((data) => {
  if (data.password !== data.confirmPassword) {
    return false;
  }
  return true;
}, { message: "Passwords do not match" });