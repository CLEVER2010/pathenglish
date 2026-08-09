"use client";
import Link from "next/link";
import { useState } from "react";

export default function ExamPage({ params }: { params: { level: string } }) {
  const level = params.level.toUpperCase();
  
  // Real platformada buraya şagirdin 60 günü bitirib-bitirmədiyi gələcək.
  // Hələlik sistemin işlədiyini yoxlamaq üçün false qoyulub (kilidli vəziyyət).
  const [isCompletedAllDays] = useState(false); 

  if (!isCompletedAllDays) {
    return (
      <main className="min-h-screen bg-slate-950 text-white p-6 md:p-16 flex flex-col items-center justify-center text-center space-y-6">
        <div className="text-6xl p-6 bg-slate-900 rounded-full border border-white/10 shadow-2xl">🔒</div>
        <h1 className="text-4xl font-black">Yekun İmtahan Hələ Bağlıdır</h1>
        <p className="text-gray-400 max-w-md text-sm leading-relaxed">
          {level} səviyyəsi üzrə yekun imtahana daxil olmaq üçün 60 günlük təqvimdəki bütün günləri uğurla tamamlamalısan. 
        </p>
        <Link 
          href={`/reading/${level.toLowerCase()}`}
          className="px-6 py-3 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-500 transition shadow-lg"
        >
          Dərslərə Qayıt →
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 md:p-16">
      <div className="max-w-4xl mx-auto space-y-8">
        <Link href="/" className="text-blue-400 text-xs font-bold hover:underline">← Ana Səhifə</Link>
        <h1 className="text-3xl font-black">{level} Səviyyəsi Yekun İmtahanı</h1>
        <div className="p-8 bg-slate-900 rounded-3xl border border-white/10">
          <p>İmtahan sualları burada yerləşəcək...</p>
        </div>
      </div>
    </main>
  );
}