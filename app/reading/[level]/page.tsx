import Link from "next/link";

interface Article {
  title: string;
  source: string;
  readTime: string;
  content: string;
  vocabulary: { word: string; meaning: string }[];
}

const articlesData: Record<string, Article[]> = {
  a1: [
    {
      title: "My Daily Routine",
      source: "Basic English Path",
      readTime: "3 min",
      content: "I wake up at 7 AM every morning. I drink a cup of warm water and eat breakfast with my family. Learning English every day for 20 minutes builds a strong habit.",
      vocabulary: [
        { word: "Routine", meaning: "Gündəlik rejim / vərdiş" },
        { word: "Habit", meaning: "Vərdiş" },
      ],
    },
  ],
  a2: [
    {
      title: "BBC Easy: The Power of Healthy Food",
      source: "BBC Learning English",
      readTime: "4 min",
      content: "Eating fruits and vegetables gives your body energy. Studies show that a balanced diet improves focus and memory during study sessions.",
      vocabulary: [
        { word: "Balanced", meaning: "Balanslaşdırılmış" },
        { word: "Improve", meaning: "İnkişaf etdirmək / yaxşılaşdırmaq" },
      ],
    },
  ],
  b1: [
    {
      title: "Cathoven Analysis: How Languages Shape the Brain",
      source: "Cathoven Reading",
      readTime: "5 min",
      content: "Bilingual individuals often demonstrate higher cognitive flexibility. Learning a new language restructures neural networks, enhancing problem-solving skills.",
      vocabulary: [
        { word: "Cognitive", meaning: "İdrak / zehni" },
        { word: "Flexibility", meaning: "Çeviklik" },
        { word: "Enhance", meaning: "Artırmaq / gücləndirmək" },
      ],
    },
  ],
  b1plus: [
    {
      title: "Academic Focus: Time Management Strategies for IELTS",
      source: "PathEnglish Academic",
      readTime: "6 min",
      content: "Prioritizing tasks using the Eisenhower Matrix allows students to manage exam stress effectively. Consistency outweighs intensity when preparing for long-term goals.",
      vocabulary: [
        { word: "Prioritize", meaning: "Prioritetləşdirmək" },
        { word: "Outweigh", meaning: "Üstün gəlmək / daha vacib olmaq" },
      ],
    },
  ],
  b2: [
    {
      title: "TED-Ed Insight: Artificial Intelligence in Education",
      source: "TED-Ed / Cathoven",
      readTime: "7 min",
      content: "Artificial Intelligence is transforming personalized learning paths. Adaptive algorithms analyze student progress to deliver customized exercises in real time.",
      vocabulary: [
        { word: "Transform", meaning: "Müsbət yöndə dəyişdirmək" },
        { word: "Adaptive", meaning: "Uyğunlaşan" },
      ],
    },
  ],
  c1: [
    {
      title: "Advanced Analysis: The Economics of Global Education",
      source: "Global Academic Review",
      readTime: "8 min",
      content: "Socioeconomic disparities significantly influence access to high-caliber educational resources. Policy interventions must address digital infrastructure gaps to ensure equitable learning opportunities worldwide.",
      vocabulary: [
        { word: "Disparity", meaning: "Bərabərsizlik / fərq" },
        { word: "Equitable", meaning: "Ədalətli / bərabər" },
      ],
    },
  ],
};

export default async function ReadingLevelPage({
  params,
}: {
  params: Promise<{ level: string }>;
}) {
  const resolvedParams = await params;
  const levelKey = resolvedParams.level.toLowerCase();
  const articles = articlesData[levelKey] || articlesData["b1"];

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 md:p-12 font-sans">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-blue-400 text-sm hover:underline font-semibold">
          ← Ana Səhifəyə Qayıt
        </Link>

        <div className="my-6">
          <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider">
            Səviyyə: {resolvedParams.level.toUpperCase()}
          </span>
          <h1 className="text-3xl md:text-4xl font-black mt-3">📖 Reading Materialları</h1>
          <p className="text-gray-400 text-sm mt-1">
            Cathoven və xarici akademiyalardan seçilmiş səviyyənə uygun mətnlər.
          </p>
        </div>

        <div className="space-y-8 mt-8">
          {articles.map((art, idx) => (
            <div key={idx} className="rounded-3xl border border-white/10 bg-slate-900 p-6 md:p-8 space-y-6">
              <div className="flex justify-between items-center text-xs text-gray-400">
                <span className="font-semibold text-blue-300">{art.source}</span>
                <span>⏱️ {art.readTime} oxuma müddəti</span>
              </div>

              <h2 className="text-2xl font-bold">{art.title}</h2>

              <p className="text-gray-300 text-lg leading-relaxed bg-white/5 p-5 rounded-2xl border border-white/5">
                {art.content}
              </p>

              <div>
                <h3 className="text-sm font-bold text-blue-400 mb-3 uppercase tracking-wider">
                  💡 Əsas Sözlər & Mənaları:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {art.vocabulary.map((vocab, vIdx) => (
                    <div key={vIdx} className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-sm">
                      <span className="font-bold text-white">{vocab.word}:</span>{" "}
                      <span className="text-gray-400">{vocab.meaning}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}