"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

interface ExamQuestion {
  id: number;
  question: string;
  options: string[];
  correct: number;
}

export default function FinalExamPage() {
  const [selectedExamType, setSelectedExamType] = useState<string>("B2");
  const [examStarted, setExamStarted] = useState<boolean>(false);
  const [currentQuestions, setCurrentQuestions] = useState<ExamQuestion[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [timeLeft, setTimeLeft] = useState<number>(600);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  const getExamQuestions = (type: string): ExamQuestion[] => {
    switch (type) {
      case "A1":
        return [
          { id: 1, question: "What is the past tense of 'go'?", options: ["A) goed", "B) went", "C) gone"], correct: 1 },
          { id: 2, question: "Choose correct sentence:", options: ["A) She has a red car.", "B) She have a car.", "C) She having a car."], correct: 0 },
          { id: 3, question: "Which is an animal?", options: ["A) Table", "B) Elephant", "C) Pencil"], correct: 1 },
          { id: 4, question: "Spell number 10:", options: ["A) Tuen", "B) Ten", "C) Tyn"], correct: 1 },
          { id: 5, question: "Opposite of 'hot'?", options: ["A) Cold", "B) Big", "C) Fast"], correct: 0 },
          { id: 6, question: "Pronoun: '___ am a student.'", options: ["A) He", "B) I", "C) They"], correct: 1 },
          { id: 7, question: "Sky color in day?", options: ["A) Green", "B) Red", "C) Blue"], correct: 2 },
          { id: 8, question: "Day after Monday?", options: ["A) Sunday", "B) Tuesday", "C) Friday"], correct: 1 },
          { id: 9, question: "Where do you buy groceries?", options: ["A) Library", "B) Supermarket", "C) Hospital"], correct: 1 },
          { id: 10, question: "Plural of 'cat':", options: ["A) cates", "B) cats", "C) catz"], correct: 1 },
        ];
      case "A2":
        return [
          { id: 1, question: "Comparative: 'My house is ___ than yours.'", options: ["A) biger", "B) bigger", "C) more big"], correct: 1 },
          { id: 2, question: "Yesterday: 'I ___ to the cinema.'", options: ["A) go", "B) goed", "C) went"], correct: 2 },
          { id: 3, question: "Preposition: 'She is good ___ tennis.'", options: ["A) at", "B) in", "C) on"], correct: 0 },
          { id: 4, question: "Modal: 'You ___ smoke here.'", options: ["A) must", "B) mustn't", "C) can"], correct: 1 },
          { id: 5, question: "Superlative of 'good':", options: ["A) goodest", "B) better", "C) best"], correct: 2 },
          { id: 6, question: "Correct question structure:", options: ["A) Where you live?", "B) Where do you live?", "C) Where lives you?"], correct: 1 },
          { id: 7, question: "Right phrase: 'I am looking forward ___ you.'", options: ["A) to see", "B) to seeing", "C) see"], correct: 1 },
          { id: 8, question: "Word meaning 'travel to work daily':", options: ["A) commute", "B) relax", "C) sleep"], correct: 0 },
          { id: 9, question: "Tense: 'They ___ football right now.'", options: ["A) play", "B) are playing", "C) played"], correct: 1 },
          { id: 10, question: "Opposite of 'expensive':", options: ["A) cheap", "B) rich", "C) high"], correct: 0 },
        ];
      case "B1":
        return [
          { id: 1, question: "Passive: 'They built this house in 1990.'", options: ["A) House is built", "B) House was built", "C) House has built"], correct: 1 },
          { id: 2, question: "Conditional: 'If I had money, I ___ a car.'", options: ["A) will buy", "B) would buy", "C) bought"], correct: 1 },
          { id: 3, question: "Relative pronoun: 'The man ___ helped me.'", options: ["A) which", "B) who", "C) whose"], correct: 1 },
          { id: 4, question: "'Give up' means:", options: ["A) start", "B) surrender / stop trying", "C) gift"], correct: 1 },
          { id: 5, question: "Preposition: 'She depends ___ her parents.'", options: ["A) on", "B) in", "C) at"], correct: 0 },
          { id: 6, question: "Reported speech: 'I am tired' -> He said he ___ tired.", options: ["A) is", "B) was", "C) has been"], correct: 1 },
          { id: 7, question: "Synonym for 'intelligent':", options: ["A) stupid", "B) bright / clever", "C) lazy"], correct: 1 },
          { id: 8, question: "Form: 'I have lived here ___ five years.'", options: ["A) since", "B) for", "C) during"], correct: 1 },
          { id: 9, question: "Noun form of 'decide':", options: ["A) decision", "B) decisive", "C) deciding"], correct: 0 },
          { id: 10, question: "Correct 'used to':", options: ["A) I used to play piano.", "B) I am used to play.", "C) I use to play."], correct: 0 },
        ];
      case "B2":
        return [
          { id: 1, question: "Advanced: 'Hardly had I arrived ___ the phone rang.'", options: ["A) than", "B) when", "C) then"], correct: 1 },
          { id: 2, question: "Inversion: 'Never ___ such scenery.'", options: ["A) I have seen", "B) have I seen", "C) did I saw"], correct: 1 },
          { id: 3, question: "'Break the ice' means:", options: ["A) freeze", "B) relax people socially", "C) argue"], correct: 1 },
          { id: 4, question: "Collocation: 'Capable ___ achieving results.'", options: ["A) of", "B) for", "C) in"], correct: 0 },
          { id: 5, question: "Subjunctive: 'It is essential he ___ present.'", options: ["A) is", "B) be", "C) will be"], correct: 1 },
          { id: 6, question: "Synonym for 'ubiquitous':", options: ["A) rare", "B) omnipresent / everywhere", "C) invisible"], correct: 1 },
          { id: 7, question: "Causative: 'I need to get my car ___.'", options: ["A) repair", "B) repairing", "C) repaired"], correct: 2 },
          { id: 8, question: "'Mitigate' means:", options: ["A) make less severe", "B) increase", "C) destroy"], correct: 0 },
          { id: 9, question: "Connector: '___ the weather, we continued.'", options: ["A) Despite", "B) Although", "C) However"], correct: 0 },
          { id: 10, question: "Collocation: 'To draw a ___ between concepts.'", options: ["A) line", "B) distinction", "C) picture"], correct: 1 },
        ];
      case "C1":
        return [
          { id: 1, question: "Idiom: 'It went ___ my head.'", options: ["A) over", "B) above", "C) through"], correct: 0 },
          { id: 2, question: "Collocation: 'To harbor deep-seated ___.'", options: ["A) affection", "B) resentment", "C) agreement"], correct: 1 },
          { id: 3, question: "'Ameliorate' means:", options: ["A) worsen", "B) make better", "C) investigate"], correct: 1 },
          { id: 4, question: "Structure: 'So profound ___ that all fell silent.'", options: ["A) speech was", "B) was his speech", "C) speech did"], correct: 1 },
          { id: 5, question: "'Perfunctory' means:", options: ["A) meticulous", "B) minimum effort/reflection", "C) permanent"], correct: 1 },
          { id: 6, question: "Contrast connector: '___ popular belief...'", options: ["A) Contrary to", "B) In terms of", "C) With regard to"], correct: 0 },
          { id: 7, question: "'Ephemeral' signifies:", options: ["A) short-lived", "B) eternal", "C) dense"], correct: 0 },
          { id: 8, question: "Derivative of 'transparent':", options: ["A) transparency", "B) transparentness", "C) transparentcy"], correct: 0 },
          { id: 9, question: "'Disingenuous' means:", options: ["A) honest", "B) misleadingly insincere", "C) smart"], correct: 1 },
          { id: 10, question: "Expression: 'Take with a grain of ___.'", options: ["A) salt", "B) sugar", "C) pepper"], correct: 0 },
        ];
      case "SAT":
        return [
          { id: 1, question: "SAT Reading: 'Anomalous' means:", options: ["A) Expected", "B) Deviating from standard/normal", "C) Profitable"], correct: 1 },
          { id: 2, question: "SAT Writing: Precise sentence:", options: ["A) Each presented their platform.", "B) Each presented his or her platform.", "C) Each were presenting."], correct: 1 },
          { id: 3, question: "SAT Vocab: What are platitudes?", options: ["A) Bold ideas", "B) Dull, trite, overused remarks", "C) Formulas"], correct: 1 },
          { id: 4, question: "SAT Rhetoric: Counterargument strategy:", options: ["A) Concession and refutation", "B) Capitulation", "C) Generalization"], correct: 0 },
          { id: 5, question: "SAT Logic: Exponential growth is:", options: ["A) Linear", "B) Proportional to current value", "C) Zero"], correct: 1 },
          { id: 6, question: "SAT Lexicon: 'Mitigate' in contracts:", options: ["A) Make less severe", "B) Breach", "C) Extend"], correct: 0 },
          { id: 7, question: "SAT Sentence: 'Despite her ___ demeanor, she was competitive.'", options: ["A) bellicose", "B) affable", "C) abrasive"], correct: 1 },
          { id: 8, question: "SAT Rhetoric: 'Consequently' indicates:", options: ["A) Contradiction", "B) Causal relationship / result", "C) Shift topic"], correct: 1 },
          { id: 9, question: "SAT Reading: Analogies aim to:", options: ["A) Confuse", "B) Clarify via comparison", "C) Fabricate"], correct: 1 },
          { id: 10, question: "SAT Vocab: 'Paucity' means:", options: ["A) Abundance", "B) Scarcity / smallness of supply", "C) Perfection"], correct: 1 },
        ];
      case "IELTS":
      default:
        return [
          { id: 1, question: "IELTS Academic: Synonym for 'show' in papers:", options: ["A) demonstrate / indicate", "B) point at", "C) look at"], correct: 0 },
          { id: 2, question: "IELTS Lexicon: Collocation for major increase:", options: ["A) Rapid surge / exponential growth", "B) Fast climbing", "C) Big jumping"], correct: 0 },
          { id: 3, question: "IELTS Writing: Summarizing a fluctuating graph:", options: ["A) List every point", "B) Identify key trends, peaks, troughs", "C) Fictional conclusion"], correct: 1 },
          { id: 4, question: "IELTS Reading: Scanning involves:", options: ["A) Reading slowly", "B) Rapidly looking for specific data/keywords", "C) Translating"], correct: 1 },
          { id: 5, question: "IELTS Listening: Map labeling focus:", options: ["A) Compass directions and spatial markers", "B) Background music", "C) Speaker history"], correct: 0 },
          { id: 6, question: "IELTS Speaking: Part 2 duration:", options: ["A) 10 seconds", "B) 1 to 2 minutes", "C) 15 minutes"], correct: 1 },
          { id: 7, question: "IELTS Grammar: Band 8+ complex structure:", options: ["A) Although initial costs are high, benefits outweigh them.", "B) Cost high, benefit good.", "C) High cost."], correct: 0 },
          { id: 8, question: "IELTS Vocab: 'Detrimental' means:", options: ["A) Beneficial", "B) Tending to cause harm", "C) Neutral"], correct: 1 },
          { id: 9, question: "IELTS Academic: Noun form of 'analyze':", options: ["A) analysis", "B) analytical", "C) analyte"], correct: 0 },
          { id: 10, question: "IELTS Cohesion: Linking opposing viewpoint:", options: ["A) In addition", "B) Consequently", "C) On the other hand / Conversely"], correct: 2 },
        ];
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (examStarted && !isSubmitted && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0 && examStarted && !isSubmitted) {
      handleSubmitExam();
    }
    return () => clearInterval(timer);
  }, [examStarted, isSubmitted, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleStartExam = () => {
    setCurrentQuestions(getExamQuestions(selectedExamType));
    setSelectedAnswers({});
    setIsSubmitted(false);
    setTimeLeft(600);
    setExamStarted(true);
  };

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

  const handleSubmitExam = () => {
    let correctCount = 0;
    currentQuestions.forEach((q) => { if (selectedAnswers[q.id] === q.correct) correctCount++; });
    setScore(correctCount);
    setIsSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 md:p-16 font-sans">
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="flex justify-between items-center bg-slate-900 p-6 rounded-3xl border border-white/10 shadow-xl">
          <Link href="/" className="text-blue-400 font-bold hover:underline text-sm">← Main Menu</Link>
          <h1 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
            Final Certification & Elite Exam Hub
          </h1>
        </div>

        {!examStarted ? (
          <div className="p-10 bg-slate-900 rounded-3xl border border-white/10 space-y-8 shadow-2xl text-center">
            <div className="max-w-xl mx-auto space-y-4">
              <h2 className="text-2xl font-black text-white">Select CEFR Level or Elite Exam Panel</h2>
              <p className="text-xs text-gray-400 leading-relaxed">
                Choose standard CEFR levels (A1–C1) or proceed directly to specialized elite examination panels (SAT & IELTS) placed right after C1. You have 10 minutes for 10 rigorous questions.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {["A1", "A2", "B1", "B2", "C1", "SAT", "IELTS"].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setSelectedExamType(lvl)}
                  className={`py-4 rounded-2xl font-black text-sm transition border cursor-pointer shadow-md ${
                    selectedExamType === lvl
                      ? "bg-gradient-to-r from-emerald-600 to-teal-600 border-emerald-400 text-white scale-105"
                      : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10"
                  }`}
                >
                  {lvl === "SAT" || lvl === "IELTS" ? `${lvl} Elite Panel` : `Level ${lvl}`}
                </button>
              ))}
            </div>

            <button
              onClick={handleStartExam}
              className="px-10 py-5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-black text-base hover:opacity-90 transition shadow-xl cursor-pointer"
            >
              Start {selectedExamType} Final Exam Now 🚀
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="sticky top-6 z-20 flex justify-between items-center bg-slate-900/90 backdrop-blur-md p-6 rounded-3xl border border-white/10 shadow-2xl">
              <div>
                <h3 className="text-lg font-black text-white">{selectedExamType} Certification Exam</h3>
                <p className="text-xs text-gray-400">10 Questions • Passing score: 7/10</p>
              </div>
              <div className={`text-sm font-mono font-bold px-4 py-2 rounded-xl border ${timeLeft < 120 ? "bg-red-500/20 text-red-400 border-red-500/30 animate-pulse" : "bg-emerald-950/50 text-emerald-300 border-emerald-500/30"}`}>
                ⏱ Time Left: {formatTime(timeLeft)}
              </div>
            </div>

            <div className="p-8 bg-slate-900 rounded-3xl border border-white/10 space-y-6 shadow-2xl">
              {currentQuestions.map((q, idx) => (
                <div key={q.id} className="p-6 bg-slate-950/60 rounded-2xl border border-white/5 space-y-4">
                  <p className="text-sm md:text-base font-bold text-gray-200">{idx + 1}. {q.question}</p>
                  <div className="grid grid-cols-1 gap-2">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = selectedAnswers[q.id] === optIdx;
                      return (
                        <button
                          key={optIdx} disabled={isSubmitted}
                          onClick={() => handleOptionSelect(q.id, optIdx)}
                          className={`p-3.5 rounded-xl text-xs md:text-sm font-bold text-left transition border cursor-pointer ${
                            isSelected ? "bg-emerald-600 border-emerald-400 text-white shadow-md" : "bg-white/5 border-white/10 text-gray-300 hover:border-emerald-500/50"
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              {!isSubmitted ? (
                <button onClick={handleSubmitExam} className="w-full py-5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-black text-base hover:opacity-90 transition shadow-xl cursor-pointer">
                  Finish & Submit Exam
                </button>
              ) : (
                <div className="p-8 bg-slate-950 rounded-3xl border border-white/10 text-center space-y-6">
                  <h3 className="text-2xl font-black">Exam Results</h3>
                  <p className="text-3xl font-black">Score: <span className={score >= 7 ? "text-emerald-400" : "text-yellow-400"}>{score} / 10</span></p>
                  <p className="text-sm text-gray-300 max-w-md mx-auto">
                    {score >= 7 ? `🎉 Outstanding! Passed ${selectedExamType} exam.` : `⚠️ Score ${score}/10. 7 required to pass. Try again!`}
                  </p>
                  <div className="flex justify-center gap-4 pt-2">
                    <button onClick={() => setExamStarted(false)} className="px-8 py-3.5 rounded-xl bg-slate-800 text-white font-bold text-xs hover:bg-slate-700 transition border border-white/10 cursor-pointer">
                      ← Back to Exam Selection
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}