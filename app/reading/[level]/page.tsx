"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function ReadingDetailPage() {
  const params = useParams();
  const level = (params?.level as string)?.toUpperCase() || "B1";
  const [selectedArticle, setSelectedArticle] = useState<number>(0);
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [score, setScore] = useState<number | null>(null);

  // Səviyyələrə uyğun real mətnlər və testlər
  const articles = [
    {
      title: `The Future of Artificial Intelligence in ${level} English`,
      readingTime: "5 dəqiqə oxuma",
      content: `Artificial intelligence is rapidly changing how we communicate, work, and learn languages. In modern education, AI tools provide personalized feedback, helping students practice vocabulary and grammar in real-time. Research shows that learners who interact with smart tutoring systems advance up to 40% faster than traditional classroom learners. However, experts emphasize that human guidance remains essential for true fluency and cultural understanding.`,
      vocabulary: [
        { word: "Rapidly", meaning: "Sürətlə" },
        { word: "Personalized", meaning: "Fərdiləşdirilmiş" },
        { word: "Essential", meaning: "Vacib, zəruri" }
      ],
      questions: [
        {
          q: "What do AI tools provide according to the text?",
          options: ["Personalized feedback", "Free airplane tickets", "Strict physical tests"],
          correct: 0
        },
        {
          q: "How much faster do learners advance with smart tutoring systems?",
          options: ["10%", "Up to 40%", "Double speed"],
          correct: 1
        }
      ]
    },
    {
      title: `Cultural Heritage and Global Connection (${level})`,
      readingTime: "7 dəqiqə oxuma",
      content: `Traveling across borders opens our minds to diverse perspectives and traditions. When we immerse ourselves in a new culture, we challenge our assumptions and build deep empathy. Language is the bridge that connects these diverse worlds, allowing us to share stories, art, and values across continents without barriers.`,
      vocabulary: [
        { word: "Diverse", meaning: "Müxtəlif" },
        { word: "Immerse", meaning: "Qərq olmaq, dərindən qatılmaq" },
        { word: "Empathy", meaning: "Empatiya, başqasını anlama" }
      ],
      questions: [
        {
          q: "What does traveling across borders do?",
          options: ["Makes us tired", "Opens our minds to diverse perspectives", "Stops language learning"],
          correct: 0
        },
        {
          q: "What is described as the bridge connecting worlds?",
          options: ["Money", "Language", "Technology"],
          correct: 1
        }
      ]
    }
  ];

  const currentArt = articles[selectedArticle];

  const handleAnswer = (qIdx: number, optIdx: number) => {
    setSelectedAnswers({ ...selectedAnswers, [qIdx]: optIdx });
  };

  const checkResults = () => {
    let correctCount = 0;
    currentArt.questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correct) correctCount++;
    });
    setScore(correctCount);
  };

  return (
    <main className="min-h-screen bg-[#0b0f19] text-slate-100 font-sans p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Navigation Header */}
        <div className="flex flex-wrap justify-between items-center border-b border-slate-800 pb-6 gap-4">
          <div className="flex items-center space-x-3">
            <Link href="/" className="text-lg font-black tracking-wider text-white">ELITE<span className="text-emerald-500">ACADEMY</span></Link>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20 uppercase">
              Reading Hub ({level})
            </span>
          </div>

          <div className="flex items-center space-x-2">
            {['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map((lvl) => (
              <Link
                key={lvl}
                href={`/reading/${lvl.toLowerCase()}`}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition border ${
                  level === lvl ? "bg-emerald-600 border-emerald-500 text-white" : "bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800"
                }`}
              >
                {lvl}
              </Link>
            ))}
            <Link href="/" className="ml-4 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs border border-slate-700">
              ← Əsas Səhifə
            </Link>
          </div>
        </div>

        {/* Article Selector Tabs */}
        <div className="flex gap-3 overflow-x-auto pb-2">
          {articles.map((art, idx) => (
            <button
              key={idx}
              onClick={() => { setSelectedArticle(idx); setShowQuiz(false); setScore(null); setSelectedAnswers({}); }}
              className={`px-5 py-3 rounded-2xl text-xs font-bold transition whitespace-nowrap border ${
                selectedArticle === idx 
                  ? "bg-emerald-600 border-emerald-500 text-white shadow-lg shadow-emerald-900/30" 
                  : "bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800"
              }`}
            >
              Mətn {idx + 1}: {art.title.substring(0, 30)}...
            </button>
          ))}
        </div>

        {/* Main Reading & Quiz Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left/Center: Text Content */}
          <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 rounded-3xl p-8 space-y-6 shadow-xl">
            <div className="flex justify-between items-center">
              <span className="text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                {currentArt.readingTime}
              </span>
              <div className="space-x-2">
                <button 
                  onClick={() => setShowQuiz(false)} 
                  className={`px-4 py-1.5 rounded-xl text-xs font-bold transition ${!showQuiz ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                >
                  Mətn
                </button>
                <button 
                  onClick={() => setShowQuiz(true)} 
                  className={`px-4 py-1.5 rounded-xl text-xs font-bold transition ${showQuiz ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                >
                  Test Suaları
                </button>
              </div>
            </div>

            <h2 className="text-2xl font-extrabold text-white">{currentArt.title}</h2>

            {!showQuiz ? (
              <div className="space-y-6">
                <p className="text-slate-300 text-base leading-relaxed text-justify bg-slate-950/40 p-6 rounded-2xl border border-slate-800/60">
                  {currentArt.content}
                </p>
                <button
                  onClick={() => setShowQuiz(true)}
                  className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-2xl transition shadow-lg"
                >
                  Mətni Oxudum - Testə Keçid Et →
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Mətn Üzrə Anlama Testi</h3>
                {currentArt.questions.map((q, qIdx) => (
                  <div key={qIdx} className="bg-slate-950/60 p-5 rounded-2xl border border-slate-800 space-y-3">
                    <p className="text-sm font-bold text-white">{qIdx + 1}. {q.q}</p>
                    <div className="space-y-2">
                      {q.options.map((opt, optIdx) => (
                        <button
                          key={optIdx}
                          onClick={() => handleAnswer(qIdx, optIdx)}
                          className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-medium transition border ${
                            selectedAnswers[qIdx] === optIdx
                              ? "bg-emerald-600 border-emerald-500 text-white font-bold"
                              : "bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                <button
                  onClick={checkResults}
                  className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:opacity-90 text-white font-bold text-xs rounded-2xl transition shadow-lg"
                >
                  Nəticəni Yoxla 🎯
                </button>

                {score !== null && (
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-center">
                    <p className="text-emerald-400 font-bold text-sm">
                      Nəticəniz: {score} / {currentArt.questions.length} düzgün cavab! 🎉
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Column: Vocabulary / Key Words */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl h-fit">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3">
              📖 Əsas Lüğət Bazası ({level})
            </h3>
            <div className="space-y-4">
              {currentArt.vocabulary.map((vocab, vIdx) => (
                <div key={vIdx} className="bg-slate-950/50 p-4 rounded-2xl border border-slate-800/80">
                  <span className="text-emerald-400 font-bold text-sm block mb-1">{vocab.word}</span>
                  <span className="text-xs text-slate-400">{vocab.meaning}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </main>
  );
}