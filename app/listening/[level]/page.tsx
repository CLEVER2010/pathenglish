"use client";
import { useState } from "react";
import Link from "next/link";
import ProgressCalendar from "@/app/components/ProgressCalendar";

export default function ListeningLevelPage({ params }: { params: { level: string } }) {
  const level = params.level.toUpperCase();
  const [activeDay, setActiveDay] = useState(1);
  const [completedDays, setCompletedDays] = useState<number[]>([]);

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 md:p-16">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-purple-400 font-bold hover:underline">← Ana Səhifə</Link>
          <h1 className="text-3xl font-black">{level} - Listening Modulu</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1">
            <ProgressCalendar 
              currentLevel={level} 
              completedDays={completedDays} 
              activeDay={activeDay} 
              onSelectDay={setActiveDay} 
            />
          </div>
          <div className="lg:col-span-2">
            <div className="p-8 bg-slate-900 rounded-3xl border border-white/10 space-y-6">
              <h2 className="text-2xl font-bold text-purple-400">Gün {activeDay}: Dinləmə Tapşırığı</h2>
              <p className="text-gray-400">Bu günkü mövzu: <span className="text-white font-bold">Education & Future</span></p>
              
              {/* Buraya real audio player qoyulacaq */}
              <div className="h-48 flex items-center justify-center border-2 border-dashed border-purple-500/30 rounded-2xl">
                Audio Player (Mövzuya uyğun audio bura gələcək)
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}