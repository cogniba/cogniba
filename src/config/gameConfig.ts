const isDevelopment = process.env.NODE_ENV === "development";

type ParametersType = {
  baseSequenceLength: number;
  numTargets: number;
  visibleSquareDuration: number;
  hiddenSquareDuration: number;
  delayBeforeStart: number;
  decreaseLevelThreshold: number;
  increaseLevelThreshold: number;
};

const gameConfig = {
  parameters: {
    baseSequenceLength: isDevelopment ? 3 : 20,
    numTargets: isDevelopment ? 2 : 6,
    visibleSquareDuration: 1000,
    hiddenSquareDuration: 2000,
    delayBeforeStart: 1500,
    decreaseLevelThreshold: 0.45,
    increaseLevelThreshold: 0.8,
  } satisfies ParametersType,
} as const;

export default gameConfig;
