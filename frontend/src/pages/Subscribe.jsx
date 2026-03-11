import { useState } from 'react';
import { contactsApi } from '../utils/api';

export default function Subscribe() {
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [error, setError] = useState('');

  const update = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setStatus('loading');
    try {
      await contactsApi.create(form);
      setStatus('success');
    } catch (err) {
      setError(err.message);
      setStatus('error');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a0f 0%, #1a0a2e 50%, #0a0a1f 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '20px',
      fontFamily: 'var(--font-body)',
      position: 'relative', overflow: 'hidden'
    }}>
      {/* Background orbs */}
      <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(108,99,255,0.15) 0%, transparent 70%)', top: '-100px', left: '-100px', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,101,132,0.1) 0%, transparent 70%)', bottom: '-50px', right: '-50px', pointerEvents: 'none' }} />

      <div style={{
        width: '100%', maxWidth: 440,
        background: 'rgba(20, 20, 30, 0.9)',
        border: '1px solid rgba(108,99,255,0.3)',
        borderRadius: '20px', padding: '40px',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 24px 80px rgba(0,0,0,0.5)',
        position: 'relative', zIndex: 1
      }}>
        {status === 'success' ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ fontSize: '4rem', marginBottom: 16 }}>🎉</div>
            <h2 style={{ fontFamily: 'var(--font-head)', fontSize: '1.8rem', background: 'linear-gradient(135deg, #6c63ff, #ff6584)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: 12 }}>
              You're In!
            </h2>
            <p style={{ color: '#9090b0', lineHeight: 1.7 }}>
              Welcome to our mailing list, <strong style={{ color: '#f0f0f8' }}>{form.name}</strong>!<br />
              You'll receive updates and news directly in your inbox.
            </p>
            <button onClick={() => { setStatus('idle'); setForm({ name: '', email: '', phone: '' }); }}
              style={{ marginTop: 24, padding: '10px 24px', background: 'rgba(108,99,255,0.2)', border: '1px solid rgba(108,99,255,0.4)', borderRadius: 8, color: '#6c63ff', cursor: 'pointer', fontSize: '0.9rem', fontFamily: 'var(--font-body)' }}>
              Subscribe another
            </button>
          </div>
        ) : (
          <>
            <div style={{ textAlign: 'center', marginBottom: 32 }}>
              <div style={{ fontSize: '2rem', marginBottom: 8 }}>✉️</div>
              <h1 style={{ fontFamily: 'var(--font-head)', fontSize: '2rem', fontWeight: 800, background: 'linear-gradient(135deg, #6c63ff, #ff6584)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: 8 }}>
                Stay in the Loop
              </h1>
              <p style={{ color: '#9090b0', fontSize: '0.95rem', lineHeight: 1.6 }}>
                Subscribe for updates.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#9090b0', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Full Name *</label>
                <input
                  required value={form.name} onChange={e => update('name', e.target.value)}
                  
                  style={{ width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(108,99,255,0.3)', borderRadius: 10, color: '#f0f0f8', fontSize: '0.95rem', outline: 'none', fontFamily: 'var(--font-body)', boxSizing: 'border-box' }}
                  onFocus={e => e.target.style.borderColor = '#6c63ff'}
                  onBlur={e => e.target.style.borderColor = 'rgba(108,99,255,0.3)'}
                />
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#9090b0', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email Address *</label>
                <input
                  required type="email" value={form.email} onChange={e => update('email', e.target.value)}
                  placeholder="name@example.com"
                  style={{ width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(108,99,255,0.3)', borderRadius: 10, color: '#f0f0f8', fontSize: '0.95rem', outline: 'none', fontFamily: 'var(--font-body)', boxSizing: 'border-box' }}
                  onFocus={e => e.target.style.borderColor = '#6c63ff'}
                  onBlur={e => e.target.style.borderColor = 'rgba(108,99,255,0.3)'}
                />
              </div>

              <div style={{ marginBottom: 24 }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#9090b0', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Phone Number <span style={{ color: '#6060a0', fontWeight: 400, textTransform: 'none' }}>(optional)</span></label>
                <input
                  type="tel" value={form.phone} onChange={e => update('phone', e.target.value)}
                  
                  style={{ width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(108,99,255,0.3)', borderRadius: 10, color: '#f0f0f8', fontSize: '0.95rem', outline: 'none', fontFamily: 'var(--font-body)', boxSizing: 'border-box' }}
                  onFocus={e => e.target.style.borderColor = '#6c63ff'}
                  onBlur={e => e.target.style.borderColor = 'rgba(108,99,255,0.3)'}
                />
              </div>

              {status === 'error' && (
                <div style={{ padding: '10px 14px', background: 'rgba(255,71,87,0.1)', border: '1px solid rgba(255,71,87,0.3)', borderRadius: 8, color: '#ff6570', fontSize: '0.85rem', marginBottom: 16 }}>
                  {error}
                </div>
              )}

              <button type="submit" disabled={status === 'loading'}
                style={{
                  width: '100%', padding: '14px', borderRadius: 10, border: 'none', cursor: 'pointer',
                  background: status === 'loading' ? 'rgba(108,99,255,0.5)' : 'linear-gradient(135deg, #6c63ff, #8b83ff)',
                  color: '#fff', fontFamily: 'var(--font-head)', fontSize: '1rem', fontWeight: 700,
                  transition: 'all 0.2s', boxShadow: '0 4px 20px rgba(108,99,255,0.4)'
                }}>
                {status === 'loading' ? '⏳ Subscribing...' : '✉️ Subscribe Now'}
              </button>
            </form>

            <p style={{ textAlign: 'center', fontSize: '0.78rem', color: '#6060a0', marginTop: 20, lineHeight: 1.5 }}>
             We respect your privacy. Unsubscribe at any time.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
