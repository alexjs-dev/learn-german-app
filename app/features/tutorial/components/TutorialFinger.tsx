"use client";

import classNames from "classnames";

interface TutorialFingerProps {
  isRemoving: boolean;
}

export const TutorialFinger = ({ isRemoving }: TutorialFingerProps) => {
  return (
    <div
      className={classNames(
        "absolute top-0 left-4 gap-2 pointer-events-none z-20 transition-opacity duration-500 flex flex-col items-center",
        isRemoving ? "opacity-0" : "opacity-100"
      )}
    >
      <div className="rotate-180 text-4xl animate-bounce z-10">👆</div>
      <div
        className="text-yellow-400 font-mono font-bold text-xs mt-1 rotate-[8deg] animate-bounce"
        style={{
          textShadow: "2px 2px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black",
        }}
      >
        Click me
      </div>
    </div>
  );
};

