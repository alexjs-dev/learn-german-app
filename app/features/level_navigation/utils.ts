import { TOTAL_LEVELS } from "./consts";

export const parseLevel = (levelParam: string | null): number => {
  const parsed = parseInt(levelParam || "1") || 1;
  return Math.min(Math.max(1, parsed), TOTAL_LEVELS);
};

