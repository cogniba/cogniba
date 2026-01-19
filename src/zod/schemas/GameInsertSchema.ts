import { z } from "zod";

export const GameInsertSchema = z.object({
  level: z.number().int().min(1),
  newLevel: z.number().int().min(1),
  correctHits: z.number().int().min(0),
  incorrectHits: z.number().int().min(0),
  missedHits: z.number().int().min(0),
  timePlayed: z.number().int().min(0),
});

export type GameInsertSchemaType = z.infer<typeof GameInsertSchema>;
