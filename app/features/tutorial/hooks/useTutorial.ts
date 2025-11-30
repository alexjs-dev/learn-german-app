"use client";

import { useState, useEffect } from "react";
import { isTutorialShown, markTutorialShown } from "../utils";

export const useTutorial = () => {
  const [showTutorial, setShowTutorial] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  useEffect(() => {
    const shown = isTutorialShown();
    setShowTutorial(!shown);
  }, []);

  const dismissTutorial = () => {
    setIsRemoving(true);
    setTimeout(() => {
      setShowTutorial(false);
      markTutorialShown();
    }, 500); // Fade out duration
  };

  return { showTutorial, isRemoving, dismissTutorial };
};

