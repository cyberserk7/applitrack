import { z } from "zod";

export const signInSchema = z.object({
    email: z.string().email({message: "Please enter a valid email address."}),
    password: z.string().min(1, "Password cannot be empty."),
});