export type GameInsertPayload = {
  level: number;
  newLevel: number;
  correctHits: number;
  incorrectHits: number;
  missedHits: number;
  timePlayed: number;
};
