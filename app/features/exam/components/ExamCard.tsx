"use client";

import { useState } from "react";
import classNames from "classnames";
import { Word } from "@/app/data/words";
import { speakGerman } from "@/app/features/audio_speak";

type Language = "en" | "ru";

interface ExamCardProps {
  word: Word;
  language: Language;
  onSubmit: (answer: string) => boolean;
  questionNumber: number;
  totalQuestions: number;
}

export const ExamCard = ({ word, language, onSubmit, questionNumber, totalQuestions }: ExamCardProps) => {
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<{ correct: boolean; correctAnswer: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isCorrect = answer.toLowerCase().trim() === word.german.toLowerCase().trim();
    setFeedback({ correct: isCorrect, correctAnswer: word.german });
    
    setTimeout(() => {
      onSubmit(answer);
      setAnswer("");
      setFeedback(null);
    }, 2000);
  };

  const handleHint = () => {
    speakGerman(word.german, true);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <span className="text-gray-400 text-sm">
        Question {questionNumber} / {totalQuestions}
      </span>
      
      <div className="h-48 w-72 flex flex-col items-center justify-center rounded-2xl bg-white border-2 border-gray-300 shadow-sm">
        {word.emoji && <span className="text-2xl mb-2">{word.emoji}</span>}
        <span className="text-2xl font-semibold text-gray-800 text-center px-4">
          {word.translations[language]}
        </span>
        <span className="text-sm text-gray-400 mt-2">Write in German</span>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-3 w-72">
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Type German word..."
          disabled={feedback !== null}
          className={classNames(
            "w-full px-4 py-3 rounded-xl border-2 text-center text-lg outline-none transition text-gray-900 placeholder:text-gray-500",
            feedback === null
              ? "border-gray-300 focus:border-gray-500"
              : feedback.correct
              ? "border-green-500 bg-green-50"
              : "border-red-500 bg-red-50"
          )}
          autoFocus
        />
        
        {feedback && !feedback.correct && (
          <span className="text-red-500 text-sm">
            Correct: <strong>{feedback.correctAnswer}</strong>
          </span>
        )}
        
        {feedback && feedback.correct && (
          <span className="text-green-500 text-sm font-medium">✓ Correct!</span>
        )}

        <div className="flex gap-3 w-full">
          <button
            type="button"
            onClick={handleHint}
            className="rounded-full border border-gray-300 px-4 py-3 text-gray-700 transition hover:bg-gray-100"
          >
            🔊 Hint
          </button>
          <button
            type="submit"
            disabled={!answer.trim() || feedback !== null}
            className="flex-1 rounded-full bg-gray-800 px-6 py-3 text-white transition hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
