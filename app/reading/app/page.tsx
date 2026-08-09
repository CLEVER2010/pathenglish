import Link from "next/link";

const levels = [
  { name: "A2", desc: "Foundation" },
  { name: "B1", desc: "Build Fluency" },
  { name: "B1+", desc: "IELTS Start" },
  { name: "B2", desc: "Academic" },
  { name: "C1", desc: "Advanced" },
];

const features = [
  {
    title: "Deep Reading",
    desc: "Main idea, inference, paraphrasing və akademik strategiyalar.",
  },
  {
    title: "Shadowing",
    desc: "Dinlə, təkrar et və tələffüzünü inkişaf etdir.",
  },
  {
    title: "Roadmaps",
    desc: "60 günlük IELTS və SAT inkişaf planları.",
  },
  {
    title: "Certificates",
    desc: "Mock exam + nəticə + yüklənə bilən sertifikat.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0B1020] text-white overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,#2563eb33,transparent_35%),radial-gradient(circle_at_bottom_right,#7c3aed33,transparent_35%)]" />

      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0B1020]/70 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-bold text-xl tracking-tight">
            PathEnglish<span className="text-blue-400">.az</span>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm text-white/80">
            <a href="#levels" className="hover:text-white transition">Levels</a>
            <a href="#features" className="hover:text-white transition">Features</a>
            <a href="#roadmap" className="hover:text-white transition">Roadmap</a>
            <a href="#motivation" className="hover:text-white transition">Motivation</a>
          </nav>

          <button className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition text-sm">
            Login
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative px-6 pt-24 pb-20">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur mb-6 text-sm text-white/80">
            <span className="w-2 h-2 rounded-full bg-green-400" />
            Azərbaycanda yeni nəsil English platforması
          </div>

          <h1 className="text-5xl md:text-7xl font-black leading-[0.95] tracking-tight mb-6">
            English learning
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-violet-400 bg-clip-text text-transparent">
              with a clear roadmap
            </span>
          </h1>

          <p className="max-w-3xl mx-auto text-lg md:text-xl text-white/70 leading-8 mb-10">
            Reading, Listening, Shadowing, Vocabulary, IELTS, SAT və 60 günlük
            inkişaf planları. Sadəcə material yox, addım-addım sistem.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/reading"
              className="px-7 py-4 rounded-2xl bg-blue-500 hover:bg-blue-400 transition font-semibold shadow-[0_10px_40px_rgba(37,99,235,0.45)]"
            >
              Start Reading
            </Link>

            <Link
              href="/listening"
              className="px-7 py-4 rounded-2xl border border-white/15 bg-white/5 hover:bg-white/10 transition font-semibold"
            >
              Open Listening
            </Link>

            <Link
              href="/shadowing"
              className="px-7 py-4 rounded-2xl border border-white/15 bg-white/5 hover:bg-white/10 transition font-semibold"
            >
              Shadowing
            </Link>
          </div>

          {/* Glass Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              ["A2–C1", "Levels"],
              ["60 Days", "Roadmap"],
              ["200+", "Articles"],
              ["Mock Exam", "Certificate"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6"
              >
                <div className="text-2xl font-black">{value}</div>
                <div className="text-white/60 text-sm mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Levels */}
      <section id="levels" className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="text-blue-400 font-semibold mb-2">Levels</div>
              <h2 className="text-3xl md:text-4xl font-bold">
                A2 → C1 Learning Paths
              </h2>
            </div>

            <p className="hidden md:block text-white/60 max-w-sm text-right">
              Hər səviyyə üçün fərqli reading, listening və vocabulary sistemi.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {levels.map((level) => (
              <Link
                key={level.name}
                href={`/reading/${level.name.toLowerCase().replace("+", "plus")}`}
                className="group rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div className="text-3xl font-black mb-2">{level.name}</div>
                <div className="text-white/60 text-sm">{level.desc}</div>
                <div className="mt-4 text-blue-300 opacity-0 group-hover:opacity-100 transition">
                  Open level →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-6 py-20 bg-white/[0.03] border-y border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <div className="text-blue-400 font-semibold mb-2">Features</div>
            <h2 className="text-3xl md:text-4xl font-bold">
              Designed for real progress
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition"
              >
                <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                <p className="text-white/70 leading-7">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section id="roadmap" className="px-6 py-20">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-start">
          <div>
            <div className="text-blue-400 font-semibold mb-2">Roadmap</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              60-day IELTS plan
            </h2>

            <p className="text-white/70 leading-8 mb-8">
              B1+ səviyyəsindən başlayaraq Reading, Listening, Shadowing və
              Vocabulary sistemini addım-addım qur.
            </p>

            <div className="space-y-4">
              {[
                "Week 1–2 • Foundation & habits",
                "Week 3–4 • Academic reading",
                "Week 5–6 • Listening & shadowing",
                "Week 7–8 • Mock exams & review",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-300 font-bold">
                    ✓
                  </div>
                  <div>{item}</div>
                </div>
              ))}
            </div>

            <button className="mt-8 px-6 py-3 rounded-2xl bg-blue-500 hover:bg-blue-400 transition font-semibold">
              Open Full Roadmap
            </button>
          </div>

          <div className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="text-white/60 text-sm">Current Streak</div>
                <div className="text-3xl font-black">12 days</div>
              </div>

              <div className="px-3 py-2 rounded-xl bg-green-500/15 text-green-300 text-sm font-semibold">
                Active
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <div className="flex justify-between text-sm mb-2 text-white/70">
                  <span>Reading</span>
                  <span>72%</span>
                </div>
                <div className="h-3 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full w-[72%] bg-blue-400 rounded-full" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2 text-white/70">
                  <span>Listening</span>
                  <span>55%</span>
                </div>
                <div className="h-3 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full w-[55%] bg-cyan-400 rounded-full" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2 text-white/70">
                  <span>Vocabulary</span>
                  <span>84%</span>
                </div>
                <div className="h-3 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full w-[84%] bg-violet-400 rounded-full" />
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-white/10 bg-black/20 p-5">
              <div className="text-sm text-white/60 mb-2">Next lesson</div>
              <div className="font-bold text-lg mb-1">
                B2 Reading: Memory & Learning
              </div>
              <div className="text-white/60 text-sm mb-4">7 min • 18 new words</div>

              <Link
                href="/reading/b2"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 transition"
              >
                Continue →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Motivation */}
      <section id="motivation" className="px-6 py-24">
        <div className="max-w-4xl mx-auto text-center rounded-[36px] border border-white/10 bg-white/5 backdrop-blur-2xl p-10 md:p-14">
          <div className="text-blue-400 font-semibold mb-3">Motivation</div>

          <h2 className="text-3xl md:text-5xl font-black leading-tight mb-6">
            “You do not need to study harder.
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              You need a better system.
            </span>
            ”
          </h2>

          <p className="text-white/70 text-lg leading-8 mb-8">
            Hər gün 2 saat, düzgün ardıcıllıq və davamlı təkrar. Kiçik addımlar
            böyük nəticələr yaradır.
          </p>

          <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-400 hover:opacity-90 transition font-bold text-lg shadow-[0_12px_40px_rgba(34,211,238,0.35)]">
            Begin Your 60-Day Journey
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-10 border-t border-white/10 text-white/50 text-sm">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>© 2026 PathEnglish.az — Built for Azerbaijani learners.</div>

          <div className="flex items-center gap-4">
            <span>Reading</span>
            <span>Listening</span>
            <span>Shadowing</span>
            <span>Roadmaps</span>
          </div>
        </div>
      </footer>
    </main>
  );
}