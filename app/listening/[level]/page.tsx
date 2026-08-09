"use client";
import { useState, useEffect, use } from "react";
import Link from "next/link";
import ProgressCalendar from "../../components/ProgressCalendar";

export default function ListeningLevelPage({ params }: { params: Promise<{ level: string }> }) {
  const resolvedParams = use(params);
  const level = resolvedParams.level.toUpperCase();
  
  const [activeDay, setActiveDay] = useState<number>(1);
  const [completedDays, setCompletedDays] = useState<number[]>([]);
  
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  // LocalStorage-dən əvvəlki irəliləyişi oxumaq
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

  // Hər gün üçün dinləmə materialı və 10 suallıq test bazası
  const getDayContent = (day: number) => {
    return {
      title: `Gün ${day}: ${day === 1 ? "Listening Comprehension & Native Accent" : day === 2 ? "Audio Strategies & Fast Speech" : `Advanced Listening for ${level}`}`,
      audioDescription: `Audio Track ${day}: Dinləmə zamanı natiqin vurğularına, intonasiyasına və sürətli danışıq modellərinə diqqət yetirin. Bu ${level} səviyyəli audio material qulaq dolğunluğu yaratmaq üçün xüsusi seçilmişdir.`,
      vocabulary: [
        { term: "Intonation", def: "İntonasiya (rise and fall of voice)." },
        { term: "Comprehension", def: "Anlama, dərketmə (ability to understand)." },
        { term: "Accent", def: "Aksent, tələffüz tərzi (distinctive mode of pronunciation)." }
      ],
      questions: Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        question: `[Dinləmə Gün ${day}] Sual ${i + 1}: Audio parça əsasında natiqin əsas mesajı nə idi?`,
        options: [
          "A) Developing sharp listening skills and focus",
          "B) Ignoring native accents and speed",
          "C) Memorizing words without listening"
        ],
        correct: 0 
      }))
    };
  };

  const currentData = getDayContent(activeDay);

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
          <Link href="/" className="text-blue-400 font-bold hover:underline text-sm">← Ana Səhifə</Link>
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
              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <h2 className="text-xl md:text-2xl font-black text-white">{currentData.title}</h2>
                <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-xs font-bold border border-purple-500/30">
                  GÜN {activeDay}
                </span>
              </div>
              
              {/* Audio Player Simulyasiyası */}
              <div className="bg-slate-950 p-6 rounded-2xl border border-white/10 space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center font-bold text-lg shadow-lg">
                    ▶
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Audio Materialı Dinlə</h4>
                    <p className="text-xs text-gray-400">Təbii sürət və ingilis dili vurğusu</p>
                  </div>
                </div>
                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-1/3 h-full"></div>
                </div>
                <p className="text-gray-300 text-xs md:text-sm italic">{currentData.audioDescription}</p>
              </div>

              <div className="bg-slate-950/60 p-6 rounded-2xl border border-white/5 space-y-3">
                <h3 className="text-xs font-extrabold text-pink-400 uppercase tracking-wider">Listening Keywords:</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {currentData.vocabulary.map((vocab, idx) => (
                    <div key={idx} className="bg-white/5 p-3 rounded-xl border border-white/5 text-xs space-y-1">
                      <strong className="text-white block">{vocab.term}</strong>
                      <span className="text-gray-400 text-[11px]">{vocab.def}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-8 bg-slate-900 rounded-3xl border border-white/10 space-y-8 shadow-2xl">
              <div className="border-b border-white/10 pb-4">
                <h3 className="text-xl font-bold">Dinləmə Üzrə 10 Suallıq Test</h3>
                <p className="text-xs text-gray-400 mt-1">Növbəti günə keçmək üçün ən azı 7 düzgün cavab yığmalısan.</p>
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
                  Dinləmə Cavablarını Yoxla
                </button>
              ) : (
                <div className="p-6 bg-slate-950 rounded-2xl border border-white/10 text-center space-y-4">
                  <p className="text-lg font-bold">
                    Nəticəniz: <span className={score >= 7 ? "text-green-400" : "text-yellow-400"}>{score} / 10</span>
                  </p>
                  <p className="text-xs text-gray-400">
                    {score >= 7 
                      ? "🎉 Təbriklər! Dinləmə gününü uğurla tamamladın və növbəti günün kilidi açıldı." 
                      : "⚠️ 7-dən az yığdığın üçün dinləmə günü tamamlanmadı. Yenidən cəhd edə bilərsən."}
                  </p>
                  {score >= 7 && activeDay < 60 && (
                    <button
                      onClick={handleNextDay}
                      className="px-6 py-3 rounded-xl bg-green-600 text-white font-bold text-xs hover:bg-green-500 transition shadow-lg"
                    >
                      Növbəti Dinləmə Gününə Keç (Gün {activeDay + 1}) →
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