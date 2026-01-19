import { z } from "zod";

export const AnalyticsFrequencySchema = z.object({
  frequency: z.enum(["daily", "weekly", "monthly"]),
});

export type AnalyticsFrequencySchemaType = z.infer<
  typeof AnalyticsFrequencySchema
>;
