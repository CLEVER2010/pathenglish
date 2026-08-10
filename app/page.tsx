'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
    const [name, setName] = useState('');
    const router = useRouter();

    const handleStart = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) {
            alert('Zəhmət olmasa ad və soyadınızı daxil edin.');
            return;
        }
        // İstifadəçi adını yadda saxlayıb imtahan səhifəsinə keçirik
        localStorage.setItem('userName', name);
        router.push('/exam/beginner'); // Və ya istədiyin başlanğıc səhifəyə
    };

    return (
        <div style={{
            fontFamily: 'Arial, sans-serif',
            backgroundColor: '#0f172a',
            color: '#f8fafc',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
        }}>
            {/* Header */}
            <header style={{
                padding: '20px 40px',
                borderBottom: '1px solid #1e293b',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#38bdf8' }}>
                    PathEnglish.<span style={{ color: '#fff' }}>Az</span>
                </div>
                <div style={{ fontSize: '14px', color: '#94a3b8' }}>
                    Səviyyə Təyini İmtahanı (Placement Test)
                </div>
            </header>

            {/* Main Content */}
            <main style={{
                maxWidth: '600px',
                margin: 'auto',
                padding: '40px 20px',
                textAlign: 'center'
            }}>
                <h1 style={{ fontSize: '32px', marginBottom: '20px', color: '#f1f5f9' }}>
                    İngilis Dili Biliklərinizi Yoxlayın
                </h1>
                <p style={{ color: '#94a3b8', lineHeight: '1.6', marginBottom: '30px' }}>
                    Bu test qrammatika, oxu (reading) və dinləmə bacarıqlarınızı qiymətləndirmək üçün peşəkar şəkildə hazırlanmışdır. Zəhmət olmasa qeydiyyatdan keçərək imtahana başlayın.
                </p>

                <form onSubmit={handleStart} style={{
                    background: '#1e293b',
                    padding: '30px',
                    borderRadius: '12px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
                }}>
                    <div style={{ marginBottom: '20px', textAlign: 'left' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#cbd5e1' }}>
                            Ad və Soyadınız:
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Məsələn: Əli Məmmədov"
                            style={{
                                width: '100%',
                                padding: '12px 15px',
                                borderRadius: '6px',
                                border: '1px solid #334155',
                                backgroundColor: '#0f172a',
                                color: '#fff',
                                fontSize: '16px',
                                outline: 'none'
                            }}
                        />
                    </div>

                    <button
                        type="submit"
                        style={{
                            width: '100%',
                            padding: '14px',
                            backgroundColor: '#0284c7',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            transition: 'background 0.2s'
                        }}
                    >
                        İmtahana Başla
                    </button>
                </form>
            </main>

            {/* Footer */}
            <footer style={{
                padding: '20px',
                textAlign: 'center',
                borderTop: '1px solid #1e293b',
                color: '#64748b',
                fontSize: '14px'
            }}>
                &copy; 2026 PathEnglish.Az. Bütün hüquqlar qorunur.
            </footer>
        </div>
    );
}