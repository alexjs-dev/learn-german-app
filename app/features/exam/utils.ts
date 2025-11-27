import { Word } from "@/app/data/words";
import { EXAM_WORD_RATIO, STORAGE_KEY_PASSED_LEVELS } from "./consts";

export const getRandomExamWords = (words: Word[]): Word[] => {
  const count = Math.ceil(words.length * EXAM_WORD_RATIO);
  const shuffled = [...words].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

export const normalizeAnswer = (answer: string): string => {
  return answer.toLowerCase().trim();
};

export const checkAnswer = (userAnswer: string, correctAnswer: string): boolean => {
  return normalizeAnswer(userAnswer) === normalizeAnswer(correctAnswer);
};

export const getPassedLevels = (): number[] => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_KEY_PASSED_LEVELS);
  return stored ? JSON.parse(stored) : [];
};

export const savePassedLevel = (level: number): void => {
  if (typeof window === "undefined") return;
  const passed = getPassedLevels();
  if (!passed.includes(level)) {
    passed.push(level);
    localStorage.setItem(STORAGE_KEY_PASSED_LEVELS, JSON.stringify(passed));
  }
};

export const isLevelPassed = (level: number): boolean => {
  return getPassedLevels().includes(level);
};

