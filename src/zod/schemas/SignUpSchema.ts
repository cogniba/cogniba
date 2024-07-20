import * as z from "zod";

export const SignUpSchema = z
  .object({
    role: z.enum(["child", "parent", "admin"]),

    email: z.string().optional(),

    fullName: z
      .string()
      .min(1, { message: "Full name is required" })
      .max(64, { message: "Full name is too long" }),

    username: z
      .string()
      .min(1, { message: "Username is required" })
      .max(64, { message: "Username is too long" }),

    password: z
      .string()
      .min(8, { message: "Password must have at least 8 characters" })
      .max(64, { message: "Password is too long" }),
  })
  .superRefine((data, ctx) => {
    if (data.role === "parent") {
      try {
        z.string().email().parse(data.email);
      } catch {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Invalid email address",
          path: ["email"],
        });
      }
    }
  });
