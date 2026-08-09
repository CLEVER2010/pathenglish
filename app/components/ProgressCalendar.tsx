"use client";

interface CalendarProps {
  currentLevel: string;
  completedDays: number[];
  activeDay: number;
  onSelectDay: (day: number) => void;
}

export default function ProgressCalendar({
  currentLevel,
  completedDays,
  activeDay,
  onSelectDay,
}: CalendarProps) {
  const totalDays = 60;
  const maxUnlockedDay = Math.max(...completedDays, 0) + 1;
  const progressPercent = Math.round((completedDays.length / totalDays) * 100);

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900 p-6 md:p-8 shadow-2xl space-y-6">
      <div className="flex flex-col gap-2">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
          {currentLevel} Səviyyəsi • 60 Günlük Sistem
        </span>
        <h2 className="text-2xl font-black text-white">İnkişaf Təqvimi</h2>
        
        <div className="flex items-center gap-4 pt-2">
          <div className="flex-1 bg-white/10 h-3 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-xs font-bold text-cyan-300 whitespace-nowrap">
            {completedDays.length} / {totalDays} Gün ({progressPercent}%)
          </span>
        </div>
      </div>

      <div className="grid grid-cols-6 sm:grid-cols-10 gap-2">
        {Array.from({ length: totalDays }, (_, i) => i + 1).map((day) => {
          const isDone = completedDays.includes(day);
          const isLocked = day > maxUnlockedDay;
          const isActive = activeDay === day;

          return (
            <button
              key={day}
              disabled={isLocked}
              onClick={() => !isLocked && onSelectDay(day)}
              className={`h-11 rounded-xl text-xs font-bold transition-all flex items-center justify-center border ${
                isDone
                  ? "bg-green-500/20 border-green-500 text-green-400 shadow-lg shadow-green-500/10"
                  : isLocked
                  ? "bg-slate-950/40 border-white/5 text-gray-600 cursor-not-allowed opacity-50"
                  : isActive
                  ? "bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-500/30 scale-105 z-10"
                  : "bg-white/5 border-white/10 text-gray-300 hover:border-blue-500"
              }`}
            >
              {isLocked ? "🔒" : isDone ? `✓ G-${day}` : `G-${day}`}
            </button>
          );
        })}
      </div>

      <div className="text-xs text-gray-400 bg-white/5 p-4 rounded-2xl border border-white/5 leading-relaxed">
        {completedDays.length === totalDays ? (
          <span className="text-green-400 font-bold">🎉 Təbriklər! Bütün günlər bitdi, imtahan açıldı!</span>
        ) : (
          <span>💡 <strong className="text-white">Sistem Qaydası:</strong> Növbəti günə keçmək üçün cari günün dərslərini oxuyub 10 suallıq testi tamamlamalısan.</span>
        )}
      </div>
    </div>
  );
}