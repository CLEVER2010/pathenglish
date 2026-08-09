"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function SinglePagePlacementApp() {
  const [timeLeft, setTimeLeft] = useState(7200); // 2 saat (120 dəqiqə = 7200 saniyə)
  const [activeTab, setActiveTab] = useState<number>(1); // Səhifələr: 1 (Qrammatika), 2 (Reading), 3 (Listening)
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [testSubmitted, setTestSubmitted] = useState<boolean>(false);
  const [assignedLevel, setAssignedLevel] = useState<string | null>(null);

  // 2 saatlıq timer
  useEffect(() => {
    if (timeLeft > 0 && !testSubmitted) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft, testSubmitted]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Suallar bazası (Qrammatika: 1-20, Reading: 21-40, Listening: 41-48)
  const grammarQuestions = [
    { id: 1, q: "1) Can I park here?", options: ["Sorry, I did that.", "It's the same place.", "Only for half an hour."], correct: 2 },
    { id: 2, q: "2) What colour will you paint the children's bedroom?", options: ["I hope it was right.", "We can't decide.", "It wasn't very difficult."], correct: 1 },
    { id: 3, q: "3) I can't understand this email.", options: ["Would you like some help?", "Don't you know?", "I suppose you can."], correct: 0 },
    { id: 4, q: "4) I'd like two tickets for tomorrow night.", options: ["How much did you pay?", "Afternoon and evening.", "I'll just check for you."], correct: 2 },
    { id: 5, q: "5) Shall we go to the gym now?", options: ["I'm too tired.", "It's very good.", "Not at all."], correct: 0 },
    { id: 6, q: "6) His eyes were ...... bad that he couldn't read the number plate of the car in front.", options: ["such", "too", "so", "very"], correct: 2 },
    { id: 7, q: "7) The company needs to decide ...... and for all what its position is on this point.", options: ["here", "once", "first", "finally"], correct: 1 },
    { id: 8, q: "8) Don't put your cup on the ...... of the table – someone will knock it off.", options: ["outside", "edge", "boundary", "border"], correct: 1 },
    { id: 9, q: "9) I'm sorry - I didn't ...... to disturb you.", options: ["hope", "think", "mean", "suppose"], correct: 2 },
    { id: 10, q: "10) The singer ended the concert ...... her most popular song.", options: ["by", "with", "in", "as"], correct: 1 },
    { id: 11, q: "11) Would you mind ...... these plates a wipe before putting them in the cupboard?", options: ["making", "doing", "getting", "giving"], correct: 3 },
    { id: 12, q: "12) I was looking forward ...... at the new restaurant, but it was closed.", options: ["to eat", "to have eaten", "to eating", "eating"], correct: 2 },
    { id: 13, q: "13) ...... tired Melissa is when she gets home from work, she always makes time to say goodnight to the children.", options: ["Whatever", "No matter how", "However much", "Although"], correct: 1 },
    { id: 14, q: "14) It was only ten days ago ...... she started her new job.", options: ["then", "since", "after", "that"], correct: 3 },
    { id: 15, q: "15) The shop didn't have the shoes I wanted, but they've ...... a pair specially for me.", options: ["booked", "ordered", "commanded", "asked"], correct: 1 },
    { id: 16, q: "16) Have you got time to discuss your work now or are you ...... to leave?", options: ["thinking", "round", "planned", "about"], correct: 3 },
    { id: 17, q: "17) She came to live here ...... a month ago.", options: ["quite", "beyond", "already", "almost"], correct: 0 },
    { id: 18, q: "18) Once the plane is in the air, you can ...... your seat belts if you wish.", options: ["undress", "unfasten", "unlock", "untie"], correct: 1 },
    { id: 19, q: "19) I left my last job because I had no ...... to travel.", options: ["place", "position", "opportunity", "possibility"], correct: 2 },
    { id: 20, q: "20) It wasn't a bad crash and ...... damage was done to my car.", options: ["little", "small", "light", "mere"], correct: 0 },
  ];

  const readingQuestions = [
    { id: 21, q: "21) Sarah decided to train as an English teacher because ________.", options: ["it was the only thing she was really interested in", "she didn't know what else to do", "she wanted to travel", "she thought she could get a good job"], correct: 0 },
    { id: 22, q: "22) When Sarah met Nathan for the first time, ________.", options: ["she told him that she was planning to leave", "she didn't like him very much", "she liked him, but she didn't want to have a relationship with him", "she decided to stay another year"], correct: 2 },
    { id: 23, q: "23) Nathan works ________.", options: ["in a school", "long hours", "in a factory", "at home"], correct: 1 },
    { id: 24, q: "24) Sarah’s feelings about her first job were ________.", options: ["mixed", "unclear", "positive", "negative"], correct: 0 },
    { id: 25, q: "25) When she left school, her English was ________.", options: ["not very good", "perfect", "very bad", "very good"], correct: 3 },
    { id: 26, q: "26) When Sarah was at school, she ________ learning English.", options: ["didn't mind", "liked", "didn't like", "hated"], correct: 1 },
    { id: 27, q: "27) When Sarah went to Canada, she thought ________.", options: ["she would find a job as a high school teacher", "she would come back to Argentina again after a short stay", "she would stay in Canada for a long time", "she would enjoy living in Canada"], correct: 1 },
    { id: 28, q: "28) The children in Sarah’s first job ________.", options: ["didn't understand what she was saying", "didn't always behave well in class", "didn't learn anything", "were often rude to her"], correct: 1 },
    { id: 29, q: "29) Sarah has lived in Canada ________.", options: ["since she was 36", "for one year", "since she was born", "for ten years"], correct: 3 },
    { id: 30, q: "30) Because of Nathan, Sarah initially decided to stay in Canada ________.", options: ["for a few more months", "forever", "until Nathan asked her to marry him", "for another year"], correct: 3 },
    { id: 31, q: "31) Which sentence best describes Sarah’s attitude now towards her decision to stay in Canada?", options: ["She wishes she had come to Canada earlier...", "She isn't sure...", "She wouldn't change her decision, although she still finds it hard...", "She regrets her decision..."], correct: 2 },
    { id: 32, q: "32) Sarah thinks that she has ________ since coming to Canada.", options: ["not changed very much", "learned to speak English better", "changed a lot", "lost touch with her own country"], correct: 2 },
    { id: 33, q: "33) It took Sarah ________ to get used to living in Canada.", options: ["about one month", "several years", "several months", "a few weeks"], correct: 2 },
    { id: 34, q: "34) In her first job, she ________.", options: ["taught older children by herself", "worked with another teacher to teach young children", "worked with another teacher to teach older children", "taught young children by herself"], correct: 1 },
    { id: 35, q: "35) At weekends, Sarah and Nathan often ________.", options: ["stay in the city", "work long hours", "go to a village", "get out of the city"], correct: 3 },
    { id: 36, q: "36) During her first few months in Canada, Sarah ________.", options: ["didn't socialise much", "made lots of new friends", "had to work very hard", "met Nathan"], correct: 0 },
    { id: 37, q: "37) Sarah and Nathan have ________.", options: ["two boys", "one boy and one girl", "two girls", "no children"], correct: 2 },
    { id: 38, q: "38) Nathan and Sarah ________.", options: ["were born in different years", "were born in the same year", "were born in different countries", "were born in the same country"], correct: 2 },
    { id: 39, q: "39) Sarah thought that living in Canada ________.", options: ["would be very different...", "would be more difficult than it was", "would make her feel homesick", "would be easier than it was"], correct: 1 },
    { id: 40, q: "40) Nathan is ________.", options: ["Sarah's father", "Sarah's husband", "Sarah's boyfriend", "Sarah's manager"], correct: 1 },
  ];

  const listeningQuestions = [
    { id: 41, q: "41) Where is the woman from?", options: ["Germany", "Russia", "Australia", "Croatia"], correct: 3 },
    { id: 42, q: "42) The woman says that you can travel from Croatia to Germany in two hours by ________.", options: ["bus", "train", "car", "plane"], correct: 3 },
    { id: 43, q: "43) What does the man think?", options: ["His geography is very good.", "He doesn't know enough about geography.", "Croatia is a part of Germany.", "The woman is from Germany."], correct: 1 },
    { id: 44, q: "44) What does the woman think of the man's mistake?", options: ["It's funny.", "It's not serious.", "It's stupid.", "It's very serious."], correct: 1 },
    { id: 45, q: "45) What are they looking at?", options: ["a picture or a photo", "a story in a book", "an email", "a newspaper"], correct: 0 },
    { id: 46, q: "46) Who is the person they're looking at?", options: ["the man's father's younger brother", "the man's mother's older brother", "the man's father's older brother", "the woman's father's older brother"], correct: 2 },
    { id: 47, q: "47) The woman thinks the man's uncle ________.", options: ["is handsome", "looks unfriendly", "looks kind", "is kind"], correct: 2 },
    { id: 48, q: "48) Why doesn't the man see his uncle very much?", options: ["His mum and his uncle don't have a good relationship.", "His uncle and his dad don't have a good relationship.", "His uncle's wife and his dad don't have a good relationship.", "His uncle lives too far away."], correct: 3 },
  ];

  const handleSelect = (qId: number, optIdx: number) => {
    setAnswers({ ...answers, [qId]: optIdx });
  };

  const handleSubmitTest = () => {
    let correctCount = 0;
    const totalQuestions = grammarQuestions.length + readingQuestions.length + listeningQuestions.length;
    
    [...grammarQuestions, ...readingQuestions, ...listeningQuestions].forEach((item) => {
      if (answers[item.id] === item.correct) {
        correctCount++;
      }
    });

    const percentage = (correctCount / totalQuestions) * 100;
    
    let level = "A1";
    if (percentage >= 95) level = "C1";
    else if (percentage >= 85) level = "B2";
    else if (percentage >= 70) level = "B1";
    else if (percentage >= 60) level = "A2";
    else level = "A1";

    setAssignedLevel(level);
    setTestSubmitted(true);
  };

  if (testSubmitted) {
    return (
      <main className="min-h-screen bg-[#0b0f19] text-slate-100 font-sans flex items-center justify-center p-6">
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl max-w-lg text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto text-2xl font-bold border border-emerald-500/20">🏆</div>
          <h2 className="text-2xl font-black text-white">İmtahan Tamamlandı!</h2>
          <p className="text-sm text-slate-300">
            Sizin səviyyəniz təyin edildi: <strong className="text-emerald-400 text-lg uppercase">{assignedLevel}</strong>
          </p>
          <p className="text-xs text-slate-400 leading-relaxed">
            Qaydalara əsasən, sizə uyğun səviyyə açıldı və ilk gündən başlaya bilərsiniz.
          </p>
          <Link href={`/reading/${assignedLevel?.toLowerCase()}`} className="block w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition">
            PROQRAMA DAXİL OL ({assignedLevel}) →
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0b0f19] text-slate-100 font-sans p-6 md:p-12">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header & Timer */}
        <div className="flex justify-between items-center bg-slate-900/90 border border-slate-800 p-6 rounded-3xl shadow-xl">
          <div>
            <h1 className="text-lg font-black tracking-wider text-white">ELITE<span className="text-emerald-500">ACADEMY</span></h1>
            <p className="text-xs text-slate-400 font-semibold mt-1">Səviyyə Təyini İmtahanı (Placement Test)</p>
          </div>
          <div className="flex items-center space-x-3 bg-slate-950 px-5 py-2.5 rounded-2xl border border-slate-800">
            <span className="text-xs text-slate-400 font-bold uppercase">Qalan Vaxt:</span>
            <span className="text-emerald-400 font-mono text-base font-black">{formatTime(timeLeft)}</span>
          </div>
        </div>

        {/* Navigation Tabs (Page 1, Page 2, Page 3) */}
        <div className="flex space-x-3">
          <button
            onClick={() => setActiveTab(1)}
            className={`px-5 py-3 rounded-2xl text-xs font-bold transition border ${
              activeTab === 1 ? "bg-emerald-600 border-emerald-500 text-white shadow-lg" : "bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800"
            }`}
          >
            Page 1 (Qrammatika)
          </button>
          <button
            onClick={() => setActiveTab(2)}
            className={`px-5 py-3 rounded-2xl text-xs font-bold transition border ${
              activeTab === 2 ? "bg-emerald-600 border-emerald-500 text-white shadow-lg" : "bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800"
            }`}
          >
            Page 2 (Reading: Sarah's Life)
          </button>
          <button
            onClick={() => setActiveTab(3)}
            className={`px-5 py-3 rounded-2xl text-xs font-bold transition border ${
              activeTab === 3 ? "bg-emerald-600 border-emerald-500 text-white shadow-lg" : "bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800"
            }`}
          >
            Page 3 (Listening)
          </button>
        </div>

        {/* Content Box */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 space-y-6 shadow-xl">
          
          {/* PAGE 1: GRAMMAR */}
          {activeTab === 1 && (
            <div className="space-y-6">
              <h2 className="text-base font-black text-white uppercase tracking-wider">Part 1: Grammar & Vocabulary (1-20)</h2>
              <div className="space-y-6">
                {grammarQuestions.map((item) => (
                  <div key={item.id} className="bg-slate-950/60 p-5 rounded-2xl border border-slate-800 space-y-3">
                    <p className="text-sm font-bold text-white">{item.q}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {item.options.map((opt, optIdx) => (
                        <button
                          key={optIdx}
                          onClick={() => handleSelect(item.id, optIdx)}
                          className={`w-full text-left px-4 py-3 rounded-xl text-xs font-medium transition border ${
                            answers[item.id] === optIdx
                              ? "bg-emerald-600 border-emerald-500 text-white font-bold"
                              : "bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PAGE 2: READING */}
          {activeTab === 2 && (
            <div className="space-y-6">
              <h2 className="text-base font-black text-white uppercase tracking-wider">Part 2: Reading Test (Sarah’s Life in Canada)</h2>
              
              <div className="bg-slate-950/50 p-6 rounded-2xl border border-slate-800/60 text-xs text-slate-300 leading-relaxed space-y-3">
                <h3 className="font-bold text-emerald-400 text-sm">Sarah’s Life in Canada</h3>
                <p>Sarah is 36 years old, and she lives in Canada. She has two young daughters. She works two days a week as a teacher. Her husband’s name is Nathan, and he’s a sales manager. Nathan’s job is very busy, so he often comes home late. At weekends, they often go driving or walking in the countryside. Nathan was born in Canada, but Sarah wasn’t. She was born in Argentina, and she moved to Canada when she was 26...</p>
                <p className="text-slate-500 italic">[Mətnin qalan hissəsi standart imtahan bazasındadır]</p>
              </div>

              <div className="space-y-6">
                {readingQuestions.map((item) => (
                  <div key={item.id} className="bg-slate-950/60 p-5 rounded-2xl border border-slate-800 space-y-3">
                    <p className="text-sm font-bold text-white">{item.q}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {item.options.map((opt, optIdx) => (
                        <button
                          key={optIdx}
                          onClick={() => handleSelect(item.id, optIdx)}
                          className={`w-full text-left px-4 py-3 rounded-xl text-xs font-medium transition border ${
                            answers[item.id] === optIdx
                              ? "bg-emerald-600 border-emerald-500 text-white font-bold"
                              : "bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PAGE 3: LISTENING */}
          {activeTab === 3 && (
            <div className="space-y-6">
              <h2 className="text-base font-black text-white uppercase tracking-wider">Part 3: Listening Test (Oxford Online English)</h2>
              
              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-2xl text-xs text-emerald-300">
                🔊 Audio simulyasiyası aktivdir. Sualları dinləyərək cavablandırın.
              </div>

              <div className="space-y-6">
                {listeningQuestions.map((item) => (
                  <div key={item.id} className="bg-slate-950/60 p-5 rounded-2xl border border-slate-800 space-y-3">
                    <p className="text-sm font-bold text-white">{item.q}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {item.options.map((opt, optIdx) => (
                        <button
                          key={optIdx}
                          onClick={() => handleSelect(item.id, optIdx)}
                          className={`w-full text-left px-4 py-3 rounded-xl text-xs font-medium transition border ${
                            answers[item.id] === optIdx
                              ? "bg-emerald-600 border-emerald-500 text-white font-bold"
                              : "bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Back / Next / Submit Controls */}
          <div className="flex justify-between items-center pt-6 border-t border-slate-800">
            <button
              onClick={() => setActiveTab((prev) => Math.max(1, prev - 1))}
              disabled={activeTab === 1}
              className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 font-bold text-xs border border-slate-700 transition"
            >
              ← Back
            </button>

            {activeTab < 3 ? (
              <button
                onClick={() => setActiveTab((prev) => Math.min(3, prev + 1))}
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition shadow-lg"
              >
                Next →
              </button>
            ) : (
              <button
                onClick={handleSubmitTest}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:opacity-90 text-white font-black text-xs transition shadow-xl"
              >
                İmtahanı Bitir və Nəticəni Öyrən 🎯
              </button>
            )}
          </div>

        </div>

      </div>
    </main>
  );
}