"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function ListeningLevelPage() {
  const params = useParams();
  const level = (params?.level as string)?.toUpperCase() || "B1";
  const [selectedAudio, setSelectedAudio] = useState<number>(0);
  const [showTranscript, setShowTranscript] = useState<boolean>(false);

  const audioTracks = [
    {
      title: `Daily Conversation & Workplace Communication (${level})`,
      duration: "3 dəqiqə 45 saniyə",
      speaker: "Sarah & David (Native Speakers)",
      transcript: "David: Hi Sarah, how is the new project going? \nSarah: It's going great! We finished the research phase and now focusing on user experience. \nDavid: That sounds impressive. Let me know if you need any help with the testing phase.",
      questions: [
        { q: "What phase did they finish?", options: ["Research phase", "Sales phase", "Design phase"], correct: 0 },
        { q: "Who offered help with testing?", options: ["Sarah", "David", "Manager"], correct: 1 }
      ]
    },
    {
      title: `Travel and Airport Check-in Simulation (${level})`,
      duration: "2 dəqiqə 30 saniyə",
      speaker: "Airport Assistant & Passenger",
      transcript: "Assistant: Good morning, passport and ticket please. \nPassenger: Here you are. Can I get a window seat? \nAssistant: Sure, seat 14A is available. Enjoy your flight to London!",
      questions: [
        { q: "Where is the passenger flying to?", options: ["Paris", "London", "Baku"], correct: 1 },
        { q: "What seat did the passenger request?", options: ["Aisle seat", "Window seat", "Middle seat"], correct: 1 }
      ]
    }
  ];

  const currentTrack = audioTracks[selectedAudio];

  return (
    <main className="min-h-screen bg-[#0b0f19] text-slate-100 font-sans p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Navigation Header */}
        <div className="flex flex-wrap justify-between items-center border-b border-slate-800 pb-6 gap-4">
          <div className="flex items-center space-x-3">
            <Link href="/" className="text-lg font-black tracking-wider text-white">ELITE<span className="text-teal-400">ACADEMY</span></Link>
            <span className="px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 text-xs font-bold border border-teal-500/20 uppercase">
              Listening Hub ({level})
            </span>
          </div>

          <div className="flex items-center space-x-2">
            {['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map((lvl) => (
              <Link
                key={lvl}
                href={`/listening/${lvl.toLowerCase()}`}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition border ${
                  level === lvl ? "bg-teal-600 border-teal-500 text-white" : "bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800"
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

        {/* Audio Track Selector */}
        <div className="flex gap-3 overflow-x-auto pb-2">
          {audioTracks.map((track, idx) => (
            <button
              key={idx}
              onClick={() => { setSelectedAudio(idx); setShowTranscript(false); }}
              className={`px-5 py-3 rounded-2xl text-xs font-bold transition whitespace-nowrap border ${
                selectedAudio === idx 
                  ? "bg-teal-600 border-teal-500 text-white shadow-lg shadow-teal-900/30" 
                  : "bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800"
              }`}
            >
              Audio {idx + 1}: {track.title.substring(0, 30)}...
            </button>
          ))}
        </div>

        {/* Player and Content Box */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 space-y-6 shadow-xl">
          <div className="flex justify-between items-center">
            <span className="text-xs text-teal-400 font-semibold bg-teal-500/10 px-3 py-1 rounded-full border border-teal-500/20">
              Müddət: {currentTrack.duration}
            </span>
            <span className="text-xs text-slate-400 font-medium">Spikerlər: {currentTrack.speaker}</span>
          </div>

          <h2 className="text-2xl font-extrabold text-white">{currentTrack.title}</h2>

          {/* Simulated Audio Player Bar */}
          <div className="bg-slate-950/60 border border-slate-800 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-4 w-full">
              <button className="w-12 h-12 rounded-full bg-teal-600 hover:bg-teal-500 text-white flex items-center justify-center font-bold text-lg shadow-lg shadow-teal-900/40">
                ▶
              </button>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-teal-400 w-1/3 h-full"></div>
              </div>
            </div>
            <button
              onClick={() => setShowTranscript(!showTranscript)}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-teal-300 font-bold text-xs rounded-xl border border-slate-700 whitespace-nowrap transition"
            >
              {showTranscript ? "Transkripti Gizlə" : "Transkriptə Bax 📄"}
            </button>
          </div>

          {/* Transcript Box */}
          {showTranscript && (
            <div className="bg-slate-950/80 border border-teal-500/30 p-6 rounded-2xl space-y-3">
              <h3 className="text-xs font-bold text-teal-400 uppercase tracking-wider">Audio Transkripti</h3>
              <p className="text-slate-300 text-sm whitespace-pre-line leading-relaxed font-mono">
                {currentTrack.transcript}
              </p>
            </div>
          )}

          {/* Listening Questions */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">Dinləmə Anlama Tapşırıqları</h3>
            {currentTrack.questions.map((q, qIdx) => (
              <div key={qIdx} className="bg-slate-950/50 p-5 rounded-2xl border border-slate-800 space-y-3">
                <p className="text-sm font-bold text-white">{qIdx + 1}. {q.q}</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  {q.options.map((opt, optIdx) => (
                    <button
                      key={optIdx}
                      className="px-4 py-2.5 bg-slate-900 hover:bg-teal-600 hover:text-white border border-slate-800 rounded-xl text-xs font-medium transition text-slate-300 text-left"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </main>
  );
}