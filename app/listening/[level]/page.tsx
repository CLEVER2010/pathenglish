"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import ProgressCalendar from "../../components/ProgressCalendar";

export default function ListeningLevelPage({ params }: { params: { level: string } }) {
  const level = params.level.toUpperCase();
  const [activeDay, setActiveDay] = useState<number>(1);
  const [completedDays, setCompletedDays] = useState<number[]>([]);
  
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    const saved = localStorage.getItem(`listening_${level}_progress`);
    if (saved) {
      try {
        setCompletedDays(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, [level]);

  // Hər gün üçün fərqli Listening mövzuları və audio simulyasiyası
  const getListeningData = (day: number) => {
    const topics = ["Education & Future", "Technology & AI", "Business & Economy", "Health & Lifestyle", "Global Science"];
    const topic = topics[(day - 1) % topics.length];

    return {
      title: `Dinləmə Günü ${day}: ${topic}`,
      audioScript: `Audio Transcript (Day ${day}): Welcome to day ${day} listening session. In this session focusing on ${topic}, native speakers discuss key challenges and modern developments. Listen carefully to the tone, speed, and structural expressions used throughout the dialogue.`,
      questions: Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        question: `[Listening G${day}] Sual ${i + 1}: Dinlənilən mətndə əsas müzakirə obyekti nədir?`,
        options: [
          `A) Modern aspects of ${topic}`,
          "B) Historical background only",
          "C) Irrelevant daily routines"
        ],
        correct: 0
      }))
    };
  };

  const currentData = getListeningData(activeDay);

  const handleOptionSelect = (qId: number, optIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers({ ...selectedAnswers, [qId]: optIndex });
  };

  const handleSubmitTest = () => {
    let correctCount = 0;
    currentData.questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correct) {
        correctCount++;
      }
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
            
            {/* Audio Pleyer Simulyasiyası */}
            <div className="p-8 bg-slate-900 rounded-3xl border border-white/10 space-y-6 shadow-2xl">
              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <h2 className="text-xl md:text-2xl font-black text-white">{currentData.title}</h2>
                <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-xs font-bold border border-purple-500/30">
                  GÜN {activeDay}
                </span>
              </div>
              
              {/* Audio Pleyer UI */}
              <div className="bg-slate-950 p-6 rounded-2xl border border-white/5 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-purple-600 flex items-center justify-center text-xl shadow-lg shadow-purple-500/30">
                    🎧
                  </div>
                  <div>
                    <h4 className="text-sm font-bold">Audio Track • {level} Gün {activeDay}</h4>
                    <p className="text-xs text-gray-400">Native Speaker Audio (Real-time simulation)</p>
                  </div>
                </div>
                
                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                  <div className="bg-purple-500 w-1/3 h-full"></div>
                </div>
              </div>

              {/* Transcript */}
              <div className="space-y-2">
                <h3 className="text-xs font-extrabold text-purple-400 uppercase tracking-wider">Audio Transcript (Mətn):</h3>
                <p className="text-gray-300 text-sm leading-relaxed bg-slate-950/40 p-4 rounded-xl border border-white/5">
                  {currentData.audioScript}
                </p>
              </div>
            </div>

            {/* Test Modulu */}
            <div className="p-8 bg-slate-900 rounded-3xl border border-white/10 space-y-8 shadow-2xl">
              <div className="border-b border-white/10 pb-4">
                <h3 className="text-xl font-bold">Dinləmə Anlama Testi (10 Sual)</h3>
                <p className="text-xs text-gray-400 mt-1">Dinlədiyinə əsasən sualları cavablandır və növbəti günü aç.</p>
              </div>

              <div className="space-y-6">
                {currentData.questions.map((q, qIndex) => (
                  <div key={q.id} className="p-5 bg-slate-950/60 rounded-2xl border border-white/5 space-y-3">
                    <p className="text-sm font-bold text-gray-200">
                      {qIndex + 1}. {q.question}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {q.options.map((opt, optIndex) => {
                        const isSelected = selectedAnswers[q.id] === optIndex;
                        return (
                          <button
                            key={optIndex}
                            disabled={isSubmitted}
                            onClick={() => handleOptionSelect(q.id, optIndex)}
                            className={`p-3 rounded-xl text-xs font-bold text-left transition border ${
                              isSelected
                                ? "bg-purple-600 border-purple-400 text-white shadow-md"
                                : "bg-white/5 border-white/10 text-gray-300 hover:border-purple-500/50"
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {!isSubmitted ? (
                <button
                  onClick={handleSubmitTest}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-black text-sm hover:opacity-90 transition shadow-xl"
                >
                  Dinləmə Nəticəsini Yoxla
                </button>
              ) : (
                <div className="p-6 bg-slate-950 rounded-2xl border border-white/10 text-center space-y-4">
                  <p className="text-lg font-bold">
                    Nəticəniz: <span className={score >= 7 ? "text-green-400" : "text-yellow-400"}>{score} / 10</span>
                  </p>
                  <p className="text-xs text-gray-400">
                    {score >= 7 
                      ? "🎉 Təbriklər! Dinləmə günü uğurla tamamlandı." 
                      : "⚠️ 7-dən az düzgün cavab yığdığın üçün gün tamamlanmadı."}
                  </p>
                  {score >= 7 && activeDay < 60 && (
                    <button
                      onClick={handleNextDay}
                      className="px-6 py-3 rounded-xl bg-green-600 text-white font-bold text-xs hover:bg-green-500 transition shadow-lg"
                    >
                      Növbəti Günə Keç (Gün {activeDay + 1}) →
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