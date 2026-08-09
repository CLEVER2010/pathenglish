export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl p-10 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          PathEnglish.az
        </h1>

        <p className="text-gray-600 text-lg mb-8">
          İngilis dilini necə öyrənəcəyini göstərən platforma
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
          {["A1", "A2", "B1", "B1+", "B2", "C1"].map((level) => (
            <button
              key={level}
              className="py-3 rounded-xl border border-gray-300 hover:bg-blue-50 hover:border-blue-400 transition"
            >
              {level}
            </button>
          ))}
        </div>

        <div className="space-y-3 mb-8">
          <button className="w-full py-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition">
            IELTS
          </button>

          <button className="w-full py-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition">
            SAT
          </button>

          <button className="w-full py-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition">
            General English
          </button>
        </div>

        <button className="w-full py-4 rounded-2xl bg-blue-600 text-white text-lg font-semibold hover:bg-blue-700 transition">
          Start Learning
        </button>
      </div>
    </main>
  );
}