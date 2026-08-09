"use client";
import { useState, useEffect, use } from "react";
import Link from "next/link";
import ProgressCalendar from "../../components/ProgressCalendar";

export default function ReadingLevelPage({ params }: { params: Promise<{ level: string }> }) {
  const resolvedParams = use(params);
  const level = resolvedParams.level.toUpperCase();
  
  const [activeDay, setActiveDay] = useState<number>(1);
  const [completedDays, setCompletedDays] = useState<number[]>([]);
  
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    const saved = localStorage.getItem(`reading_${level}_progress`);
    if (saved) {
      try {
        setCompletedDays(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, [level]);

  // Hər səviyyəyə (A1-C2) və günə uyğun xüsusi, fərqli mətnlər
  const getDayContent = (lvl: string, day: number) => {
    switch (lvl) {
      case "A1":
        return {
          title: `Day ${day}: My Daily Routine & Family`,
          text: `Hello! My name is Alex. Every day, I wake up at 7 o'clock in the morning. I wash my face, brush my teeth, and eat a healthy breakfast with my family. I usually eat eggs and drink orange juice. After breakfast, I walk to school because my school is near my house. My favorite subject is English, and I like reading short stories. In the afternoon, I play football with my friends in the park. In the evening, I do my homework and help my mother cook dinner. We go to sleep at 10 PM.`,
          vocabulary: [
            { term: "Routine", def: "A sequence of actions regularly followed." },
            { term: "Healthy", def: "Good for your health and body." },
            { term: "Subject", def: "A branch of knowledge studied at school." }
          ],
          questions: [
            { id: 1, question: "What time does Alex wake up in the morning?", options: ["A) 6 o'clock", "B) 7 o'clock", "C) 8 o'clock"], correct: 1 },
            { id: 2, question: "What does Alex usually drink for breakfast?", options: ["A) Milk", "B) Coffee", "C) Orange juice"], correct: 2 },
            { id: 3, question: "How does Alex go to school?", options: ["A) By bus", "B) By car", "C) On foot (walks)"], correct: 2 },
            { id: 4, question: "What is Alex's favorite subject?", options: ["A) Math", "B) English", "C) Science"], correct: 1 },
            { id: 5, question: "What does Alex do in the afternoon?", options: ["A) Plays football in the park", "B) Watches TV at home", "C) Swims in the pool"], correct: 0 },
            { id: 6, question: "Who does Alex help in the evening?", options: ["A) His father", "B) His mother", "C) His teacher"], correct: 1 },
            { id: 7, question: "What time does Alex go to sleep?", options: ["A) 9 PM", "B) 10 PM", "C) 11 PM"], correct: 1 },
            { id: 8, question: "What does 'Routine' mean?", options: ["A) A new game", "B) Regular actions followed", "C) A type of food"], correct: 1 },
            { id: 9, question: "Where does Alex play football?", options: ["A) At school", "B) In the park", "C) On the street"], correct: 1 },
            { id: 10, question: "What does Alex eat for breakfast?", options: ["A) Eggs and orange juice", "B) Pizza and cola", "C) Soup and bread"], correct: 0 }
          ]
        };
      case "A2":
        return {
          title: `Day ${day}: Planning a Weekend Trip`,
          text: `Last week, Sarah and her friends decided to plan a weekend trip to the mountains. They wanted to escape the noisy city life and spend two days in nature. Sarah checked the weather forecast, and it showed sunny weather for Saturday and Sunday. They packed their backpacks with warm clothes, comfortable hiking boots, delicious snacks, and a large tent. On Saturday morning, they took an early train to the countryside. When they arrived, they set up their camp near a clear, blue lake. In the afternoon, they explored a forest trail and took many wonderful photographs of wild animals and colorful flowers. At night, they sat around a warm campfire, told funny stories, and looked at the bright stars in the sky. It was an unforgettable experience for all of them.`,
          vocabulary: [
            { term: "Escape", def: "Break free from confinement or control." },
            { term: "Explore", def: "Travel through an unfamiliar area in order to learn about it." },
            { term: "Unforgettable", def: "Impossible to forget; very memorable." }
          ],
          questions: [
            { id: 1, question: "Where did Sarah and her friends plan to go?", options: ["A) To the beach", "B) To the mountains", "C) To a big city"], correct: 1 },
            { id: 2, question: "What was the weather forecast for the weekend?", options: ["A) Rainy and cold", "B) Snowy and windy", "C) Sunny"], correct: 2 },
            { id: 3, question: "How did they travel to the countryside?", options: ["A) By train", "B) By bus", "C) By car"], correct: 0 },
            { id: 4, question: "Where did they set up their camp?", options: ["A) Near a city mall", "B) Near a blue lake", "C) Inside a deep cave"], correct: 1 },
            { id: 5, question: "What did they do in the afternoon?", options: ["A) Explored a forest trail", "B) Went swimming in the river", "C) Slept in the tent all day"], correct: 0 },
            { id: 6, question: "What did they do at night?", options: ["A) Watched a movie", "B) Sat around a campfire", "C) Went fishing"], correct: 1 },
            { id: 7, question: "What did they pack in their backpacks?", options: ["A) Laptops and books", "B) Warm clothes, boots, snacks, and a tent", "C) Swimming suits and towels"], correct: 1 },
            { id: 8, question: "What does 'Escape' mean?", options: ["A) To run away or break free", "B) To build a house", "C) To buy tickets"], correct: 0 },
            { id: 9, question: "What does 'Explore' mean?", options: ["A) To destroy something", "B) To travel and learn about an area", "C) To cook food"], correct: 1 },
            { id: 10, question: "How did they feel about the trip?", options: ["A) It was boring", "B) It was unforgettable", "C) It was terrible"], correct: 1 }
          ]
        };
      case "B1":
        return {
          title: `Day ${day}: The Impact of Technology on Daily Communication`,
          text: `In the twenty-first century, digital technology has fundamentally transformed how human beings interact, work, and maintain social relationships. Smartphones, social networking platforms, and instant messaging apps allow individuals to bridge geographical distances within seconds. While previous generations relied heavily on physical letters and landline telephones, modern society benefits from seamless, real-time global connectivity. However, psychologists often debate whether this hyper-connectivity enhances or diminishes genuine human bonding. On one hand, video calls enable families separated across continents to stay closely connected. On the other hand, excessive screen time can lead to reduced face-to-face social skills and feelings of isolation. Striking a healthy balance between digital engagement and real-world interactions remains one of the major challenges of our modern era.`,
          vocabulary: [
            { term: "Fundamentally", def: "In central or primary respects; essentially." },
            { term: "Geographical", def: "Based on or relating to geography or distance." },
            { term: "Diminish", def: "Make or become less." }
          ],
          questions: [
            { id: 1, question: "What has digital technology fundamentally transformed in the 21st century?", options: ["A) Agricultural methods", "B) Human communication and relationships", "C) Global weather patterns"], correct: 1 },
            { id: 2, question: "How did previous generations communicate across distances?", options: ["A) Via instant video messaging", "B) Using physical letters and landlines", "C) Through satellite communication"], correct: 1 },
            { id: 3, question: "What is one major advantage of modern connectivity?", options: ["A) Eliminating the need to speak languages", "B) Real-time global connectivity across distances", "C) Completely stopping all conflicts"], correct: 1 },
            { id: 4, question: "What do psychologists debate regarding hyper-connectivity?", options: ["A) Its cost effectiveness", "B) Whether it enhances or diminishes human bonding", "C) Its impact on computer hardware"], correct: 1 },
            { id: 5, question: "What is a positive outcome of video calls mentioned in the text?", options: ["A) Helping families separated across continents stay connected", "B) Reducing electricity consumption", "C) Improving physical fitness"], correct: 0 },
            { id: 6, question: "What can excessive screen time potentially lead to?", options: ["A) Better mathematical skills", "B) Reduced face-to-face social skills and isolation", "C) Higher reading speeds"], correct: 1 },
            { id: 7, question: "What is described as a major challenge of our modern era?", options: ["A) Finding faster internet providers", "B) Striking a balance between digital and real-world interactions", "C) Eliminating smartphones completely"], correct: 1 },
            { id: 8, question: "What does 'Fundamentally' mean?", options: ["A) Superficially", "B) Essentially / in central respects", "C) Temporarily"], correct: 1 },
            { id: 9, question: "What does 'Diminish' mean?", options: ["A) To increase or grow", "B) To make or become less", "C) To remain stable"], correct: 1 },
            { id: 10, question: "What is the overall tone of the passage regarding technology?", options: ["A) Completely negative and pessimistic", "B) Balanced, examining both pros and cons", "C) Purely promotional for phone companies"], correct: 1 }
          ]
        };
      case "B2":
        return {
          title: `Day ${day}: Environmental Sustainability and Renewable Energy Transitions`,
          text: `The global transition from fossil fuels to renewable energy sources has emerged as one of the most critical socio-economic imperatives of our time. As industrial carbon emissions continue to exacerbate climate change, governments and corporations are heavily investing in solar, wind, and hydroelectric power infrastructures. Nevertheless, moving away from conventional energy grids presents complex engineering and financial challenges. Energy storage limitations, grid modernization requirements, and high initial capital investments often slow down the implementation process. Despite these obstacles, technological advancements in battery efficiency and photovoltaic cells are steadily improving economic viability. Furthermore, public awareness campaigns encourage citizens to adopt sustainable habits, demonstrating that collective grassroots efforts combined with institutional policy changes can yield substantial long-term ecological benefits.`,
          vocabulary: [
            { term: "Imperative", def: "Of vital importance; crucial." },
            { term: "Exacerabate", def: "Make a problem or bad situation worse." },
            { term: "Viability", def: "The ability to work successfully or survive sustainably." }
          ],
          questions: [
            { id: 1, question: "What has emerged as a critical global socio-economic imperative?", options: ["A) Space colonization", "B) Transitioning from fossil fuels to renewables", "C) Expanding traditional oil pipelines"], correct: 1 },
            { id: 2, question: "What do industrial carbon emissions contribute to?", options: ["A) Economic stability", "B) Exacerbating climate change", "C) Improving agricultural yields"], correct: 1 },
            { id: 3, question: "Why is moving away from conventional energy grids difficult?", options: ["A) Due to engineering, storage, and financial challenges", "B) Because renewable energy does not exist", "C) Because public demand is zero"], correct: 0 },
            { id: 4, question: "What technological advancements are improving economic viability?", options: ["A) Paper manufacturing and printing", "B) Battery efficiency and photovoltaic cells", "C) Mechanical clockwork mechanisms"], correct: 1 },
            { id: 5, question: "What role do public awareness campaigns play?", options: ["A) They encourage citizens to adopt sustainable habits", "B) They promote higher fossil fuel consumption", "C) They discourage scientific research"], correct: 0 },
            { id: 6, question: "What does combination of grassroots efforts and policy changes yield?", options: ["A) Short-term financial loss", "B) Substantial long-term ecological benefits", "C) Increased carbon emissions"], correct: 1 },
            { id: 7, question: "What does 'Imperative' mean?", options: ["A) Unimportant or trivial", "B) Of vital importance; crucial", "C) Temporary and optional"], correct: 1 },
            { id: 8, question: "What does 'Viability' refer to in this context?", options: ["A) The ability to work successfully and sustainably", "B) The physical weight of solar panels", "C) The speed of wind turbines"], correct: 0 },
            { id: 9, question: "What hinders the rapid implementation of renewable systems?", options: ["A) High initial capital investments and storage limits", "B) Excessively sunny weather", "C) Lack of interest from engineers"], correct: 0 },
            { id: 10, question: "What is the primary message of the text?", options: ["A) Renewable transition is challenging yet vital and progressing", "B) Fossil fuels are the only viable future", "C) Environmental policies are completely useless"], correct: 0 }
          ]
        };
      case "C1":
        return {
          title: `Day ${day}: Cognitive Biases in Decision-Making and Economic Behavior`,
          text: `Behavioral economics and cognitive psychology have profoundly reshaped our understanding of human rationality, challenging the classical economic assumption that individuals always act as perfectly rational maximizers. Research pioneered by notable cognitive scientists reveals that human decision-making is systematically influenced by heuristic mental shortcuts and cognitive biases. Confirmation bias, anchoring effects, and loss aversion frequently skew objective risk assessment in financial markets, corporate boardrooms, and everyday choices. For instance, confirmation bias leads individuals to selectively process information that aligns with pre-existing beliefs while discounting contradictory evidence. Recognizing these mental blind spots is essential not only for improving individual judgment but also for designing robust institutional safeguards that mitigate systemic economic volatility and irrational market exuberance.`,
          vocabulary: [
            { term: "Heuristic", def: "Enabling a person to discover or learn something for themselves (mental shortcut)." },
            { term: "Aversion", def: "A strong dislike or opposing inclination (e.g., loss aversion)." },
            { term: "Exuberance", def: "The quality of being full of energy, excitement, or over-optimism." }
          ],
          questions: [
            { id: 1, question: "What classical economic assumption has behavioral research challenged?", options: ["A) That humans are always perfectly rational maximizers", "B) That markets never fluctuate in value", "C) That money is the only motivator"], correct: 0 },
            { id: 2, question: "What systematically influences human decision-making according to scientists?", options: ["A) Random coin tosses", "B) Heuristic mental shortcuts and cognitive biases", "C) Strict mathematical algorithms only"], correct: 1 },
            { id: 3, question: "How does confirmation bias affect information processing?", options: ["A) It makes people process all data equally", "B) It leads individuals to favor data matching pre-existing beliefs", "C) It completely eliminates memory retention"], correct: 1 },
            { id: 4, question: "Where do anchoring effects and loss aversion skew objective risk assessment?", options: ["A) Only in laboratory card games", "B) In financial markets, boardrooms, and everyday choices", "C) Exclusively in ancient history"], correct: 1 },
            { id: 5, question: "Why is recognizing cognitive blind spots important?", options: ["A) To improve judgment and design institutional safeguards", "B) To increase market exuberance", "C) To eliminate all economic activity"], correct: 0 },
            { id: 6, question: "What does loss aversion describe?", options: ["A) The preference of avoiding losses over acquiring equivalent gains", "B) The tendency to lose money on purpose", "C) Joy experienced during economic crashes"], correct: 0 },
            { id: 7, question: "What does 'Heuristic' mean in cognitive psychology?", options: ["A) A complex mathematical formula", "B) A practical mental shortcut for problem-solving", "C) A permanent brain injury"], correct: 1 },
            { id: 8, question: "What is 'Exuberance' associated with in market contexts?", options: ["A) Extreme pessimism and panic", "B) Over-optimism and inflated asset values", "C) Absolute regulatory silence"], correct: 1 },
            { id: 9, question: "What do institutional safeguards aim to mitigate?", options: ["A) Systemic economic volatility and irrationality", "B) Scientific research funding", "C) Technological innovation"], correct: 0 },
            { id: 10, question: "What is the core conclusion of the passage?", options: ["A) Human rationality is flawless", "B) Biases skew decisions, making awareness and safeguards essential", "C) Economics has no relation to psychology"], correct: 1 }
          ]
        };
      case "C2":
      default:
        return {
          title: `Day ${day}: Epistemological Frameworks in Post-Modern Philosophical Discourse`,
          text: `Contemporary epistemology is characterized by an intricate deconstruction of foundationalist paradigms, ushering in an era of pluralistic justification models and radical contextualism. Philosophers scrutinize the demarcation criteria between empirical validation and socially constructed reality, questioning the ontological status of objective truth in hyper-mediated environments. As hermeneutic circles intersect with analytical philosophy, the traditional tripartite definition of knowledge—justified true belief—faces rigorous scrutiny from Gettier-type counterexamples and pragmatic skepticism. Navigating these labyrinthine intellectual terrains demands an uncompromising commitment to rigorous dialectical analysis, transcending dogmatic assertions to embrace a nuanced, self-correcting appreciation of human intellect and its inherent interpretive limitations.`,
          vocabulary: [
            { term: "Epistemology", def: "The philosophical study of the nature, origin, and limits of human knowledge." },
            { term: "Ontological", def: "Relating to the branch of metaphysics dealing with the nature of being." },
            { term: "Dialectical", def: "Relating to the logical discussion of ideas and opinions." }
          ],
          questions: [
            { id: 1, question: "What characterizes contemporary epistemology according to the text?", options: ["A) Strict adherence to ancient dogmas", "B) Deconstruction of foundationalist paradigms and pluralistic justification", "C) Complete abandonment of logic"], correct: 1 },
            { id: 2, question: "What do philosophers scrutinize in hyper-mediated environments?", options: ["A) The demarcation between empirical validation and constructed reality", "B) Digital file compression formats", "C) Elementary school curriculum"], correct: 0 },
            { id: 3, question: "What traditional definition of knowledge faces rigorous scrutiny?", options: ["A) Memorized factual data", "B) The tripartite definition of justified true belief", "C) Empirical mathematics"], correct: 1 },
            { id: 4, question: "What kind of counterexamples challenge standard knowledge definitions?", options: ["A) Gettier-type counterexamples", "B) Algebraic equations", "C) Statistical outliers"], correct: 0 },
            { id: 5, question: "What does navigating labyrinthine intellectual terrains demand?", options: ["A) Uncompromising commitment to rigorous dialectical analysis", "B) Superficial reading habits", "C) Dogmatic acceptance of theories"], correct: 0 },
            { id: 6, question: "What is the primary focus of 'Epistemology'?", options: ["A) The study of physical universe origins", "B) The nature, origin, and limits of human knowledge", "C) The laws of planetary motion"], correct: 1 },
            { id: 7, question: "What does 'Ontological' relate to?", options: ["A) The nature of being and existence", "B) The financial cost of books", "C) The structure of computer languages"], correct: 0 },
            { id: 8, question: "What is 'Dialectical analysis'?", options: ["A) Logical discussion and critical examination of ideas", "B) Translating texts between languages", "C) Memorizing historical dates"], correct: 0 },
            { id: 9, question: "How does the passage view human interpretive limitations?", options: ["A) As something to be embraced with a self-correcting appreciation", "B) As flaws that can be permanently eradicated", "C) As irrelevant to philosophy"], correct: 0 },
            { id: 10, question: "What is the overarching theme of this advanced discourse?", options: ["A) The complexity and shifting nature of knowledge justification", "B) The simplicity of everyday communication", "C) The history of printing presses"], correct: 0 }
          ]
        };
    }
  };

  const currentData = getDayContent(level, activeDay);

  const handleOptionSelect = (qId: number, optIndex: number) => {
    if (isSubmitted) return;
    // Eğer istifadəçi artıq seçdiyi varianta bir də klikləyirsə, cavabı ləğv et (boşalt)
    if (selectedAnswers[qId] === optIndex) {
      const updated = { ...selectedAnswers };
      delete updated[qId];
      setSelectedAnswers(updated);
    } else {
      setSelectedAnswers({ ...selectedAnswers, [qId]: optIndex });
    }
  };

  const handleSubmitTest = () => {
    let correctCount = 0;
    currentData.questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correct) {
        correctCount++;
      }
    });

    setScore(correctCount);
    setIsSubmitted(true);

    if (correctCount >= 7 && !completedDays.includes(activeDay)) {
      const updated = [...completedDays, activeDay];
      setCompletedDays(updated);
      localStorage.setItem(`reading_${level}_progress`, JSON.stringify(updated));
    }
  };

  const handleRetry = () => {
    setIsSubmitted(false);
    setSelectedAnswers({});
  };

  const handleNextDay = () => {
    setIsSubmitted(false);
    setSelectedAnswers({});
    setActiveDay(activeDay + 1);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 md:p-16 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex justify-between items-center bg-slate-900 p-6 rounded-3xl border border-white/10 shadow-xl">
          <Link href="/" className="text-blue-400 font-bold hover:underline text-sm">← Main Menu</Link>
          <h1 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
            {level} Level • Reading Module
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <ProgressCalendar 
              currentLevel={level} 
              completedDays={completedDays} 
              activeDay={activeDay} 
              onSelectDay={(day: number) => {
                setActiveDay(day);
                setIsSubmitted(false);
                setSelectedAnswers({});
              }} 
            />
          </div>

          <div className="lg:col-span-2 space-y-8">
            <div className="p-8 bg-slate-900 rounded-3xl border border-white/10 space-y-6 shadow-2xl">
              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <h2 className="text-xl md:text-2xl font-black text-white">{currentData.title}</h2>
                <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold border border-blue-500/30">
                  DAY {activeDay}
                </span>
              </div>
              
              <div className="text-gray-300 text-sm md:text-base leading-relaxed">
                <p>{currentData.text}</p>
              </div>

              <div className="bg-slate-950/60 p-6 rounded-2xl border border-white/5 space-y-3">
                <h3 className="text-xs font-extrabold text-cyan-400 uppercase tracking-wider">Vocabulary & Expressions:</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {currentData.vocabulary.map((vocab, idx) => (
                    <div key={idx} className="bg-white/5 p-3 rounded-xl border border-white/5 text-xs space-y-1">
                      <strong className="text-white block">{vocab.term}</strong>
                      <span className="text-gray-400 text-[11px]">{vocab.def}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-8 bg-slate-900 rounded-3xl border border-white/10 space-y-8 shadow-2xl">
              <div className="border-b border-white/10 pb-4">
                <h3 className="text-xl font-bold">10-Question Reading Test</h3>
                <p className="text-xs text-gray-400 mt-1">You need at least 7 correct answers to unlock the next day. (Click selected option again to deselect).</p>
              </div>

              <div className="space-y-6">
                {currentData.questions.map((q, qIndex) => (
                  <div key={q.id} className="p-5 bg-slate-950/60 rounded-2xl border border-white/5 space-y-3">
                    <p className="text-sm font-bold text-gray-200">
                      {qIndex + 1}. {q.question}
                    </p>
                    <div className="grid grid-cols-1 gap-2">
                      {q.options.map((opt, optIndex) => {
                        const isSelected = selectedAnswers[q.id] === optIndex;
                        return (
                          <button
                            key={optIndex}
                            disabled={isSubmitted}
                            onClick={() => handleOptionSelect(q.id, optIndex)}
                            className={`p-3 rounded-xl text-xs font-bold text-left transition border ${
                              isSelected
                                ? "bg-blue-600 border-blue-400 text-white shadow-md"
                                : "bg-white/5 border-white/10 text-gray-300 hover:border-blue-500/50"
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {!isSubmitted ? (
                <button
                  onClick={handleSubmitTest}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-black text-sm hover:opacity-90 transition shadow-xl"
                >
                  Submit Answers
                </button>
              ) : (
                <div className="p-6 bg-slate-950 rounded-2xl border border-white/10 text-center space-y-4">
                  <p className="text-lg font-bold">
                    Your Score: <span className={score >= 7 ? "text-green-400" : "text-yellow-400"}>{score} / 10</span>
                  </p>
                  <p className="text-xs text-gray-400">
                    {score >= 7 
                      ? "🎉 Congratulations! You successfully passed this day and unlocked the next one." 
                      : "⚠️ You scored less than 7. You can retry the test to improve your score!"}
                  </p>
                  <div className="flex justify-center gap-4 pt-2">
                    <button
                      onClick={handleRetry}
                      className="px-6 py-3 rounded-xl bg-slate-800 text-white font-bold text-xs hover:bg-slate-700 transition shadow-lg border border-white/10"
                    >
                      🔄 Retry Test
                    </button>
                    {score >= 7 && activeDay < 60 && (
                      <button
                        onClick={handleNextDay}
                        className="px-6 py-3 rounded-xl bg-green-600 text-white font-bold text-xs hover:bg-green-500 transition shadow-lg"
                      >
                        Next Day (Day {activeDay + 1}) →
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}