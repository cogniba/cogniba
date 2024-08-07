import * as z from "zod";

export const ChangePasswordSchema = z
  .object({
    oldPassword: z
      .string()
      .min(1, { message: "Password is required" })
      .max(64, { message: "Password is too long" }),

    newPassword: z
      .string()
      .min(8, { message: "Password must have at least 8 characters" })
      .max(64, { message: "Password is too long" }),

    confirmPassword: z
      .string()
      .min(1, { message: "Confirm password is required" }),
  })
  .superRefine((data, ctx) => {
    if (data.newPassword !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });
