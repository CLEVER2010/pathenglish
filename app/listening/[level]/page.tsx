import Link from "next/link";

interface ListeningTask {
  title: string;
  source: string;
  duration: string;
  embedId: string;
  transcript: string;
}

const listeningData: Record<string, ListeningTask[]> = {
  a1: [
    {
      title: "English with Alex: Basic Listening Practice",
      source: "English with Alex",
      duration: "3 min",
      embedId: "w_c4R3AInLg",
      transcript: "Hello! Welcome to basic English listening practice. Listen carefully to each sentence.",
    },
  ],
  a2: [
    {
      title: "BBC 6 Minute English: Daily Habits",
      source: "BBC Learning English",
      duration: "6 min",
      embedId: "w_c4R3AInLg",
      transcript: "Welcome to 6 Minute English. Today we discuss how small habits change your lifestyle.",
    },
  ],
  b1: [
    {
      title: "TED-Ed: How to learn any language in 6 months",
      source: "TED-Ed",
      duration: "5 min",
      embedId: "o_HAXan1vgE",
      transcript: "Language learning is about immersion, consistency, and active practice every single day.",
    },
  ],
  b1plus: [
    {
      title: "Academic Listening: IELTS Listening Strategies",
      source: "PathEnglish Academy",
      duration: "7 min",
      embedId: "o_HAXan1vgE",
      transcript: "Focus on keywords and predictions before the audio clip starts playing.",
    },
  ],
  b2: [
    {
      title: "TEDx: The Secret to Speaking Fast English",
      source: "TEDx Talks",
      duration: "8 min",
      embedId: "o_HAXan1vgE",
      transcript: "Connected speech and reduction patterns are key factors in native-level listening fluency.",
    },
  ],
  c1: [
    {
      title: "Advanced Lecture: Cognitive Science & Fluency",
      source: "Global Academic Talks",
      duration: "10 min",
      embedId: "o_HAXan1vgE",
      transcript: "Neuroplasticity allows adults to acquire native-like proficiency through targeted auditory training.",
    },
  ],
};

export default async function ListeningLevelPage({
  params,
}: {
  params: Promise<{ level: string }>;
}) {
  const resolvedParams = await params;
  const levelKey = resolvedParams.level.toLowerCase();
  const tasks = listeningData[levelKey] || listeningData["b1"];

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 md:p-12 font-sans">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-blue-400 text-sm hover:underline font-semibold">
          ← Ana Səhifəyə Qayıt
        </Link>

        <div className="my-6">
          <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider">
            Səviyyə: {resolvedParams.level.toUpperCase()}
          </span>
          <h1 className="text-3xl md:text-4xl font-black mt-3">🎧 Listening & Video Məşqləri</h1>
          <p className="text-gray-400 text-sm mt-1">
            BBC, TED-Ed və Alex-dən seçilmiş audio-videolar.
          </p>
        </div>

        <div className="space-y-8 mt-8">
          {tasks.map((task, idx) => (
            <div key={idx} className="rounded-3xl border border-white/10 bg-slate-900 p-6 md:p-8 space-y-6">
              <div className="aspect-video w-full rounded-2xl overflow-hidden border border-white/10">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${task.embedId}`}
                  title={task.title}
                  allowFullScreen
                />
              </div>

              <div className="flex justify-between items-center text-xs text-gray-400">
                <span className="font-semibold text-cyan-400">{task.source}</span>
                <span>⏱️ {task.duration}</span>
              </div>

              <h2 className="text-2xl font-bold">{task.title}</h2>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <h3 className="text-xs font-bold text-gray-400 uppercase mb-2">Transkript / Qısa Mətn:</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{task.transcript}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}