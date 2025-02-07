// TODO
const isDevelopment = process.env.NODE_ENV === "development";

export const BASE_SEQUENCE_LENGTH = isDevelopment ? 3 : 20;
export const NUM_TARGETS = isDevelopment ? 2 : 6;
export const VISIBLE_SQUARE_DURATION = 1000;
export const HIDDEN_SQUARE_DURATION = 2000;
export const DELAY_BEFORE_START = 1500;

export const DECREASE_LEVEL_THRESHOLD = 0.45;
export const INCREASE_LEVEL_THRESHOLD = 0.8;
