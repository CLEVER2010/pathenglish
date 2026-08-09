"use client";

import Link from "next/link";
import { useState } from "react";
import InteractiveLessonView from "@/app/components/InteractiveLessonView";
import ProgressCalendar from "@/app/components/ProgressCalendar";
import { LessonData } from "@/types";

const sampleLesson: LessonData = {
  id: "b1-day-1",
  level: "B1",
  day: 1,
  title: "The Science of Habit Formation & Learning",
  source: "BBC Learning English / Cathoven Academic",
  audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  paragraphs: [
    "Forming a new habit takes time and repetition. Scientists believe it takes about two months for a new behavior to become automatic. Small changes, like learning five new English words every day, create huge results over time.",
    "Instead of trying to master everything at once, focus on one small task. Listen to a short audio clip during your morning commute or before sleeping. Consistency is far more powerful than cramming for hours once a week."
  ],
  vocabulary: [
    {
      word: "Consistency",
      collocation: "maintain consistency / show consistency",
      definition: "The quality of always performing in a similar way or of always happening in a similar way.",
      azMeaning: "Davamlılıq / Ardıcıllıq"
    },
    {
      word: "Commute",
      collocation: "daily commute / morning commute",
      definition: "A regular journey of some distance to and from one's place of work or study.",
      azMeaning: "İşə/dərsə gedib-gəlmə yolu"
    },
    {
      word: "Automatic",
      collocation: "become automatic / automatic response",
      definition: "Done or occurring spontaneously, without conscious thought.",
      azMeaning: "Avtomatik / Özlüyündən"
    }
  ],
  quiz: [
    {
      id: 1,
      question: "It takes around two months for a new habit to become automatic.",
      options: ["True", "False", "Not Given"],
      correctAnswer: 0,
      explanation: "Mətndə qeyd olunur ki, alimlərin fikrincə yeni vərdişin avtomatikləşməsi təxminən 2 ay çəkir."
    },
    {
      id: 2,
      question: "Cramming for hours once a week is better than daily consistent study.",
      options: ["True", "False", "Not Given"],
      correctAnswer: 1,
      explanation: "Mətndə bildirilir ki, davamlılıq (consistency) həftədə bir dəfə saatlarla oxumaqdan daha güclüdür."
    }
  ]
};

export default function ReadingLevelPage({
  params,
}: {
  params: { level: string };
}) {
  const [completedDays, setCompletedDays] = useState<number[]>([1]);
  const level = params?.level ? params.level.toUpperCase() : "B1";

  const handleSelectDay = (day: number) => {
    if (!completedDays.includes(day)) {
      setCompletedDays([...completedDays, day]);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 md:p-12 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        <Link href="/" className="text-blue-400 text-xs hover:underline font-semibold">
          ← Ana Səhifəyə Qayıt
        </Link>

        <ProgressCalendar
          currentLevel={level}
          completedDays={completedDays}
          onSelectDay={handleSelectDay}
        />

        <InteractiveLessonView lesson={sampleLesson} />
      </div>
    </main>
  );
}