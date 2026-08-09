"use client";

import Link from "next/link";
import { useState } from "react";
import InteractiveLessonView from "@/app/components/InteractiveLessonView";
import ProgressCalendar from "@/app/components/ProgressCalendar";
import { LessonData } from "@/types";

// Nümunə olaraq müxtəlif günlər üçün dinamik dərslər simulyasiyası
const getLessonForDay = (day: number, level: string): LessonData => ({
  id: `${level.toLowerCase()}-day-${day}`,
  level: level,
  day: day,
  title: `Day ${day}: Advanced English Learning & Vocabulary`,
  source: "BBC Learning English / Academic Source",
  audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  paragraphs: [
    `Bu, ${level} səviyyəsinin ${day}-ci gününə aid olan dərs mətnidir. Hər gün yeni biliklər əldə edərək irəliləyirsiniz.`,
    "Davamlı oxumaq və dinləmək ingilis dilini beyninizdə avtomatikləşdirmək üçün ən əsas üsuldur."
  ],
  vocabulary: [
    {
      word: `Word Day ${day}`,
      collocation: `practice day ${day} / learn daily`,
      definition: "An important term or phrase used in context to enhance fluency.",
      azMeaning: `Gün ${day} Sözü`
    }
  ],
  quiz: [
    {
      id: 1,
      question: `Consistent daily practice is essential for mastering level ${level}.`,
      options: ["True", "False", "Not Given"],
      correctAnswer: 0,
      explanation: "Hər gün ardıcıl məşq etmək dili mənimsəmək üçün əsas şərtir."
    }
  ]
});

export default function ReadingLevelPage({
  params,
}: {
  params: { level: string };
}) {
  const level = params?.level ? params.level.toUpperCase() : "B1";
  const [activeDay, setActiveDay] = useState<number>(1);
  const [completedDays, setCompletedDays] = useState<number[]>([]);

  // Şagird test bitirdikdə sistem tərəfindən avtomatik çağrılır
  const handleLessonComplete = (day: number) => {
    if (!completedDays.includes(day)) {
      setCompletedDays((prev) => [...prev, day]);
    }
  };

  const currentLesson = getLessonForDay(activeDay, level);

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 md:p-12 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        <Link href="/" className="text-blue-400 text-xs hover:underline font-semibold">
          ← Ana Səhifəyə Qayıt
        </Link>

        {/* İnkişaf Təqvimi (Sistem izləyir) */}
        <ProgressCalendar
          currentLevel={level}
          completedDays={completedDays}
          activeDay={activeDay}
          onSelectDay={(day) => setActiveDay(day)}
        />

        {/* Seçilmiş Günün Dərsi və Avtomatik Tamamlama Mexanizmi */}
        <InteractiveLessonView
          key={activeDay}
          lesson={currentLesson}
          onLessonComplete={handleLessonComplete}
        />
      </div>
    </main>
  );
}