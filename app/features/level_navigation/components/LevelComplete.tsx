"use client";

import { TOTAL_LEVELS } from "../consts";

interface LevelCompleteProps {
  level: number;
  onNextLevel: () => void;
}

export const LevelComplete = ({ level, onNextLevel }: LevelCompleteProps) => {
  const isLastLevel = level >= TOTAL_LEVELS;

  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <div className="text-6xl">🎉</div>
      <h2 className="text-3xl font-bold text-gray-800">
        {isLastLevel ? "Congratulations!" : `Level ${level} Complete!`}
      </h2>
      <p className="text-gray-500">
        {isLastLevel
          ? "You've completed all levels! Amazing work!"
          : "Great job! Ready for the next challenge?"}
      </p>
      {!isLastLevel && (
        <button
          onClick={onNextLevel}
          className="rounded-full bg-gray-800 px-8 py-3 text-white transition hover:bg-gray-700"
        >
          Start Level {level + 1} →
        </button>
      )}
    </div>
  );
};

