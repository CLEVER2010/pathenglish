import Link from "next/link";

export default function Home() {
  const levels = ["A1", "A2", "B1", "B2", "C1", "C2"];

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 md:p-16 font-sans flex flex-col justify-center items-center">
      <div className="max-w-7xl w-full mx-auto space-y-16 text-center">
        
        {/* Başlıq və Seçdiyimiz Motivasiya Bloku */}
        <div className="space-y-6 max-w-4xl mx-auto">
          <span className="px-5 py-2 rounded-full bg-blue-500/20 text-blue-400 text-xs font-extrabold uppercase tracking-widest border border-blue-500/30 shadow-lg shadow-blue-500/10">
            PathEnglish.az • İnteraktiv Təhsil Platforması
          </span>
          <h1 className="text-4xl md:text-7xl font-black tracking-tight bg-gradient-to-r from-white via-gray-200 to-blue-400 bg-clip-text text-transparent">
            İngilis Dilini 60 Günə Mənimsəyin
          </h1>
          <p className="text-gray-300 text-base md:text-xl leading-relaxed">
            Dil öyrənə bilməməyin səbəbi istedadsızlıq deyil – <span className="text-blue-400 font-bold">istiqamətsizlikdir</span>. 
            Yanlış üsullarla vaxt itirməyi dayandır; səni A1-dən C2-yə aparacaq tək doğru sistem buradadır.
          </p>
        </div>

        {/* Modullar Grid Sistemi */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          
          {/* Reading Modulu */}
          <div className="p-8 rounded-3xl bg-slate-900 border border-white/10 space-y-6 shadow-2xl hover:border-blue-500/50 transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-2xl border border-blue-500/20">📖</div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Reading (Oxuma)</h2>
              <p className="text-sm text-gray-400 leading-relaxed">
                60 günlük sistemli təqvim, seçilmiş mətnlər, çətin sözlər, collocations və 10 suallıq testlər.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              {levels.map((lvl) => (
                <Link
                  key={lvl}
                  href={`/reading/${lvl.toLowerCase()}`}
                  className="px-4 py-2 rounded-xl bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white text-xs font-bold transition border border-blue-500/30"
                >
                  {lvl}
                </Link>
              ))}
            </div>
          </div>

          {/* Listening Modulu */}
          <div className="p-8 rounded-3xl bg-slate-900 border border-white/10 space-y-6 shadow-2xl hover:border-purple-500/50 transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-2xl border border-purple-500/20">🎧</div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Listening (Dinləmə)</h2>
              <p className="text-sm text-gray-400 leading-relaxed">
                Hər günə uyğun fərqli mövzular (Education, Technology və s.), real audio materiallar və 10 suallıq testlər.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              {levels.map((lvl) => (
                <Link
                  key={lvl}
                  href={`/listening/${lvl.toLowerCase()}`}
                  className="px-4 py-2 rounded-xl bg-purple-600/20 hover:bg-purple-600 text-purple-300 hover:text-white text-xs font-bold transition border border-purple-500/30"
                >
                  {lvl}
                </Link>
              ))}
            </div>
          </div>

          {/* Yekun İmtahan Modulu */}
          <div className="p-8 rounded-3xl bg-slate-900 border border-white/10 space-y-6 shadow-2xl hover:border-green-500/50 transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center text-2xl border border-green-500/20">🎓</div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Yekun İmtahan</h2>
              <p className="text-sm text-gray-400 leading-relaxed">
                60 günü tam bitirdikdən sonra kilidi açılan və səviyyəni rəsmi olaraq təsdiqləyən imtahan.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              {levels.map((lvl) => (
                <Link
                  key={lvl}
                  href={`/exam/${lvl.toLowerCase()}`}
                  className="px-4 py-2 rounded-xl bg-green-600/20 hover:bg-green-600 text-green-300 hover:text-white text-xs font-bold transition border border-green-500/30"
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