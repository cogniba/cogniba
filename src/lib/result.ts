export type Result<T> =
  | { data: T; error?: undefined }
  | { data?: undefined; error: string };

export const ok = <T>(data: T): Result<T> => ({ data });

export const err = (message: string): Result<never> => ({ error: message });
