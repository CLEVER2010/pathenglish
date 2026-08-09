"use client";
import { useState, useEffect, use } from "react";
import Link from "next/link";
import ProgressCalendar from "@/app/components/ProgressCalendar";

export default function ListeningLevelPage({ params }: { params: Promise<{ level: string }> }) {
  const resolvedParams = use(params);
  const level = resolvedParams.level ? resolvedParams.level.toUpperCase() : "A1";

  const [activeDay, setActiveDay] = useState<number>(1);
  const [completedDays, setCompletedDays] = useState<number[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(`listening_${level}_progress`);
      if (saved) {
        try {
          setCompletedDays(JSON.parse(saved));
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, [level]);

  const currentData = {
    title: `Dinləmə Günü ${activeDay}: Education & Future`,
    audioScript: `Audio Script: Welcome to day ${activeDay} listening session for ${level}.`,
    questions: Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      question: `Sual ${i + 1}: Dinlənilən mətndə əsas müzakirə nədir?`,
      options: ["A) Modern aspects", "B) History", "C) Routine"],
      correct: 0
    }))
  };

  const handleOptionSelect = (qId: number, optIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers({ ...selectedAnswers, [qId]: optIndex });
  };

  const handleSubmitTest = () => {
    let correctCount = 0;
    currentData.questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correct) correctCount++;
    });

    setScore(correctCount);
    setIsSubmitted(true);

    if (correctCount >= 7 && !completedDays.includes(activeDay)) {
      const updated = [...completedDays, activeDay];
      setCompletedDays(updated);
      localStorage.setItem(`listening_${level}_progress`, JSON.stringify(updated));
    }
  };

  const handleNextDay = () => {
    setIsSubmitted(false);
    setSelectedAnswers({});
    setActiveDay(activeDay + 1);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 md:p-16 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex justify-between items-center bg-slate-900 p-6 rounded-3xl border border-white/10 shadow-xl">
          <Link href="/" className="text-purple-400 font-bold hover:underline text-sm">← Ana Səhifə</Link>
          <h1 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">
            {level} Səviyyəsi • Listening Modulu
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <ProgressCalendar 
              currentLevel={level} 
              completedDays={completedDays} 
              activeDay={activeDay} 
              onSelectDay={(day: number) => {
                setActiveDay(day);
                setIsSubmitted(false);
                setSelectedAnswers({});
              }} 
            />
          </div>

          <div className="lg:col-span-2 space-y-8">
            <div className="p-8 bg-slate-900 rounded-3xl border border-white/10 space-y-6 shadow-2xl">
              <h2 className="text-xl md:text-2xl font-black text-white">{currentData.title}</h2>
              <p className="text-gray-300 text-sm leading-relaxed bg-slate-950/40 p-4 rounded-xl border border-white/5">{currentData.audioScript}</p>
            </div>

            <div className="p-8 bg-slate-900 rounded-3xl border border-white/10 space-y-8 shadow-2xl">
              <h3 className="text-xl font-bold">10 Suallıq Dinləmə Testi</h3>
              <div className="space-y-6">
                {currentData.questions.map((q, qIndex) => (
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
                              ? "bg-purple-600 border-purple-400 text-white"
                              : "bg-white/5 border-white/10 text-gray-300 hover:border-purple-500"
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
                  onClick={handleSubmitTest}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-black text-sm shadow-xl"
                >
                  Nəticəni Yoxla
                </button>
              ) : (
                <div className="p-6 bg-slate-950 rounded-2xl border border-white/10 text-center space-y-4">
                  <p className="text-lg font-bold">Nəticə: <span className={score >= 7 ? "text-green-400" : "text-yellow-400"}>{score} / 10</span></p>
                  {score >= 7 && activeDay < 60 && (
                    <button
                      onClick={handleNextDay}
                      className="px-6 py-3 rounded-xl bg-green-600 text-white font-bold text-xs"
                    >
                      Növbəti Günə Keç →
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}