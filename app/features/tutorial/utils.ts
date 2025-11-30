import { STORAGE_KEY_TUTORIAL_SHOWN } from "./consts";

export const isTutorialShown = (): boolean => {
  if (typeof window === "undefined") return true;
  const stored = localStorage.getItem(STORAGE_KEY_TUTORIAL_SHOWN);
  return stored === "true";
};

export const markTutorialShown = (): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY_TUTORIAL_SHOWN, "true");
};

