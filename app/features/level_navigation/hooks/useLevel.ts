"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { parseLevel } from "../utils";
import { LEVEL_QUERY_PARAM } from "../consts";

export const useLevel = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const levelParam = searchParams.get(LEVEL_QUERY_PARAM);
  const currentLevel = parseLevel(levelParam);

  const goToLevel = (level: number) => {
    router.push(`?${LEVEL_QUERY_PARAM}=${level}`);
  };

  const goToNextLevel = () => {
    goToLevel(currentLevel + 1);
  };

  return { currentLevel, goToLevel, goToNextLevel };
};

