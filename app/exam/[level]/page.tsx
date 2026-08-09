"use client";
import { useState, use } from "react";
import Link from "next/link";

export default function ExamLevelPage({ params }: { params: Promise<{ level: string }> }) {
  const resolvedParams = use(params);
  const level = resolvedParams.level ? resolvedParams.level.toUpperCase() : "A1";

  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  const examQuestions = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    question: `Sual ${i + 1}: Düzgün qrammatik variantı seçin.`,
    options: ["A) Professional choice", "B) Incorrect structure", "C) Basic option"],
    correct: 0,
  }));

  const handleOptionSelect = (qId: number, optIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers({ ...selectedAnswers, [qId]: optIndex });
  };

  const handleSubmitExam = () => {
    let correctCount = 0;
    examQuestions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correct) correctCount++;
    });
    setScore(correctCount);
    setIsSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 md:p-16 font-sans">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="flex justify-between items-center bg-slate-900 p-6 rounded-3xl border border-white/10 shadow-xl">
          <Link href="/" className="text-green-400 font-bold hover:underline text-sm">← Ana Səhifə</Link>
          <h1 className="text-xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">
            {level} Səviyyəsi • Yekun İmtahan
          </h1>
        </div>

        <div className="space-y-8">
          <div className="p-8 bg-slate-900 rounded-3xl border border-white/10 space-y-4 shadow-2xl">
            <h2 className="text-2xl font-black text-white">{level} Səviyyə Sertifikat İmtahanı</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Bu imtahan sizin {level} səviyyəsini mənimsədiyinizi yoxlayır. Keçmək üçün ən azı 16 düzgün cavab lazımdır.
            </p>
          </div>

          <div className="p-8 bg-slate-900 rounded-3xl border border-white/10 space-y-8 shadow-2xl">
            <div className="space-y-6">
              {examQuestions.map((q, qIndex) => (
                <div key={q.id} className="p-5 bg-slate-950/60 rounded-2xl border border-white/5 space-y-3">
                  <p className="text-sm font-bold text-gray-200">{qIndex + 1}. {q.question}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {q.options.map((opt, optIndex) => (
                      <button
                        key={optIndex}
                        disabled={isSubmitted}
                        onClick={() => handleOptionSelect(q.id, optIndex)}
                        className={`p-3 rounded-xl text-xs font-bold text-left transition border ${
                          selectedAnswers[q.id] === optIndex
                            ? "bg-green-600 border-green-400 text-white"
                            : "bg-white/5 border-white/10 text-gray-300 hover:border-green-500"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {!isSubmitted ? (
              <button
                onClick={handleSubmitExam}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-500 text-white font-black text-sm shadow-xl"
              >
                İmtahanı Tamamla
              </button>
            ) : (
              <div className="p-8 bg-slate-950 rounded-2xl border border-white/10 text-center space-y-4 shadow-xl">
                <h3 className="text-2xl font-black">Nəticə</h3>
                <p className="text-xl font-bold">Bal: <span className={score >= 16 ? "text-green-400" : "text-red-400"}>{score} / 20</span></p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}