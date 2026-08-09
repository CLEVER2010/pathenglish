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
      title: "English Practice: Daily Conversations for Beginners",
      source: "Basic English Listening",
      duration: "4 min",
      embedId: "juKd26qkNAw",
      transcript: "Listen to everyday greetings, introductions, and simple questions spoken clearly.",
    },
  ],
  a2: [
    {
      title: "BBC 6 Minute English: Improving Memory Habits",
      source: "BBC Learning English",
      duration: "6 min",
      embedId: "L9A00juA2G0",
      transcript: "Discover practical tips from BBC hosts on how small lifestyle changes boost brain performance.",
    },
  ],
  b1: [
    {
      title: "TED-Ed: How the brain learns languages",
      source: "TED-Ed",
      duration: "5 min",
      embedId: "3yX9Jm8JmEE",
      transcript: "An animated overview of neural pathways involved in acquiring second languages.",
    },
  ],
  b1plus: [
    {
      title: "TED-Ed: How to read faster and retain more",
      source: "TED-Ed Academic",
      duration: "6 min",
      embedId: "12345678900", // placeholder safe embed
      transcript: "Explore speed-reading techniques and cognitive strategies to comprehend dense texts under exam pressure.",
    },
  ],
  b2: [
    {
      title: "TEDx: The Secret to Language Fluency",
      source: "TEDx Talks",
      duration: "10 min",
      embedId: "iG9CE55wbtY",
      transcript: "Insights into overcoming language learning plateaus through active immersion and shadowing.",
    },
  ],
  c1: [
    {
      title: "TED-Ed: The science of decision making",
      source: "TED-Ed Advanced",
      duration: "8 min",
      embedId: "dItUGF8GdTw",
      transcript: "An examination of cognitive biases and logical frameworks in high-stakes reasoning.",
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
  const tasks = listeningData[levelKey] || listeningData["b1plus"];

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
            BBC və TED-Ed videoları ilə dinləmə bacarıqlarını inkişaf etdir.
          </p>
        </div>

        <div className="space-y-8 mt-8">
          {tasks.map((task, idx) => (
            <div key={idx} className="rounded-3xl border border-white/10 bg-slate-900 p-6 md:p-8 space-y-6">
              <div className="aspect-video w-full rounded-2xl overflow-hidden border border-white/10">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube-nocookie.com/embed/${task.embedId}`}
                  title={task.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              <div className="flex justify-between items-center text-xs text-gray-400">
                <span className="font-semibold text-cyan-400">{task.source}</span>
                <span>⏱️ {task.duration}</span>
              </div>

              <h2 className="text-2xl font-bold">{task.title}</h2>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <h3 className="text-xs font-bold text-gray-400 uppercase mb-2">Transkript / Qısa İzah:</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{task.transcript}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}