"use client";
import { useState, useEffect, use, useRef } from "react";
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
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Web Speech API vasitəsilə həqiqi audio səsləndirmə (İngilis dilində oxumaq üçün)
  const handlePlayAudio = (text: string) => {
    if (!('speechSynthesis' in window)) {
      alert("Speech synthesis is not supported in this browser.");
      return;
    }
    window.speechSynthesis.cancel();
    if (isPlaying) {
      setIsPlaying(false);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.9; // Təbii və anlaşılan sürət
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);
    
    setIsPlaying(true);
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    const saved = localStorage.getItem(`listening_${level}_progress`);
    if (saved) {
      try {
        setCompletedDays(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [level]);

  // BBC & Podcast üslubunda zəngin dinləmə materialı
  const getDayContent = (day: number) => {
    return {
      title: `Day ${day}: Global Audio Podcast & Native Speed Training (${level})`,
      audioScript: `Welcome to today's advanced listening session. In this segment inspired by BBC Learning English and global podcasts, we explore how active auditory engagement transforms language retention. Native speakers naturally link words together, use reduced forms, and vary their pitch to express nuance. By listening to this comprehensive audio track daily, your brain adapts to authentic speech patterns, significantly minimizing translation delays in real-time conversations.`,
      vocabulary: [
        { term: "Auditory engagement", def: "Active mental focus on listening materials." },
        { term: "Reduced forms", def: "Blended words commonly used in fast native speech." },
        { term: "Nuance", def: "A subtle difference in shade of meaning or expression." }
      ],
      questions: [
        {
          id: 1,
          question: "What does active auditory engagement transform according to the podcast?",
          options: [
            "A) Language retention and natural comprehension speed",
            "B) Written grammatical rules only",
            "C) Visual memory capabilities"
          ],
          correct: 0
        },
        {
          id: 2,
          question: "How do native speakers naturally behave when speaking according to the audio script?",
          options: [
            "A) They speak extremely slowly and word-by-word",
            "B) They link words together, use reduced forms, and vary pitch",
            "C) They completely avoid pitch changes"
          ],
          correct: 1
        },
        {
          id: 3,
          question: "What is the benefit of listening to authentic audio tracks daily?",
          options: [
            "A) Adapting to speech patterns and minimizing translation delays",
            "B) Increasing vocabulary forgetting curves",
            "C) Memorizing old historical facts"
          ],
          correct: 0
        },
        {
          id: 4,
          question: "What does 'Auditory engagement' mean?",
          options: [
            "A) Passive hearing without attention",
            "B) Active mental focus on listening materials",
            "C) Translating text into written format"
          ],
          correct: 1
        },
        {
          id: 5,
          question: "What are 'Reduced forms' in spoken English?",
          options: [
            "A) Blended words commonly used in fast native speech",
            "B) Formal academic vocabulary lists",
            "C) Incorrect grammatical structures"
          ],
          correct: 0
        },
        {
          id: 6,
          question: "What does 'Nuance' refer to?",
          options: [
            "A) A loud background noise",
            "B) A subtle difference in shade of meaning or expression",
            "C) A high-speed internet connection"
          ],
          correct: 1
        },
        {
          id: 7,
          question: "What style is this listening exercise inspired by?",
          options: [
            "A) BBC Learning English and global podcasts",
            "B) Silent reading libraries",
            "C) Mathematical equations"
          ],
          correct: 0
        },
        {
          id: 8,
          question: "Why do native speakers vary their pitch?",
          options: [
            "A) To confuse listeners intentionally",
            "B) To express subtle nuance and emotion",
            "C) To make listening longer"
          ],
          correct: 1
        },
        {
          id: 9,
          question: "What real-time problem is minimized through regular training?",
          options: [
            "A) Translation delays during conversations",
            "B) Physical fatigue",
            "C) Screen brightness issues"
          ],
          correct: 0
        },
        {
          id: 10,
          question: "What is the primary objective of this listening module?",
          options: [
            "A) Developing fluent ear-training and natural comprehension",
            "B) Practicing silent handwriting",
            "C) Memorizing dictionary pages"
          ],
          correct: 0
        }
      ]
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

  const handleRetry = () => {
    setIsSubmitted(false);
    setSelectedAnswers({});
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
          <Link href="/" className="text-blue-400 font-bold hover:underline text-sm">← Main Menu</Link>
          <h1 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">
            {level} Level • Listening Module (BBC & Podcast Audio)
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
                if ('speechSynthesis' in window) window.speechSynthesis.cancel();
                setIsPlaying(false);
              }} 
            />
          </div>

          <div className="lg:col-span-2 space-y-8">
            <div className="p-8 bg-slate-900 rounded-3xl border border-white/10 space-y-6 shadow-2xl">
              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <h2 className="text-xl md:text-2xl font-black text-white">{currentData.title}</h2>
                <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-xs font-bold border border-purple-500/30">
                  DAY {activeDay}
                </span>
              </div>
              
              {/* Real İşlək Audio Player (Click to Listen) */}
              <div className="bg-slate-950 p-6 rounded-2xl border border-white/10 space-y-4">
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={() => handlePlayAudio(currentData.audioScript)}
                    className="w-14 h-14 rounded-full bg-purple-600 hover:bg-purple-500 flex items-center justify-center font-bold text-xl shadow-lg transition transform hover:scale-105 cursor-pointer"
                  >
                    {isPlaying ? "⏹" : "▶"}
                  </button>
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      {isPlaying ? "Playing Audio Track..." : "Click to Play Audio Transcript"}
                    </h4>
                    <p className="text-xs text-gray-400">Native speaker simulation (English Voice)</p>
                  </div>
                </div>
                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                  <div className={`bg-gradient-to-r from-purple-500 to-pink-500 h-full transition-all duration-500 ${isPlaying ? "w-full animate-pulse" : "w-1/4"}`}></div>
                </div>
                <p className="text-gray-300 text-xs md:text-sm italic bg-white/5 p-4 rounded-xl border border-white/5">
                  &quot;{currentData.audioScript}&quot;
                </p>
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
                <h3 className="text-xl font-bold">Listening Comprehension Test</h3>
                <p className="text-xs text-gray-400 mt-1">You need at least 7 correct answers to unlock the next day.</p>
              </div>

              <div className="space-y-6">
                {currentData.questions.map((q, qIndex) => (
                  <div key={q.id} className="p-5 bg-slate-950/60 rounded-2xl border border-white/5 space-y-3">
                    <p className="text-sm font-bold text-gray-200">
                      {qIndex + 1}. {q.question}
                    </p>
                    <div className="grid grid-cols-1 gap-2">
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
                  Submit Listening Answers
                </button>
              ) : (
                <div className="p-6 bg-slate-950 rounded-2xl border border-white/10 text-center space-y-4">
                  <p className="text-lg font-bold">
                    Your Score: <span className={score >= 7 ? "text-green-400" : "text-yellow-400"}>{score} / 10</span>
                  </p>
                  <p className="text-xs text-gray-400">
                    {score >= 7 
                      ? "🎉 Congratulations! You successfully passed this listening day." 
                      : "⚠️ You scored less than 7. You can retry the test to improve your score!"}
                  </p>
                  <div className="flex justify-center gap-4 pt-2">
                    <button
                      onClick={handleRetry}
                      className="px-6 py-3 rounded-xl bg-slate-800 text-white font-bold text-xs hover:bg-slate-700 transition shadow-lg border border-white/10"
                    >
                      🔄 Retry Test
                    </button>
                    {score >= 7 && activeDay < 60 && (
                      <button
                        onClick={handleNextDay}
                        className="px-6 py-3 rounded-xl bg-green-600 text-white font-bold text-xs hover:bg-green-500 transition shadow-lg"
                      >
                        Next Listening Day (Day {activeDay + 1}) →
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}