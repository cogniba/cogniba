import * as z from "zod";

export const SignInSchema = z.object({
  username: z
    .string()
    .min(1, { message: "Username is required" })
    .max(64, { message: "Username is too long" }),

  password: z
    .string()
    .min(1, { message: "Password is required" })
    .max(64, { message: "Password is too long" }),
});
