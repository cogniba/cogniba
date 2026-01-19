import { z } from "zod";

export const ForgotPasswordSchema = z.object({
  email: z
    .email("Invalid email address")
    .min(1, "Email is required")
    .max(64, "Email is too long"),
});

export type ForgotPasswordSchemaType = z.infer<typeof ForgotPasswordSchema>;
