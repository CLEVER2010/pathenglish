import { GoogleGenerativeAI } from "@google/generative-ai";
import { createClient } from "@supabase/supabase-js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  try {
    const { level, topic, minutes } = await req.json();

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
Create a ${level} English reading article about ${topic}.
Length: approximately ${minutes * 80} words.

Return ONLY valid JSON in this format:

{
  "title": "...",
  "content": "...",
  "summary": "...",
  "vocabulary": [
    {"word":"...","meaning":"...","example":"..."}
  ],
  "questions": [
    {
      "question":"...",
      "a":"...",
      "b":"...",
      "c":"...",
      "d":"...",
      "correct":"A"
    }
  ]
}
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const data = JSON.parse(cleaned);

    const { data: article, error: articleError } = await supabase
      .from("articles")
      .insert({
        level,
        topic,
        title: data.title,
        content: data.content,
        summary: data.summary,
        reading_time: minutes,
      })
      .select()
      .single();

    if (articleError) throw articleError;

    if (data.vocabulary?.length) {
      await supabase.from("vocabulary").insert(
        data.vocabulary.map((v: any) => ({
          article_id: article.id,
          word: v.word,
          meaning: v.meaning,
          example: v.example,
        }))
      );
    }

    if (data.questions?.length) {
      await supabase.from("questions").insert(
        data.questions.map((q: any) => ({
          article_id: article.id,
          question: q.question,
          option_a: q.a,
          option_b: q.b,
          option_c: q.c,
          option_d: q.d,
          correct_option: q.correct,
        }))
      );
    }

    return Response.json({
      success: true,
      article,
    });
  } catch (error: any) {
    return Response.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}