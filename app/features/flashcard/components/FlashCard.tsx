"use client";

import { useState } from "react";
import classNames from "classnames";
import { Word } from "@/app/data/words";
import { speakGerman, useSpeakOnChange } from "@/app/features/audio_speak";
import { useTutorial, TutorialFinger } from "@/app/features/tutorial";
import { CARD_WIDTH, CARD_HEIGHT, FLIP_DURATION } from "../consts";

type Language = "en" | "ru";

interface FlashCardProps {
  word: Word;
  language: Language;
  soundEnabled: boolean;
}

export const FlashCard = ({ word, language, soundEnabled }: FlashCardProps) => {
  const [flipped, setFlipped] = useState(false);
  const { showTutorial, isRemoving, dismissTutorial } = useTutorial();

  useSpeakOnChange(word.german, soundEnabled);

  const handleSoundClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    speakGerman(word.german, true);
  };

  const handleCardClick = () => {
    if (showTutorial && !isRemoving) {
      dismissTutorial();
    }
    setFlipped(!flipped);
  };

  return (
    <div
      className={classNames("perspective-1000 cursor-pointer relative", CARD_HEIGHT, CARD_WIDTH)}
      onClick={handleCardClick}
    >
      {showTutorial && <TutorialFinger isRemoving={isRemoving} />}
      <div
        className={classNames(
          "relative h-full w-full transition-transform transform-style-3d",
          FLIP_DURATION,
          { "rotate-y-180": flipped }
        )}
      >
        {/* Front - German */}
        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-white border-2 border-gray-300 text-3xl font-bold text-gray-800 shadow-sm backface-hidden text-center px-4">
          {word.emoji && <span className="absolute top-3 text-2xl">{word.emoji}</span>}
          {word.german}
          <button
            onClick={handleSoundClick}
            className="absolute bottom-3 text-gray-400 hover:text-gray-600 transition text-sm"
          >
            🔊
          </button>
        </div>
        {/* Back - Translation */}
        <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-white border-2 border-gray-300 text-2xl font-semibold text-gray-800 shadow-sm backface-hidden rotate-y-180 text-center px-4">
          {word.translations[language]}
        </div>
      </div>
    </div>
  );
};

