'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface Article {
  id: number
  title: string
  level: string
  day: number
  category: string
  readTime: string
  isLocked: boolean
  image: string
  summary: string
}

export default function PracticePage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'reading' | 'listening' | 'exam' | 'certificates'>('reading')
  const [selectedLevel, setSelectedLevel] = useState<string>('B2')
  const [userName, setUserName] = useState<string>('Tələbə')

  useEffect(() => {
    const session = localStorage.getItem('pe_session')
    if (session) {
      try {
        const user = JSON.parse(session)
        setUserName(user.username || user.email.split('@')[0])
      } catch (e) {
        console.error(e)
      }
    }
  }, [])

  // Mətnlər - 1-ci gün AÇIQDIR, digər günlər BAĞLIDIR
  const articles: Article[] = [
    {
      id: 1,
      title: 'Cannes Film Festival & Modern Cinema',
      level: 'B2',
      day: 1,
      category: 'Culture & Art',
      readTime: '5 min',
      isLocked: false,
      image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&auto=format&fit=crop&q=60',
      summary: 'Explore how international film festivals impact globally recognized cinematic traditions.'
    },
    {
      id: 2,
      title: 'Family Gathering & Cultural Values',
      level: 'B2',
      day: 2,
      category: 'Sociology',
      readTime: '6 min',
      isLocked: true,
      image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=500&auto=format&fit=crop&q=60',
      summary: 'Analyzing how intergenerational relationships influence social structure.'
    },
    {
      id: 3,
      title: 'Flight Friends & Aviation Trends',
      level: 'B2',
      day: 3,
      category: 'Travel & Tech',
      readTime: '4 min',
      isLocked: true,
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=500&auto=format&fit=crop&q=60',
      summary: 'Modern advancements in commercial air travel and customer service standardizations.'
    },
    {
      id: 4,
      title: 'Artificial Intelligence in Education',
      level: 'B2',
      day: 4,
      category: 'Technology',
      readTime: '7 min',
      isLocked: true,
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=60',
      summary: 'How smart tutors and algorithmic assessments are changing learning routines.'
    }
  ]

  const levels = ['A1 Elementary', 'A2 Pre-Intermediate', 'B1 Intermediate', 'B2 Upper-Intermediate', 'C1 Advanced']

  return (
    <div className="min-h-screen bg-[#fafafd] text-slate-800 flex flex-col font-sans">
      {/* Upper Navigation Header */}
      <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <span className="text-2xl font-black tracking-tight text-[#2d1b69] cursor-pointer" onClick={() => router.push('/')}>
              PathEnglish<span className="text-red-500">.Az</span>
            </span>

            {/* Tab Navigasiyası (Speaking və Writing Tamamilə Silinib) */}
            <nav className="hidden md:flex items-center gap-2 text-sm font-semibold">
              <button
                onClick={() => setActiveTab('reading')}
                className={`px-4 py-2 rounded-xl transition cursor-pointer ${activeTab === 'reading' ? 'bg-[#2d1b69] text-white' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                Reading
              </button>
              <button
                onClick={() => setActiveTab('listening')}
                className={`px-4 py-2 rounded-xl transition cursor-pointer ${activeTab === 'listening' ? 'bg-[#2d1b69] text-white' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                Listening
              </button>
              <button
                onClick={() => setActiveTab('exam')}
                className={`px-4 py-2 rounded-xl transition cursor-pointer ${activeTab === 'exam' ? 'bg-[#2d1b69] text-white' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                Exam
              </button>
              <button
                onClick={() => setActiveTab('certificates')}
                className={`px-4 py-2 rounded-xl transition cursor-pointer ${activeTab === 'certificates' ? 'bg-[#2d1b69] text-white' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                Certificates
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <div className="text-xs text-slate-400 font-medium">Tələbə</div>
              <div className="text-sm font-bold text-slate-700">{userName}</div>
            </div>
            <button
              onClick={() => {
                localStorage.removeItem('pe_session')
                router.push('/')
              }}
              className="text-xs font-bold text-red-500 hover:bg-red-50 border border-red-200 px-3 py-2 rounded-lg transition cursor-pointer"
            >
              Çıxış
            </button>
          </div>
        </div>
      </header>

      {/* Banner */}
      <section className="bg-[#2d1b69] text-white py-12 px-6">
        <div className="max-w-7xl mx-auto text-center space-y-3">
          <span className="text-xs font-bold tracking-widest text-purple-300 uppercase">PATHENGLISH PRACTICE PLATFORM</span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            {selectedLevel} - English Mastery
          </h1>
          <p className="text-purple-200 text-sm md:text-base max-w-2xl mx-auto">
            2 aylıq sistemli təlim planı. Tapşırıqları addım-addım həll edin və növbəti günün materialını açın.
          </p>
        </div>
      </section>

      {/* Level Chooser */}
      <div className="bg-white border-b border-slate-200 py-4 px-6 sticky top-[65px] z-40 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 overflow-x-auto pb-2 md:pb-0">
          {levels.map((lvl) => {
            const shortLvl = lvl.split(' ')[0]
            const isSelected = selectedLevel === shortLvl
            return (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(shortLvl)}
                className={`px-5 py-2.5 rounded-full text-xs md:text-sm font-bold whitespace-nowrap transition cursor-pointer ${
                  isSelected
                    ? 'bg-[#2d1b69] text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {lvl}
              </button>
            )
          })}
        </div>
      </div>

      {/* Dynamic Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-10">
        {activeTab === 'reading' && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">2 Aylıq Reading Proqramı ({selectedLevel})</h2>
                <p className="text-xs text-slate-500 mt-1">1-ci günün mətnini bitirib sualları cavablandırdıqdan sonra 2-ci gün açılacaq.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((item) => (
                <div
                  key={item.id}
                  className={`bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition relative flex flex-col ${
                    item.isLocked ? 'opacity-75 bg-slate-50' : ''
                  }`}
                >
                  <div className="h-48 w-full relative overflow-hidden bg-slate-100">
                    <img
                      src={item.image}
                      alt={item.title}
                      className={`w-full h-full object-cover transition duration-300 ${item.isLocked ? 'filter grayscale' : 'hover:scale-105'}`}
                    />
                    <span className="absolute top-3 left-3 bg-[#2d1b69] text-white text-[10px] font-extrabold px-2.5 py-1 rounded-md tracking-wider">
                      DAY {item.day}
                    </span>
                    <span className="absolute top-3 right-3 bg-white/90 text-slate-800 text-[10px] font-bold px-2.5 py-1 rounded-md backdrop-blur">
                      {item.readTime}
                    </span>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="text-[11px] font-bold text-purple-600 uppercase tracking-wider mb-1">
                        {item.category}
                      </div>
                      <h3 className="text-lg font-bold text-slate-800 leading-snug">{item.title}</h3>
                      <p className="text-xs text-slate-500 mt-2 line-clamp-2">{item.summary}</p>
                    </div>

                    {item.isLocked ? (
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-400">
                        <span>🔒 Növbəti Gün Bağlıdır</span>
                        <span className="bg-slate-200 text-slate-600 px-3 py-1.5 rounded-lg">Kilitli</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => alert(`Day ${item.day} Mətni açılır...`)}
                        className="w-full py-2.5 bg-[#2d1b69] hover:bg-[#20134d] text-white font-bold text-xs rounded-xl transition shadow-md cursor-pointer"
                      >
                        Mətni Oxu və Suallara Keç ➔
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'listening' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-2xl mx-auto space-y-4">
            <div className="w-16 h-16 bg-purple-100 text-[#2d1b69] rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
              🎧
            </div>
            <h3 className="text-xl font-bold text-slate-800">Listening Bölməsi</h3>
            <p className="text-xs text-slate-500">
              Səviyyələr üzrə dinləmə mətnləri və suallar tezliklə buraya əlavə olunacaq.
            </p>
          </div>
        )}

        {activeTab === 'exam' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-2xl mx-auto space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
              📝
            </div>
            <h3 className="text-xl font-bold text-slate-800">Sınaq İmtahanı</h3>
            <p className="text-xs text-slate-500">
              Səviyyənizi təyin edən və sertifikat qazandıran rəsmi imtahan bölməsi.
            </p>
          </div>
        )}

        {activeTab === 'certificates' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-2xl mx-auto space-y-4">
            <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
              🎓
            </div>
            <h3 className="text-xl font-bold text-slate-800">Rəsmi Sertifikatlarınız</h3>
            <p className="text-xs text-slate-500">
              Hələ ki heç bir sertifikatınız yoxdur. İmtahanı uğurla verdikdən sonra sertifikatınız avtomatik bura düşəcək.
            </p>
          </div>
        )}
      </main>
    </div>
  )
}