'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProfessionalLandingPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const router = useRouter();

    const handleStartTest = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !email.trim()) {
            alert('Zəhmət olmasa adınızı və e-poçt ünvanınızı daxil edin.');
            return;
        }
        localStorage.setItem('userName', name);
        localStorage.setItem('userEmail', email);
        // Birbaşa imtahan səhifəsinə yönləndirmə (məsələn, qrammatika / səviyyə testinə)
        router.push('/exam/beginner');
    };

    return (
        <div style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            backgroundColor: '#0b132b',
            color: '#ffffff',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
        }}>
            {/* Header */}
            <header style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '20px 50px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                backgroundColor: '#0b132b'
            }}>
                <div style={{ fontSize: '22px', fontWeight: '800', letterSpacing: '-0.5px' }}>
                    PathEnglish.<span style={{ color: '#ef4444' }}>Az</span>
                </div>
                <div style={{ display: 'flex', gap: '25px', alignItems: 'center', fontSize: '14px', color: '#94a3b8' }}>
                    <span style={{ cursor: 'pointer' }}>Tests</span>
                    <span style={{ cursor: 'pointer' }}>Certificate</span>
                    <span style={{ cursor: 'pointer' }}>Practice</span>
                    <div style={{
                        backgroundColor: '#ef4444',
                        color: 'white',
                        padding: '8px 18px',
                        borderRadius: '6px',
                        fontWeight: '600',
                        cursor: 'pointer'
                    }}>
                        Start Test
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <main style={{
                maxWidth: '1100px',
                margin: '40px auto',
                padding: '0 20px',
                display: 'grid',
                gridTemplateColumns: '1.2fr 0.8fr',
                gap: '50px',
                alignItems: 'center'
            }}>
                {/* Left Side: Information & Credibility */}
                <div>
                    <div style={{
                        display: 'inline-block',
                        backgroundColor: 'rgba(239, 68, 68, 0.15)',
                        color: '#ef4444',
                        padding: '6px 14px',
                        borderRadius: '20px',
                        fontSize: '13px',
                        fontWeight: '700',
                        marginBottom: '20px',
                        letterSpacing: '0.5px'
                    }}>
                        BEYNƏLXALQ STANDARTLAR
                    </div>
                    <h1 style={{
                        fontSize: '44px',
                        lineHeight: '1.2',
                        fontWeight: '800',
                        marginBottom: '20px',
                        color: '#f8fafc'
                    }}>
                        İngilis Dili Səviyyənizi Təsdiqləyin və <span style={{ color: '#ef4444' }}>Sertifikat</span> Alın
                    </h1>
                    <p style={{
                        color: '#94a3b8',
                        fontSize: '16px',
                        lineHeight: '1.6',
                        marginBottom: '30px'
                    }}>
                        CEFR standartlarına uyğun peşəkar yerləşdirmə imtahanı verərək real dil bil патологію (biliyinizi) yoxlayın. İmtahanı uğurla tamamlayan namizədlərə rəsmi rəqəmsal sertifikat **tamamilə pulsuz** təqdim olunur.
                    </p>

                    <div style={{ display: 'flex', gap: '30px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
                        <div>
                            <div style={{ fontSize: '24px', fontWeight: '700', color: '#fff' }}>15,000+</div>
                            <div style={{ fontSize: '13px', color: '#94a3b8' }}>Aktiv Tələbə</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '24px', fontWeight: '700', color: '#fff' }}>CEFR</div>
                            <div style={{ fontSize: '13px', color: '#94a3b8' }}>Beynəlxalq Uyğunluq</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '24px', fontWeight: '700', color: '#22c55e' }}>0 AZN</div>
                            <div style={{ fontSize: '13px', color: '#94a3b8' }}>Sertifikat Haqqı</div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Professional Login / Registration Box */}
                <div style={{
                    backgroundColor: '#111c44',
                    padding: '35px',
                    borderRadius: '12px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                    border: '1px solid rgba(255, 255, 255, 0.08)'
                }}>
                    <h3 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '8px', color: '#fff' }}>
                        İmtahana Giriş
                    </h3>
                    <p style={{ fontSize: '14px', color: '#94a3b8', marginBottom: '25px' }}>
                        Nəticələriniz və sertifikatınız üçün məlumatlarınızı daxil edin.
                    </p>

                    <form onSubmit={handleStartTest}>
                        <div style={{ marginBottom: '18px' }}>
                            <label style={{ display: 'block', fontSize: '13px', color: '#cbd5e1', marginBottom: '6px', fontWeight: '600' }}>
                                Ad və Soyad
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Məsələn: Leyla Məmmədova"
                                style={{
                                    width: '100%',
                                    padding: '12px 14px',
                                    backgroundColor: '#0b132b',
                                    border: '1px solid #334155',
                                    borderRadius: '6px',
                                    color: '#fff',
                                    fontSize: '15px',
                                    outline: 'none'
                                }}
                            />
                        </div>

                        <div style={{ marginBottom: '25px' }}>
                            <label style={{ display: 'block', fontSize: '13px', color: '#cbd5e1', marginBottom: '6px', fontWeight: '600' }}>
                                Elektron Poçt (Email)
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="ornek@domain.com"
                                style={{
                                    width: '100%',
                                    padding: '12px 14px',
                                    backgroundColor: '#0b132b',
                                    border: '1px solid #334155',
                                    borderRadius: '6px',
                                    color: '#fff',
                                    fontSize: '15px',
                                    outline: 'none'
                                }}
                            />
                        </div>

                        <button
                            type="submit"
                            style={{
                                width: '100%',
                                padding: '14px',
                                backgroundColor: '#dc2626',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                fontSize: '16px',
                                fontWeight: '700',
                                cursor: 'pointer',
                                transition: 'background 0.2s',
                                boxShadow: '0 4px 12px rgba(220, 38, 38, 0.4)'
                            }}
                        >
                            İmtahana İndi Başla 🚀
                        </button>
                    </form>
                </div>
            </main>

            {/* Footer */}
            <footer style={{
                textAlign: 'center',
                padding: '20px',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                color: '#64748b',
                fontSize: '13px'
            }}>
                &copy; 2026 PathEnglish.Az. Bütün hüquqlar qorunur. Beynəlxalq Dil Testi Platforması.
            </footer>
        </div>
    );
}