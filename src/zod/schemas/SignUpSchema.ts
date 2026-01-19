import * as z from "zod";

export const SignUpSchema = z.object({
  fullName: z
    .string()
    .min(1, "Full name is required")
    .max(64, "Full name is too long"),

  email: z
    .email("Invalid email address")
    .min(1, "Email is required")
    .max(64, "Email is too long"),

  password: z
    .string()
    .min(8, "Password must have at least 8 characters")
    .max(64, "Password is too long"),
});

export type SignUpSchemaType = z.infer<typeof SignUpSchema>;
