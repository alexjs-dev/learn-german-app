import React from "react";
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

// Check if answers match exactly (ignoring case)
export const isExactMatch = (userAnswer: string, correctAnswer: string): boolean => {
  return normalizeAnswer(userAnswer) === normalizeAnswer(correctAnswer);
};

// Check if there are actual mistakes (not just case differences)
export const hasActualMistakes = (userAnswer: string, correctAnswer: string): boolean => {
  const normalized = normalizeAnswer(userAnswer);
  const normalizedCorrect = normalizeAnswer(correctAnswer);
  
  // If exact match (case-insensitive), no mistakes
  if (normalized === normalizedCorrect) return false;
  
  // Normalize German characters
  const fuzzyUser = normalizeGermanChars(normalized);
  const fuzzyCorrect = normalizeGermanChars(normalizedCorrect);
  
  // If they match after normalization, only case/diacritics differ - no real mistakes
  if (fuzzyUser === fuzzyCorrect) return false;
  
  // Otherwise there are actual mistakes
  return true;
};

// Normalize German characters for fuzzy matching
const normalizeGermanChars = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/ä/g, "a")
    .replace(/ö/g, "o")
    .replace(/ü/g, "u")
    .replace(/ß/g, "ss");
};

// Calculate Levenshtein distance between two strings
const levenshteinDistance = (str1: string, str2: string): number => {
  const len1 = str1.length;
  const len2 = str2.length;
  const matrix: number[][] = [];

  for (let i = 0; i <= len1; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= len2; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j - 1] + 1
        );
      }
    }
  }

  return matrix[len1][len2];
};

export const checkAnswer = (userAnswer: string, correctAnswer: string): boolean => {
  const normalized = normalizeAnswer(userAnswer);
  const normalizedCorrect = normalizeAnswer(correctAnswer);
  
  // Exact match
  if (normalized === normalizedCorrect) return true;
  
  // Normalize German characters for fuzzy matching
  const fuzzyUser = normalizeGermanChars(normalized);
  const fuzzyCorrect = normalizeGermanChars(normalizedCorrect);
  
  // Check if they match after normalization
  if (fuzzyUser === fuzzyCorrect) return true;
  
  // Allow small typos (max 1-2 character difference for short words, more for longer)
  const maxDistance = Math.max(1, Math.floor(normalizedCorrect.length * 0.2));
  const distance = levenshteinDistance(fuzzyUser, fuzzyCorrect);
  
  return distance <= maxDistance;
};

// Highlight differences between user answer and correct answer
export const highlightDifferences = (userAnswer: string, correctAnswer: string): React.ReactNode => {
  const user = normalizeAnswer(userAnswer);
  const correct = normalizeAnswer(correctAnswer);
  
  // If they match exactly, return without highlighting
  if (user === correct) {
    return <span>{correctAnswer}</span>;
  }
  
  const result: React.ReactNode[] = [];
  const userNormalized = normalizeGermanChars(user);
  const correctNormalized = normalizeGermanChars(correct);
  
  // Use original correctAnswer to preserve case and special characters
  let userIdx = 0;
  
  for (let i = 0; i < correctAnswer.length; i++) {
    const correctChar = correctAnswer[i];
    const correctCharLower = correctChar.toLowerCase();
    const correctCharNormalized = normalizeGermanChars(correctCharLower);
    
    if (userIdx < userNormalized.length) {
      const userCharNormalized = normalizeGermanChars(user[userIdx]?.toLowerCase() || "");
      
      if (correctCharNormalized === userCharNormalized) {
        // Characters match (possibly with different diacritics)
        result.push(<span key={i}>{correctChar}</span>);
        userIdx++;
      } else {
        // Character differs or missing - highlight it
        result.push(
          <strong key={i} className="font-bold">
            {correctChar}
          </strong>
        );
      }
    } else {
      // User answer is shorter - highlight remaining characters
      result.push(
        <strong key={i} className="font-bold">
          {correctChar}
        </strong>
      );
    }
  }
  
  return <span>{result}</span>;
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

