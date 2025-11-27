import { SPEECH_LANG, SPEECH_RATE } from "./consts";

let voicesLoaded = false;
let userInteracted = false;

const loadVoices = (): Promise<SpeechSynthesisVoice[]> => {
  return new Promise((resolve) => {
    const synth = window.speechSynthesis;
    const voices = synth.getVoices();
    
    if (voices.length > 0) {
      voicesLoaded = true;
      resolve(voices);
      return;
    }

    // Chrome loads voices async
    synth.onvoiceschanged = () => {
      voicesLoaded = true;
      resolve(synth.getVoices());
    };

    // Fallback
    setTimeout(() => resolve(synth.getVoices()), 1000);
  });
};

// Mark that user has interacted (required for Chrome autoplay policy)
export const markUserInteraction = (): void => {
  userInteracted = true;
};

export const speakGerman = async (text: string, enabled: boolean): Promise<void> => {
  if (!enabled) return;
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

  const synth = window.speechSynthesis;

  // Cancel any ongoing speech
  synth.cancel();

  // Wait for voices if not loaded
  if (!voicesLoaded) {
    await loadVoices();
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = SPEECH_LANG;
  utterance.rate = SPEECH_RATE;

  const voices = synth.getVoices();
  const germanVoice = voices.find((v) => v.lang.startsWith("de"));
  if (germanVoice) {
    utterance.voice = germanVoice;
  }

  // Small delay helps Chrome
  requestAnimationFrame(() => {
    synth.speak(utterance);
  });
};

// Initialize voices early
if (typeof window !== "undefined" && "speechSynthesis" in window) {
  // Trigger voice loading
  window.speechSynthesis.getVoices();
  
  // Listen for first user interaction to enable audio
  const enableAudio = () => {
    userInteracted = true;
    // Speak empty string to "unlock" audio in Chrome
    const unlock = new SpeechSynthesisUtterance("");
    window.speechSynthesis.speak(unlock);
    window.speechSynthesis.cancel();
    
    document.removeEventListener("click", enableAudio);
    document.removeEventListener("touchstart", enableAudio);
  };
  
  document.addEventListener("click", enableAudio, { once: true });
  document.addEventListener("touchstart", enableAudio, { once: true });
}
