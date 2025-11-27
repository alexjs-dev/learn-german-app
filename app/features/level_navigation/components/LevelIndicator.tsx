"use client";

import classNames from "classnames";
import { TOTAL_LEVELS } from "../consts";

interface LevelIndicatorProps {
  currentLevel: number;
  passedLevels: number[];
  onLevelClick: (level: number) => void;
}

export const LevelIndicator = ({ currentLevel, passedLevels, onLevelClick }: LevelIndicatorProps) => {
  return (
    <div className="relative w-full max-w-sm">
      {/* Left fade */}
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      {/* Right fade */}
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
      
      <div className="flex items-center gap-2 overflow-x-auto px-6 py-2 scrollbar-hide">
        {Array.from({ length: TOTAL_LEVELS }, (_, i) => {
          const level = i + 1;
          const isPassed = passedLevels.includes(level);
          const isCurrent = level === currentLevel;
          
          return (
            <button
              key={i}
              onClick={() => onLevelClick(level)}
              className={classNames(
                "w-8 h-8 rounded-full text-sm font-medium transition flex-shrink-0 flex items-center justify-center",
                isCurrent
                  ? "bg-gray-800 text-white"
                  : isPassed
                  ? "bg-green-500 text-white"
                  : "border border-gray-300 text-gray-500 hover:bg-gray-100"
              )}
            >
              {isPassed && !isCurrent ? "✓" : level}
            </button>
          );
        })}
      </div>
    </div>
  );
};
