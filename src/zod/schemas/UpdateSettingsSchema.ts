import { z } from "zod";

export const UpdateSettingsSchema = z.object({
  showFeedback: z.boolean(),
});

export type UpdateSettingsSchemaType = z.infer<typeof UpdateSettingsSchema>;
