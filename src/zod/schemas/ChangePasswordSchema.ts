import { z } from "zod";

export const ChangePasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must have at least 8 characters")
      .max(64, "Password is too long"),

    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

export type ChangePasswordSchemaType = z.infer<typeof ChangePasswordSchema>;
