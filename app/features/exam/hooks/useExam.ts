"use client";

import { useState, useCallback } from "react";
import { Word } from "@/app/data/words";
import { getRandomExamWords, checkAnswer, savePassedLevel } from "../utils";
import { PASS_THRESHOLD } from "../consts";

type Language = "en" | "ru";

interface ExamState {
  isActive: boolean;
  words: Word[];
  currentIndex: number;
  correctCount: number;
  isComplete: boolean;
  lastAnswerCorrect: boolean | null;
}

export const useExam = (levelWords: Word[], level: number, language: Language) => {
  const [examState, setExamState] = useState<ExamState>({
    isActive: false,
    words: [],
    currentIndex: 0,
    correctCount: 0,
    isComplete: false,
    lastAnswerCorrect: null,
  });

  const startExam = useCallback(() => {
    const examWords = getRandomExamWords(levelWords);
    setExamState({
      isActive: true,
      words: examWords,
      currentIndex: 0,
      correctCount: 0,
      isComplete: false,
      lastAnswerCorrect: null,
    });
  }, [levelWords]);

  const submitAnswer = useCallback((userAnswer: string) => {
    const currentWord = examState.words[examState.currentIndex];
    const isCorrect = checkAnswer(userAnswer, currentWord.german);

    const newCorrectCount = isCorrect ? examState.correctCount + 1 : examState.correctCount;
    const isLastQuestion = examState.currentIndex === examState.words.length - 1;

    if (isLastQuestion) {
      const passed = newCorrectCount / examState.words.length >= PASS_THRESHOLD;
      if (passed) {
        savePassedLevel(level);
      }
      setExamState((prev) => ({
        ...prev,
        correctCount: newCorrectCount,
        isComplete: true,
        lastAnswerCorrect: isCorrect,
      }));
    } else {
      setExamState((prev) => ({
        ...prev,
        correctCount: newCorrectCount,
        currentIndex: prev.currentIndex + 1,
        lastAnswerCorrect: isCorrect,
      }));
    }

    return isCorrect;
  }, [examState, level]);

  const exitExam = useCallback(() => {
    setExamState({
      isActive: false,
      words: [],
      currentIndex: 0,
      correctCount: 0,
      isComplete: false,
      lastAnswerCorrect: null,
    });
  }, []);

  const currentWord = examState.words[examState.currentIndex];
  const isPassed = examState.isComplete && examState.correctCount / examState.words.length >= PASS_THRESHOLD;

  return {
    examState,
    currentWord,
    isPassed,
    startExam,
    submitAnswer,
    exitExam,
    language,
  };
};

