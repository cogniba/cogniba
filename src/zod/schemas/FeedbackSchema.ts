import { z } from "zod";

export const FeedbackSchema = z.object({
  type: z.enum(["bug", "feature", "other"], {
    errorMap: () => ({ message: "A feedback type must be selected" }),
  }),
  message: z.string().min(10, "Message must be at least 10 characters"),
});
