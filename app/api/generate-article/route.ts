import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Supabase müştərisini yaradırıq
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: Request) {
  // Cron təhlükəsizliyi
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const levels = ['A1', 'A2', 'B1', 'B2', 'C1'];
    
    for (const level of levels) {
      const newArticle = {
        level: level,
        title: `Günün mövzusu: ${level} səviyyəsi`,
        content: `Bu mətn ${level} səviyyəsi üçün AI tərəfindən avtomatik generasiya edilmişdir.`,
        source: 'PathEnglish AI',
        questions: { q: "Sual burada olacaq", a: "Cavab" }
      };

      const { error } = await supabase.from('articles').insert(newArticle);
      
      if (error) throw error;
    }

    return NextResponse.json({ success: true, message: '5 səviyyə üçün məlumatlar bazaya uğurla yazıldı!' });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}