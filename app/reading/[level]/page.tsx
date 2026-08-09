"use client";
import { useState, useEffect, use } from "react";
import Link from "next/link";
import ProgressCalendar from "../../components/ProgressCalendar";

export default function ReadingLevelPage({ params }: { params: Promise<{ level: string }> }) {
  const resolvedParams = use(params);
  const rawLevel = resolvedParams.level.toUpperCase();
  const isSpecialExam = rawLevel === "SAT" || rawLevel === "IELTS";
  const level = isSpecialExam ? rawLevel : rawLevel;
  
  const [activeDay, setActiveDay] = useState<number>(1);
  const [completedDays, setCompletedDays] = useState<number[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    const saved = localStorage.getItem(`reading_${level}_progress`);
    if (saved) {
      try { setCompletedDays(JSON.parse(saved)); } catch (e) { console.error(e); }
    }
  }, [level]);

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
          title: `Day ${day}: Environmental Sustainability and Renewable Transitions`,
          text: `The global imperative to transition from fossil-fuel-dependent economies to renewable energy infrastructures has emerged as one of the defining socio-economic challenges of the twenty-first century. As industrial carbon emissions persistently exacerbate global climate anomalies, international governing bodies, corporate entities, and scientific consortia are heavily investing in solar photovoltaic arrays, offshore wind farms, and advanced hydroelectric grids. Nevertheless, migrating away from conventional centralized energy distribution introduces a myriad of intricate engineering and financial hurdles. Intermittent power generation, massive energy storage capacity constraints, and staggering initial capital expenditures frequently impede the velocity of widespread implementation. Furthermore, policymakers face the delicate task of managing labor market dislocations within traditional fossil fuel sectors, ensuring an equitable socio-economic transition for vulnerable regional communities.`,
          vocabulary: [
            { term: "Consortium", def: "An association pooling resources." },
            { term: "Dislocation", def: "Disturbance from a proper or usual place or state." },
            { term: "Synergistic", def: "Working together cooperatively." }
          ],
          questions: [
            { id: 1, question: "What has the transition to renewable energy emerged as?", options: ["A) A minor local policy adjustment", "B) A defining socio-economic challenge of the 21st century", "C) A temporary corporate marketing strategy"], correct: 1 },
            { id: 2, question: "What are scientific consortia and governments investing in?", options: ["A) Coal extraction machinery", "B) Solar arrays, offshore wind farms, and hydroelectric grids", "C) Internal combustion engine development"], correct: 1 },
            { id: 3, question: "What specific hurdles impede rapid implementation?", options: ["A) Intermittent power, storage constraints, and high capital expenditures", "B) Total lack of sunlight across the planet", "C) Complete absence of engineering expertise"], correct: 0 },
            { id: 4, question: "What labor market issue must policymakers manage?", options: ["A) Massive job shortages in software tech", "B) Labor market dislocations within traditional fossil fuel sectors", "C) Excessive wages for renewable engineers"], correct: 1 },
            { id: 5, question: "What scientific fields are elevating commercial viability?", options: ["A) Battery chemistry, smart-grid automation, and material science", "B) Mechanical clockwork engineering", "C) Traditional paper manufacturing"], correct: 0 },
            { id: 6, question: "What does 'Consortium' mean?", options: ["A) An isolated enterprise", "B) An association of companies pooling resources", "C) A government tax agency"], correct: 1 },
            { id: 7, question: "What does 'Dislocation' refer to?", options: ["A) Geographical relocation", "B) Economic disturbance and job displacement", "C) Bone fractures"], correct: 1 },
            { id: 8, question: "What does 'Synergistic' signify?", options: ["A) Working together for an enhanced effect", "B) Competing aggressively", "C) Working in isolation"], correct: 0 },
            { id: 9, question: "What factors will dictate ecological success?", options: ["A) Grassroots advocacy combined with institutional reforms", "B) Total deregulation", "C) Halting research"], correct: 0 },
            { id: 10, question: "What is the tone of this passage?", options: ["A) Analytical and progressive", "B) Dismissive", "C) Promotional"], correct: 0 }
          ]
        };
      case "C1":
        return {
          title: `Day ${day}: Advanced Discourse on Behavioral Economics and Cognitive Biases`,
          text: `Behavioral economics has fundamentally revolutionized our comprehension of human rationality, systematically challenging the classical economic axiom that individuals invariably operate as utility-maximizing, perfectly rational agents. Pioneering scholarship in cognitive psychology demonstrates that decision-making architectures are heavily mediated by heuristic mental shortcuts and implicit cognitive biases. Confirmation bias, anchoring heuristics, and asymmetric loss aversion chronically skew objective risk appraisal across financial markets, corporate governance boards, and daily consumer behavior. Recognizing these psychological blind spots is paramount not only for refining individual analytical judgment but also for engineering robust institutional safeguards that mitigate systemic macroeconomic volatility.`,
          vocabulary: [
            { term: "Axiom", def: "A self-evident proposition." },
            { term: "Appraisal", def: "An act of evaluating something." },
            { term: "Contagion", def: "The spreading of a mood or idea." }
          ],
          questions: [
            { id: 1, question: "What classical economic axiom has behavioral economics challenged?", options: ["A) That humans always act as perfectly rational maximizers", "B) That prices never fluctuate", "C) That money is everything"], correct: 0 },
            { id: 2, question: "What mediates human decision-making structures?", options: ["A) Pure algorithms", "B) Heuristic mental shortcuts and cognitive biases", "C) Random impulses"], correct: 1 },
            { id: 3, question: "How does confirmation bias affect data processing?", options: ["A) Total neutrality", "B) Favoring evidence corroborating pre-existing hypotheses", "C) Erasing memory"], correct: 1 },
            { id: 4, question: "What can market exuberance cause?", options: ["A) Inflation of asset bubbles beyond intrinsic values", "B) Market stability", "C) Economic stagnation"], correct: 0 },
            { id: 5, question: "Why is identifying cognitive blind spots critical?", options: ["A) For refining judgment and institutional safeguards", "B) To maximize confusion", "C) To eliminate banks"], correct: 0 },
            { id: 6, question: "What does 'Axiom' mean?", options: ["A) Proven false", "B) A self-evident foundational proposition", "C) A hypothesis"], correct: 1 },
            { id: 7, question: "What does 'Appraisal' mean?", options: ["A) Evaluation or assessment", "B) Avoidance", "C) Loss"], correct: 0 },
            { id: 8, question: "What does 'Contagion' signify?", options: ["A) Spreading of ideas across participants", "B) Virus outbreaks", "C) Supervision"], correct: 0 },
            { id: 9, question: "What does loss aversion involve?", options: ["A) Preferring to avoid losses over equivalent gains", "B) Seeking risk", "C) Indifference"], correct: 0 },
            { id: 10, question: "What is the principal conclusion?", options: ["A) Psychological biases distort economic decisions, making awareness vital", "B) Humans are logical calculators", "C) No connection"], correct: 0 }
          ]
        };
      case "SAT":
        return {
          title: `Day ${day}: Elite SAT Evidence-Based Reading & Rhetorical Analysis Panel`,
          text: `SAT Elite Module: Passage 1 examines the implementation of automated algorithmic decision-making in legal systems. Proponents argue it reduces human prejudice, while critics warn of historical biases embedded in training datasets. Passage 2 suggests that human judges also suffer from cognitive fatigue and emotional inconsistencies. The optimal path forward involves strict regulatory auditing, structural transparency, and mandatory human-in-the-loop oversight to ensure true equity in modern judicial administration.`,
          vocabulary: [
            { term: "Profiling", def: "Analysis of behavioral patterns." },
            { term: "Contend", def: "To assert a position in an argument." },
            { term: "Auditing", def: "Official inspection of processes." }
          ],
          questions: [
            { id: 1, question: "What is the primary focus of Passage 1?", options: ["A) Computer hardware costs", "B) Ethical debate surrounding algorithmic profiling in justice", "C) History of courts"], correct: 1 },
            { id: 2, question: "What do proponents claim machine learning minimizes?", options: ["A) Human prejudice and inconsistency", "B) Internet speeds", "C) Taxes"], correct: 0 },
            { id: 3, question: "What is the main criticism against algorithms?", options: ["A) They process slowly", "B) They are trained on biased datasets", "C) Power usage"], correct: 1 },
            { id: 4, question: "What do human judges exhibit according to Passage 2?", options: ["A) Perfect precision", "B) Fatigue, emotional bias, and inconsistencies", "C) Immunity"], correct: 1 },
            { id: 5, question: "What solution do researchers advocate?", options: ["A) Total automation", "B) Rigorous auditing, transparency, and human oversight", "C) Banning computers"], correct: 1 },
            { id: 6, question: "What does 'Contend' mean?", options: ["A) To agree", "B) To assert a position", "C) To surrender"], correct: 1 },
            { id: 7, question: "What does 'Auditing' involve?", options: ["A) Official inspection and evaluation", "B) Bankruptcy", "C) Music review"], correct: 0 },
            { id: 8, question: "How do passages relate?", options: ["A) Refutes completely", "B) Qualifies and offers solutions", "C) Unrelated"], correct: 1 },
            { id: 9, question: "What illusion does algorithmic neutrality create?", options: ["A) Discrimination is eliminated while persisting", "B) Computers live", "C) Faster trials"], correct: 0 },
            { id: 10, question: "What is the core objective of SAT reading?", options: ["A) Test analytical reasoning and evidence synthesis", "B) Test fiction", "C) Memorize words"], correct: 0 }
          ]
        };
      case "IELTS":
      default:
        return {
          title: `Day ${day}: Elite IELTS Academic Reading: Urban Megacity Expansion`,
          text: `IELTS Elite Masterclass: Global urbanization has driven the rise of megacities exceeding ten million residents. Triggered by rural-to-urban migration for employment and education, this phenomenon strains municipal infrastructures, causing acute housing deficits and air pollution. Planners advocate for smart-city frameworks, efficient public transit, and green architecture to ensure sustainable metropolitan evolution and prevent unmitigated urban sprawl.`,
          vocabulary: [
            { term: "Agglomeration", def: "An extended collection coming together." },
            { term: "Precipitate", def: "Cause to happen suddenly." },
            { term: "Municipal", def: "Relating to city governance." }
          ],
          questions: [
            { id: 1, question: "What defines a megacity?", options: ["A) Over ten million inhabitants", "B) No cars", "C) Glass buildings"], correct: 0 },
            { id: 2, question: "What is the primary driver of migration?", options: ["A) Farming", "B) Jobs, education, and healthcare", "C) Forced relocation"], correct: 1 },
            { id: 3, question: "What strain does the influx place on cities?", options: ["A) Strain on municipal services, housing, and traffic", "B) Electricity surplus", "C) Open spaces"], correct: 0 },
            { id: 4, question: "What solutions do planners emphasize?", options: ["A) Smart-city tech, public transit, and green architecture", "B) Demolishing tall buildings", "C) Stopping migration"], correct: 0 },
            { id: 5, question: "What risk do cities face if they fail?", options: ["A) Uninhabitable urban sprawls", "B) Farming villages", "C) Sinking"], correct: 0 },
            { id: 6, question: "What does 'Agglomeration' mean?", options: ["A) Scattered wasteland", "B) An extended collection coming together", "C) Isolated building"], correct: 1 },
            { id: 7, question: "What does 'Precipitate' mean?", options: ["A) To cause to happen suddenly", "B) To delay", "C) To calculate"], correct: 0 },
            { id: 8, question: "What does 'Municipal' relate to?", options: ["A) Military", "B) City or town governing bodies", "C) Trade agreements"], correct: 1 },
            { id: 9, question: "What is the consequence for air quality?", options: ["A) Degraded and polluted", "B) Pristine", "C) Unaffected"], correct: 0 },
            { id: 10, question: "What is the primary purpose of IELTS Academic reading?", options: ["A) Evaluate academic comprehension of global phenomena", "B) Entertain", "C) Teach alphabet"], correct: 0 }
          ]
        };
    }
  };

  const currentData = getDayContent(level, activeDay);

  const handleOptionSelect = (qId: number, optIndex: number) => {
    if (isSubmitted) return;
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
      if (selectedAnswers[q.id] === q.correct) correctCount++;
    });
    setScore(correctCount);
    setIsSubmitted(true);
    if (correctCount >= 7 && !completedDays.includes(activeDay)) {
      const updated = [...completedDays, activeDay];
      setCompletedDays(updated);
      localStorage.setItem(`reading_${level}_progress`, JSON.stringify(updated));
    }
  };

  const handleRetry = () => { setIsSubmitted(false); setSelectedAnswers({}); };
  const handleNextDay = () => { setIsSubmitted(false); setSelectedAnswers({}); setActiveDay(activeDay + 1); };

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 md:p-16 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex justify-between items-center bg-slate-900 p-6 rounded-3xl border border-white/10 shadow-xl">
          <Link href="/" className="text-blue-400 font-bold hover:underline text-sm">← Main Menu</Link>
          <h1 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
            {isSpecialExam ? `${level} Elite Preparation Panel` : `${level} Level • Reading Module`}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <ProgressCalendar 
              currentLevel={level} 
              completedDays={completedDays} 
              activeDay={activeDay} 
              onSelectDay={(day: number) => { setActiveDay(day); setIsSubmitted(false); setSelectedAnswers({}); }} 
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
              
              <div className="text-gray-300 text-sm md:text-base leading-relaxed space-y-4">
                <p>{currentData.text}</p>
              </div>

              <div className="bg-slate-950/60 p-6 rounded-2xl border border-white/5 space-y-3">
                <h3 className="text-xs font-extrabold text-cyan-400 uppercase tracking-wider">Advanced Vocabulary & Lexicon:</h3>
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
                <h3 className="text-xl font-bold">10-Question Comprehensive Test</h3>
                <p className="text-xs text-gray-400 mt-1">Score at least 7 correct answers to unlock the next day.</p>
              </div>

              <div className="space-y-6">
                {currentData.questions.map((q, qIndex) => (
                  <div key={q.id} className="p-5 bg-slate-950/60 rounded-2xl border border-white/5 space-y-3">
                    <p className="text-sm font-bold text-gray-200">{qIndex + 1}. {q.question}</p>
                    <div className="grid grid-cols-1 gap-2">
                      {q.options.map((opt, optIndex) => {
                        const isSelected = selectedAnswers[q.id] === optIndex;
                        return (
                          <button
                            key={optIndex}
                            disabled={isSubmitted}
                            onClick={() => handleOptionSelect(q.id, optIndex)}
                            className={`p-3 rounded-xl text-xs font-bold text-left transition border cursor-pointer ${
                              isSelected ? "bg-blue-600 border-blue-400 text-white shadow-md" : "bg-white/5 border-white/10 text-gray-300 hover:border-blue-500/50"
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
                <button onClick={handleSubmitTest} className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-black text-sm hover:opacity-90 transition shadow-xl cursor-pointer">
                  Submit Answers
                </button>
              ) : (
                <div className="p-6 bg-slate-950 rounded-2xl border border-white/10 text-center space-y-4">
                  <p className="text-lg font-bold">Your Score: <span className={score >= 7 ? "text-green-400" : "text-yellow-400"}>{score} / 10</span></p>
                  <p className="text-xs text-gray-400">
                    {score >= 7 ? "🎉 Congratulations! Unlocked next day." : "⚠️ Score below 7. Retry to improve!"}
                  </p>
                  <div className="flex justify-center gap-4 pt-2">
                    <button onClick={handleRetry} className="px-6 py-3 rounded-xl bg-slate-800 text-white font-bold text-xs hover:bg-slate-700 transition border border-white/10 cursor-pointer">🔄 Retry Test</button>
                    {score >= 7 && activeDay < 60 && (
                      <button onClick={handleNextDay} className="px-6 py-3 rounded-xl bg-green-600 text-white font-bold text-xs hover:bg-green-500 transition cursor-pointer">Next Day →</button>
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