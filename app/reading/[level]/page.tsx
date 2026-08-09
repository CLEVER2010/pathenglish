"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function LevelHubPage() {
  const params = useParams();
  const level = (params?.level as string)?.toUpperCase() || "A1";

  // Səviyyə kilidi yoxlaması (Simulyasiya: Məsələn yalnız A1 açıqdır, digərləri üçün imtahan tələb olunur)
  const isLocked = level !== "A1" && level !== "B1"; // İstəyə görə tənzimləyə bilərsən

  // Səviyyələrə görə TAMAMİLƏ FƏRQLİ MƏTNLƏR, Collocations və Definitions
  const levelData: { [key: string]: any } = {
    A1: {
      title: "A1: My Daily Routine and Family",
      time: "3 dəqiqə oxuma",
      text: "I get up at 7 o'clock every morning. I wash my face and eat a healthy breakfast with my family. I like drinking tea and eating bread. Then, I go to school by bus. My school is big and clean. After school, I play football with my friends in the park.",
      vocabulary: [
        { word: "Routine", definition: "Hər gün təkrar olunan adəti işlər.", collocation: "daily routine (günlük vərdiş)" },
        { word: "Healthy", definition: "Sağlam, faydalı.", collocation: "healthy food (sağlam qida)" }
      ],
      questions: [
        { q: "What time does the person get up?", options: ["6 o'clock", "7 o'clock", "8 o'clock"], correct: 1 },
        { q: "How does he go to school?", options: ["By bus", "By car", "Walking"], correct: 0 }
      ]
    },
    B2: {
      title: "B2: Socio-Economic Impacts of Digital Transformation",
      time: "8 dəqiqə oxuma",
      text: "The rapid paradigm shift toward automated infrastructures has fundamentally altered labor markets globally. Stakeholders must meticulously analyze consequential data trends to mitigate potential economic friction. Furthermore, cultivating synergistic partnerships between public and private sectors is paramount for sustainable long-term growth.",
      vocabulary: [
        { word: "Paradigm Shift", definition: "A fundamental change in approach or underlying assumptions.", collocation: "massive paradigm shift (köklü dəyişiklik)" },
        { word: "Meticulously", definition: "Showing great attention to detail; very careful and precise.", collocation: "meticulously examine (diqqətlə araşdırmaq)" },
        { word: "Synergistic", definition: "Working together cooperatively to achieve an enhanced outcome.", collocation: "synergistic partnership (qarşılıqlı faydalı tərəfdaşlıq)" }
      ],
      questions: [
        { q: "What has fundamentally altered labor markets according to the text?", options: ["Automated infrastructures", "Traditional agriculture", "Local transport"], correct: 0 },
        { q: "What is deemed paramount for sustainable long-term growth?", options: ["Reducing staff", "Synergistic partnerships", "Ignoring data trends"], correct: 1 }
      ]
    },
    C1: {
      title: "C1: Cognitive Metaphors in Advanced Discourse",
      time: "10 dəqiqə oxuma",
      text: "Advanced linguistic frameworks posit that human conceptual systems are inherently metaphorical. Deciphering nuanced ideological undercurrents requires an uncompromising commitment to critical hermeneutics. Scholars continually scrutinize how rhetorical strategies manipulate collective consciousness.",
      vocabulary: [
        { word: "Hermeneutics", definition: "The branch of knowledge that deals with interpretation, especially of texts.", collocation: "critical hermeneutics (tənqidi izah etmə)" },
        { word: "Undercurrent", definition: "An underlying feeling or influence, especially one that is contrary to the prevailing atmosphere.", collocation: "ideological undercurrent (ideoloji axın)" }
      ],
      questions: [
        { q: "What do advanced linguistic frameworks posit?", options: ["Language is purely literal", "Human conceptual systems are metaphorical", "Grammar has no rules"], correct: 1 }
      ]
    }
  };

  const currentLevelInfo = levelData[level] || levelData["A1"];
  const [activeDay, setActiveDay] = useState<number>(1);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [score, setScore] = useState<number | null>(null);

  // 60 günlük proqram cədvəli generatoru (Hər gün üçün faiz)
  const daysArray = Array.from({ length: 60 }, (_, i) => {
    const dayNum = i + 1;
    // Məsələn, keçilmiş günlər 100%, cari gün aktiv, qalanlar 0%
    let progress = dayNum < activeDay ? 100 : dayNum === activeDay ? 40 : 0;
    return { day: dayNum, progress };
  });

  if (isLocked) {
    return (
      <main className="min-h-screen bg-[#0b0f19] text-slate-100 font-sans flex items-center justify-center p-6">
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl max-w-md text-center space-y-4 shadow-2xl">
          <div className="w-16 h-16 bg-red-500/10 text-red-400 rounded-2xl flex items-center justify-center mx-auto text-2xl font-bold border border-red-500/20">🔒</div>
          <h2 className="text-xl font-black text-white">Səviyyə Kilidlidir ({level})</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Sistemi qorumaq üçün istədiyiniz səviyyəyə birbaşa keçə bilməzsiniz. Əvvəlki səviyyənin 60 günlük proqramını bitirib Yekun İmtahandan keçməlisiniz.
          </p>
          <Link href="/reading/a1" className="block w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition">
            AÇIQ OLAN A1 SƏVİYYƏSİNƏ QAYIT →
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0b0f19] text-slate-100 font-sans p-6 md:p-12">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Header */}
        <div className="flex flex-wrap justify-between items-center border-b border-slate-800 pb-6 gap-4">
          <div className="flex items-center space-x-3">
            <Link href="/" className="text-lg font-black tracking-wider text-white">ELITE<span className="text-emerald-500">ACADEMY</span></Link>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20 uppercase">
              Aktiv Səviyyə: {level} (2 Aylıq Proqram)
            </span>
          </div>

          <div className="flex items-center space-x-2">
            {['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map((lvl) => (
              <Link
                key={lvl}
                href={`/reading/${lvl.toLowerCase()}`}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition border ${
                  level === lvl ? "bg-emerald-600 border-emerald-500 text-white" : "bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800"
                }`}
              >
                {lvl} {lvl > level ? "🔒" : ""}
              </Link>
            ))}
            <Link href="/" className="ml-4 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs border border-slate-700">
              ← Əsas Səhifə
            </Link>
          </div>
        </div>

        {/* 60 Günlük Proqram Cədvəli və İrəliləyiş Faizi */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">📅 2 Aylıq (60 Günlük) Kurikulum və Günlük İrəliləyiş</h3>
            <span className="text-xs text-emerald-400 font-bold">Cari Gün: {activeDay} / 60</span>
          </div>
          
          {/* Günlərin siyahısı (Scrollable Grid) */}
          <div className="flex gap-2 overflow-x-auto pb-3 pt-2">
            {daysArray.map((d) => (
              <button
                key={d.day}
                onClick={() => setActiveDay(d.day)}
                className={`min-w-[65px] p-3 rounded-2xl flex flex-col items-center justify-center transition border ${
                  activeDay === d.day
                    ? "bg-emerald-600 border-emerald-400 text-white shadow-lg shadow-emerald-900/40"
                    : d.progress === 100
                    ? "bg-slate-800 border-slate-700 text-emerald-400"
                    : "bg-slate-950 border-slate-800 text-slate-500 hover:bg-slate-800"
                }`}
              >
                <span className="text-[10px] uppercase font-bold">Gün</span>
                <span className="text-sm font-black">{d.day}</span>
                <span className="text-[9px] mt-1 font-semibold">{d.progress}%</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content & Advanced Definitions/Collocations for B2/C1 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Reading & Complex Quiz */}
          <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 rounded-3xl p-8 space-y-6 shadow-xl">
            <div className="flex justify-between items-center">
              <span className="text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                {currentLevelInfo.time} — Gün {activeDay} Tapşırığı
              </span>
            </div>

            <h2 className="text-2xl font-extrabold text-white">{currentLevelInfo.title}</h2>

            <p className="text-slate-300 text-base leading-relaxed text-justify bg-slate-950/50 p-6 rounded-2xl border border-slate-800/60">
              {currentLevelInfo.text}
            </p>

            {/* Test Sualları */}
            <div className="space-y-6 pt-4 border-t border-slate-800">
              <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">Kompleks Anlama Testi</h3>
              {currentLevelInfo.questions.map((q: any, qIdx: number) => (
                <div key={qIdx} className="bg-slate-950/60 p-5 rounded-2xl border border-slate-800 space-y-3">
                  <p className="text-sm font-bold text-white">{qIdx + 1}. {q.q}</p>
                  <div className="space-y-2">
                    {q.options.map((opt: string, optIdx: number) => (
                      <button
                        key={optIdx}
                        onClick={() => setSelectedAnswers({ ...selectedAnswers, [qIdx]: optIdx })}
                        className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-medium transition border ${
                          selectedAnswers[qIdx] === optIdx
                            ? "bg-emerald-600 border-emerald-500 text-white font-bold"
                            : "bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              <button
                onClick={() => setScore(2)}
                className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:opacity-90 text-white font-bold text-xs rounded-2xl transition shadow-lg"
              >
                Nəticəni Yoxla və İrəliləyişi Qeyd Et 🎯
              </button>

              {score !== null && (
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-center">
                  <p className="text-emerald-400 font-bold text-sm">
                    Təbriklər! Gün {activeDay} uğurla tamamlandı (+40% irəliləyiş). 🎉
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Definitions & Collocations (B2/C1 üçün xüsusi gücləndirilmiş) */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl h-fit">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3">
              📚 {level} - Sözlər, İzahlar & Collocations
            </h3>
            <div className="space-y-4">
              {currentLevelInfo.vocabulary.map((vocab: any, vIdx: number) => (
                <div key={vIdx} className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-emerald-400 font-extrabold text-sm block">{vocab.word}</span>
                  <p className="text-xs text-slate-300"><strong className="text-slate-400">İzah (Definition):</strong> {vocab.definition}</p>
                  <p className="text-xs text-teal-300"><strong className="text-slate-400">Collocation:</strong> {vocab.collocation}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </main>
  );
}