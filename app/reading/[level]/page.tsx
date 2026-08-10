'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  
  // Auth state
  const [authMode, setAuthMode] = useState<'login' | 'register'>('register')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    // Əgər istifadəçi artıq daxil olubsa, birbaşa imtahana/səhifəyə istiqamətləndir
    const activeSession = localStorage.getItem('pe_session')
    if (activeSession) {
      // sessiya var
    }
  }, [])

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')

    if (!email.trim() || !password.trim()) {
      setErrorMsg('Xahiş olunur bütün xanaları doldurun!')
      return
    }

    if (authMode === 'register' && !fullName.trim()) {
      setErrorMsg('Ad və Soyadınızı daxil edin!')
      return
    }

    // Istifadəçi bazasını oxu (localStorage)
    const existingUsers = JSON.parse(localStorage.getItem('pe_users') || '[]')

    if (authMode === 'register') {
      // 1. TƏK DƏFƏLİK QEYDİYYAT YOXLANIŞI
      const userExists = existingUsers.some((u: any) => u.email.toLowerCase() === email.trim().toLowerCase())
      if (userExists) {
        setErrorMsg('Bu Email ünvanı ilə artıq qeydiyyat olunub! Lütfən "Daxil Ol" bölməsinə keçin.')
        return
      }

      // Yeni istifadəçi yarat
      const newUser = {
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        password: password.trim()
      }

      existingUsers.push(newUser)
      localStorage.setItem('pe_users', JSON.stringify(existingUsers))
      localStorage.setItem('pe_session', JSON.stringify(newUser))
      
      // Keçid et
      router.push('/reading')

    } else {
      // 2. PAROL VƏ EMAİL YOXLANIŞI (GİRİŞ)
      const foundUser = existingUsers.find(
        (u: any) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password.trim()
      )

      if (!foundUser) {
        // Parol sehvdirsə hesaba GIRMƏK OLMUR!
        setErrorMsg('Email və ya şifrə yanlışdır!')
        return
      }

      // Giriş uğurludur
      localStorage.setItem('pe_session', JSON.stringify(foundUser))
      router.push('/reading')
    }
  }

  const scrollToAuth = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-[#0a0f1d] text-white flex flex-col font-sans">
      {/* Header Navigation */}
      <header className="w-full border-b border-slate-800/80 bg-[#0a0f1d]/90 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push('/')}>
            <span className="text-2xl font-black tracking-tight text-white">
              PathEnglish<span className="text-red-500">.Az</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <button onClick={scrollToAuth} className="hover:text-white transition">Tests</button>
            <button onClick={scrollToAuth} className="hover:text-white transition">Certificate</button>
            <button onClick={scrollToAuth} className="hover:text-white transition">Practice</button>
          </nav>

          <button
            onClick={scrollToAuth}
            className="bg-red-500 hover:bg-red-600 text-white font-bold text-sm px-5 py-2.5 rounded-xl transition shadow-lg shadow-red-500/20"
          >
            Start Test
          </button>
        </div>
      </header>

      {/* Hero & Auth Section */}
      <main className="flex-1 max-w-7xl mx-auto px-6 py-12 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Content */}
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
              <div className="text-xs text-slate-400 font-medium mt-1">Sertifikat Haqql</div>
            </div>
          </div>
        </div>

        {/* Right Auth Card */}
        <div className="lg:col-span-5 w-full">
          <div className="bg-[#111827] border border-slate-800 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
            
            {/* Header Badge */}
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

            {/* Error Message Display */}
            {errorMsg && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold rounded-xl text-center">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleAuthSubmit} className="space-y-4">
              {authMode === 'register' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Ad və Soyad</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Məsələn: Leyla Məmmədova"
                    className="w-full bg-[#0a0f1d] border border-slate-700 focus:border-red-500 text-white rounded-xl px-4 py-3 text-sm outline-none transition"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Elektron Poçt (Email)</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ornek@domain.com"
                  className="w-full bg-[#0a0f1d] border border-slate-700 focus:border-red-500 text-white rounded-xl px-4 py-3 text-sm outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Şifrə</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#0a0f1d] border border-slate-700 focus:border-red-500 text-white rounded-xl px-4 py-3 text-sm outline-none transition"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3.5 rounded-xl text-sm transition shadow-lg shadow-red-500/25 mt-2 flex items-center justify-center gap-2 cursor-pointer"
              >
                {authMode === 'register' ? 'İmtahana İndi Başla 🚀' : 'Daxil Ol 🚀'}
              </button>
            </form>

            <div className="mt-6 text-center">
              {authMode === 'register' ? (
                <p className="text-xs text-slate-400">
                  Artıq hesabınız var?{' '}
                  <button
                    onClick={() => { setAuthMode('login'); setErrorMsg(''); }}
                    className="text-emerald-400 font-bold hover:underline"
                  >
                    Daxil olun
                  </button>
                </p>
              ) : (
                <p className="text-xs text-slate-400">
                  Hesabınız yoxdur?{' '}
                  <button
                    onClick={() => { setAuthMode('register'); setErrorMsg(''); }}
                    className="text-emerald-400 font-bold hover:underline"
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