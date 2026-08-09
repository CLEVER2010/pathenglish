import Link from "next/link";

export default function Home() {
  const levels = [
    { name: "A1", desc: "Beginner • Basic vocabulary" },
    { name: "A2", desc: "Elementary • Simple sentences" },
    { name: "B1", desc: "Intermediate • Everyday topics" },
    { name: "B1+", desc: "Upper-Inter • Academic base" },
    { name: "B2", desc: "Vantage • Complex articles" },
    { name: "C1", desc: "Advanced • Fluency & IELTS 7+" },
  ];

  const features = [
    { title: "Graded Reading", desc: "Articles tailored to your exact level." },
    { title: "Listening", desc: "Native audio with interactive scripts." },
    { title: "Shadowing", desc: "Improve pronunciation & speaking." },
    { title: "Vocabulary", desc: "Spaced repetition flashcards." },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white font-sans">
      {/* Header */}
      <header className="border-b border-white/10 px-6 py-5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">
            PathEnglish<span className="text-blue-400">.az</span>
          </h1>

          <div className="hidden md:flex items-center gap-6 text-sm text-gray-300 font-medium">
            <a href="#levels" className="hover:text-white transition">Levels</a>
            <a href="#features" className="hover:text-white transition">Features</a>
            <a href="#roadmap" className="hover:text-white transition">Roadmap</a>
          </div>

          <button className="rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold px-5 py-2.5 transition">
            Start Learning
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="px-6 py-20 text-center max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
          Master English with a{" "}
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Structured Path
          </span>
        </h2>
        <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-8">
          Azərbaycanlı öyrənənlər üçün xüsusi hazırlanmış sistemli dil platforması.
        </p>
      </section>

      {/* Levels */}
      <section id="levels" className="px-6 py-12 max-w-6xl mx-auto">
        <h3 className="text-2xl font-bold mb-8">Select Your Level</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {levels.map((level) => (
            <Link
              key={level.name}
              href={`/reading/${level.name.toLowerCase().replace("+", "plus")}`}
              className="group rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-blue-500/50 hover:bg-white/10 transition duration-300"
            >
              <div className="text-3xl font-black mb-2">{level.name}</div>
              <div className="text-gray-400 text-sm">{level.desc}</div>
              <div className="mt-4 text-blue-400 font-medium text-sm group-hover:translate-x-1 transition-transform">
                Explore level →
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-6 py-16 bg-white/[0.02] border-y border-white/10">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold mb-8">Features Designed for You</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div key={f.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h4 className="text-lg font-bold mb-2">{f.title}</h4>
                <p className="text-gray-400 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-white/10 text-center text-gray-500 text-sm">
        © 2026 PathEnglish.az — Built for Azerbaijani learners.
      </footer>
    </main>
  );
}