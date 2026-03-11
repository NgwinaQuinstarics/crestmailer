import { useEffect, useState } from 'react';
import { Settings as SettingsIcon, Save, Mail, Globe, Lock } from 'lucide-react';
import toast from 'react-hot-toast';
import { settingsApi } from '../utils/api';

export default function Settings() {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState('general');

  useEffect(() => {
    settingsApi.get().then(r => { setSettings(r.settings || {}); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const update = (key, val) => setSettings(p => ({ ...p, [key]: val }));

  const save = async () => {
    setSaving(true);
    try {
      await settingsApi.update(settings);
      toast.success('Settings saved!');
    } catch (e) { toast.error(e.message); }
    finally { setSaving(false); }
  };

  if (loading) return <div className="page"><div className="loading"><div className="spinner" /></div></div>;

  const tabs = [
    { id: 'general', label: 'General', icon: Globe },
    { id: 'email', label: 'Email / SMTP', icon: Mail },
    { id: 'templates', label: 'Default Messages', icon: SettingsIcon },
  ];

  return (
    <div className="page">
      <div className="page-header">
        <div><h2>Settings</h2><p>Configure your mailer application</p></div>
        <button className="btn btn-primary" onClick={save} disabled={saving}>
          <Save size={16} /> {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>

      <div className="tabs">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button key={id} className={`tab ${tab === id ? 'active' : ''}`} onClick={() => setTab(id)}>
            <Icon size={14} style={{ marginRight: 6, verticalAlign: 'middle' }} />{label}
          </button>
        ))}
      </div>

      {tab === 'general' && (
        <div className="card">
          <h3 style={{ fontFamily: 'var(--font-head)', marginBottom: 20, fontSize: '1rem' }}>General Settings</h3>
          <div className="grid-2">
            <div className="form-group">
              <label>Application Name</label>
              <input value={settings.app_name || ''} onChange={e => update('app_name', e.target.value)} placeholder="MailerApp" />
            </div>
            <div className="form-group">
              <label>Admin Email</label>
              <input type="email" value={settings.admin_email || ''} onChange={e => update('admin_email', e.target.value)} placeholder="admin@example.com" />
            </div>
          </div>
          <div className="grid-2">
            <div className="form-group">
              <label>From Name</label>
              <input value={settings.from_name || ''} onChange={e => update('from_name', e.target.value)} placeholder="Your Company" />
            </div>
            <div className="form-group">
              <label>From Email</label>
              <input type="email" value={settings.from_email || ''} onChange={e => update('from_email', e.target.value)} placeholder="noreply@example.com" />
            </div>
          </div>
        </div>
      )}

      {tab === 'email' && (
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <Lock size={16} color="var(--warning)" />
            <span style={{ fontSize: '0.85rem', color: 'var(--warning)' }}>SMTP credentials are stored securely. Passwords are not displayed after saving.</span>
          </div>
          <h3 style={{ fontFamily: 'var(--font-head)', marginBottom: 20, fontSize: '1rem' }}>SMTP Configuration</h3>
          <div className="grid-2">
            <div className="form-group">
              <label>SMTP Host</label>
              <input value={settings.smtp_host || ''} onChange={e => update('smtp_host', e.target.value)} placeholder="smtp.gmail.com" />
            </div>
            <div className="form-group">
              <label>SMTP Port</label>
              <input type="number" value={settings.smtp_port || ''} onChange={e => update('smtp_port', e.target.value)} placeholder="587" />
            </div>
          </div>
          <div className="grid-2">
            <div className="form-group">
              <label>SMTP Username</label>
              <input value={settings.smtp_user || ''} onChange={e => update('smtp_user', e.target.value)} placeholder="your@email.com" />
            </div>
            <div className="form-group">
              <label>SMTP Password</label>
              <input type="password" value={settings.smtp_pass || ''} onChange={e => update('smtp_pass', e.target.value)} placeholder="••••••••" />
            </div>
          </div>
          <div className="card" style={{ background: 'var(--bg3)', marginTop: 8 }}>
            <p style={{ fontSize: '0.85rem', color: 'var(--text2)', marginBottom: 8 }}>💡 <strong>Popular SMTP Services:</strong></p>
            <ul style={{ fontSize: '0.82rem', color: 'var(--text2)', paddingLeft: 20, lineHeight: 2 }}>
              <li><strong>Gmail:</strong> smtp.gmail.com : 587 (Use App Password)</li>
              <li><strong>SendGrid:</strong> smtp.sendgrid.net : 587</li>
              <li><strong>Mailgun:</strong> smtp.mailgun.org : 587</li>
              <li><strong>Mailtrap (dev):</strong> sandbox.smtp.mailtrap.io : 2525</li>
            </ul>
          </div>
        </div>
      )}

      {tab === 'templates' && (
        <div className="card">
          <h3 style={{ fontFamily: 'var(--font-head)', marginBottom: 20, fontSize: '1rem' }}>Default Messages</h3>
          <div className="form-group">
            <label>Welcome Email Subject</label>
            <input value={settings.welcome_subject || ''} onChange={e => update('welcome_subject', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Welcome Email Body</label>
            <textarea value={settings.welcome_body || ''} onChange={e => update('welcome_body', e.target.value)} rows={8} />
            <div style={{ fontSize: '0.78rem', color: 'var(--text2)', marginTop: 6 }}>
              Variables: <code style={{ background: 'var(--bg3)', padding: '1px 6px', borderRadius: 4 }}>{'{{name}}'}</code> <code style={{ background: 'var(--bg3)', padding: '1px 6px', borderRadius: 4 }}>{'{{app_name}}'}</code>
            </div>
          </div>
          <button className="btn btn-primary" onClick={save} disabled={saving}>
            <Save size={15} /> {saving ? 'Saving...' : 'Save All Settings'}
          </button>
        </div>
      )}
    </div>
  );
}
