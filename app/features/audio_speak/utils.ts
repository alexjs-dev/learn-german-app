import { SPEECH_LANG, SPEECH_RATE } from "./consts";

export const speakGerman = (text: string, enabled: boolean): void => {
  if (!enabled) return;
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = SPEECH_LANG;
  utterance.rate = SPEECH_RATE;

  const voices = window.speechSynthesis.getVoices();
  const germanVoice = voices.find((v) => v.lang.startsWith("de"));
  if (germanVoice) {
    utterance.voice = germanVoice;
  }

  window.speechSynthesis.speak(utterance);
};

