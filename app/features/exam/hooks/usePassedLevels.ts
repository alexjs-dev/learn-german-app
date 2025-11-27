"use client";

import { useState, useEffect } from "react";
import { getPassedLevels } from "../utils";

export const usePassedLevels = () => {
  const [passedLevels, setPassedLevels] = useState<number[]>([]);

  useEffect(() => {
    setPassedLevels(getPassedLevels());
  }, []);

  const refresh = () => {
    setPassedLevels(getPassedLevels());
  };

  return { passedLevels, refresh };
};

