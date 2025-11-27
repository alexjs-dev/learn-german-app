"use client";

interface ExamCompleteProps {
  correctCount: number;
  totalCount: number;
  isPassed: boolean;
  onExit: () => void;
  onRetry: () => void;
  onNextLevel: () => void;
}

export const ExamComplete = ({
  correctCount,
  totalCount,
  isPassed,
  onExit,
  onRetry,
  onNextLevel,
}: ExamCompleteProps) => {
  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <div className="text-6xl">{isPassed ? "🎉" : "😔"}</div>
      <h2 className="text-3xl font-bold text-gray-800">
        {isPassed ? "Exam Passed!" : "Try Again"}
      </h2>
      <p className="text-gray-500">
        You got <strong>{correctCount}</strong> out of <strong>{totalCount}</strong> correct ({Math.round(correctCount / totalCount * 100)}%).
        {!isPassed && " You need at least 60% to pass."}
      </p>
      
      <div className="flex flex-col gap-3 w-64">
        {isPassed ? (
          <button
            onClick={onNextLevel}
            className="rounded-full bg-gray-800 px-8 py-3 text-white transition hover:bg-gray-700"
          >
            Next Level →
          </button>
        ) : (
          <button
            onClick={onRetry}
            className="rounded-full bg-gray-800 px-8 py-3 text-white transition hover:bg-gray-700"
          >
            Retry Exam
          </button>
        )}
        <button
          onClick={onExit}
          className="rounded-full border border-gray-300 px-8 py-3 text-gray-700 transition hover:bg-gray-100"
        >
          Back to Cards
        </button>
      </div>
    </div>
  );
};

