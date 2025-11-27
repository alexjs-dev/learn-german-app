import { useEffect } from "react";
import { speakGerman } from "../utils";

export const useSpeakOnChange = (text: string, enabled: boolean): void => {
  useEffect(() => {
    if (enabled) {
      speakGerman(text, true);
    }
  }, [text]);
};

