import Link from "next/link";

export default function Home() {
  const levels = ["A1", "A2", "B1", "B2", "C1", "C2"];

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 md:p-12 font-sans flex flex-col justify-center items-center">
      <div className="max-w-4xl w-full mx-auto space-y-12 text-center">
        <div className="space-y-4">
          <span className="px-4 py-1.5 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest border border-blue-500/30">
            PathEnglish.az • İnteraktiv Təhsil Platforması
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight bg-gradient-to-r from-white via-gray-200 to-blue-400 bg-clip-text text-transparent">
            İngilis Dilini 60 Günə Mənimsəyin
          </h1>
          <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
            Reading, Listening, Collocations və Yekun İmtahan modulları ilə səviyyənizi addım-addım irəli aparın.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {/* Reading Bölməsi */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-white/10 space-y-4 shadow-xl">
            <div className="text-2xl">📖</div>
            <h2 className="text-xl font-bold">Reading (Oxuma)</h2>
            <p className="text-xs text-gray-400 leading-relaxed">
              60 günlük təqvim, sözlər və interaktiv testlər.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {levels.map((lvl) => (
                <Link
                  key={lvl}
                  href={`/reading/${lvl.toLowerCase()}`}
                  className="px-3 py-1.5 rounded-xl bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white text-xs font-bold transition border border-blue-500/30"
                >
                  {lvl}
                </Link>
              ))}
            </div>
          </div>

          {/* Listening Bölməsi */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-white/10 space-y-4 shadow-xl">
            <div className="text-2xl">🎧</div>
            <h2 className="text-xl font-bold">Listening (Dinləmə)</h2>
            <p className="text-xs text-gray-400 leading-relaxed">
              Audio materiallar və dinləyib-anlama tapşırıqları.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {levels.map((lvl) => (
                <Link
                  key={lvl}
                  href={`/listening/${lvl.toLowerCase()}`}
                  className="px-3 py-1.5 rounded-xl bg-purple-600/20 hover:bg-purple-600 text-purple-300 hover:text-white text-xs font-bold transition border border-purple-500/30"
                >
                  {lvl}
                </Link>
              ))}
            </div>
          </div>

          {/* Exam Bölməsi */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-white/10 space-y-4 shadow-xl">
            <div className="text-2xl">🎓</div>
            <h2 className="text-xl font-bold">Yekun İmtahan</h2>
            <p className="text-xs text-gray-400 leading-relaxed">
              60 günü bitirdikdən sonra imtahan verin və sertifikat alın.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {levels.map((lvl) => (
                <Link
                  key={lvl}
                  href={`/exam/${lvl.toLowerCase()}`}
                  className="px-3 py-1.5 rounded-xl bg-green-600/20 hover:bg-green-600 text-green-300 hover:text-white text-xs font-bold transition border border-green-500/30"
                >
                  {lvl}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}