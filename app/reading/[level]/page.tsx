import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export const revalidate = 0; // Hər zaman ən son məlumatları çəkmək üçün

export default async function ReadingPage() {
  // Bazadan bütün məqalələri tarixə görə sıralayıb çəkirik
  const { data: articles, error } = await supabase
    .from('articles')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-red-500">
        Xəta baş verdi: {error.message}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-slate-800">Günün Oxu Məqalələri</h1>

      {articles && articles.length === 0 ? (
        <p className="text-slate-500">Hələ ki heç bir məqalə tapılmadı.</p>
      ) : (
        articles?.map((article: any) => (
          <div key={article.id} className="border border-slate-200 rounded-xl p-6 shadow-sm space-y-4 bg-white">
            <div className="flex items-center gap-3">
              <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">
                {article.level}
              </span>
              <span className="bg-slate-100 text-slate-600 text-xs font-bold px-3 py-1 rounded-full">
                Day {article.day}
              </span>
            </div>

            <h2 className="text-2xl font-bold text-slate-900">{article.title}</h2>
            <p className="text-slate-700 leading-relaxed whitespace-pre-line">{article.content}</p>

            {/* Suallar Bölməsi */}
            {article.questions && article.questions.length > 0 && (
              <div className="mt-6 pt-6 border-t border-slate-100 space-y-4">
                <h3 className="text-lg font-semibold text-slate-800">Suallar:</h3>
                {article.questions.map((q: any, idx: number) => (
                  <div key={idx} className="bg-slate-50 p-4 rounded-lg space-y-2">
                    <p className="font-medium text-slate-800">{q.id || idx + 1}. {q.question}</p>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {q.options?.map((opt: string, oIdx: number) => (
                        <div key={oIdx} className="p-2 border border-slate-200 rounded text-sm text-slate-600 bg-white">
                          {opt}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}