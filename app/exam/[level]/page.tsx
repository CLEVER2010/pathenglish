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
      passage: "IELTS-Simon Style Passage: Urban migration trends indicate a significant shift towards smart metropolitan hubs. Economists from Engovate research note that digital infrastructure dictates regional growth.",
      question: "According to the passage, what primarily dictates regional economic growth?",
      options: ["Agricultural output", "Digital infrastructure", "Traditional manufacturing", "Population density alone"],
      correct: 1
    }
  ];

  const listeningQuestions = [
    {
      id: "l1",
      audioNote: "IELTS.liz Audio Simulation: 'In this listening section, we analyze corporate leadership changes and academic discourse standards.'",
      question: "What is the primary subject of the audio lecture according to IELTS.liz standards?",
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
      { name: userName || "Student", level: level, score: score, progress: "Active" },
      ...prev
    ].sort((a, b) => b.score - a.score));
  };

  if (authView !== "app") {
    return (
      <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6 font-sans">
        <div className="w-full max-w-md p-8 bg-slate-900 rounded-3xl border border-white/10 space-y-6 shadow-2xl">
          <div className="text-center space-y-2">
            <span className="px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30 uppercase">
              Elite Language Academy
            </span>
            <h1 className="text-2xl font-black text-white">
              {authView === "login" ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="text-xs text-gray-400">Sign in to access your placement results and leaderboard.</p>
          </div>

          <div className="space-y-4">
            {authView === "signup" && (
              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1">Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. John Doe"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full p-4 bg-slate-950 rounded-2xl border border-white/10 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            )}
            <div>
              <label className="text-xs font-bold text-gray-300 block mb-1">Email Address</label>
              <input
                type="email"
                placeholder="student@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 bg-slate-950 rounded-2xl border border-white/10 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-300 block mb-1">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-4 bg-slate-950 rounded-2xl border border-white/10 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <button
              onClick={() => setAuthView("app")}
              className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider transition shadow-lg"
            >
              {authView === "login" ? "Sign In 🚀" : "Register & Start 🚀"}
            </button>
          </div>

          <div className="text-center">
            <button
              onClick={() => setAuthView(authView === "login" ? "signup" : "login")}
              className="text-xs text-emerald-400 hover:underline font-semibold"
            >
              {authView === "login" ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 md:p-16 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <div className="flex justify-between items-center border-b border-white/10 pb-6">
          <div>
            <span className="px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30 uppercase">
              Secure Certification Hub
            </span>
            <h1 className="text-2xl md:text-4xl font-black mt-2 text-white">
              Mandatory 30-Min Placement & Leaderboard
            </h1>
          </div>
          <Link
            href="/"
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 font-bold text-xs border border-white/10 transition"
          >
            ← Main Menu
          </Link>
        </div>

        {!examStarted && !placementCompleted && (
          <div className="p-8 bg-slate-900 rounded-3xl border border-white/10 space-y-6 shadow-2xl text-center">
            <h3 className="text-2xl font-black text-white">Mandatory Level Placement Test</h3>
            <p className="text-xs text-gray-400 max-w-xl mx-auto">
              You cannot access free modules without taking the initial 30-minute placement exam. This test includes authentic IELTS Reading & Listening items compiled from Engovate, IELTS.liz, and IELTS-Simon.
            </p>
            <button
              onClick={() => setExamStarted(true)}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black text-xs uppercase tracking-wider hover:opacity-90 transition shadow-lg"
            >
              Start 30-Min Placement Exam Now 🚀
            </button>
          </div>
        )}

        {examStarted && !placementCompleted && (
          <div className="space-y-6">
            <div className="flex justify-between items-center bg-slate-900 p-6 rounded-3xl border border-white/10 shadow-xl">
              <div>
                <span className="text-xs text-emerald-400 font-bold uppercase">Section: {currentSection.toUpperCase()}</span>
                <h2 className="text-lg font-black text-white">IELTS / Engovate Standard Evaluation</h2>
              </div>
              <div className="px-4 py-2 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-300 font-black text-xs">
                ⏳ Time Left: {formatTime(timeLeft)}
              </div>
            </div>

            {currentSection === "reading" ? (
              <div className="p-6 bg-slate-900 rounded-3xl border border-white/10 space-y-6 shadow-xl">
                <div className="p-4 bg-slate-950/80 rounded-2xl border border-white/5 text-sm text-gray-300">
                  <span className="block text-xs font-bold text-emerald-400 mb-1">READING PASSAGE (IELTS.Simon Style):</span>
                  {readingQuestions[0].passage}
                </div>
                <h4 className="text-sm font-black text-white">1. {readingQuestions[0].question}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {readingQuestions[0].options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelect("r1", idx)}
                      className={`p-4 rounded-2xl text-left text-xs border transition ${
                        selectedOptions["r1"] === idx ? "bg-emerald-600/30 border-emerald-500 text-emerald-200" : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setCurrentSection("listening")}
                  className="px-6 py-3 rounded-2xl bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider"
                >
                  Proceed to Listening Section →
                </button>
              </div>
            ) : (
              <div className="p-6 bg-slate-900 rounded-3xl border border-white/10 space-y-6 shadow-xl">
                <div className="p-4 bg-slate-950/80 rounded-2xl border border-white/5 text-sm text-gray-300">
                  <span className="block text-xs font-bold text-emerald-400 mb-1">LISTENING TRACK NOTE (IELTS.liz Standard):</span>
                  {listeningQuestions[0].audioNote}
                </div>
                <h4 className="text-sm font-black text-white">2. {listeningQuestions[0].question}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {listeningQuestions[0].options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelect("l1", idx)}
                      className={`p-4 rounded-2xl text-left text-xs border transition ${
                        selectedOptions["l1"] === idx ? "bg-emerald-600/30 border-emerald-500 text-emerald-200" : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                <div className="flex justify-between">
                  <button
                    onClick={() => setCurrentSection("reading")}
                    className="px-6 py-3 rounded-2xl bg-white/5 text-gray-300 font-bold text-xs border border-white/10"
                  >
                    ← Back to Reading
                  </button>
                  <button
                    onClick={handleFinishPlacement}
                    className="px-8 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black text-xs uppercase tracking-wider shadow-lg"
                  >
                    Finish & Get Assigned Level 🚀
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {placementCompleted && (
          <div className="space-y-8">
            <div className="p-8 bg-slate-900 rounded-3xl border border-emerald-500/40 space-y-4 shadow-2xl text-center">
              <span className="px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30 uppercase">
                Evaluation Complete
              </span>
              <h2 className="text-3xl font-black text-white">Your Official Level: {assignedLevel}</h2>
              <p className="text-xs text-gray-400 max-w-md mx-auto">
                Based on your rigorous 30-minute IELTS/Engovate evaluation, your curriculum has been automatically generated for level <span className="text-emerald-400 font-bold">{assignedLevel}</span>.
              </p>
              <Link
                href={`/reading/${assignedLevel.toLowerCase()}`}
                className="inline-block mt-4 px-8 py-4 rounded-2xl bg-emerald-600 text-white font-black text-xs uppercase tracking-wider shadow-lg hover:bg-emerald-500 transition"
              >
                Enter Your {assignedLevel} Curriculum 🚀
              </Link>
            </div>

            <div className="p-8 bg-slate-900 rounded-3xl border border-white/10 space-y-6 shadow-2xl">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-black text-white">Global Student Leaderboard</h3>
                  <p className="text-xs text-gray-400">Compete with peers, track personal growth. Monthly Top 3 win elite certificates!</p>
                </div>
                <span className="px-3 py-1 rounded-xl bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
                  🏆 Monthly Rewards Active
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 text-xs text-gray-400 uppercase">
                      <th className="py-3 px-4">Rank</th>
                      <th className="py-3 px-4">Student Name</th>
                      <th className="py-3 px-4">Level</th>
                      <th className="py-3 px-4">Score</th>
                      <th className="py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-sm">
                    {leaderboard.map((student, idx) => (
                      <tr key={idx} className={idx < 3 ? "bg-emerald-500/5 font-bold" : ""}>
                        <td className="py-4 px-4 text-emerald-400">#{idx + 1} {idx === 0 ? "🥇" : idx === 1 ? "🥈" : idx === 2 ? "🥉" : ""}</td>
                        <td className="py-4 px-4 text-white">{student.name}</td>
                        <td className="py-4 px-4"><span className="px-2 py-1 rounded bg-white/10 text-xs">{student.level}</span></td>
                        <td className="py-4 px-4 text-purple-300">{student.score} pts</td>
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