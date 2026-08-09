"use client";
import { useState } from "react";
import Link from "next/link";

export default function LevelExamPage({ params }: { params: { level: string } }) {
  const level = params.level.toUpperCase();
  const [userName, setUserName] = useState("");
  const [score, setScore] = useState<number | null>(null);
  const [isPassed, setIsPassed] = useState(false);

  const handleFinishExam = () => {
    // Nümunə imtahan qiymətləndirməsi (85% nəticə)
    const simulatedScore = 85;
    setScore(simulatedScore);
    if (simulatedScore >= 80) {
      setIsPassed(true);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 md:p-12 font-sans">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-blue-400 text-xs hover:underline font-semibold">
          ← Ana Səhifə
        </Link>

        <div className="my-6">
          <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold uppercase">
            Yekun Qiymətləndirmə
          </span>
          <h1 className="text-3xl font-black mt-2">{level} Səviyyə Bitiş İmtahanı</h1>
          <p className="text-gray-400 text-xs mt-1">
            2 aylıq təlimi uğurla başa vurmaq üçün minimum 80% nəticə göstərməlisiniz.
          </p>
        </div>

        {score === null ? (
          <div className="rounded-3xl border border-white/10 bg-slate-900 p-8 space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-300">Ad və Soyadınız (Sertifikat üçün):</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Məsələn: Əli Əliyev"
                className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-blue-500 outline-none"
              />
            </div>

            <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-300 leading-relaxed">
              📌 İmtahan 20 Reading və Listening sualından ibarətdir. Vaxt məhdudiyyəti 30 dəqiqədir.
            </div>

            <button
              disabled={!userName.trim()}
              onClick={handleFinishExam}
              className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-gray-700 font-bold text-xs transition"
            >
              İmtahanı Tamamla və Nəticəni Gör
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-slate-900 p-8 text-center space-y-4">
              <div className="text-5xl font-black text-blue-400">{score}%</div>
              <h2 className="text-xl font-bold">
                {isPassed ? "🎉 Təbriklər! İmtahandan Keçdiniz!" : "❌ Təəssüf, Kafi Nəticə Toplamadınız"}
              </h2>
              <p className="text-xs text-gray-400 max-w-md mx-auto">
                {isPassed
                  ? `${userName}, siz ${level} səviyyəsini uğurla başa vurdunuz. Aşağıdakı düymədən sertifikatınızı yükləyə bilərsiniz.`
                  : "Sertifikat almaq üçün minimum 80% toplamaq lazımdır. Dərsləri təkrar edib yenidən cəhd edin."}
              </p>
            </div>

            {isPassed && (
              <div className="border-8 border-blue-500/30 bg-slate-900 p-8 text-center rounded-3xl space-y-4 relative overflow-hidden">
                <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">
                  PathEnglish.az • Rəsmi Sertifikat
                </span>
                <h3 className="text-2xl font-serif font-bold text-white">NAİLİYYƏT SERTİFİKATI</h3>
                <p className="text-xs text-gray-400">Bu sənəd təsdiq edir ki,</p>
                <div className="text-2xl font-bold text-cyan-300 my-2">{userName}</div>
                <p className="text-xs text-gray-300 max-w-sm mx-auto leading-relaxed">
                  2 aylıq <strong>{level}</strong> səviyyəli Reading, Listening, Vocabulary və Collocation proqramını və yekun imtahanı uğurla başa vurmuşdur.
                </p>
                <button
                  onClick={() => window.print()}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold text-xs transition"
                >
                  📄 Sertifikatı PDF Yüklə / Çap Et
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}