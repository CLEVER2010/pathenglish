'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

interface VocabItem {
  word: string
  translation: string
  definition: string
  example: string
  collocations: string[]
}

interface Article {
  title: string
  level: string
  audioText: string
  text: string[]
  vocab: VocabItem[]
}

const articlesData: Record<string, Article> = {
  A1: {
    title: 'My Daily Routine',
    level: 'A1 • Elementary',
    audioText: 'My name is Alex. I wake up at 7 o clock every morning. I drink tea and eat breakfast.',
    text: [
      'My name is Alex. I wake up at 7 o clock every morning. I drink tea and eat breakfast.',
      'Then I go to school with my friend. I like learning English because it is fun.',
    ],
    vocab: [
      {
        word: 'routine',
        translation: 'gündəlik rejim',
        definition: 'A regular way of doing things.',
        example: 'My daily routine starts early.',
        collocations: ['daily routine'],
      },
    ],
  },
  B2: {
    title: 'The Science of Memory and Learning',
    level: 'B2 • Upper-Intermediate',
    audioText:
      'Recent research in cognitive science suggests that effective learning is not simply a matter of spending more time studying.',
    text: [
      'Recent research in cognitive science suggests that effective learning is not simply a matter of spending more time studying. Traditional methods, such as passive re-reading and highlighting notes, often create an illusion of mastery.',
      'Instead, active learning techniques play a far more significant role in consolidating knowledge. Retrieval practice, which involves actively recalling information from memory through quizzes or self-testing, strengthens neural connections.',
    ],
    vocab: [
      {
        word: 'retention',
        translation: 'yadda saxlama qabiliyyəti',
        definition: 'The continued possession or use of memory.',
        example: 'Spaced repetition enhances long-term retention.',
        collocations: ['memory retention', 'improve retention'],
      },
      {
        word: 'recall',
        translation: 'xatırlamaq, yaddaşdan bərpa etmək',
        definition: 'To bring a fact or event back into memory.',
        example: 'Retrieval practice forces your brain to recall concepts.',
        collocations: ['actively recall'],
      },
    ],
  },
}

function ReadingContent() {
  const searchParams = useSearchParams()
  const initialLevel = searchParams.get('level') || 'B2'

  const [selectedLevel, setSelectedLevel] = useState<string>(initialLevel)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [selectedWordObj, setSelectedWordObj] = useState<VocabItem | null>(null)
  const [learnedWords, setLearnedWords] = useState<string[]>([])

  useEffect(() => {
    if (initialLevel && articlesData[initialLevel]) {
      setSelectedLevel(initialLevel)
    }
  }, [initialLevel])

  const article = articlesData[selectedLevel] || articlesData['B2']

  const handlePlayAudio = () => {
    if ('speechSynthesis' in window) {
      if (isPlaying) {
        window.speechSynthesis.cancel()
        setIsPlaying(false)
      } else {
        const utterance = new SpeechSynthesisUtterance(article.audioText)
        utterance.lang = 'en-US'
        utterance.rate = 0.9
        utterance.onend = () => setIsPlaying(false)
        window.speechSynthesis.speak(utterance)
        setIsPlaying(true)
      }
    }
  }

  const handleWordClick = (rawWord: string) => {
    const cleanWord = rawWord.replace(/[^a-zA-Z]/g, '').toLowerCase()
    const foundVocab = article.vocab.find((v) => v.word.toLowerCase() === cleanWord)

    if (foundVocab) {
      setSelectedWordObj(foundVocab)
    } else if (cleanWord) {
      setSelectedWordObj({
        word: cleanWord,
        translation: 'Söz üzərinə klikləndi',
        definition: 'Seçilmiş söz üçün əlavə lüğət məlumatı.',
        example: `Word: ${cleanWord}`,
        collocations: [],
      })
    }
  }

  const toggleLearned = (word: string) => {
    if (learnedWords.includes(word)) {
      setLearnedWords(learnedWords.filter((w) => w !== word))
    } else {
      setLearnedWords([...learnedWords, word])
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-10 shadow-2xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-black bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            PathEnglish Reading
          </h1>
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-white font-bold px-4 py-2 rounded-xl"
          >
            <option value="A1">A1 Level</option>
            <option value="B2">B2 Level</option>
          </select>
        </div>

        <button
          type="button"
          onClick={handlePlayAudio}
          className={`mb-8 px-6 py-3 rounded-xl font-bold transition ${
            isPlaying ? 'bg-red-600 text-white' : 'bg-blue-600 text-white hover:bg-blue-500'
          }`}
        >
          {isPlaying ? '⏸ Səsi Dayandır' : '🔊 Mətni Dinlə'}
        </button>

        <div className="mb-10">
          <span className="text-xs bg-blue-500/20 text-blue-400 border border-blue-500/30 px-3 py-1 rounded-full font-bold">
            {article.level}
          </span>
          <h2 className="text-3xl font-bold mt-3 mb-6">{article.title}</h2>

          <div className="space-y-4 text-lg text-slate-300 leading-relaxed">
            {article.text.map((paragraph, pIdx) => (
              <p key={pIdx}>
                {paragraph.split(' ').map((word, wIdx) => (
                  <span
                    key={wIdx}
                    onClick={() => handleWordClick(word)}
                    className="hover:bg-blue-500/20 hover:text-blue-400 cursor-pointer rounded px-1 transition inline-block"
                  >
                    {word}{' '}
                  </span>
                ))}
              </p>
            ))}
          </div>
        </div>

        {/* Vocab Section */}
        <div>
          <h3 className="text-xl font-bold mb-4">📚 Əsas Sözlər</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {article.vocab.map((v, idx) => {
              const isLearned = learnedWords.includes(v.word)
              return (
                <div key={idx} className="bg-slate-800/50 border border-slate-700 p-5 rounded-2xl">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xl font-bold text-blue-400">{v.word}</span>
                    <button
                      onClick={() => toggleLearned(v.word)}
                      className={`text-xs px-3 py-1 rounded-lg font-bold ${
                        isLearned ? 'bg-green-500/20 text-green-400' : 'bg-slate-700 text-slate-300'
                      }`}
                    >
                      {isLearned ? 'Öyrənildi ✓' : 'Öyrənildi kimi qeyd et'}
                    </button>
                  </div>
                  <p className="text-sm font-semibold mb-1">🇦🇿 {v.translation}</p>
                  <p className="text-xs text-slate-400 mb-2">{v.definition}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedWordObj && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-700 p-6 rounded-2xl max-w-sm w-full">
            <h4 className="text-2xl font-bold text-blue-400 mb-2 capitalize">{selectedWordObj.word}</h4>
            <p className="text-indigo-300 font-semibold mb-4">🇦🇿 {selectedWordObj.translation}</p>
            <p className="text-sm text-slate-300 mb-6">{selectedWordObj.definition}</p>
            <button
              onClick={() => setSelectedWordObj(null)}
              className="w-full py-2 bg-blue-600 text-white font-bold rounded-xl"
            >
              Bağla
            </button>
          </div>
        </div>
      )}
    </main>
  )
}

export default function ReadingPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-white">Yüklənir...</div>}>
      <ReadingContent />
    </Suspense>
  )
}