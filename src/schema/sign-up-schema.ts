import { z } from "zod";

export const signUpSchema = z.object({
    name: z.string().min(3, "Must contain at least 3 characters."),
    email: z.string().email({message: "Please enter a valid email address."}),
    password: z.string().min(6, "Password must be at least 6 characters."),
    confirmPassword: z.string().min(6, "Confirm password must be at least 6 characters."),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});