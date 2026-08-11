"use client";

import { useState } from "react";

export default function AdminPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  async function generate() {
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          level: "B2",
          topic: "Science",
          minutes: 8,
        }),
      });

      const data = await res.json();
      setResult(data);
    } catch (e) {
      setResult({ success: false, error: "Network error" });
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-[#0B1020] text-white p-10">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold mb-4">PathEnglish AI Generator</h1>
        <p className="text-white/70 mb-8">
          Generate BBC-style B2 reading articles with vocabulary and questions.
        </p>

        <button
          onClick={generate}
          disabled={loading}
          className="rounded-2xl bg-blue-600 px-6 py-4 text-lg font-semibold hover:bg-blue-500 disabled:opacity-50"
        >
          {loading ? "Generating..." : "Generate B2 Science Article"}
        </button>

        {result && (
          <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6">
            {result.success ? (
              <>
                <div className="text-green-400 font-semibold mb-2">
                  Article saved to Supabase
                </div>

                <h2 className="text-2xl font-bold mb-4">
                  {result.article.title}
                </h2>

                <p className="text-white/80 leading-8 whitespace-pre-line">
                  {result.article.content}
                </p>
              </>
            ) : (
              <>
                <div className="text-red-400 font-semibold mb-2">
                  Generation failed
                </div>
                <pre className="text-sm text-white/80 whitespace-pre-wrap">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </>
            )}
          </div>
        )}
      </div>
    </main>
  );
}