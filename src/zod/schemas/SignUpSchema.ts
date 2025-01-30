import * as z from "zod";

export const SignUpSchema = z.object({
  fullName: z
    .string()
    .min(1, { message: "Full name is required" })
    .max(64, { message: "Full name is too long" }),

  email: z
    .string()
    .email({ message: "Invalid email address" })
    .min(1, { message: "Email is required" })
    .max(64, { message: "Email is too long" }),

  password: z
    .string()
    .min(8, { message: "Password must have at least 8 characters" })
    .max(64, { message: "Password is too long" }),
});

export type SignUpSchemaType = z.infer<typeof SignUpSchema>;
