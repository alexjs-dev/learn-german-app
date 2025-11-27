"use client";

import classNames from "classnames";
import { TOTAL_LEVELS } from "../consts";

interface LevelIndicatorProps {
  currentLevel: number;
  onLevelClick: (level: number) => void;
}

export const LevelIndicator = ({ currentLevel, onLevelClick }: LevelIndicatorProps) => {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: TOTAL_LEVELS }, (_, i) => (
        <button
          key={i}
          onClick={() => onLevelClick(i + 1)}
          className={classNames(
            "w-8 h-8 rounded-full text-sm font-medium transition",
            i + 1 === currentLevel
              ? "bg-gray-800 text-white"
              : "border border-gray-300 text-gray-500 hover:bg-gray-100"
          )}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
};

