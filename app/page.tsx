"use client";
import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#0b0f19] text-slate-100 font-sans selection:bg-emerald-500/30">
      
      {/* Top Professional Header */}
      <nav className="border-b border-slate-800 bg-[#0b0f19]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Link href="/" className="text-xl font-black tracking-wider text-white">ELITE<span className="text-emerald-500">ACADEMY</span></Link>
            <span className="hidden md:inline-block px-2.5 py-1 rounded bg-slate-800 text-slate-300 text-[10px] font-semibold uppercase">CEFR Standard</span>
          </div>
          
          <div className="flex items-center space-x-6 text-sm font-medium text-slate-300">
            <Link href="/reading/b1" className="hover:text-emerald-400 transition">Kurslar</Link>
            <Link href="/exam" className="hover:text-emerald-400 transition">İmtahanlar</Link>
            <Link href="/exam" className="hover:text-emerald-400 transition">Səviyyə Təyini</Link>
            <Link 
              href="/exam" 
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl transition font-bold shadow-lg shadow-emerald-900/25"
            >
              Daxil Ol / Qeydiyyat
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-6 pt-16 pb-12 text-center space-y-6">
        <div className="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold">2026 Akademik Proqramı Aktivdir</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
          Beynəlxalq Standartlarla <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
            İngilis Dilini Mənimsəyin
          </span>
        </h1>
        
        <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          Dil öyrənə bilməməyin səbəbi istedadsızlıq deyil – yanlış istiqamətdir. A1 səviyyəsindən C2 səviyyəsinə qədər sistemli kurikulum.
        </p>

        {/* Working Action Buttons ("Məcburi" sözü silindi) */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link 
            href="/exam" 
            className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm transition shadow-xl shadow-emerald-900/30 flex items-center space-x-2"
          >
            <span>Səviyyə İmtahanı</span>
            <span>→</span>
          </Link>
          <Link 
            href="/reading/b1" 
            className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl font-bold text-sm transition"
          >
            Proqramı İncelə və Başla
          </Link>
        </div>
      </section>

      {/* Level Navigation Cards */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-8 border-b border-slate-800 pb-4">
          <h3 className="text-lg font-bold text-white">Səviyyələr Üzrə Tədris Modulları</h3>
          <span className="text-xs text-slate-400">CEFR Çərçivəsi (A1 - C2)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Reading Card */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 hover:border-emerald-500/50 transition group">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold mb-4 text-lg">📚</div>
            <h4 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-400 transition">Reading (Oxuma)</h4>
            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
              Zəngin akademik mətnlər, hekayələr və səviyyələrə uyğun testlər.
            </p>
            <div className="grid grid-cols-3 gap-2">
              {['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map((lvl) => (
                <Link
                  key={lvl}
                  href={`/reading/${lvl.toLowerCase()}`}
                  className="py-2 text-center text-xs font-bold bg-slate-800 hover:bg-emerald-600 hover:text-white rounded-lg transition text-slate-300 border border-slate-700/50"
                >
                  {lvl}
                </Link>
              ))}
            </div>
          </div>

          {/* Listening Card */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 hover:border-emerald-500/50 transition group">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center font-bold mb-4 text-lg">🎧</div>
            <h4 className="text-lg font-bold text-white mb-2 group-hover:text-teal-400 transition">Listening (Dinləmə)</h4>
            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
              Real audio materiallar, transkripsiya və dinləmə tapşırıqları.
            </p>
            <div className="grid grid-cols-3 gap-2">
              {['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map((lvl) => (
                <Link
                  key={lvl}
                  href={`/reading/${lvl.toLowerCase()}`}
                  className="py-2 text-center text-xs font-bold bg-slate-800 hover:bg-teal-600 hover:text-white rounded-lg transition text-slate-300 border border-slate-700/50"
                >
                  {lvl}
                </Link>
              ))}
            </div>
          </div>

          {/* Exam Card */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 hover:border-emerald-500/50 transition group flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold mb-4 text-lg">🎓</div>
              <h4 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition">Yekun İmtahan Mərkəzi</h4>
              <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                Səviyyə yoxlaması, qlobal reytinq cədvəli və liderlər lövhəsi.
              </p>
            </div>
            <Link
              href="/exam"
              className="w-full py-3 text-center text-xs font-bold bg-gradient-to-r from-emerald-600 to-teal-600 hover:opacity-90 text-white rounded-xl transition shadow-md"
            >
              İmtahana Keçid Et 🚀
            </Link>
          </div>

        </div>
      </section>

      <footer className="border-t border-slate-800 py-8 text-center text-xs text-slate-500">
        <p>© 2026 Elite Language Academy. Bütün hüquqlar qorunur.</p>
      </footer>
    </main>
  );
}