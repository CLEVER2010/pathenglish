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
  const progressPercent = Math.round((completedDays.length / totalDays) * 100);

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900 p-6 shadow-xl space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
            {currentLevel} Səviyyəsi • 2 Aylıq Təqvim
          </span>
          <h2 className="text-2xl font-black text-white mt-1">İnkişaf Təqvimi</h2>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="flex-1 md:w-48 bg-white/10 h-3 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-sm font-bold text-cyan-300 whitespace-nowrap">
            {completedDays.length} / {totalDays} Gün ({progressPercent}%)
          </span>
        </div>
      </div>

      <div className="grid grid-cols-6 sm:grid-cols-10 md:grid-cols-12 gap-2">
        {Array.from({ length: totalDays }, (_, i) => i + 1).map((day) => {
          const isDone = completedDays.includes(day);
          const isActive = activeDay === day;

          return (
            <button
              key={day}
              onClick={() => onSelectDay(day)}
              className={`h-10 rounded-xl text-xs font-bold transition-all flex items-center justify-center border ${
                isDone
                  ? "bg-green-500/20 border-green-500/50 text-green-400 hover:bg-green-500/30"
                  : isActive
                  ? "bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-500/30"
                  : "bg-white/5 border-white/10 text-gray-400 hover:border-blue-500/50 hover:text-white"
              }`}
            >
              {isDone ? `✓ G-${day}` : `G-${day}`}
            </button>
          );
        })}
      </div>

      <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-gray-400">
          {completedDays.length === totalDays
            ? "🎉 Təbriklər! Bütün dərsləri bitirdiniz. İmtahan açıldı!"
            : `💡 Hazırda Gün ${activeDay} dərsindəsiniz. Testi bitirdikdə gün avtomatik yaşıl olacaq.`}
        </div>
        <a
          href={completedDays.length === totalDays ? `/exam/${currentLevel.toLowerCase()}` : "#"}
          className={`px-5 py-2.5 rounded-xl font-bold text-xs transition ${
            completedDays.length === totalDays
              ? "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20"
              : "bg-white/5 text-gray-500 cursor-not-allowed border border-white/5"
          }`}
        >
          {completedDays.length === totalDays ? "Yekun İmtahana Başla →" : "🔑 İmtahan Kilidlidir"}
        </a>
      </div>
    </div>
  );
}