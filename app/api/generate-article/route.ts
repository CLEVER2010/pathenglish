import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const levels = ['A1', 'A2', 'B1', 'B2', 'C1'];
    const results = [];

    for (const level of levels) {
      const prompt = `Create an English reading article for CEFR level ${level} about science or nature. Return strictly a valid JSON object with keys: title, content (150 words), source ("PathEnglish AI"), and questions (array with question, options array, answer). No markdown formatting like json.`;

      const geminiRes = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
          })
        }
      );

      const geminiData = await geminiRes.json();
      const responseText = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (!responseText) continue;

      const cleanedText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      const articleData = JSON.parse(cleanedText);

      await supabase.from('articles').insert({
        level: level,
        title: articleData.title,
        content: articleData.content,
        source: articleData.source,
        questions: articleData.questions,
      });

      results.push(level);
    }

    return NextResponse.json({ success: true, results });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}