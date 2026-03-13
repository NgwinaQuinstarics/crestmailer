import { useState, useRef } from 'react';
import toast from 'react-hot-toast';

// This can be customised via the campaign/settings image upload
export default function Subscribe() {
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [status, setStatus] = useState('idle');
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    // canbe replaced with real API call: await contactsApi.create(form)
    await new Promise(r => setTimeout(r, 900));
    setStatus('success');
  };

  if (status === 'success') return (
    
   
    <div style={{ minHeight: '100vh', background: 'var(--cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font)', padding: 24 }}>
      <div style={{ textAlign: 'center', maxWidth: 380 }}>
        <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#dcfce7', border: '2px solid #86efac', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '1.4rem' }}>✓</div>
        <h2 style={{ fontFamily: 'var(--font-head)', fontSize: '1.5rem', marginBottom: 8 }}>You're subscribed!</h2>
        <p style={{ color: 'var(--ink3)', lineHeight: 1.6, marginBottom: 20 }}>Welcome, <strong>{form.name}</strong>. You'll hear from us soon.</p>
        <button onClick={() => { setStatus('idle'); setForm({ name: '', email: '', phone: '' }); }} className="btn btn-outline">Subscribe another</button>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)', fontFamily: 'var(--font)' }}>
      <div style={{ background: 'var(--ink)', padding: '14px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontFamily: 'var(--font-head)', fontSize: '1.1rem', color: '#fff' }}>MailFlow</div>
      </div>

      <div style={{ maxWidth: 480, margin: '60px auto', padding: '0 20px' }}>
        <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden', boxShadow: 'var(--shadow)' }}>
          <div style={{ background: 'var(--ink)', padding: '28px 32px' }}>
            <h1 style={{ fontFamily: 'var(--font-head)', color: '#fff', fontSize: '1.6rem', marginBottom: 6 }}>Stay in the loop</h1>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.88rem' }}>Get updates delivered straight to your inbox. No spam.</p>
          </div>

          <div style={{ padding: '28px 32px' }}>
            <form onSubmit={submit}>
             
              <div className="field">
                <label>Your name <span style={{ color: 'var(--rust)' }}>*</span></label>
                <input required type="text" value={form.name} onChange={e => set('name', e.target.value)}  />
              </div>
              <div className="field">
                <label>Email address <span style={{ color: 'var(--rust)' }}>*</span></label>
                <input required type="email" value={form.email} onChange={e => set('email', e.target.value)}  />
              </div>
              <div className="field">
                <label>Phone number <span style={{ color: 'var(--rust)' }}>*</span></label>
                <input type="tel" value={form.phone} onChange={e => set('phone', e.target.value)}  />
              </div>
              <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center', marginTop: 4 }} disabled={status === 'loading'}>
                {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
            <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--ink4)', marginTop: 16 }}>
              Your data is safe. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </div>
  
  );
}
