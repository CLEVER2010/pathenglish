"use client";
import { useState } from "react";
import { LessonData } from "@/types";

export default function InteractiveLessonView({ lesson }: { lesson: LessonData }) {
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const handleOptionSelect = (questionId: number, optionIdx: number) => {
    setUserAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
  };

  const calculateScore = () => {
    let correct = 0;
    lesson.quiz.forEach((q) => {
      if (userAnswers[q.id] === q.correctAnswer) correct++;
    });
    return correct;
  };

  return (
    <div className="space-y-8">
      {/* Əsas Mətn / Transkript */}
      <div className="rounded-3xl border border-white/10 bg-slate-900 p-6 md:p-8 space-y-6">
        <div className="flex justify-between items-center text-xs text-gray-400">
          <span className="font-semibold text-blue-400">{lesson.source}</span>
          <span>Gün {lesson.day} / 60</span>
        </div>

        <h1 className="text-2xl md:text-3xl font-black text-white">{lesson.title}</h1>

        {lesson.audioUrl && (
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <p className="text-xs text-gray-400 mb-2 font-semibold">🎧 BBC/TED Dinləmə Audiosu:</p>
            <audio controls className="w-full">
              <source src={lesson.audioUrl} type="audio/mpeg" />
            </audio>
          </div>
        )}

        <div className="space-y-4 bg-white/[0.02] p-6 rounded-2xl border border-white/5">
          {lesson.paragraphs.map((paragraph, idx) => (
            <p key={idx} className="text-gray-300 text-base md:text-lg leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {/* Collocations & Definition Kartları */}
      <div className="rounded-3xl border border-white/10 bg-slate-900 p-6 md:p-8">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          📚 Collocations & Definitions (Əsas Sözlər)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {lesson.vocabulary.map((vocab, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/40 transition space-y-2"
            >
              <div className="flex justify-between items-start">
                <span className="text-lg font-black text-blue-400">{vocab.word}</span>
                <span className="text-xs font-bold px-2 py-1 rounded bg-blue-500/20 text-blue-300">
                  {vocab.azMeaning}
                </span>
              </div>
              <p className="text-xs text-cyan-300 font-mono">
                <strong>Collocation:</strong> {vocab.collocation}
              </p>
              <p className="text-xs text-gray-400 leading-relaxed">
                <strong>Definition:</strong> {vocab.definition}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* True/False & IELTS Test Modulu */}
      <div className="rounded-3xl border border-white/10 bg-slate-900 p-6 md:p-8 space-y-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          ✍️ Özünü Yoxla (True/False & Multiple Choice)
        </h2>

        <div className="space-y-6">
          {lesson.quiz.map((q, qIdx) => (
            <div key={q.id} className="p-5 rounded-2xl bg-white/5 border border-white/5 space-y-3">
              <p className="text-sm font-semibold text-gray-200">
                {qIdx + 1}. {q.question}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {q.options.map((opt, optIdx) => {
                  const isSelected = userAnswers[q.id] === optIdx;
                  const isCorrect = q.correctAnswer === optIdx;

                  let btnStyle = "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10";
                  if (showResults) {
                    if (isCorrect) btnStyle = "bg-green-500/20 border-green-500 text-green-400 font-bold";
                    else if (isSelected) btnStyle = "bg-red-500/20 border-red-500 text-red-400";
                  } else if (isSelected) {
                    btnStyle = "bg-blue-600 border-blue-500 text-white font-bold";
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleOptionSelect(q.id, optIdx)}
                      className={`p-3 rounded-xl border text-xs text-left transition ${btnStyle}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {showResults && (
                <p className="text-xs text-gray-400 italic mt-2 bg-black/20 p-2 rounded-lg">
                  💡 İzah: {q.explanation}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-white/10">
          {!showResults ? (
            <button
              onClick={() => setShowResults(true)}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition"
            >
              Nəticəni Yoxla
            </button>
          ) : (
            <div className="text-sm font-bold text-green-400">
              Nəticəniz: {calculateScore()} / {lesson.quiz.length} Düzgün
            </div>
          )}
        </div>
      </div>
    </div>
  );
}