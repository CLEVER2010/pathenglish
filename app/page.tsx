import Link from "next/link";

export default function Home() {
  const levels = ["A1", "A2", "B1", "B2", "C1", "C2"];

  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 md:p-16">
      <div className="max-w-6xl w-full mx-auto space-y-16 text-center">
        
        <div className="space-y-4">
          <span className="px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold border border-blue-500/20 uppercase tracking-widest">
            PATHENGLISH.AZ • İNTERAKTİV TƏHSİL PLATFORMASI
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400 leading-tight">
            İngilis Dilini 60 Günə Mənimsəyin
          </h1>
          <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
            Dil öyrənə bilməməyin səbəbi istedadsızlıq deyil – <strong className="text-white">istiqamətsizlikdir</strong>. 
            Səni A1-dən C2-yə aparacaq tək doğru sistem buradadır.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          
          <div className="p-8 rounded-3xl bg-slate-900 border border-white/10 space-y-6 shadow-2xl flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-600/20 text-blue-400 flex items-center justify-center text-xl border border-blue-500/30">
                📖
              </div>
              <h2 className="text-2xl font-black text-white">Reading (Oxuma)</h2>
              <p className="text-xs text-gray-400 leading-relaxed">
                60 günlük sistemli təqvim, seçilmiş mətnlər, çətin sözlər və 10 suallıq testlər.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-2 pt-4">
              {levels.map((lvl) => (
                <Link
                  key={lvl}
                  href={`/reading/${lvl.toLowerCase()}`}
                  className="py-2.5 rounded-xl bg-white/5 border border-white/10 text-center text-xs font-bold text-gray-300 hover:bg-blue-600 hover:border-blue-400 hover:text-white transition shadow-md"
                >
                  {lvl}
                </Link>
              ))}
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-slate-900 border border-white/10 space-y-6 shadow-2xl flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-600/20 text-purple-400 flex items-center justify-center text-xl border border-purple-500/30">
                🎧
              </div>
              <h2 className="text-2xl font-black text-white">Listening (Dinləmə)</h2>
              <p className="text-xs text-gray-400 leading-relaxed">
                Hər günə uyğun fərqli mövzular, audio skriptlər və 10 suallıq dinləmə testləri.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-2 pt-4">
              {levels.map((lvl) => (
                <Link
                  key={lvl}
                  href={`/listening/${lvl.toLowerCase()}`}
                  className="py-2.5 rounded-xl bg-white/5 border border-white/10 text-center text-xs font-bold text-gray-300 hover:bg-purple-600 hover:border-purple-400 hover:text-white transition shadow-md"
                >
                  {lvl}
                </Link>
              ))}
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-slate-900 border border-white/10 space-y-6 shadow-2xl flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-green-600/20 text-green-400 flex items-center justify-center text-xl border border-green-500/30">
                🎓
              </div>
              <h2 className="text-2xl font-black text-white">Yekun İmtahan</h2>
              <p className="text-xs text-gray-400 leading-relaxed">
                60 günü tamamladıqdan sonra səviyyəni rəsmi olaraq təsdiqləyən imtahan.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-2 pt-4">
              {levels.map((lvl) => (
                <Link
                  key={lvl}
                  href={`/exam/${lvl.toLowerCase()}`}
                  className="py-2.5 rounded-xl bg-white/5 border border-white/10 text-center text-xs font-bold text-gray-300 hover:bg-green-600 hover:border-green-400 hover:text-white transition shadow-md"
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