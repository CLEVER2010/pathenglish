'use client';

import React, { useState } from 'react';

const correctAnswers: { [key: string]: string } = {
    q1: "C", q2: "C", q3: "B", q4: "D", q5: "B",
    q6: "B", q7: "B", q8: "A", q9: "C", q10: "D",
    q11: "C", q12: "C", q13: "C", q14: "A", q15: "D",
    q16: "C", q17: "B", q18: "B", q19: "B", q20: "B"
};

export default function ReadingTestPage() {
    const [score, setScore] = useState<number | null>(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        let currentScore = 0;
        let total = Object.keys(correctAnswers).length;

        for (let key in correctAnswers) {
            if (formData.get(key) === correctAnswers[key]) {
                currentScore++;
            }
        }
        setScore(currentScore);
    };

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f4f9', color: '#333', maxWidth: '850px', margin: '40px auto', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
            <h1 style={{ color: '#2c3e50' }}>PART 2: READING TEST (SARAH’S LIFE IN CANADA)</h1>

            <div style={{ background: '#fff', padding: '20px', marginBottom: '30px', borderRadius: '6px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', lineHeight: '1.6' }}>
                <h2 style={{ color: '#2c3e50' }}>Sarah’s Life in Canada</h2>
                <p>Sarah is 36 years old, and she lives in Canada. She has two young daughters. She works two days a week as a teacher. Her husband’s name is Nathan, and he’s a sales manager. Nathan’s job is very busy, so he often comes home late. At weekends, they often go driving or walking in the countryside. Nathan was born in Canada, but Sarah wasn’t. She was born in Argentina, and she moved to Canada when she was 26. When she was growing up, she was really interested in English. At first, she thought it was difficult, but when she finished school, she could already speak quite fluently and understand almost everything she heard or read. She spent a lot of time listening to songs and watching TV shows and films in English.</p>
                <p>After she graduated from university, she decided to train as an English teacher. The certificate she needed was quite expensive, and competition for places was intense, but she was determined to do it—she simply couldn’t imagine doing anything else. She finished the course with a distinction, which was the highest grade possible. Soon, she found work as a teaching assistant in a local primary school. She enjoyed the work, although it was often challenging—the children were not always well-disciplined, and she didn’t think that the classroom teacher had enough understanding of teaching methods.</p>
                <p>When she first went to Canada, she never would have imagined that she would end up staying there. It was supposed to be a short-term placement in a high school. She thought that she would be able to see a different part of the world and gain some useful experience, which could help her to find a better teaching position when she came back to Argentina. At first, she found living overseas much more difficult than she had expected. She felt homesick, and she had problems getting used to everything which was different in Canada—the interpersonal culture, the climate, the food… For the first three months she was there, she spent most of her free time in her room, dreaming of going back to Argentina and seeing her family again.</p>
                <p>Over time, she adjusted to life in Canada, and even started to enjoy herself a bit more. One day, she met Nathan at a party. She liked his sense of humour, and how kind he was, but she was reluctant to get involved, knowing that she was planning to leave in the near future. When her placement finished, he convinced her to apply for a permanent job in another school. She told herself that she would give it one more year and see how things went.</p>
                <p>Now, Sarah is settled, although she still misses Argentina. She tries to make it back at least yearly, and she is bringing up her daughters to be bilingual, so that they can talk to their Argentinian relatives in Spanish. When she thinks back to her first few months in Canada, she can scarcely recognise herself. In some ways, she wishes she weren’t so far away from her family, but at the same time, she feels that she’s learned many things which she never would have experienced had she stayed in Argentina. She wants to give her daughters the chance to travel and experience life in other countries as soon as she can, although of course she hopes they don’t move too far away!</p>
            </div>

            <form onSubmit={handleSubmit}>
                {[
                    { id: "q1", title: "1. During her first few months in Canada, Sarah ________.", options: [["A", "had to work very hard"], ["B", "met Nathan"], ["C", "didn't socialise much"], ["D", "made lots of new friends"]] },
                    { id: "q2", title: "2. At weekends, Sarah and Nathan often ________.", options: [["A", "go to a village"], ["B", "work long hours"], ["C", "get out of the city"], ["D", "stay in the city"]] },
                    { id: "q3", title: "3. When Sarah was at school, she ________ learning English.", options: [["A", "hated"], ["B", "liked"], ["C", "didn't like"], ["D", "didn't mind"]] },
                    { id: "q4", title: "4. It took Sarah ________ to get used to living in Canada.", options: [["A", "about one month"], ["B", "several years"], ["C", "a few weeks"], ["D", "several months"]] },
                    { id: "q5", title: "5. The children in Sarah’s first job ________.", options: [["A", "were often rude to her"], ["B", "didn't always behave well in class"], ["C", "didn't learn anything"], ["D", "didn't understand what she was saying"]] },
                    { id: "q6", title: "6. When she left school, her English was ________.", options: [["A", "very bad"], ["B", "very good"], ["C", "perfect"], ["D", "not very good"]] },
                    { id: "q7", title: "7. Nathan and Sarah ________.", options: [["A", "were born in the same year"], ["B", "were born in different countries"], ["C", "were born in different years"], ["D", "were born in the same country"]] },
                    { id: "q8", title: "8. The children in Sarah’s first job ________.", options: [["A", "didn't always behave well in class"], ["B", "didn't understand what she was saying"], ["C", "didn't learn anything"], ["D", "were often rude to her"]] },
                    { id: "q9", title: "9. Sarah has lived in Canada ________.", options: [["A", "since she was 36"], ["B", "for one year"], ["C", "for ten years"], ["D", "since she was born"]] },
                    { id: "q10", title: "10. Because of Nathan, Sarah initially decided to stay in Canada ________.", options: [["A", "for a few more months"], ["B", "forever"], ["C", "until Nathan asked her to marry him"], ["D", "for another year"]] },
                    { id: "q11", title: "11. Which sentence best describes Sarah’s attitude now towards her decision to stay in Canada?", options: [["A", "She wishes she had come to Canada earlier..."], ["B", "She isn't sure..."], ["C", "She wouldn't change her decision, although she still finds it hard to be so far from her family."], ["D", "She regrets her decision..."]] },
                    { id: "q12", title: "12. Sarah thinks that she has ________ since coming to Canada.", options: [["A", "not changed very much"], ["B", "learned to speak English better"], ["C", "changed a lot"], ["D", "lost touch with her own country"]] },
                    { id: "q13", title: "13. It took Sarah ________ to get used to living in Canada.", options: [["A", "about one month"], ["B", "several years"], ["C", "several months"], ["D", "a few weeks"]] },
                    { id: "q14", title: "14. In her first job, she ________.", options: [["A", "worked with another teacher to teach young children"], ["B", "taught older children by herself"], ["C", "worked with another teacher to teach older children"], ["D", "taught young children by herself"]] },
                    { id: "q15", title: "15. At weekends, Sarah and Nathan often ________.", options: [["A", "stay in the city"], ["B", "work long hours"], ["C", "go to a village"], ["D", "get out of the city"]] },
                    { id: "q16", title: "16. During her first few months in Canada, Sarah ________.", options: [["A", "didn't socialise much"], ["B", "made lots of new friends"], ["C", "had to work very hard"], ["D", "met Nathan"]] },
                    { id: "q17", title: "17. Sarah and Nathan have ________.", options: [["A", "two boys"], ["B", "two girls"], ["C", "one boy and one girl"], ["D", "no children"]] },
                    { id: "q18", title: "18. Nathan and Sarah ________.", options: [["A", "were born in different years"], ["B", "were born in different countries"], ["C", "were born in the same year"], ["D", "were born in the same country"]] },
                    { id: "q19", title: "19. Sarah thought that living in Canada ________.", options: [["A", "would be very different to living in Argentina"], ["B", "would be more difficult than it was"], ["C", "would make her feel homesick"], ["D", "would be easier than it was"]] },
                    { id: "q20", title: "20. Nathan is ________.", options: [["A", "Sarah's father"], ["B", "Sarah's husband"], ["C", "Sarah's boyfriend"], ["D", "Sarah's manager"]] }
                ].map((q) => (
                    <div key={q.id} style={{ background: '#fff', padding: '20px', marginBottom: '20px', borderRadius: '6px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
                        <div style={{ fontWeight: 'bold', marginBottom: '15px' }}>{q.title}</div>
                        <div>
                            {q.options.map(([val, label]) => (
                                <label key={val} style={{ display: 'block', marginBottom: '10px', cursor: 'pointer', padding: '8px', borderRadius: '4px' }}>
                                    <input type="radio" name={q.id} value={val} required style={{ marginRight: '8px' }} />
                                    {label}
                                </label>
                            ))}
                        </div>
                    </div>
                ))}

                <button type="submit" style={{ display: 'block', width: '100%', padding: '12px', backgroundColor: '#27ae60', color: 'white', border: 'none', fontSize: '16px', fontWeight: 'bold', borderRadius: '6px', cursor: 'pointer', marginTop: '30px' }}>
                    Nəticəni Yoxla
                </button>
            </form>

            {score !== null && (
                <div style={{ textAlign: 'center', fontSize: '20px', fontWeight: 'bold', marginTop: '20px', color: '#2c3e50' }}>
                    Sizin nəticəniz: {score} / 20
                </div>
            )}
        </div>
    );
}