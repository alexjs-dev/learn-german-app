"use client";

import { useState, useEffect, Suspense } from "react";
import classNames from "classnames";
import { levels } from "./data/words";
import { FlashCard } from "./features/flashcard";
import { useLevel, LevelIndicator, LevelComplete } from "./features/level_navigation";
import { useExam, usePassedLevels, ExamCard, ExamComplete } from "./features/exam";

type Language = "en" | "ru";

const HomeContent = () => {
  const { currentLevel, goToLevel, goToNextLevel } = useLevel();
  const { passedLevels, refresh: refreshPassedLevels } = usePassedLevels();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [language, setLanguage] = useState<Language>("en");
  const [completed, setCompleted] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const words = levels[currentLevel - 1];
  const isCurrentLevelPassed = passedLevels.includes(currentLevel);

  const {
    examState,
    currentWord: examWord,
    isPassed: examPassed,
    startExam,
    submitAnswer,
    exitExam,
  } = useExam(words, currentLevel, language);

  // Reset state when level changes
  const [prevLevel, setPrevLevel] = useState(currentLevel);
  if (prevLevel !== currentLevel) {
    setPrevLevel(currentLevel);
    setCurrentIndex(0);
    setCompleted(false);
  }

  const nextCard = () => {
    if (currentIndex === words.length - 1) {
      setCompleted(true);
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevCard = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleExamComplete = () => {
    refreshPassedLevels();
    exitExam();
    goToNextLevel();
  };

  const handleExitExam = () => {
    exitExam();
    setCompleted(false);
    setCurrentIndex(0);
  };

  // Exam mode
  if (examState.isActive) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-white p-8">
        <h1 className="text-4xl font-bold text-gray-800 tracking-tight">
          📝 Level {currentLevel} Exam
        </h1>

        {examState.isComplete ? (
          <ExamComplete
            correctCount={examState.correctCount}
            totalCount={examState.words.length}
            isPassed={examPassed}
            onExit={handleExitExam}
            onRetry={startExam}
            onNextLevel={handleExamComplete}
          />
        ) : (
          examWord && (
            <ExamCard
              word={examWord}
              language={language}
              onSubmit={submitAnswer}
              questionNumber={examState.currentIndex + 1}
              totalQuestions={examState.words.length}
            />
          )
        )}
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-white p-8">
      <h1 className="text-4xl font-bold text-gray-800 tracking-tight">
        🇩🇪 German Flashcards
      </h1>

      <LevelIndicator
        currentLevel={currentLevel}
        passedLevels={passedLevels}
        onLevelClick={goToLevel}
      />

      {/* Language Toggle */}
      <div className="flex gap-2 rounded-full border border-gray-300 p-1">
        <button
          onClick={() => setLanguage("en")}
          className={classNames(
            "rounded-full px-4 py-2 text-sm font-medium transition",
            language === "en"
              ? "bg-gray-800 text-white"
              : "text-gray-500 hover:text-gray-800"
          )}
        >
          🇬🇧 English
        </button>
        <button
          onClick={() => setLanguage("ru")}
          className={classNames(
            "rounded-full px-4 py-2 text-sm font-medium transition",
            language === "ru"
              ? "bg-gray-800 text-white"
              : "text-gray-500 hover:text-gray-800"
          )}
        >
          🇷🇺 Русский
        </button>
      </div>

      {completed ? (
        <LevelComplete
          level={currentLevel}
          onNextLevel={goToNextLevel}
          onTakeExam={startExam}
          isLevelPassed={isCurrentLevelPassed}
        />
      ) : (
        <>
          <FlashCard
            key={`${currentLevel}-${currentIndex}`}
            word={words[currentIndex]}
            language={language}
            soundEnabled={soundEnabled}
          />

          {/* Navigation */}
          <div className="flex items-center gap-6">
            <button
              onClick={prevCard}
              disabled={currentIndex === 0}
              className="rounded-full border border-gray-300 px-6 py-3 text-gray-700 transition hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              ← Prev
            </button>
            <span className="text-gray-400">
              {currentIndex + 1} / {words.length}
            </span>
            <button
              onClick={nextCard}
              className="rounded-full border border-gray-300 px-6 py-3 text-gray-700 transition hover:bg-gray-100"
            >
              {currentIndex === words.length - 1 ? "Finish" : "Next →"}
            </button>
          </div>

          {/* Sound toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={classNames(
              "flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition",
              soundEnabled
                ? "border-gray-800 bg-gray-800 text-white"
                : "border-gray-300 text-gray-500 hover:bg-gray-100"
            )}
          >
            {soundEnabled ? "🔊 Sound On" : "🔇 Sound Off"}
          </button>

          <p className="text-gray-400 text-sm">Click the card to flip</p>
        </>
      )}
    </div>
  );
};

const Home = () => {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
};

export default Home;
