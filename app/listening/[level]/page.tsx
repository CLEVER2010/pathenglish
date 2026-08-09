"use client";
import { useState, useEffect, use, useRef } from "react";
import Link from "next/link";
import ProgressCalendar from "../../components/ProgressCalendar";

export default function ListeningLevelPage({ params }: { params: Promise<{ level: string }> }) {
  const resolvedParams = use(params);
  const rawLevel = resolvedParams.level.toUpperCase();
  const isSpecialExam = rawLevel === "SAT" || rawLevel === "IELTS";
  const level = isSpecialExam ? rawLevel : rawLevel;
  
  const [activeDay, setActiveDay] = useState<number>(1);
  const [completedDays, setCompletedDays] = useState<number[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [showTranscript, setShowTranscript] = useState<boolean>(false);

  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(180);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(`listening_${level}_progress`);
    if (saved) {
      try { setCompletedDays(JSON.parse(saved)); } catch (e) { console.error(e); }
    }
    return () => {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [level]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handlePlayAudio = (scriptText: string) => {
    if (!('speechSynthesis' in window)) { alert("Speech synthesis not supported."); return; }
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(scriptText);
    utterance.lang = 'en-US';
    utterance.rate = level === 'A1' || level === 'A2' ? 0.85 : 0.95;

    const estimatedDuration = Math.max(120, Math.floor(scriptText.length / 14));
    setDuration(estimatedDuration);
    setCurrentTime(0);

    utterance.onstart = () => {
      setIsPlaying(true);
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= estimatedDuration) {
            if (timerRef.current) clearInterval(timerRef.current);
            return estimatedDuration;
          }
          return prev + 1;
        });
      }, 1000);
    };

    utterance.onend = () => { setIsPlaying(false); if (timerRef.current) clearInterval(timerRef.current); setCurrentTime(estimatedDuration); };
    utterance.onerror = () => { setIsPlaying(false); if (timerRef.current) clearInterval(timerRef.current); };

    window.speechSynthesis.speak(utterance);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => { setCurrentTime(Number(e.target.value)); };

  const getDayContent = (lvl: string, day: number) => {
    switch (lvl) {
      case "A1":
        return {
          title: `Day ${day}: Basic Daily Conversations`,
          audioScript: `Hello everyone. My name is Mark. Every morning, I wake up at seven o'clock. I wash my face, brush my teeth, and prepare a simple breakfast consisting of eggs, toast, and hot black tea. After breakfast, I walk to the nearby grocery store to buy fresh fruits, vegetables, and milk for my family.`,
          vocabulary: [
            { term: "Grocery", def: "A store selling food." },
            { term: "Chore", def: "A routine task." }
          ],
          questions: [
            { id: 1, question: "What time does Mark wake up?", options: ["A) 6:00 AM", "B) 7:00 AM", "C) 8:00 AM"], correct: 1 },
            { id: 2, question: "What does he drink for breakfast?", options: ["A) Juice", "B) Black tea", "C) Coffee"], correct: 1 },
            { id: 3, question: "Where does he walk after breakfast?", options: ["A) Grocery store", "B) Station", "C) Office"], correct: 0 },
            { id: 4, question: "What items does he buy?", options: ["A) Books", "B) Fruits, vegetables, and milk", "C) Meat"], correct: 1 },
            { id: 5, question: "How is the weather?", options: ["A) Rainy", "B) Bright and sunny", "C) Windy"], correct: 1 },
            { id: 6, question: "Where does he walk?", options: ["A) Park", "B) Mountain", "C) Beach"], correct: 0 },
            { id: 7, question: "What does 'Grocery' mean?", options: ["A) Clothing shop", "B) Food store", "C) Repair shop"], correct: 1 },
            { id: 8, question: "Who does he buy milk for?", options: ["A) Family", "B) Cat", "C) Himself"], correct: 0 },
            { id: 9, question: "What does 'Chore' mean?", options: ["A) Game", "B) Routine task", "C) Trip"], correct: 1 },
            { id: 10, question: "What did he eat?", options: ["A) Eggs and toast", "B) Pizza", "C) Soup"], correct: 0 }
          ]
        };
      case "A2":
        return {
          title: `Day ${day}: Planning a Journey Abroad`,
          audioScript: `Welcome to our listening practice. Today, we listen to Jessica planning her international journey to Italy. She has saved money for over six months and booked a cozy hotel in Rome. She is excited to visit monuments like the Colosseum, taste authentic Italian pasta, and practice Italian phrases.`,
          vocabulary: [
            { term: "Monument", def: "A notable building or structure." },
            { term: "Authentic", def: "Genuine and original." }
          ],
          questions: [
            { id: 1, question: "Where is Jessica traveling?", options: ["A) Spain", "B) Italy", "C) France"], correct: 1 },
            { id: 2, question: "How long did she save money?", options: ["A) 3 months", "B) 6 months", "C) 1 year"], correct: 1 },
            { id: 3, question: "Where is her hotel?", options: ["A) Rome", "B) Airport", "C) Village"], correct: 0 },
            { id: 4, question: "Which monument will she visit?", options: ["A) Eiffel Tower", "B) Colosseum", "C) Big Ben"], correct: 1 },
            { id: 5, question: "What food does she want?", options: ["A) Pasta", "B) Sushi", "C) Tacos"], correct: 0 },
            { id: 6, question: "Why is she nervous?", options: ["A) Foreign airports", "B) Weather", "C) Passport loss"], correct: 0 },
            { id: 7, question: "What does 'Monument' mean?", options: ["A) Mall", "B) Commemorative structure", "C) Restaurant"], correct: 1 },
            { id: 8, question: "What does 'Authentic' mean?", options: ["A) Fake", "B) Genuine", "C) Expensive"], correct: 1 },
            { id: 9, question: "What is enthusiasm?", options: ["A) Boredom", "B) Eager enjoyment", "C) Sadness"], correct: 1 },
            { id: 10, question: "How is her preparation?", options: ["A) Thorough", "B) Missing", "C) Careless"], correct: 0 }
          ]
        };
      case "B1":
        return {
          title: `Day ${day}: Remote Work Trends`,
          audioScript: `Remote work has shifted how professional teams collaborate across time zones. Organizations rely on cloud software and video conferences. While offering flexibility and work-life balance, it blurs boundaries between duties and personal time. Effective communication is crucial.`,
          vocabulary: [
            { term: "Collaboration", def: "Working together." },
            { term: "Flexibility", def: "Adapting to conditions." }
          ],
          questions: [
            { id: 1, question: "What shifted collaboration?", options: ["A) Paper", "B) Remote work", "C) Relocation"], correct: 1 },
            { id: 2, question: "What tools do organizations use?", options: ["A) Cloud software", "B) Fax", "C) Post"], correct: 0 },
            { id: 3, question: "Major benefit?", options: ["A) Work-life balance", "B) Zero meetings", "C) Fitness"], correct: 0 },
            { id: 4, question: "Key challenge?", options: ["A) Blurring boundaries", "B) Electricity", "C) Licenses"], correct: 0 },
            { id: 5, question: "Crucial factor?", options: ["A) Isolation", "B) Communication and discipline", "C) 18 hours work"], correct: 1 },
            { id: 6, question: "Collaboration means?", options: ["A) Working together", "B) Competing", "C) Alone"], correct: 0 },
            { id: 7, question: "Flexibility means?", options: ["A) Gymnastics", "B) Adapting to conditions", "C) Rigid rules"], correct: 1 },
            { id: 8, question: "Transparent means?", options: ["A) Hidden", "B) Clear and open", "C) Invisible"], correct: 1 },
            { id: 9, question: "Why use messaging tools?", options: ["A) Maintain productivity", "B) Play games", "C) Waste time"], correct: 0 },
            { id: 10, question: "Theme?", options: ["A) Workplace adaptation", "B) Factory", "C) Agriculture"], correct: 0 }
          ]
        };
      case "B2":
        return {
          title: `Day ${day}: Renewable Energy Transitions`,
          audioScript: `The transition to renewable energy is an urgent socio-economic necessity. Governments invest in solar, wind, and hydroelectric power. However, intermittent supply and storage limits present hurdles. Policymakers must address workforce displacement in traditional sectors.`,
          vocabulary: [
            { term: "Imperative", def: "Of vital importance." },
            { term: "Intermittent", def: "Occurring at irregular intervals." }
          ],
          questions: [
            { id: 1, question: "Transition shifted into?", options: ["A) Minor debate", "B) Socio-economic necessity", "C) Trend"], correct: 1 },
            { id: 2, question: "Corporations investing in?", options: ["A) Coal", "B) Solar, wind, hydroelectric", "C) Engines"], correct: 1 },
            { id: 3, question: "Logistical obstacle?", options: ["A) Intermittent supply & storage limits", "B) No sunlight", "C) Opposition"], correct: 0 },
            { id: 4, question: "Workforce issue?", options: ["A) Tech shortages", "B) Displacement in fossil fuel sectors", "C) Salaries"], correct: 1 },
            { id: 5, question: "Improving viability?", options: ["A) Photovoltaic & batteries", "B) Steam engines", "C) Printing press"], correct: 0 },
            { id: 6, question: "Imperative means?", options: ["A) Unimportant", "B) Crucial", "C) Illegal"], correct: 1 },
            { id: 7, question: "Intermittent means?", options: ["A) Constant", "B) Irregular intervals", "C) Broken"], correct: 1 },
            { id: 8, question: "Multifaceted means?", options: ["A) Simple", "B) Complex", "C) Cheap"], correct: 1 },
            { id: 9, question: "Ecological success determined by?", options: ["A) Grassroots awareness & reforms", "B) Deregulation", "C) Halting science"], correct: 0 },
            { id: 10, question: "Primary message?", options: ["A) Vital, complex, advancing", "B) Fossil fuels sustainable", "C) No impact"], correct: 0 }
          ]
        };
      case "C1":
        return {
          title: `Day ${day}: Cognitive Biases & Market Behavior`,
          audioScript: `Behavioral economics examines how cognitive biases distort rational decisions. Heuristic shortcuts like confirmation bias and loss aversion skew risk assessment. Market exuberance inflates asset values. Recognizing these blind spots is critical.`,
          vocabulary: [
            { term: "Heuristic", def: "Mental shortcuts for problem-solving." },
            { term: "Corroborate", def: "Confirm findings." }
          ],
          questions: [
            { id: 1, question: "Classic economics assumption challenged?", options: ["A) Humans are rational maximizers", "B) Prices fall", "C) No inflation"], correct: 0 },
            { id: 2, question: "Heuristics distort?", options: ["A) Networks", "B) Rational decisions & risk assessment", "C) Grammar"], correct: 1 },
            { id: 3, question: "Confirmation bias effect?", options: ["A) Neutrality", "B) Favoring pre-existing beliefs", "C) Memory loss"], correct: 1 },
            { id: 4, question: "Herd mentality leads to?", options: ["A) Financial volatility & inflated values", "B) Stability", "C) Stagnation"], correct: 0 },
            { id: 5, question: "Recognizing blind spots helps?", options: ["A) Risk mitigation & safeguards", "B) Confusion", "C) Eliminating banks"], correct: 0 },
            { id: 6, question: "Heuristic refers to?", options: ["A) Mental shortcuts", "B) Equations", "C) Damage"], correct: 0 },
            { id: 7, question: "Corroborate means?", options: ["A) Contradict", "B) Confirm", "C) Hide"], correct: 1 },
            { id: 8, question: "Exuberance means?", options: ["A) Panic", "B) Over-optimism", "C) Compliance"], correct: 1 },
            { id: 9, question: "Loss aversion causes?", options: ["A) Avoiding losses over gains", "B) Risk", "C) Joy"], correct: 0 },
            { id: 10, question: "Conclusion?", options: ["A) Biases influence economics", "B) Humans are logical", "C) Irrelevant"], correct: 0 }
          ]
        };
      case "SAT":
        return {
          title: `Day ${day}: Elite SAT Listening & Rhetorical Analysis Panel`,
          audioScript: `SAT Listening Simulation: Academic lecture discussing algorithmic profiling in justice and cognitive biases. Researchers emphasize auditing protocols, data transparency, and human-in-the-loop oversight to counter historical training dataset anomalies and ensure absolute structural equity.`,
          vocabulary: [
            { term: "Profiling", def: "Behavioral pattern analysis." },
            { term: "Contend", def: "To assert in argument." }
          ],
          questions: [
            { id: 1, question: "Focus of lecture?", options: ["A) Hardware costs", "B) Algorithmic profiling ethics", "C) Court history"], correct: 1 },
            { id: 2, question: "Proponents claim machine learning minimizes?", options: ["A) Human prejudice", "B) Speed", "C) Taxes"], correct: 0 },
            { id: 3, question: "Main criticism?", options: ["A) Speed", "B) Biased datasets", "C) Power"], correct: 1 },
            { id: 4, question: "Human judges exhibit?", options: ["A) Precision", "B) Fatigue and bias", "C) Immunity"], correct: 1 },
            { id: 5, question: "Advocated solution?", options: ["A) Automation", "B) Auditing, transparency, oversight", "C) Banning"], correct: 1 },
            { id: 6, question: "Contend means?", options: ["A) Agree", "B) Assert position", "C) Surrender"], correct: 1 },
            { id: 7, question: "Auditing involves?", options: ["A) Inspection and evaluation", "B) Bankruptcy", "C) Review"], correct: 0 },
            { id: 8, question: "Lecture structure?", options: ["A) Refutes", "B) Examines multiple viewpoints and solutions", "C) Unrelated"], correct: 1 },
            { id: 9, question: "Neutrality illusion?", options: ["A) Discrimination persists unseen", "B) Living computers", "C) Speed"], correct: 0 },
            { id: 10, question: "Core objective?", options: ["A) Analytical synthesis", "B) Fiction", "C) Memorization"], correct: 0 }
          ]
        };
      case "IELTS":
      default:
        return {
          title: `Day ${day}: Elite IELTS Academic Listening: Megacity Infrastructures`,
          audioScript: `IELTS Academic Listening: Lecture on urban megacity expansion. Rural migration strains municipal services, housing, and air quality. Experts advocate smart-city technologies, efficient public transit, and green architecture to mitigate ecological degradation.`,
          vocabulary: [
            { term: "Agglomeration", def: "Mass collection." },
            { term: "Municipal", def: "City governing." }
          ],
          questions: [
            { id: 1, question: "Megacity definition?", options: ["A) Over 10 million residents", "B) No cars", "C) Glass"], correct: 0 },
            { id: 2, question: "Migration driver?", options: ["A) Farming", "B) Jobs, education, healthcare", "C) Force"], correct: 1 },
            { id: 3, question: "Municipal strain?", options: ["A) Housing and traffic congestion", "B) Electricity", "C) Space"], correct: 0 },
            { id: 4, question: "Solutions emphasized?", options: ["A) Smart-city tech, transit, green architecture", "B) Demolition", "C) Stopping migration"], correct: 0 },
            { id: 5, question: "Failure risk?", options: ["A) Uninhabitable urban sprawls", "B) Farmland", "C) Sinking"], correct: 0 },
            { id: 6, question: "Agglomeration means?", options: ["A) Wasteland", "B) Mass collection coming together", "C) Isolated"], correct: 1 },
            { id: 7, question: "Precipitate means?", options: ["A) Cause suddenly", "B) Delay", "C) Calculate"], correct: 0 },
            { id: 8, question: "Municipal relates to?", options: ["A) Military", "B) City or town governing bodies", "C) Trade"], correct: 1 },
            { id: 9, question: "Air quality consequence?", options: ["A) Degraded and polluted", "B) Pristine", "C) Unaffected"], correct: 0 },
            { id: 10, question: "Primary purpose?", options: ["A) Academic comprehension of phenomena", "B) Entertainment", "C) Alphabet"], correct: 0 }
          ]
        };
    }
  };

  const currentData = getDayContent(level, activeDay);

  const handleOptionSelect = (qId: number, optIndex: number) => {
    if (isSubmitted) return;
    if (selectedAnswers[qId] === optIndex) {
      const updated = { ...selectedAnswers };
      delete updated[qId];
      setSelectedAnswers(updated);
    } else {
      setSelectedAnswers({ ...selectedAnswers, [qId]: optIndex });
    }
  };

  const handleSubmitTest = () => {
    let correctCount = 0;
    currentData.questions.forEach((q) => { if (selectedAnswers[q.id] === q.correct) correctCount++; });
    setScore(correctCount);
    setIsSubmitted(true);
    if (correctCount >= 7 && !completedDays.includes(activeDay)) {
      const updated = [...completedDays, activeDay];
      setCompletedDays(updated);
      localStorage.setItem(`listening_${level}_progress`, JSON.stringify(updated));
    }
  };

  const handleRetry = () => { setIsSubmitted(false); setSelectedAnswers({}); };
  const handleNextDay = () => {
    setIsSubmitted(false); setSelectedAnswers({}); setActiveDay(activeDay + 1);
    setCurrentTime(0); if ('speechSynthesis' in window) window.speechSynthesis.cancel(); setIsPlaying(false);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 md:p-16 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex justify-between items-center bg-slate-900 p-6 rounded-3xl border border-white/10 shadow-xl">
          <Link href="/" className="text-blue-400 font-bold hover:underline text-sm">← Main Menu</Link>
          <h1 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">
            {isSpecialExam ? `${level} Elite Listening Panel` : `${level} Level • Long Listening Module`}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <ProgressCalendar 
              currentLevel={level} 
              completedDays={completedDays} 
              activeDay={activeDay} 
              onSelectDay={(day: number) => {
                setActiveDay(day); setIsSubmitted(false); setSelectedAnswers({});
                if ('speechSynthesis' in window) window.speechSynthesis.cancel();
                setIsPlaying(false); setShowTranscript(false); setCurrentTime(0);
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
              
              <div className="bg-slate-950 p-6 rounded-2xl border border-white/10 space-y-4 shadow-inner">
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={() => handlePlayAudio(currentData.audioScript)}
                    className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 flex items-center justify-center font-bold text-xl shadow-lg transition transform hover:scale-105 cursor-pointer flex-shrink-0"
                  >
                    {isPlaying ? "⏸" : "▶"}
                  </button>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-white truncate">
                      {isPlaying ? "Playing Audio Session..." : "Click Play to Start Audio"}
                    </h4>
                    <p className="text-xs text-gray-400">Native Advanced Simulation ({level})</p>
                  </div>
                  <div className="text-xs font-mono font-bold text-purple-300 bg-purple-950/50 px-3 py-1.5 rounded-xl border border-purple-500/30">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </div>
                </div>

                <div className="space-y-1">
                  <input
                    type="range" min={0} max={duration} value={currentTime} onChange={handleSeek}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-pink-500"
                  />
                  <div className="flex justify-between text-[10px] text-gray-500 font-mono">
                    <span>00:00</span><span>{formatTime(duration)}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setShowTranscript(!showTranscript)}
                    className="px-4 py-2 rounded-xl bg-purple-500/10 text-purple-300 border border-purple-500/30 text-xs font-bold hover:bg-purple-500/20 transition cursor-pointer"
                  >
                    {showTranscript ? "▼ Hide Transcript" : "▶ Show Transcript"}
                  </button>

                  {showTranscript && (
                    <div className="mt-4 p-4 bg-white/5 rounded-xl border border-white/10 text-gray-300 text-xs md:text-sm italic leading-relaxed animate-fadeIn">
                      &quot;{currentData.audioScript}&quot;
                    </div>
                  )}
                </div>
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
                <h3 className="text-xl font-bold">Comprehension Test</h3>
                <p className="text-xs text-gray-400 mt-1">Score at least 7 correct answers to unlock next day.</p>
              </div>

              <div className="space-y-6">
                {currentData.questions.map((q, qIndex) => (
                  <div key={q.id} className="p-5 bg-slate-950/60 rounded-2xl border border-white/5 space-y-3">
                    <p className="text-sm font-bold text-gray-250">{qIndex + 1}. {q.question}</p>
                    <div className="grid grid-cols-1 gap-2">
                      {q.options.map((opt, optIndex) => {
                        const isSelected = selectedAnswers[q.id] === optIndex;
                        return (
                          <button
                            key={optIndex} disabled={isSubmitted}
                            onClick={() => handleOptionSelect(q.id, optIndex)}
                            className={`p-3 rounded-xl text-xs font-bold text-left transition border cursor-pointer ${
                              isSelected ? "bg-purple-600 border-purple-400 text-white shadow-md" : "bg-white/5 border-white/10 text-gray-300 hover:border-purple-500/50"
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
                <button onClick={handleSubmitTest} className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-black text-sm hover:opacity-90 transition shadow-xl cursor-pointer">
                  Submit Listening Answers
                </button>
              ) : (
                <div className="p-6 bg-slate-950 rounded-2xl border border-white/10 text-center space-y-4">
                  <p className="text-lg font-bold">Your Score: <span className={score >= 7 ? "text-green-400" : "text-yellow-400"}>{score} / 10</span></p>
                  <p className="text-xs text-gray-400">
                    {score >= 7 ? "🎉 Congratulations! Passed successfully." : "⚠️ Score below 7. Retry to improve!"}
                  </p>
                  <div className="flex justify-center gap-4 pt-2">
                    <button onClick={handleRetry} className="px-6 py-3 rounded-xl bg-slate-800 text-white font-bold text-xs hover:bg-slate-700 transition border border-white/10 cursor-pointer">🔄 Retry Test</button>
                    {score >= 7 && activeDay < 60 && (
                      <button onClick={handleNextDay} className="px-6 py-3 rounded-xl bg-green-600 text-white font-bold text-xs hover:bg-green-500 transition cursor-pointer">Next Day →</button>
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