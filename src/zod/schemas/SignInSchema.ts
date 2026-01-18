import { z } from "zod";

export const SignInSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .min(1, "Email is required")
    .max(64, "Email is too long"),

  password: z
    .string()
    .min(1, "Password is required")
    .max(64, "Password is too long"),
});

export type SignInSchemaType = z.infer<typeof SignInSchema>;
