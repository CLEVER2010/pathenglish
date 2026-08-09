"use client";
import { useState } from "react";
import Link from "next/link";
import InteractiveLessonView from "@/app/components/InteractiveLessonView";
import ProgressCalendar from "@/app/components/ProgressCalendar";

export default function ReadingLevelPage({ params }: { params: { level: string } }) {
  const level = params.level.toUpperCase();
  const [activeDay, setActiveDay] = useState(1);
  const [completedDays, setCompletedDays] = useState<number[]>([]);

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 md:p-16">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Başlıq */}
        <div className="flex justify-between items-center">
          <Link href="/" className="text-blue-400 font-bold hover:underline">← Ana Səhifə</Link>
          <h1 className="text-3xl font-black">{level} - Reading Modulu</h1>
        </div>

        {/* Təqvim və Dərs yanaşı */}
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
            {/* Burada dərslər yüklənəcək */}
            <div className="p-8 bg-slate-900 rounded-3xl border border-white/10">
              <h2 className="text-2xl font-bold mb-4">GÜN {activeDay} DƏRSİ</h2>
              {/* InteractiveLessonView burada olacaq */}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}