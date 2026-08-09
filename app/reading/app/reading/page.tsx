
export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <h1 className="text-2xl font-bold">
            PathEnglish<span className="text-blue-400">.az</span>
          </h1>

          <div className="hidden gap-6 text-sm text-gray-300 md:flex">
            <a href="#levels">Levels</a>
            <a href="#features">Features</a>
            <a href="#roadmap">Roadmap</a>
          </div>

          <button className="rounded-lg bg-white/10 px-4 py-2">
            Login
          </button>
        </div>
      </header>

      <section className="px-6 py-24 text-center">
        <div className="mx-auto max-w-4xl">
          <p className="mb-6 inline-block rounded-full bg-blue-500/10 px-4 py-2 text-sm text-blue-300">
            Azərbaycanda yeni nəsil English platforması
          </p>

          <h2 className="text-5xl font-black md:text-7xl">
            English learning
            <br />
            <span className="text-blue-400">
              with a clear roadmap
            </span>
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-gray-400">
            Reading, Listening, Shadowing, Vocabulary, IELTS və SAT.
            Sadəcə material yox, addım-addım inkişaf sistemi.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="#levels"
              className="rounded-xl bg-blue-500 px-7 py-4 font-semibold hover:bg-blue-400"
            >
              Start Learning
            </a>

            <a
              href="#features"
              className="rounded-xl border border-white/10 bg-white/5 px-7 py-4 font-semibold hover:bg-white/10"
            >
              Explore Features
            </a>
          </div>
        </div>
      </section>

      <section id="levels" className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-blue-400">Levels</p>

          <h2 className="mt-2 text-4xl font-bold">
            A2 → C1 Learning Paths
          </h2>

          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-5">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-3xl font-bold">A2</h3>
              <p className="mt-2 text-gray-400">Foundation</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-3xl font-bold">B1</h3>
              <p className="mt-2 text-gray-400">Build Fluency</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-3xl font-bold">B1+</h3>
              <p className="mt-2 text-gray-400">IELTS Start</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-3xl font-bold">B2</h3>
              <p className="mt-2 text-gray-400">Academic</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-3xl font-bold">C1</h3>
              <p className="mt-2 text-gray-400">Advanced</p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="features"
        className="border-y border-white/10 bg-white/[0.03] px-6 py-20"
      >
        <div className="mx-auto max-w-6xl">
          <p className="text-blue-400">Features</p>

          <h2 className="mt-2 text-4xl font-bold">
            Designed for real progress
          </h2>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-xl font-bold">Deep Reading</h3>
              <p className="mt-3 text-gray-400">
                Main idea, inference, paraphrasing və akademik strategiyalar.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-xl font-bold">Shadowing</h3>
              <p className="mt-3 text-gray-400">
                Dinlə, təkrar et və tələffüzünü inkişaf etdir.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-xl font-bold">Roadmaps</h3>
              <p className="mt-3 text-gray-400">
                IELTS və SAT üçün addım-addım inkişaf planları.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-xl font-bold">Vocabulary</h3>
              <p className="mt-3 text-gray-400">
                Academic vocabulary və collocations sistemi.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="roadmap" className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-blue-400">Roadmap</p>

          <h2 className="mt-2 text-4xl font-bold">
            60-Day IELTS System
          </h2>

          <div className="mt-10 space-y-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <strong>Week 1–2</strong>
              <p className="mt-2 text-gray-400">
                Foundation and learning habits
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <strong>Week 3–4</strong>
              <p className="mt-2 text-gray-400">
                Academic Reading and Vocabulary
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <strong>Week 5–6</strong>
              <p className="mt-2 text-gray-400">
                Listening and Shadowing
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <strong>Week 7–8</strong>
              <p className="mt-2 text-gray-400">
                Mock exams and review
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-white/5 p-10 text-center">
          <p className="text-blue-400">PathEnglish.az</p>

          <h2 className="mt-4 text-4xl font-black md:text-5xl">
            You need a better system.
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-gray-400">
            Hər gün düzgün ardıcıllıq, davamlı praktika və real inkişaf.
          </p>

          <a
            href="#levels"
            className="mt-8 inline-block rounded-xl bg-blue-500 px-7 py-4 font-semibold hover:bg-blue-400"
          >
            Begin Your Journey
          </a>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-8 text-center text-sm text-gray-500">
        © 2026 PathEnglish.az — Built for Azerbaijani learners.
      </footer>
    </main>
  );
}
