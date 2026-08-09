import Link from "next/link";

export default function Home() {
  const levels = [
    { name: "A1", desc: "Starter • Əsas baza sözlər, sadə dinləmələr və cümlələr." },
    { name: "A2", desc: "Elementary • Gündəlik dialoqlar, BBC Easy Listening və qısa mətnlər." },
    { name: "B1", desc: "Intermediate • Cathoven Reading, English with Alex və TED-Ed videoları." },
    { name: "B1+", desc: "Upper-Inter • IELTS-ə keçid, akademik reading və shadowing." },
    { name: "B2", desc: "Vantage • Dərin təhlillər, TEDx çıxışları və mürəkkəb artikllər." },
    { name: "C1", desc: "Advanced • Sərbəst akademik dinləmə, mürəkkəb dialoqlar (IELTS 7.0+)." },
  ];

  const corePlatforms = [
    { name: "Cathoven Reading", desc: "Mətnlərin səviyyəsini CEFR üzrə avtomatik analiz edən mütərəqqi alət.", tag: "Reading" },
    { name: "TED-Ed & TEDx", desc: "Vizual motivasiyalı, sub-titrli və lüğəti zənginləşdirən nitqlər.", tag: "Listening" },
    { name: "BBC Learning English", desc: "6-Minute English, sırf dinləmə və tələffüz vərdişləri üçün.", tag: "Listening" },
    { name: "English with Alex", desc: "Qrammatika və dinləmə texnikalarını sadə izah edən mütəxəssis dərsləri.", tag: "Video" },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white font-sans selection:bg-blue-500 selection:text-white">
      {/* Header */}
      <header className="border-b border-white/10 px-6 py-5 sticky top-0 bg-slate-950/80 backdrop-blur-md z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-black tracking-tight">
            PathEnglish<span className="text-blue-400">.az</span>
          </h1>

          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-300 font-medium">
            <a href="#system" className="hover:text-blue-400 transition">2 Aylıq Sistem</a>
            <a href="#levels" className="hover:text-blue-400 transition">Səviyyələr</a>
            <a href="#platforms" className="hover:text-blue-400 transition">Mənbələr</a>
          </nav>

          <a
            href="#levels"
            className="rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold px-5 py-2.5 transition shadow-lg shadow-blue-500/20"
          >
            Yola Başla
          </a>
        </div>
      </header>

      {/* Hero / Motivation Banner */}
      <section className="px-6 py-20 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold mb-6">
          ✨ Dil Öyrənmək Çətin Deyil, Yolu Bilmək Lazımdır
        </div>
        <h2 className="text-4xl md:text-6xl font-black leading-tight mb-6 tracking-tight">
          Sənə Lazım Olan Çox Çalışmaq Deyil,{" "}
          <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
            Düzgün Sistemdir.
          </span>
        </h2>
        <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-8 max-w-2xl mx-auto">
          İngilis dilində azmağa son! Dünyanın en güclü platformalarından (BBC, TED-Ed, Cathoven) toplanmış 60 günlük sistemli yol xəritəsi ilə addımla.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#levels"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 font-bold transition shadow-lg shadow-blue-600/30"
          >
            Səviyyəni Seç və Başla →
          </a>
        </div>
      </section>

      {/* Levels Grid (Core Delivarable) */}
      <section id="levels" className="px-6 py-12 max-w-6xl mx-auto">
        <div className="mb-10 text-center md:text-left">
          <h3 className="text-3xl font-bold tracking-tight mb-2">Səviyyənə Uyğun Dərslər</h3>
          <p className="text-gray-400">Hər bir səviyyədə uyğunlaşdırılmış **Reading** və **Listening** materialları səni gözləyir.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {levels.map((lvl) => {
            const slug = lvl.name.toLowerCase().replace("+", "plus");
            return (
              <div
                key={lvl.name}
                className="group rounded-3xl border border-white/10 bg-white/5 p-6 hover:border-blue-500/50 hover:bg-white/[0.07] transition duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="text-4xl font-black text-blue-400 mb-2">{lvl.name}</div>
                  <p className="text-gray-300 text-sm leading-relaxed mb-6">{lvl.desc}</p>
                </div>

                <div className="space-y-3 border-t border-white/10 pt-4">
                  <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Modullar:</div>
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href={`/reading/${slug}`}
                      className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-500/20 transition"
                    >
                      📖 Reading
                    </Link>
                    <Link
                      href={`/listening/${slug}`}
                      className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 text-xs font-bold border border-cyan-500/20 transition"
                    >
                      🎧 Listening
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Integrated External Platforms */}
      <section id="platforms" className="px-6 py-16 bg-white/[0.02] border-y border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <span className="text-blue-400 text-sm font-bold uppercase tracking-wider">İnteqrasiya Olunmuş Resurslar</span>
            <h3 className="text-3xl font-bold tracking-tight mt-1">Dünya Səviyyəli Mənbələrdən Materiallar</h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {corePlatforms.map((p) => (
              <div key={p.name} className="rounded-2xl border border-white/10 bg-slate-900/50 p-6 flex flex-col justify-between">
                <div>
                  <span className="inline-block px-2.5 py-1 rounded-md bg-white/10 text-xs font-medium text-gray-300 mb-3">{p.tag}</span>
                  <h4 className="text-lg font-bold mb-2">{p.name}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 60-Day Roadmap Section */}
      <section id="system" className="px-6 py-20 max-w-6xl mx-auto">
        <div className="bg-gradient-to-br from-blue-900/30 via-slate-900 to-slate-950 rounded-3xl border border-blue-500/30 p-8 md:p-12">
          <div className="max-w-3xl">
            <span className="text-blue-400 text-sm font-bold uppercase tracking-wider">2 Aylıq (60 Gün) İnkişaf Planı</span>
            <h3 className="text-3xl md:text-4xl font-black mt-2 mb-6">İngilis Dilində Nəticə Almaq Üçün Xüsusi Metodologiya</h3>
            <div className="space-y-4 text-gray-300">
              <div className="flex gap-4 items-start">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">1</span>
                <div>
                  <h4 className="font-bold text-white">Hər gün 1 Günlük Material (30-40 dəqiqə)</h4>
                  <p className="text-sm text-gray-400">1 Reading artiklı (Cathoven analizli) + 1 Listening (BBC və ya TED-Ed) dinləməsi.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">2</span>
                <div>
                  <h4 className="font-bold text-white">Shadowing & Təkrarlama</h4>
                  <p className="text-sm text-gray-400">Dinlədiyin audionu cümlə-cümlə təkrar edərək tələffüzünü və nitqini inkişaf etdir.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-white/10 text-center text-gray-500 text-sm">
        © 2026 PathEnglish.az — Azərbaycanlı tələbələr üçün sistemli dil platforması.
      </footer>
    </main>
  );
}