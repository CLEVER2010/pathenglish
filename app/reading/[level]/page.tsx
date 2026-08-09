import Link from "next/link";

interface Article {
  title: string;
  source: string;
  readTime: string;
  paragraphs: string[];
  vocabulary: { word: string; meaning: string }[];
}

const articlesData: Record<string, Article[]> = {
  a1: [
    {
      title: "Building a Daily Routine for Success",
      source: "Basic English Path",
      readTime: "3 min",
      paragraphs: [
        "Every morning, starting your day with a clear plan can change your mindset. Wake up early, get a fresh glass of water, and dedicate at least twenty minutes to reading simple English stories.",
        "Consistency is more important than studying for hours once a week. When you practice daily, your brain remembers words much faster and helps you feel confident."
      ],
      vocabulary: [
        { word: "Mindset", meaning: "Düşüncə tərzi" },
        { word: "Dedicate", meaning: "Həsr etmək" },
        { word: "Consistency", meaning: "Davamlılıq" },
      ],
    },
  ],
  a2: [
    {
      title: "BBC Easy: The Science of Healthy Habits",
      source: "BBC Learning English",
      readTime: "4 min",
      paragraphs: [
        "Forming a new habit takes time and repetition. Scientists believe it takes about two months for a new behavior to become automatic. Small changes, like learning five new English words every day, create huge results over time.",
        "Instead of trying to master everything at once, focus on one small task. Listen to a short audio clip during your morning commute or before sleeping."
      ],
      vocabulary: [
        { word: "Behavior", meaning: "Davranış" },
        { word: "Automatic", meaning: "Avtomatik" },
        { word: "Commute", meaning: "İşə/dərsə gedib-gəlmə yolu" },
      ],
    },
  ],
  b1: [
    {
      title: "Cathoven Analysis: How Languages Reshape Your Brain",
      source: "Cathoven Reading",
      readTime: "6 min",
      paragraphs: [
        "Learning a second language alters the physical structure of your brain. Studies show that bilingual people have denser gray matter in regions responsible for memory and executive function.",
        "When you switch between languages, your brain exercises cognitive control. This mental gym helps delay age-related cognitive decline and sharpens focus in complex problem-solving situations.",
        "Therefore, practicing English listening and reading daily isn't just about passing tests; it is a long-term investment in your cognitive health."
      ],
      vocabulary: [
        { word: "Alter", meaning: "Dəyişdirmək" },
        { word: "Bilingual", meaning: "İkidilli" },
        { word: "Cognitive Decline", meaning: "Zehni zəifləmə" },
        { word: "Investment", meaning: "Sərmayə / Yatırım" },
      ],
    },
  ],
  b1plus: [
    {
      title: "Academic Focus: Time Management Strategies for IELTS & Academic Success",
      source: "PathEnglish Academic / Cathoven",
      readTime: "8 min",
      paragraphs: [
        "Time management is one of the most critical skills required for students preparing for high-stakes exams like IELTS or TOEFL. Many candidates fail not because of a lack of language knowledge, but due to poor pacing during the reading and writing modules.",
        "One effective approach is the Eisenhower Matrix, which categorizes daily tasks into four quadrants based on urgency and importance. Students should prioritize high-impact learning tasks—such as analyzing dense academic articles—over passive activities like scrolling through random flashcards.",
        "Furthermore, implementing time-boxed reading drills builds stamina. By training under strict exam conditions, candidates learn to skim for main ideas and scan for precise details without feeling overwhelmed by unfamiliar vocabulary."
      ],
      vocabulary: [
        { word: "Prioritize", meaning: "Prioritetləşdirmək" },
        { word: "High-stakes", meaning: "Böyük məsuliyyətli / əhəmiyyətli" },
        { word: "Quadrant", meaning: "Dörddə bir hissə / kateqoriya" },
        { word: "Overwhelmed", meaning: "Həddən artıq yüklənmiş / aciz qalmış" },
        { word: "Stamina", meaning: "Dözümlülük" },
      ],
    },
  ],
  b2: [
    {
      title: "TED-Ed Insight: Artificial Intelligence and the Future of Education",
      source: "TED-Ed / Cathoven",
      readTime: "10 min",
      paragraphs: [
        "Artificial Intelligence is fundamentally changing how students access information and practice language skills. Traditional classroom models, which often rely on a one-size-fits-all methodology, are being replaced by adaptive learning software that caters to individual student needs.",
        "AI algorithms analyze a learner's strengths and weaknesses in real time. For instance, if a student struggles with complex passive structures or advanced vocabulary, the system automatically adapts subsequent exercises to reinforce those exact concepts.",
        "However, technology should complement human educators rather than replace them. Teachers foster critical thinking, emotional intelligence, and nuanced communication—qualities that algorithm-driven platforms cannot fully replicate."
      ],
      vocabulary: [
        { word: "Fundamentally", meaning: "Əsaslı şəkildə" },
        { word: "Cater to", meaning: "Tələbatı ödəmək" },
        { word: "Subsequent", meaning: "Növbəti / sonrakı" },
        { word: "Replicate", meaning: "Eynisini təkrarlamaq / surətini çıxarmaq" },
      ],
    },
  ],
  c1: [
    {
      title: "Advanced Analysis: Socioeconomic Disparities in Modern Higher Education",
      source: "Global Academic Review",
      readTime: "12 min",
      paragraphs: [
        "Socioeconomic disparities continue to exert a profound influence on access to high-caliber educational institutions worldwide. Despite the democratization of information through digital media, students from underprivileged backgrounds frequently encounter systemic barriers.",
        "Institutional funding gaps, unequal access to high-speed internet, and a shortage of specialized academic mentorship exacerbate educational inequality. Without targeted policy interventions, the digital divide threatens to perpetuate existing economic strata across generations.",
        "To mitigate these systemic issues, academic institutions must adopt equitable scholarship programs and open-access educational resources, ensuring that merit and dedication remain the primary determinants of academic achievement."
      ],
      vocabulary: [
        { word: "Disparity", meaning: "Bərabərsizlik / uyğunsuzluq" },
        { word: "Exacerbate", meaning: "Kəskinləşdirmək / daha da pisləşdirmək" },
        { word: "Equitable", meaning: "Ədalətli" },
        { word: "Perpetuate", meaning: "Davam etdirmək / daimiləşdirmək" },
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
  const articles = articlesData[levelKey] || articlesData["b1plus"];

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
          <h1 className="text-3xl md:text-4xl font-black mt-3">📖 Genişləndirilmiş Reading Artiklları</h1>
          <p className="text-gray-400 text-sm mt-1">
            Cathoven və xarici akademiyalardan səviyyənə uyğun, zəngin lüğətli akademik mətnlər.
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

              <div className="space-y-4 bg-white/5 p-6 rounded-2xl border border-white/5">
                {art.paragraphs.map((p, pIdx) => (
                  <p key={pIdx} className="text-gray-300 text-base md:text-lg leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>

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