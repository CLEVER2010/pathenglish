"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function ExamHubPage() {
  const [authView, setAuthView] = useState<"login" | "signup" | "app">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  
  const [examStarted, setExamStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1800);
  const [currentSection, setCurrentSection] = useState<"reading" | "listening">("reading");
  const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: number }>({});
  const [placementCompleted, setPlacementCompleted] = useState(false);
  const [assignedLevel, setAssignedLevel] = useState<string>("A1");

  const [leaderboard, setLeaderboard] = useState([
    { name: "Leyla M.", level: "C1", score: 98, progress: "Elite" },
    { name: "Orxan K.", level: "B2", score: 88, progress: "Advanced" },
    { name: "Aysel R.", level: "B1", score: 76, progress: "Intermediate" },
  ]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (examStarted && !placementCompleted && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0 && examStarted && !placementCompleted) {
      handleFinishPlacement();
    }
    return () => clearInterval(timer);
  }, [examStarted, timeLeft, placementCompleted]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const readingQuestions = [
    {
      id: "r1",
      passage: "Urban migration trends indicate a significant shift towards smart metropolitan hubs. Economists note that robust digital infrastructure dictates regional economic growth.",
      question: "According to the passage, what primarily dictates regional economic growth?",
      options: ["Agricultural output", "Digital infrastructure", "Traditional manufacturing", "Population density alone"],
      correct: 1
    }
  ];

  const listeningQuestions = [
    {
      id: "l1",
      audioNote: "Audio Simulation Track: 'In this section, we analyze corporate leadership changes and academic discourse standards.'",
      question: "What is the primary subject of the audio lecture?",
      options: ["Corporate leadership and academic discourse", "Wildlife preservation", "Ancient architecture", "Marine biology"],
      correct: 0
    }
  ];

  const handleSelect = (id: string, idx: number) => {
    setSelectedOptions((prev) => ({ ...prev, [id]: idx }));
  };

  const handleFinishPlacement = () => {
    let score = 0;
    if (selectedOptions["r1"] === 1) score += 50;
    if (selectedOptions["l1"] === 0) score += 50;

    let level = "A1";
    if (score >= 90) level = "C1";
    else if (score >= 70) level = "B2";
    else if (score >= 50) level = "B1";
    else if (score >= 30) level = "A2";

    setAssignedLevel(level);
    setPlacementCompleted(true);
    setExamStarted(false);

    setLeaderboard((prev) => [
      { name: userName || "Tələbə", level: level, score: score, progress: "Aktiv" },
      ...prev
    ].sort((a, b) => b.score - a.score));
  };

  if (authView !== "app") {
    return (
      <main className="min-h-screen bg-[#0f172a] text-white flex items-center justify-center p-6 font-sans">
        <div className="w-full max-w-md p-8 bg-slate-900/80 backdrop-blur-xl rounded-3xl border border-white/10 space-y-6 shadow-2xl">
          <div className="text-center space-y-2">
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20 uppercase tracking-widest">
              Elite Academy
            </span>
            <h1 className="text-2xl font-black text-white">
              {authView === "login" ? "Xoş Gəlmisiniz" : "Hesab Yarat"}
            </h1>
            <p className="text-xs text-gray-400">Səviyyə imtahanına başlamaq və liderlər lövhəsinə qoşulmaq üçün daxil olun.</p>
          </div>

          <div className="space-y-4">
            {authView === "signup" && (
              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1">Ad və Soyad</label>
                <input
                  type="text"
                  placeholder="Məs: Əli Məmmədov"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full p-4 bg-slate-950 rounded-2xl border border-white/10 text-sm text-white focus:outline-none focus:border-emerald-500 transition"
                />
              </div>
            )}
            <div>
              <label className="text-xs font-bold text-gray-300 block mb-1">Elektron Poçt</label>
              <input
                type="email"
                placeholder="ornek@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 bg-slate-950 rounded-2xl border border-white/10 text-sm text-white focus:outline-none focus:border-emerald-500 transition"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-300 block mb-1">Şifrə</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-4 bg-slate-950 rounded-2xl border border-white/10 text-sm text-white focus:outline-none focus:border-emerald-500 transition"
              />
            </div>

            <button
              onClick={() => setAuthView("app")}
              className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider transition shadow-[0_0_30px_-5px_rgba(16,185,129,0.4)]"
            >
              {authView === "login" ? "Daxil Ol 🚀" : "Qeydiyyatdan Keç 🚀"}
            </button>
          </div>

          <div className="text-center">
            <button
              onClick={() => setAuthView(authView === "login" ? "signup" : "login")}
              className="text-xs text-emerald-400 hover:underline font-semibold"
            >
              {authView === "login" ? "Hesabınız yoxdur? Qeydiyyatdan keçin" : "Artıq hesabınız var? Daxil olun"}
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0f172a] text-white p-6 md:p-16 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <div className="flex justify-between items-center border-b border-white/5 pb-6">
          <div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20 uppercase tracking-widest">
              Sertifikasiya Mərkəzi
            </span>
            <h1 className="text-2xl md:text-3xl font-black mt-2 text-white">
              Yerləşdirmə İmtahanı və Reytinq
            </h1>
          </div>
          <Link
            href="/"
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 font-bold text-xs border border-white/10 transition"
          >
            ← Əsas Səhifə
          </Link>
        </div>

        {!examStarted && !placementCompleted && (
          <div className="p-10 bg-slate-900/50 rounded-3xl border border-white/5 space-y-6 shadow-xl text-center backdrop-blur-md">
            <h3 className="text-2xl font-black text-white">Məcburi Səviyyə İmtahanı</h3>
            <p className="text-sm text-gray-400 max-w-xl mx-auto leading-relaxed">
              Tədris proqramına uyğunlaşmaq üçün 30 dəqiqəlik ilkin səviyyə yoxlamasından keçməlisiniz. Bu test oxuma və dinləmə bacarıqlarınızı qiymətləndirir.
            </p>
            <button
              onClick={() => setExamStarted(true)}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black text-xs uppercase tracking-wider hover:opacity-90 transition shadow-[0_0_30px_-5px_rgba(16,185,129,0.4)]"
            >
              İmtahana İndi Başla 🚀
            </button>
          </div>
        )}

        {examStarted && !placementCompleted && (
          <div className="space-y-6">
            <div className="flex justify-between items-center bg-slate-900/50 p-6 rounded-3xl border border-white/5 shadow-xl">
              <div>
                <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider">Bölmə: {currentSection.toUpperCase()}</span>
                <h2 className="text-lg font-black text-white">Akademik Qiymətləndirmə</h2>
              </div>
              <div className="px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 font-black text-xs">
                ⏳ Qalan Vaxt: {formatTime(timeLeft)}
              </div>
            </div>

            {currentSection === "reading" ? (
              <div className="p-8 bg-slate-900/50 rounded-3xl border border-white/5 space-y-6 shadow-xl">
                <div className="p-5 bg-slate-950/80 rounded-2xl border border-white/5 text-sm text-gray-300 leading-relaxed">
                  <span className="block text-xs font-bold text-emerald-400 mb-2">OXUMA MƏTNİ:</span>
                  {readingQuestions[0].passage}
                </div>
                <h4 className="text-sm font-black text-white">1. {readingQuestions[0].question}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {readingQuestions[0].options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelect("r1", idx)}
                      className={`p-4 rounded-2xl text-left text-xs border transition ${
                        selectedOptions["r1"] === idx 
                          ? "bg-emerald-600/20 border-emerald-500 text-emerald-200" 
                          : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setCurrentSection("listening")}
                  className="px-6 py-3 rounded-2xl bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider hover:bg-emerald-500 transition"
                >
                  Dinləmə Bölməsinə Keç →
                </button>
              </div>
            ) : (
              <div className="p-8 bg-slate-900/50 rounded-3xl border border-white/5 space-y-6 shadow-xl">
                <div className="p-5 bg-slate-950/80 rounded-2xl border border-white/5 text-sm text-gray-300 leading-relaxed">
                  <span className="block text-xs font-bold text-emerald-400 mb-2">DİNLƏMƏ QEYDİ:</span>
                  {listeningQuestions[0].audioNote}
                </div>
                <h4 className="text-sm font-black text-white">2. {listeningQuestions[0].question}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {listeningQuestions[0].options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelect("l1", idx)}
                      className={`p-4 rounded-2xl text-left text-xs border transition ${
                        selectedOptions["l1"] === idx 
                          ? "bg-emerald-600/20 border-emerald-500 text-emerald-200" 
                          : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                <div className="flex justify-between pt-4">
                  <button
                    onClick={() => setCurrentSection("reading")}
                    className="px-6 py-3 rounded-2xl bg-white/5 text-gray-300 font-bold text-xs border border-white/10 hover:bg-white/10"
                  >
                    ← Oxumaya Qayıt
                  </button>
                  <button
                    onClick={handleFinishPlacement}
                    className="px-8 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black text-xs uppercase tracking-wider shadow-lg hover:opacity-90 transition"
                  >
                    İmtahanı Bitir və Nəticəni Al 🚀
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {placementCompleted && (
          <div className="space-y-8">
            <div className="p-10 bg-slate-900/50 rounded-3xl border border-emerald-500/30 space-y-4 shadow-2xl text-center backdrop-blur-md">
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20 uppercase tracking-widest">
                Qiymətləndirmə Tamamlandı
              </span>
              <h2 className="text-3xl font-black text-white">Sizin Səviyyəniz: {assignedLevel}</h2>
              <p className="text-xs text-gray-400 max-w-md mx-auto leading-relaxed">
                İmtahan nəticələrinizə əsasən 60 günlük tədris proqramınız <span className="text-emerald-400 font-bold">{assignedLevel}</span> səviyyəsinə uyğunlaşdırıldı.
              </p>
              <Link
                href={`/reading/${assignedLevel.toLowerCase()}`}
                className="inline-block mt-4 px-8 py-4 rounded-2xl bg-emerald-600 text-white font-black text-xs uppercase tracking-wider shadow-[0_0_30px_-5px_rgba(16,185,129,0.4)] hover:bg-emerald-500 transition"
              >
                {assignedLevel} Proqramına Daxil Ol 🚀
              </Link>
            </div>

            <div className="p-8 bg-slate-900/50 rounded-3xl border border-white/5 space-y-6 shadow-xl backdrop-blur-md">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-black text-white">Qlobal Tələbə Reytinqi</h3>
                  <p className="text-xs text-gray-400">Digər tələbələrlə yarışın, aylıq nəticələrə görə hədiyyələr qazanın.</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold border border-amber-500/20">
                  🏆 Aylıq Mükafatlar Aktivdir
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/5 text-xs text-gray-400 uppercase tracking-wider">
                      <th className="py-3 px-4">Yer</th>
                      <th className="py-3 px-4">Tələbə</th>
                      <th className="py-3 px-4">Səviyyə</th>
                      <th className="py-3 px-4">Bal</th>
                      <th className="py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-sm">
                    {leaderboard.map((student, idx) => (
                      <tr key={idx} className={idx < 3 ? "bg-emerald-500/5 font-bold" : ""}>
                        <td className="py-4 px-4 text-emerald-400">#{idx + 1} {idx === 0 ? "🥇" : idx === 1 ? "🥈" : idx === 2 ? "🥉" : ""}</td>
                        <td className="py-4 px-4 text-white">{student.name}</td>
                        <td className="py-4 px-4"><span className="px-2 py-1 rounded bg-white/5 text-xs border border-white/5">{student.level}</span></td>
                        <td className="py-4 px-4 text-emerald-400">{student.score} xal</td>
                        <td className="py-4 px-4 text-xs text-gray-400">{student.progress}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}