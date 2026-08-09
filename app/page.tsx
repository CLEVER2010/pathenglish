"use client";
import Link from "next/link";
import { useState } from "react";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#0f172a] text-white font-sans selection:bg-emerald-500/30">
      {/* Header */}
      <nav className="border-b border-white/5 p-6 flex justify-between items-center max-w-7xl mx-auto">
        <div className="text-xl font-black tracking-tighter">ELITE<span className="text-emerald-500">ACADEMY</span></div>
        <div className="space-x-6 text-sm text-gray-400 font-medium">
          <Link href="#" className="hover:text-emerald-400">Kurslar</Link>
          <Link href="#" className="hover:text-emerald-400">İmtahanlar</Link>
          <Link href="/exam" className="px-4 py-2 bg-white/5 rounded-xl hover:bg-white/10 transition">Giriş</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/5 rounded-full px-4 py-1.5 mb-8">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-xs uppercase tracking-widest text-gray-300">Yeni Mövsüm Qeydiyyatı Başladı</span>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-black leading-tight mb-8">
          İngilis Dilini <br /> 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">
            60 Güne Mənimsəyin
          </span>
        </h1>
        
        <p className="text-gray-400 text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
          Dil öyrənə bilməməyin səbəbi istedadsızlıq deyil – istiqamətsizlikdir. 
          Akademik sistemimizlə A1-dən C2-yə addım-addım yüksəlin.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <Link 
            href="/exam" 
            className="px-10 py-4 bg-emerald-600 hover:bg-emerald-500 transition-all rounded-2xl font-black text-lg shadow-[0_0_40px_-10px_rgba(16,185,129,0.5)]"
          >
            Sistemə Giriş Et 🚀
          </Link>
          <button className="px-10 py-4 bg-white/5 hover:bg-white/10 transition rounded-2xl font-bold text-lg">
            Proqramı İncele
          </button>
        </div>
      </section>

      {/* Grid Features */}
      <section className="max-w-7xl mx-auto px-6 pb-20 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: "Reading", desc: "60 günlük sistemli təqvim, seçilmiş akademik mətnlər və çətin söz bazası.", icon: "📚" },
          { title: "Listening", desc: "Hər günə uyğun real audio materiallar və IELTS standartlarına uyğun tapşırıqlar.", icon: "🎧" },
          { title: "Sertifikasiya", desc: "Kursu bitirdikdən sonra səviyyəni rəsmi təsdiqləyən yekun imtahan.", icon: "🎓" },
          { title: "Grammar", desc: "Quru qaydalardan uzaq, praktik tətbiq olunan qrammatik strukturlar.", icon: "✍️" },
          { title: "Vocabulary", desc: "Akademik və gündəlik istifadə üçün 3000+ vacib söz.", icon: "💎" },
          { title: "Leaderboard", desc: "Digər tələbələrlə yarışın, aylıq nəticələrlə sertifikat qazanın.", icon: "🏆" }
        ].map((item, i) => (
          <div key={i} className="p-8 bg-slate-900/50 border border-white/5 rounded-3xl hover:border-emerald-500/30 transition-all group">
            <div className="text-4xl mb-4">{item.icon}</div>
            <h3 className="text-xl font-bold mb-2 group-hover:text-emerald-400 transition">{item.title}</h3>
            <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* Footer info */}
      <footer className="py-10 border-t border-white/5 text-center text-sm text-gray-500">
        © 2026 Elite Language Academy. Bütün hüquqlar qorunur.
      </footer>
    </main>
  );
}