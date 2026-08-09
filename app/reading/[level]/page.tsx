"use client";
import { useState, useEffect, use } from "react";
import Link from "next/link";
import ProgressCalendar from "../../components/ProgressCalendar";

export default function ReadingLevelPage({ params }: { params: Promise<{ level: string }> }) {
  const resolvedParams = use(params);
  const level = resolvedParams.level.toUpperCase();
  
  const [activeDay, setActiveDay] = useState<number>(1);
  const [completedDays, setCompletedDays] = useState<number[]>([]);
  
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    const saved = localStorage.getItem(`reading_${level}_progress`);
    if (saved) {
      try {
        setCompletedDays(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, [level]);

  // Cathoven, BBC Learning English & TED-ED üslubunda genişləndirilmiş akademik mətn generatoru
  const getDayContent = (day: number) => {
    return {
      title: `Day ${day}: Advanced Insights & Global Perspectives (${level})`,
      text: `Modern educational paradigms and cognitive research consistently emphasize that mastering a language at the ${level} level requires deep immersion into authentic contexts. Drawing parallels from TED-Ed insights and BBC Learning English frameworks, language acquisition is not merely a mechanical repetition of vocabulary, but an active restructuring of critical thinking pathways. When learners engage with complex discourse, sophisticated syntax, and multi-layered arguments, their cognitive flexibility expands exponentially. Furthermore, recent studies in applied linguistics highlight that sustained exposure to diverse informational textures—ranging from socio-economic essays to technological breakthroughs—bridges the gap between intermediate fluency and near-native articulation. As you navigate through today's comprehensive analysis, focus on identifying structural cohesion, transitional markers, and nuanced authorial tones that elevate comprehension beyond superficial interpretation.`,
      vocabulary: [
        { term: "Paradigm", def: "A typical example or pattern of something (model/framework)." },
        { term: "Cognitive flexibility", def: "The mental ability to switch between thinking about two different concepts." },
        { term: "Cohesion", def: "The action or fact of forming a united whole in text or speech." }
      ],
      questions: [
        {
          id: 1,
          question: "According to modern educational paradigms and cognitive research, what is primarily required to master a language at the advanced level?",
          options: [
            "A) Deep immersion into authentic contexts and complex discourse",
            "B) Pure mechanical repetition of isolated vocabulary lists",
            "C) Surface-level interpretation without structural analysis"
          ],
          correct: 0
        },
        {
          id: 2,
          question: "How does language acquisition compare to simple mechanical repetition according to the passage?",
          options: [
            "A) It is equivalent to memorizing basic grammar drills",
            "B) It represents an active restructuring of critical thinking pathways",
            "C) It relies exclusively on short-term audio repetition"
          ],
          correct: 1
        },
        {
          id: 3,
          question: "What happens when learners engage with complex discourse and sophisticated syntax?",
          options: [
            "A) Their cognitive flexibility expands exponentially",
            "B) Their reading speed decreases permanently",
            "C) Their comprehension levels become superficial"
          ],
          correct: 0
        },
        {
          id: 4,
          question: "What do recent studies in applied linguistics highlight regarding informational textures?",
          options: [
            "A) They should be avoided by intermediate learners",
            "B) They bridge the gap between intermediate fluency and near-native articulation",
            "C) They complicate learning without providing real benefits"
          ],
          correct: 1
        },
        {
          id: 5,
          question: "Which of the following ranges of informational textures are mentioned in the text?",
          options: [
            "A) Fictional novels and poetry only",
            "B) Socio-economic essays to technological breakthroughs",
            "C) Historical archives and ancient manuscripts"
          ],
          correct: 1
        },
        {
          id: 6,
          question: "What specific elements should the learner focus on while navigating the analysis?",
          options: [
            "A) Structural cohesion, transitional markers, and nuanced authorial tones",
            "B) Memorizing every single word by heart",
            "C) Translating text word-for-word into native language"
          ],
          correct: 0
        },
        {
          id: 7,
          question: "What does the term 'Paradigm' mean based on the vocabulary section?",
          options: [
            "A) A random mistake in a sentence",
            "B) A typical example or pattern of something (model/framework)",
            "C) A temporary digital platform"
          ],
          correct: 1
        },
        {
          id: 8,
          question: "What is defined as 'The mental ability to switch between thinking about two different concepts'?",
          options: [
            "A) Cognitive flexibility",
            "B) Passive memorization",
            "C) Authorial tone"
          ],
          correct: 0
        },
        {
          id: 9,
          question: "What does 'Cohesion' refer to in written or spoken text?",
          options: [
            "A) The speed of reading words per minute",
            "B) The action or fact of forming a united whole",
            "C) The volume of audio playback"
          ],
          correct: 1
        },
        {
          id: 10,
          question: "What is the ultimate goal of moving beyond superficial interpretation?",
          options: [
            "A) Achieving advanced global perspective and profound text mastery",
            "B) Finishing the exercise as quickly as possible",
            "C) Ignoring transitional markers"
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
      localStorage.setItem(`reading_${level}_progress`, JSON.stringify(updated));
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
          <h1 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
            {level} Level • Reading Module (Cathoven & TED-Ed Style)
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
                <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold border border-blue-500/30">
                  DAY {activeDay}
                </span>
              </div>
              
              <div className="text-gray-300 text-sm md:text-base leading-relaxed">
                <p>{currentData.text}</p>
              </div>

              <div className="bg-slate-950/60 p-6 rounded-2xl border border-white/5 space-y-3">
                <h3 className="text-xs font-extrabold text-cyan-400 uppercase tracking-wider">Advanced Vocabulary & Expressions:</h3>
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
                <h3 className="text-xl font-bold">Comprehensive 10-Question Test</h3>
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
                                ? "bg-blue-600 border-blue-400 text-white shadow-md"
                                : "bg-white/5 border-white/10 text-gray-300 hover:border-blue-500/50"
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
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-black text-sm hover:opacity-90 transition shadow-xl"
                >
                  Submit Answers
                </button>
              ) : (
                <div className="p-6 bg-slate-950 rounded-2xl border border-white/10 text-center space-y-4">
                  <p className="text-lg font-bold">
                    Your Score: <span className={score >= 7 ? "text-green-400" : "text-yellow-400"}>{score} / 10</span>
                  </p>
                  <p className="text-xs text-gray-400">
                    {score >= 7 
                      ? "🎉 Congratulations! You successfully passed this day and unlocked the next one." 
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
                        Next Day (Day {activeDay + 1}) →
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