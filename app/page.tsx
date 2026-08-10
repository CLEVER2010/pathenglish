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

      // Doğru yönləndirmə: /practice
      router.push('/practice')

    } else {
      const foundUser = users.find(
        (u) => (u.email.toLowerCase() === cleanEmail || u.username.toLowerCase() === cleanEmail) && u.password === cleanPassword
      )

      if (!foundUser) {
        setErrorMsg('DİQQƏT: Giriş uğursuzdur! Şifrə və ya Email yanlışdır.')
        return
      }

      localStorage.setItem('pe_session', JSON.stringify(foundUser))
      // Doğru yönləndirmə: /practice
      router.push('/practice')
    }
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
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto px-6 py-12 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <h1 className="text-4xl md:text-6xl font-black leading-tight text-white">
            İngilis Dili Səviyyənizi Təsdiqləyin və <span className="text-red-500">Sertifikat</span> Alın
          </h1>
          <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-2xl">
            CEFR standartlarına uyğun peşəkar yerləşdirmə imtahanı verərək real dil biliklərinizi yoxlayın.
          </p>
          <div className="pt-6 grid grid-cols-3 gap-6 border-t border-slate-800 max-w-lg">
            <div>
              <div className="text-3xl font-black text-white">1,000+</div>
              <div className="text-xs text-slate-400 font-medium mt-1">Aktiv Tələbə</div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 w-full">
          <div className="bg-[#111827] border border-slate-800 p-8 rounded-3xl shadow-2xl">
            <h2 className="text-2xl font-bold text-white text-center mb-6">
              {authMode === 'register' ? 'İmtahana Qeydiyyat' : 'Xoş Gəlmisiniz'}
            </h2>

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
                    className="w-full bg-[#0a0f1d] border border-slate-700 focus:border-emerald-500 text-white rounded-xl px-4 py-3 text-sm outline-none"
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
                  className="w-full bg-[#0a0f1d] border border-slate-700 focus:border-emerald-500 text-white rounded-xl px-4 py-3 text-sm outline-none"
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
                  className="w-full bg-[#0a0f1d] border border-slate-700 focus:border-emerald-500 text-white rounded-xl px-4 py-3 text-sm outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 rounded-xl text-sm transition shadow-lg mt-2 cursor-pointer"
              >
                {authMode === 'register' ? 'QEYDİYYATDAN KEÇ VƏ BAŞLA 🚀' : 'DAXİL OL 🚀'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => { setAuthMode(authMode === 'register' ? 'login' : 'register'); setErrorMsg(''); }}
                className="text-emerald-400 font-bold hover:underline text-xs cursor-pointer"
              >
                {authMode === 'register' ? 'Artıq hesabınız var? Daxil olun' : 'Hesabınız yoxdur? Qeydiyyatdan keçin'}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}