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
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [showTranscript, setShowTranscript] = useState<boolean>(false); // Aç/Bağla düyməsi üçün state

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
    utterance.rate = level === 'A1' || level === 'A2' ? 0.8 : 0.95;
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

  // Hər səviyyəyə uyğun xüsusi dinləmə scriptləri və sualları
  const getDayContent = (lvl: string, day: number) => {
    switch (lvl) {
      case "A1":
        return {
          title: `Day ${day}: Listening to Basic Conversations`,
          audioScript: `Hello, my name is David. I live in a small house with my cat and dog. Every morning, I drink a cup of coffee and eat a piece of toast. Today, I am going to the supermarket to buy milk, apples, and fresh bread. The weather is sunny and warm, so I will walk there instead of taking the bus.`,
          vocabulary: [
            { term: "Supermarket", def: "A large self-service store selling foods and household goods." },
            { term: "Toast", def: "Sliced bread browned by exposure to radiant heat." },
            { term: "Instead", def: "As an alternative or substitute." }
          ],
          questions: [
            { id: 1, question: "What is the speaker's name?", options: ["A) John", "B) David", "C) Alex"], correct: 1 },
            { id: 2, question: "What pets does David have?", options: ["A) A cat and a dog", "B) Only a parrot", "C) Two rabbits"], correct: 0 },
            { id: 3, question: "What does David drink every morning?", options: ["A) Tea", "B) Juice", "C) Coffee"], correct: 2 },
            { id: 4, question: "Where is David going today?", options: ["A) To the park", "B) To the supermarket", "C) To the cinema"], correct: 1 },
            { id: 5, question: "What items is he going to buy?", options: ["A) Milk, apples, and bread", "B) Meat and fish", "C) Books and pens"], correct: 0 },
            { id: 6, question: "How is the weather today?", options: ["A) Rainy and cold", "B) Sunny and warm", "C) Snowy"], correct: 1 },
            { id: 7, question: "How will David travel to the supermarket?", options: ["A) By bus", "B) By taxi", "C) On foot (walk)"], correct: 2 },
            { id: 8, question: "What does 'Supermarket' mean?", options: ["A) A small fruit shop", "B) A large store selling foods", "C) A clothing market"], correct: 1 },
            { id: 9, question: "What does 'Instead' mean?", options: ["A) As an alternative", "B) Together with", "C) Always late"], correct: 0 },
            { id: 10, question: "What did he eat with his coffee?", options: ["A) Toast", "B) Cake", "C) Salad"], correct: 0 }
          ]
        };
      case "A2":
        return {
          title: `Day ${day}: Listening to Travel Stories`,
          audioScript: `Welcome to our travel podcast. Today we are talking about visiting London. Anna went to London last month for a five-day holiday. She visited the British Museum, took photos of Big Ben, and rode the famous red double-decker bus. Although it rained on Tuesday, she enjoyed walking around Hyde Park and drinking traditional English tea in a local café.`,
          vocabulary: [
            { term: "Holiday", def: "An extended period of leisure and recreation, especially one spent away from home." },
            { term: "Museum", def: "A building in which objects of historical, scientific, or cultural interest are stored." },
            { term: "Traditional", def: "Existing in or as part of a tradition; long-established." }
          ],
          questions: [
            { id: 1, question: "Which city is the audio about?", options: ["A) Paris", "B) London", "C) Rome"], correct: 1 },
            { id: 2, question: "How long was Anna's holiday?", options: ["A) Three days", "B) Five days", "C) Two weeks"], correct: 1 },
            { id: 3, question: "Which museum did she visit?", options: ["A) The British Museum", "B) The Louvre", "C) Natural History Museum"], correct: 0 },
            { id: 4, question: "What famous landmark did she take photos of?", options: ["A) Eiffel Tower", "B) Big Ben", "C) Statue of Liberty"], correct: 1 },
            { id: 5, question: "What type of bus did she ride?", options: ["A) Blue single-decker", "B) Red double-decker", "C) Yellow tour bus"], correct: 1 },
            { id: 6, question: "How was the weather on Tuesday?", options: ["A) It rained", "B) It snowed", "C) It was very sunny"], correct: 0 },
            { id: 7, question: "Which park did she walk around?", options: ["A) Central Park", "B) Hyde Park", "C) Green Park"], correct: 1 },
            { id: 8, question: "What did she drink in a local café?", options: ["A) Coffee", "B) Traditional English tea", "C) Hot chocolate"], correct: 1 },
            { id: 9, question: "What does 'Holiday' mean?", options: ["A) A working day", "B) A period of leisure away from home", "C) A school exam"], correct: 1 },
            { id: 10, question: "What does 'Traditional' mean?", options: ["A) Brand new", "B) Long-established", "C) Modern"], correct: 1 }
          ]
        };
      case "B1":
        return {
          title: `Day ${day}: Listening to Workplace Discussions`,
          audioScript: `In today's business audio guide, we discuss effective time management in modern office environments. Employees often struggle with balancing urgent tasks and long-term strategic projects. Experts recommend prioritizing daily duties using the Eisenhower matrix, minimizing digital distractions, and scheduling short breaks to maintain optimal concentration levels throughout the workday.`,
          vocabulary: [
            { term: "Prioritizing", def: "Treating something as more important than other things." },
            { term: "Concentration", def: "The action or power of focusing one's attention or mental effort." },
            { term: "Optimal", def: "Best or most favorable; optimum." }
          ],
          questions: [
            { id: 1, question: "What is the business guide focused on?", options: ["A) Financial accounting", "B) Effective time management in offices", "C) Office interior design"], correct: 1 },
            { id: 2, question: "What do employees often struggle with?", options: ["A) Finding parking spots", "B) Balancing urgent tasks and long-term projects", "C) Operating printers"], correct: 1 },
            { id: 3, question: "What matrix do experts recommend for prioritizing?", options: ["A) Eisenhower matrix", "B) Matrix calculation", "C) Statistical matrix"], correct: 0 },
            { id: 4, question: "What should employees minimize?", options: ["A) Coffee intake", "B) Digital distractions", "C) Paper usage"], correct: 1 },
            { id: 5, question: "Why should short breaks be scheduled?", options: ["A) To chat with colleagues", "B) To maintain optimal concentration levels", "C) To leave work early"], correct: 1 },
            { id: 6, question: "What does 'Prioritizing' mean?", options: ["A) Ignoring tasks", "B) Treating something as more important", "C) Delaying work"], correct: 1 },
            { id: 7, question: "What does 'Concentration' mean?", options: ["A) Focusing attention and mental effort", "B) Physical exercise", "C) Traveling speed"], correct: 0 },
            { id: 8, question: "What does 'Optimal' mean?", options: ["A) Worst possible", "B) Best or most favorable", "C) Average"], correct: 1 },
            { id: 9, question: "Where is this environment set?", options: ["A) Modern office environments", "B) Outdoor construction sites", "C) Scientific laboratories"], correct: 0 },
            { id: 10, question: "What is the overall goal of the advice?", options: ["A) Working fewer hours with lower quality", "B) Enhancing productivity and concentration", "C) Banning all computers"], correct: 1 }
          ]
        };
      case "B2":
        return {
          title: `Day ${day}: Audio Podcast on Cultural Adaptation`,
          audioScript: `Moving to a foreign country involves navigating complex psychological stages of cultural adaptation. Psychologists refer to the initial phase as the honeymoon period, characterized by immense excitement and fascination. However, this is frequently followed by culture shock, where unfamiliar social norms and language barriers create frustration. Overcoming this requires patience, community engagement, and cultural curiosity.`,
          vocabulary: [
            { term: "Adaptation", def: "The action or process of adapting or being adapted." },
            { term: "Fascination", def: "The state of being intensely interested or charmed." },
            { term: "Frustration", def: "The feeling of being upset or annoyed as a result of inability to change something." }
          ],
          questions: [
            { id: 1, question: "What does moving to a foreign country involve?", options: ["A) Immediate fluent mastery", "B) Navigating psychological stages of cultural adaptation", "C) Financial bankruptcy"], correct: 1 },
            { id: 2, question: "What is the initial phase of adaptation called?", options: ["A) Culture shock", "B) The honeymoon period", "C) The integration stage"], correct: 1 },
            { id: 3, question: "What characterizes the initial phase?", options: ["A) Frustration and anger", "B) Immense excitement and fascination", "C) Complete boredom"], correct: 1 },
            { id: 4, question: "What follows the honeymoon period?", options: ["A) Instant citizenship", "B) Culture shock", "C) Permanent relocation"], correct: 1 },
            { id: 5, question: "What causes frustration during culture shock?", options: ["A) Unfamiliar social norms and language barriers", "B) Good weather and food", "C) High salaries"], correct: 0 },
            { id: 6, question: "What is required to overcome culture shock?", options: ["A) Isolation and complaining", "B) Patience, community engagement, and curiosity", "C) Avoiding local people"], correct: 1 },
            { id: 7, question: "What does 'Adaptation' mean?", options: ["A) The process of adjusting to new conditions", "B) Staying exactly the same", "C) Rejecting new cultures"], correct: 0 },
            { id: 8, question: "What does 'Fascination' mean?", options: ["A) Intense interest or charm", "B) Fear of heights", "C) Total indifference"], correct: 0 },
            { id: 9, question: "What does 'Frustration' mean?", options: ["A) Joy and happiness", "B) Annoyance due to inability to change or achieve something", "C) Complete relaxation"], correct: 1 },
            { id: 10, question: "What is the core takeaway of the audio segment?", options: ["A) Moving abroad is easy", "B) Cultural adaptation has psychological phases that can be overcome", "C) People should never travel"], correct: 1 }
          ]
        };
      case "C1":
        return {
          title: `Day ${day}: Advanced Lecture on Macroeconomic Trends`,
          audioScript: `In today's economic seminar, we analyze the intricate correlation between fiscal policy adjustments and inflationary pressures. Central banks worldwide utilize interest rate mechanisms to modulate aggregate demand and stabilize currency valuations. However, unanticipated geopolitical disruptions can severely distort supply chains, rendering traditional predictive models temporarily ineffective.`,
          vocabulary: [
            { term: "Correlation", def: "A mutual relationship or connection between two or more things." },
            { term: "Modulate", def: "Exert a modifying or controlling influence on something." },
            { term: "Disruption", def: "Disturbance or problems which interrupt an event, activity, or process." }
          ],
          questions: [
            { id: 1, question: "What do central banks utilize interest rates for?", options: ["A) To fund private vacations", "B) To modulate aggregate demand and stabilize currency", "C) To print physical paper money faster"], correct: 1 },
            { id: 2, question: "What is analyzed in the economic seminar?", options: ["A) Fiscal policy and inflationary pressures correlation", "B) Agricultural crop rotation", "C) Ancient monetary systems"], correct: 0 },
            { id: 3, question: "What can severely distort supply chains?", options: ["A) Unanticipated geopolitical disruptions", "B) Standard weather forecasts", "C) Stable international relations"], correct: 0 },
            { id: 4, question: "What happens to traditional predictive models during disruptions?", options: ["A) They become more accurate", "B) They are rendered temporarily ineffective", "C) They are permanently banned"], correct: 1 },
            { id: 5, question: "What does 'Correlation' mean?", options: ["A) Mutual relationship between things", "B) Complete independence", "C) Financial loss"], correct: 0 },
            { id: 6, question: "What does 'Modulate' mean?", options: ["A) To destroy completely", "B) To exert a controlling influence", "C) To ignore completely"], correct: 1 },
            { id: 7, question: "What does 'Disruption' refer to?", options: ["A) Smooth operation", "B) Disturbance interrupting a process", "C) Perfect financial balance"], correct: 1 },
            { id: 8, question: "Who utilizes interest rate mechanisms?", options: ["A) Central banks worldwide", "B) Local supermarkets", "C) University students"], correct: 0 },
            { id: 9, question: "What is the primary topic of the lecture?", options: ["A) Macroeconomic monetary policy and inflation", "B) Personal budgeting", "C) Real estate sales"], correct: 0 },
            { id: 10, question: "Why are predictive models sometimes ineffective?", options: ["A) Because economic variables are static", "B) Due to unexpected geopolitical shocks", "C) Because computers are too fast"], correct: 1 }
          ]
        };
      case "C2":
      default:
        return {
          title: `Day ${day}: Philosophical Discourse on Phenomenological Reduction`,
          audioScript: `In this advanced philosophical lecture, we investigate Husserlian phenomenological reduction, bracketing pre-conceived empirical assumptions to examine pure consciousness. By neutralizing ontological commitments regarding the external world, phenomenologists aim to uncover the invariant structures of subjective experience. This rigorous introspection transcends ordinary epistemological inquiry, establishing an unshakeable foundation for phenomenological philosophy.`,
          vocabulary: [
            { term: "Phenomenological", def: "Relating to the study of structures of consciousness and subjective experience." },
            { term: "Bracketing", def: "Suspending judgment regarding the reality of the external world." },
            { term: "Introspection", def: "The examination or observation of one's own mental and emotional processes." }
          ],
          questions: [
            { id: 1, question: "What is investigated in the lecture?", options: ["A) Husserlian phenomenological reduction", "B) Modern quantum physics", "C) Medieval history"], correct: 0 },
            { id: 2, question: "What does bracketing involve in phenomenology?", options: ["A) Suspending judgment regarding external reality", "B) Writing books inside brackets", "C) Mathematical calculations"], correct: 0 },
            { id: 3, question: "What is the ultimate aim of bracketing assumptions?", options: ["A) To uncover invariant structures of subjective consciousness", "B) To prove the external world does not exist", "C) To increase economic output"], correct: 0 },
            { id: 4, question: "What does phenomenological inquiry transcend?", options: ["A) Ordinary epistemological inquiry", "B) Basic arithmetic", "C) Physical laws of motion"], correct: 0 },
            { id: 5, question: "What is 'Introspection'?", options: ["A) Observation of one's own mental processes", "B) Telescopic observation of stars", "C) Social group interaction"], correct: 0 },
            { id: 6, question: "What does 'Phenomenological' relate to?", options: ["A) Structures of consciousness and subjective experience", "B) Chemical reactions", "C) Weather forecasting"], correct: 0 },
            { id: 7, question: "What does 'Bracketing' mean in this context?", options: ["A) Suspending preconceptions", "B) Creating physical fences", "C) Grouping data points"], correct: 0 },
            { id: 8, question: "What kind of foundation does this establish?", options: ["A) An unshakeable foundation for phenomenological philosophy", "B) A temporary commercial hypothesis", "C) A flawed theoretical structure"], correct: 0 },
            { id: 9, question: "Whose reduction method is discussed?", options: ["A) Husserl's", "B) Plato's", "C) Descartes'"], correct: 0 },
            { id: 10, question: "What is the core focus of the audio session?", options: ["A) Pure consciousness and phenomenological epoche", "B) Everyday conversation skills", "C) Financial market trends"], correct: 0 }
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
            {level} Level • Listening Module
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
                setShowTranscript(false);
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
                      {isPlaying ? "Playing Audio Track..." : "Click to Play Audio"}
                    </h4>
                    <p className="text-xs text-gray-400">Native speaker audio simulation ({level} Standard)</p>
                  </div>
                </div>

                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                  <div className={`bg-gradient-to-r from-purple-500 to-pink-500 h-full transition-all duration-500 ${isPlaying ? "w-full animate-pulse" : "w-1/4"}`}></div>
                </div>

                {/* Transcript Aç / Bağla düyməsi */}
                <div className="pt-2">
                  <button
                    onClick={() => setShowTranscript(!showTranscript)}
                    className="px-4 py-2 rounded-xl bg-purple-500/10 text-purple-300 border border-purple-500/30 text-xs font-bold hover:bg-purple-500/20 transition"
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
                <h3 className="text-xl font-bold">Listening Comprehension Test</h3>
                <p className="text-xs text-gray-400 mt-1">You need at least 7 correct answers to unlock the next day. (Click selected option again to deselect).</p>
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