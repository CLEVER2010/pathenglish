import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { GoogleGenAI } from '@google/genai';

// Supabase müştərisi
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Gemini SDK
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function GET(request: Request) {
  // Cron təhlükəsizlik yoxlanışı
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const levels = ['A1', 'A2', 'B1', 'B2', 'C1'];
    const results = [];

    for (const level of levels) {
      // Gemini-yə göndəriləcək təlimat (Prompt)
      const prompt = `
        You are an expert English language teacher and content creator. 
        Create an engaging English reading article suitable for CEFR level ${level}.
        The topic can be science, nature, technology, or culture (inspired by BBC or National Geographic).
        
        You MUST return the response strictly as a valid JSON object with the following keys, and nothing else (no markdown formatting like \`\`\`json):
        {
          "title": "Article title in English",
          "content": "Full article text in English (around 150-200 words)",
          "source": "PathEnglish AI",
          "questions": [
            {
              "question": "Multiple choice question based on the text?",
              "options": ["A) ...", "B) ...", "C) ...", "D) ..."],
              "answer": "Correct option letter or text"
            }
          ]
        }
      `;

      // Gemini modelini çağırırıq
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      const responseText = response.text;
      if (!responseText) continue;

      // JSON formatını təmizləyib obyektə çeviririk
      const cleanedText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      const articleData = JSON.parse(cleanedText);

      // Supabase bazasına yazırıq
      const { error } = await supabase.from('articles').insert({
        level: level,
        title: articleData.title,
        content: articleData.content,
        source: articleData.source,
        questions: articleData.questions,
      });

      if (error) throw error;
      results.push(level);
    }

    return NextResponse.json({ 
      success: true, 
      message: `AI uğurla ${results.join(', ')} səviyyələri üçün mətnlər yaratdı və bazaya yazdı!` 
    });

  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}