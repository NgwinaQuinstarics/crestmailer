import { useState, useEffect, useRef } from 'react';
import { Send, Users, Mail, FileText, Eye, EyeOff, X, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import { mailApi, contactsApi, templatesApi } from '../utils/api';

// Simple rich text editor using contentEditable
function RichEditor({ value, onChange }) {
  const ref = useRef(null);
  const toolbarRef = useRef(null);

  const exec = (cmd, val = null) => { document.execCommand(cmd, false, val); ref.current.focus(); };

  const handleInput = () => { onChange(ref.current.innerHTML); };

  useEffect(() => {
    if (ref.current && ref.current.innerHTML !== value) {
      ref.current.innerHTML = value || '';
    }
  }, []);

  const tools = [
    { label: 'B', cmd: 'bold', title: 'Bold' },
    { label: 'I', cmd: 'italic', title: 'Italic' },
    { label: 'U', cmd: 'underline', title: 'Underline' },
  ];

  return (
    <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius2)', overflow: 'hidden' }}>
      <div style={{ background: 'var(--bg3)', padding: '8px 12px', borderBottom: '1px solid var(--border)', display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
        {tools.map(t => (
          <button key={t.cmd} type="button" title={t.title}
            style={{ padding: '4px 10px', borderRadius: 4, border: '1px solid var(--border)', background: 'var(--card-bg)', color: 'var(--text)', cursor: 'pointer', fontWeight: t.cmd === 'bold' ? 700 : t.cmd === 'italic' ? 400 : 400, fontStyle: t.cmd === 'italic' ? 'italic' : 'normal', textDecoration: t.cmd === 'underline' ? 'underline' : 'none', fontSize: '0.85rem' }}
            onMouseDown={e => { e.preventDefault(); exec(t.cmd); }}>
            {t.label}
          </button>
        ))}
        <span style={{ color: 'var(--border2)', padding: '0 4px' }}>|</span>
        <button type="button" onMouseDown={e => { e.preventDefault(); exec('justifyLeft'); }} style={{ padding: '4px 8px', borderRadius: 4, border: '1px solid var(--border)', background: 'var(--card-bg)', color: 'var(--text)', cursor: 'pointer', fontSize: '0.85rem' }}>≡</button>
        <button type="button" onMouseDown={e => { e.preventDefault(); exec('justifyCenter'); }} style={{ padding: '4px 8px', borderRadius: 4, border: '1px solid var(--border)', background: 'var(--card-bg)', color: 'var(--text)', cursor: 'pointer', fontSize: '0.85rem' }}>≡</button>
        <button type="button" onMouseDown={e => { e.preventDefault(); exec('insertUnorderedList'); }} style={{ padding: '4px 8px', borderRadius: 4, border: '1px solid var(--border)', background: 'var(--card-bg)', color: 'var(--text)', cursor: 'pointer', fontSize: '0.85rem' }}>• List</button>
        <select onChange={e => exec('foreColor', e.target.value)} style={{ padding: '4px', borderRadius: 4, border: '1px solid var(--border)', background: 'var(--card-bg)', color: 'var(--text)', cursor: 'pointer', fontSize: '0.82rem' }} defaultValue="">
          <option value="" disabled>Color</option>
          <option value="#f0f0f8">White</option>
          <option value="#6c63ff">Purple</option>
          <option value="#ff6584">Pink</option>
          <option value="#43e97b">Green</option>
          <option value="#ffa502">Orange</option>
          <option value="#ff4757">Red</option>
          <option value="#54a0ff">Blue</option>
        </select>
        <select onChange={e => exec('fontSize', e.target.value)} style={{ padding: '4px', borderRadius: 4, border: '1px solid var(--border)', background: 'var(--card-bg)', color: 'var(--text)', cursor: 'pointer', fontSize: '0.82rem' }} defaultValue="">
          <option value="" disabled>Size</option>
          <option value="2">Small</option>
          <option value="3">Normal</option>
          <option value="4">Large</option>
          <option value="5">X-Large</option>
          <option value="6">2X-Large</option>
        </select>
      </div>
      <div
        ref={ref}
        contentEditable
        onInput={handleInput}
        suppressContentEditableWarning
        style={{ minHeight: 220, padding: 16, outline: 'none', color: 'var(--text)', background: 'var(--input-bg)', fontSize: '0.95rem', lineHeight: 1.7 }}
        data-placeholder="Write your email content here... Use {{name}} to personalize"
      />
      <style>{`[contenteditable]:empty:before { content: attr(data-placeholder); color: var(--text2); pointer-events: none; }`}</style>
    </div>
  );
}

export default function Compose() {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [recipientType, setRecipientType] = useState('all');
  const [contacts, setContacts] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [customEmails, setCustomEmails] = useState([]);
  const [emailInput, setEmailInput] = useState('');
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(false);
  const [contactSearch, setContactSearch] = useState('');
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    contactsApi.getAll({ limit: 200 }).then(r => setContacts(r.contacts || []));
    templatesApi.getAll().then(r => setTemplates(r.templates || []));
  }, []);

  const loadTemplate = (id) => {
    const t = templates.find(t => t.id === parseInt(id));
    if (t) { setSubject(t.subject); setBody(t.body); toast.success('Template loaded'); }
  };

  const addEmail = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const email = emailInput.trim().replace(/,$/, '');
      if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && !customEmails.includes(email)) {
        setCustomEmails(p => [...p, email]);
        setEmailInput('');
      }
    }
  };

  const toggleContact = (id) => setSelectedIds(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);

  const filteredContacts = contacts.filter(c =>
    c.name.toLowerCase().includes(contactSearch.toLowerCase()) ||
    c.email.toLowerCase().includes(contactSearch.toLowerCase())
  );

  const getRecipientCount = () => {
    if (recipientType === 'all') return contacts.filter(c => c.subscribed).length;
    if (recipientType === 'ids') return selectedIds.length;
    return customEmails.length;
  };

  const handleSend = async () => {
    if (!subject) return toast.error('Subject is required');
    if (!body || body === '<br>') return toast.error('Email body is required');
    if (recipientType === 'ids' && selectedIds.length === 0) return toast.error('Select at least one recipient');
    if (recipientType === 'emails' && customEmails.length === 0) return toast.error('Add at least one email address');

    const confirmed = confirm(`Send email to ${getRecipientCount()} recipient(s)?`);
    if (!confirmed) return;

    setSending(true);
    try {
      const payload = { subject, body, recipient_type: recipientType };
      if (recipientType === 'ids') payload.contact_ids = selectedIds;
      if (recipientType === 'emails') payload.emails = customEmails;

      const res = await mailApi.send(payload);
      setResult(res.results);
      toast.success(res.message || 'Mail sent!');
      setSubject(''); setBody(''); setSelectedIds([]); setCustomEmails([]);
    } catch (e) { toast.error(e.message); }
    finally { setSending(false); }
  };

  return (
    <div className="page">
      <div className="page-header">
        <div><h2>Compose Email</h2><p>Send personalized emails to your contacts</p></div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn-ghost" onClick={() => setPreview(p => !p)}>
            {preview ? <><EyeOff size={15} /> Editor</> : <><Eye size={15} /> Preview</>}
          </button>
          <button className="btn btn-primary" onClick={handleSend} disabled={sending}>
            {sending ? 'Sending...' : <><Send size={15} /> Send Email</>}
          </button>
        </div>
      </div>

      {result && (
        <div className="card" style={{ marginBottom: 20, borderColor: 'var(--success)', background: 'rgba(46,213,115,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Check size={20} color="var(--success)" />
            <div>
              <strong>Email sent successfully!</strong>
              <span style={{ color: 'var(--text2)', marginLeft: 12 }}>✅ {result.sent} sent · ❌ {result.failed} failed</span>
            </div>
            <button onClick={() => setResult(null)} style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text2)' }}><X size={16} /></button>
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 24 }}>
        <div>
          {/* Template Picker */}
          <div className="card" style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
              <FileText size={16} color="var(--accent)" />
              <span style={{ fontWeight: 500, fontSize: '0.9rem' }}>Load Template:</span>
              <select onChange={e => loadTemplate(e.target.value)} style={{ flex: 1, minWidth: 200 }} defaultValue="">
                <option value="" disabled>Choose a template...</option>
                {templates.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
            </div>
          </div>

          <div className="card">
            <div className="form-group">
              <label>Subject Line <span>*</span></label>
              <input value={subject} onChange={e => setSubject(e.target.value)} placeholder="Your email subject... Use {{name}} for personalization" />
            </div>

            <div className="form-group">
              <label>Email Body <span>*</span></label>
              {preview ? (
                <div>
                  <div className="preview-box" dangerouslySetInnerHTML={{ __html: body || '<p style="color:#999">Nothing to preview yet</p>' }} />
                </div>
              ) : (
                <RichEditor value={body} onChange={setBody} />
              )}
              <div style={{ fontSize: '0.78rem', color: 'var(--text2)', marginTop: 8 }}>
                💡 Use <code style={{ background: 'var(--bg3)', padding: '1px 6px', borderRadius: 4 }}>{'{{name}}'}</code> to personalize with contact name
              </div>
            </div>
          </div>
        </div>

        {/* Recipients Panel */}
        <div>
          <div className="card">
            <h3 style={{ fontFamily: 'var(--font-head)', fontSize: '1rem', marginBottom: 16 }}>
              <Users size={16} style={{ marginRight: 8, verticalAlign: 'middle', color: 'var(--accent)' }} />
              Recipients
            </h3>

            <div className="tabs" style={{ flexDirection: 'column' }}>
              {[['all', 'All Subscribers'], ['ids', 'Select Contacts'], ['emails', 'Custom Emails']].map(([val, label]) => (
                <button key={val} className={`tab ${recipientType === val ? 'active' : ''}`} onClick={() => setRecipientType(val)} style={{ textAlign: 'left' }}>
                  {label}
                </button>
              ))}
            </div>

            {recipientType === 'all' && (
              <div style={{ padding: '12px', background: 'var(--bg3)', borderRadius: 'var(--radius2)', textAlign: 'center' }}>
                <Users size={24} color="var(--accent)" style={{ marginBottom: 8 }} />
                <div style={{ fontWeight: 600 }}>{contacts.filter(c => c.subscribed).length} subscribers</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text2)' }}>All subscribed contacts</div>
              </div>
            )}

            {recipientType === 'ids' && (
              <div>
                <input value={contactSearch} onChange={e => setContactSearch(e.target.value)} placeholder="Search contacts..." style={{ marginBottom: 8 }} />
                <div className="contact-select-list">
                  {filteredContacts.map(c => (
                    <div key={c.id} className={`contact-select-item ${selectedIds.includes(c.id) ? 'selected' : ''}`} onClick={() => toggleContact(c.id)}>
                      <input type="checkbox" checked={selectedIds.includes(c.id)} onChange={() => {}} />
                      <div className="contact-avatar" style={{ width: 28, height: 28, fontSize: '0.75rem' }}>{c.name?.charAt(0)?.toUpperCase()}</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: '0.85rem', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text2)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.email}</div>
                      </div>
                    </div>
                  ))}
                </div>
                {selectedIds.length > 0 && <div style={{ marginTop: 8, fontSize: '0.85rem', color: 'var(--accent)' }}>{selectedIds.length} selected</div>}
              </div>
            )}

            {recipientType === 'emails' && (
              <div>
                <div className="tags-input" onClick={() => document.querySelector('.email-tag-input')?.focus()}>
                  {customEmails.map(e => (
                    <span key={e} className="tag">{e}<button onClick={() => setCustomEmails(p => p.filter(x => x !== e))}>×</button></span>
                  ))}
                  <input className="email-tag-input" value={emailInput} onChange={e => setEmailInput(e.target.value)} onKeyDown={addEmail} placeholder={customEmails.length ? '' : 'Type email, press Enter...'} />
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text2)', marginTop: 6 }}>Press Enter or comma to add email</div>
              </div>
            )}

            <div style={{ marginTop: 16, padding: '12px', background: 'rgba(108,99,255,0.1)', borderRadius: 'var(--radius2)', fontSize: '0.85rem' }}>
              <strong style={{ color: 'var(--accent)' }}>{getRecipientCount()}</strong>
              <span style={{ color: 'var(--text2)' }}> recipient(s) will receive this email</span>
            </div>

            <button className="btn btn-primary" style={{ width: '100%', marginTop: 16, justifyContent: 'center' }} onClick={handleSend} disabled={sending}>
              {sending ? '⏳ Sending...' : <><Send size={15} /> Send Now</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
