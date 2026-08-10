'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface User {
  username: string
  email: string
  password: string
}

export default function Home() {
  const router = useRouter()
  
  const [authMode, setAuthMode] = useState<'login' | 'register'>('register')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')

    const cleanEmail = email.trim().toLowerCase()
    const cleanUsername = username.trim()
    const cleanPassword = password.trim()

    if (authMode === 'register') {
      if (!cleanUsername || !cleanEmail || !cleanPassword) {
        setErrorMsg('Lütfən bütün xanaları (Username, Email, Şifrə) doldurun!')
        return
      }
    } else {
      if (!cleanEmail || !cleanPassword) {
        setErrorMsg('Lütfən Email və Şifrənizi daxil edin!')
        return
      }
    }

    const users: User[] = JSON.parse(localStorage.getItem('pe_users') || '[]')

    if (authMode === 'register') {
      const existingUser = users.find(
        (u) => u.email.toLowerCase() === cleanEmail || u.username.toLowerCase() === cleanUsername.toLowerCase()
      )

      if (existingUser) {
        setErrorMsg('Bu Email və ya Username ilə artıq qeydiyyat olunub! Lütfən "Daxil olun" düyməsinə sıxın.')
        return
      }

      const newUser: User = {
        username: cleanUsername,
        email: cleanEmail,
        password: cleanPassword
      }

      users.push(newUser)
      localStorage.setItem('pe_users', JSON.stringify(users))
      localStorage.setItem('pe_session', JSON.stringify(newUser))

      router.push('/reading')

    } else {
      // CİDDİ PAROL YOXLANIŞI - SƏHV İSƏ GİRİŞ QƏTİYYƏN MÜMKÜN DEYİL
      const foundUser = users.find(
        (u) => (u.email.toLowerCase() === cleanEmail || u.username.toLowerCase() === cleanEmail) && u.password === cleanPassword
      )

      if (!foundUser) {
        setErrorMsg('DİQQƏT: Giriş uğursuzdur! Şifrə və ya Email yanlışdır.')
        return
      }

      localStorage.setItem('pe_session', JSON.stringify(foundUser))
      router.push('/reading')
    }
  }

  const scrollToAuth = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-[#0a0f1d] text-white flex flex-col font-sans">
      <header className="w-full border-b border-slate-800/80 bg-[#0a0f1d]/90 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push('/')}>
            <span className="text-2xl font-black tracking-tight text-white">
              PathEnglish<span className="text-red-500">.Az</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <button onClick={scrollToAuth} className="hover:text-white transition cursor-pointer">Tests</button>
            <button onClick={scrollToAuth} className="hover:text-white transition cursor-pointer">Certificate</button>
            <button onClick={scrollToAuth} className="hover:text-white transition cursor-pointer">Practice</button>
          </nav>

          <button
            onClick={scrollToAuth}
            className="bg-red-500 hover:bg-red-600 text-white font-bold text-sm px-5 py-2.5 rounded-xl transition shadow-lg shadow-red-500/20 cursor-pointer"
          >
            Start Test
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto px-6 py-12 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold tracking-wider uppercase">
            BEYNƏLXALQ STANDARTLAR
          </div>

          <h1 className="text-4xl md:text-6xl font-black leading-tight text-white">
            İngilis Dili Səviyyənizi Təsdiqləyin və <span className="text-red-500">Sertifikat</span> Alın
          </h1>

          <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-2xl">
            CEFR standartlarına uyğun peşəkar yerləşdirmə imtahanı verərək real dil biliklərinizi yoxlayın. İmtahanı uğurla tamamlayan namizədlərə rəsmi rəqəmsal sertifikat <strong className="text-white">tamamilə pulsuz</strong> təqdim olunur.
          </p>

          <div className="pt-6 grid grid-cols-3 gap-6 border-t border-slate-800 max-w-lg">
            <div>
              <div className="text-3xl font-black text-white">1,000+</div>
              <div className="text-xs text-slate-400 font-medium mt-1">Aktiv Tələbə</div>
            </div>
            <div>
              <div className="text-3xl font-black text-emerald-400">CEFR</div>
              <div className="text-xs text-slate-400 font-medium mt-1">Beynəlxalq Uyğunluq</div>
            </div>
            <div>
              <div className="text-3xl font-black text-emerald-400">0 AZN</div>
              <div className="text-xs text-slate-400 font-medium mt-1">Sertifikat Haqqı</div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 w-full">
          <div className="bg-[#111827] border border-slate-800 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
            
            <div className="text-center mb-6">
              <span className="inline-block px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold tracking-widest rounded-full uppercase mb-2">
                PATHENGLISH.AZ
              </span>
              <h2 className="text-2xl font-bold text-white">
                {authMode === 'register' ? 'İmtahana Qeydiyyat' : 'Xoş Gəlmisiniz'}
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                {authMode === 'register' 
                  ? 'Nəticələriniz və sertifikatınız üçün məlumatlarınızı daxil edin.' 
                  : 'Hesabınıza daxil olaraq testə davam edin.'}
              </p>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 bg-red-500/20 border border-red-500 text-red-300 text-xs font-bold rounded-xl text-center">
                ⚠️ {errorMsg}
              </div>
            )}

            <form onSubmit={handleAuthSubmit} className="space-y-4">
              
              {authMode === 'register' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">İstifadəçi Adı (Username)</label>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Məsələn: Əli Həsənov"
                    className="w-full bg-[#0a0f1d] border border-slate-700 focus:border-emerald-500 text-white rounded-xl px-4 py-3 text-sm outline-none transition"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Elektron Poçt (Gmail/Email)</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ornek@gmail.com"
                  className="w-full bg-[#0a0f1d] border border-slate-700 focus:border-emerald-500 text-white rounded-xl px-4 py-3 text-sm outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Şifrə (Password)</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#0a0f1d] border border-slate-700 focus:border-emerald-500 text-white rounded-xl px-4 py-3 text-sm outline-none transition"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 rounded-xl text-sm transition shadow-lg shadow-emerald-600/20 mt-2 flex items-center justify-center gap-2 cursor-pointer"
              >
                {authMode === 'register' ? 'QEYDİYYATDAN KEÇ VƏ BAŞLA 🚀' : 'DAXİL OL 🚀'}
              </button>
            </form>

            <div className="mt-6 text-center">
              {authMode === 'register' ? (
                <p className="text-xs text-slate-400">
                  Artıq hesabınız var?{' '}
                  <button
                    onClick={() => { setAuthMode('login'); setErrorMsg(''); }}
                    className="text-emerald-400 font-bold hover:underline cursor-pointer"
                  >
                    Daxil olun
                  </button>
                </p>
              ) : (
                <p className="text-xs text-slate-400">
                  Hesabınız yoxdur?{' '}
                  <button
                    onClick={() => { setAuthMode('register'); setErrorMsg(''); }}
                    className="text-emerald-400 font-bold hover:underline cursor-pointer"
                  >
                    Qeydiyyatdan keçin
                  </button>
                </p>
              )}
            </div>

          </div>
        </div>
      </main>
    </div>
  )
}