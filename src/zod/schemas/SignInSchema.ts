import * as z from "zod";

export const SignInSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .max(64, { message: "Email is too long" }),
  })
  .superRefine((data, ctx) => {
    try {
      z.string().email().parse(data.email);
    } catch {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Invalid email address",
        path: ["email"],
      });
    }
  });
