"use client";

import classNames from "classnames";
import { TOTAL_LEVELS } from "../consts";

interface LevelCompleteProps {
  level: number;
  onNextLevel: () => void;
  onTakeExam: () => void;
  isLevelPassed: boolean;
}

export const LevelComplete = ({ level, onNextLevel, onTakeExam, isLevelPassed }: LevelCompleteProps) => {
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
          : "Great job! Ready for the exam?"}
      </p>
      
      <div className="flex flex-col gap-3 w-64">
        {!isLevelPassed && (
          <button
            onClick={onTakeExam}
            className="rounded-full bg-gray-800 px-8 py-3 text-white transition hover:bg-gray-700"
          >
            📝 Take Exam
          </button>
        )}
        
        {!isLastLevel && (
          <button
            onClick={onNextLevel}
            className={classNames(
              "rounded-full px-8 py-3 transition",
              isLevelPassed
                ? "bg-gray-800 text-white hover:bg-gray-700"
                : "border border-gray-300 text-gray-700 hover:bg-gray-100"
            )}
          >
            {isLevelPassed ? "Next Level →" : "Skip to Next Level"}
          </button>
        )}
      </div>
    </div>
  );
};
