import { z } from "zod";

export const ForgotPasswordSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .min(1, { message: "Email is required" })
    .max(64, { message: "Email is too long" }),
});
