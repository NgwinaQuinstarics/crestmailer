import { useEffect, useState } from 'react';
import { FileText, Plus, Trash2, Edit2, X, Copy } from 'lucide-react';
import toast from 'react-hot-toast';
import { templatesApi } from '../utils/api';
import { useNavigate } from 'react-router-dom';

function TemplateModal({ template, onClose, onSaved }) {
  const [form, setForm] = useState({ name: template?.name || '', subject: template?.subject || '', body: template?.body || '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!form.name || !form.subject || !form.body) return toast.error('All fields required');
    setLoading(true);
    try {
      if (template) await templatesApi.update(template.id, form);
      else await templatesApi.create(form);
      toast.success(template ? 'Template updated' : 'Template created');
      onSaved();
      onClose();
    } catch (e) { toast.error(e.message); }
    finally { setLoading(false); }
  };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal modal-lg">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h3>{template ? 'Edit Template' : 'New Template'}</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text2)' }}><X size={20} /></button>
        </div>
        <div className="form-group">
          <label>Template Name <span>*</span></label>
          <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="e.g. Welcome Email" />
        </div>
        <div className="form-group">
          <label>Subject Line <span>*</span></label>
          <input value={form.subject} onChange={e => setForm(p => ({ ...p, subject: e.target.value }))} placeholder="Email subject — use {{name}} for personalization" />
        </div>
        <div className="form-group">
          <label>Email Body <span>*</span></label>
          <textarea value={form.body} onChange={e => setForm(p => ({ ...p, body: e.target.value }))} rows={10} placeholder="Write your email body HTML here..." style={{ fontFamily: 'monospace', fontSize: '0.85rem' }} />
          <div style={{ fontSize: '0.78rem', color: 'var(--text2)', marginTop: 6 }}>
            Variables: <code style={{ background: 'var(--bg3)', padding: '1px 6px', borderRadius: 4 }}>{'{{name}}'}</code> <code style={{ background: 'var(--bg3)', padding: '1px 6px', borderRadius: 4 }}>{'{{email}}'}</code> <code style={{ background: 'var(--bg3)', padding: '1px 6px', borderRadius: 4 }}>{'{{app_name}}'}</code>
          </div>
        </div>
        <div className="modal-actions">
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSubmit} disabled={loading}>{loading ? 'Saving...' : 'Save Template'}</button>
        </div>
      </div>
    </div>
  );
}

export default function Templates() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editTemplate, setEditTemplate] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  const load = () => {
    setLoading(true);
    templatesApi.getAll().then(r => { setTemplates(r.templates || []); setLoading(false); }).catch(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id) => {
    if (!confirm('Delete this template?')) return;
    try { await templatesApi.delete(id); toast.success('Deleted'); load(); } catch (e) { toast.error(e.message); }
  };

  const useTemplate = (t) => {
    navigate('/compose', { state: { template: t } });
  };

  return (
    <div className="page">
      <div className="page-header">
        <div><h2>Templates</h2><p>Reusable email templates for your campaigns</p></div>
        <button className="btn btn-primary" onClick={() => { setEditTemplate(null); setShowModal(true); }}>
          <Plus size={16} /> New Template
        </button>
      </div>

      {loading ? (
        <div className="loading"><div className="spinner" /></div>
      ) : templates.length === 0 ? (
        <div className="card">
          <div className="empty-state">
            <FileText size={48} />
            <h3>No templates yet</h3>
            <p>Create reusable email templates to save time</p>
            <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={() => setShowModal(true)}><Plus size={15} /> Create First Template</button>
          </div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
          {templates.map(t => (
            <div key={t.id} className="card card-hover" style={{ cursor: 'default' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontFamily: 'var(--font-head)', marginBottom: 4 }}>{t.name}</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text2)' }}>{t.subject}</div>
                </div>
                <span className="badge badge-purple">Template</span>
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text2)', marginBottom: 16, height: 60, overflow: 'hidden', position: 'relative' }}>
                <div dangerouslySetInnerHTML={{ __html: t.body.substring(0, 200) + '...' }} style={{ pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 30, background: 'linear-gradient(transparent, var(--card-bg))' }} />
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <button className="btn btn-primary btn-sm" onClick={() => useTemplate(t)}><Copy size={13} /> Use Template</button>
                <button className="btn btn-ghost btn-sm" onClick={() => { setEditTemplate(t); setShowModal(true); }}><Edit2 size={13} /> Edit</button>
                <button className="btn btn-ghost btn-sm" onClick={() => setPreview(t)}><FileText size={13} /> Preview</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(t.id)}><Trash2 size={13} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && <TemplateModal template={editTemplate} onClose={() => setShowModal(false)} onSaved={load} />}

      {preview && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setPreview(null)}>
          <div className="modal modal-lg">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3>{preview.name} — Preview</h3>
              <button onClick={() => setPreview(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text2)' }}><X size={20} /></button>
            </div>
            <div style={{ marginBottom: 8, fontSize: '0.85rem', color: 'var(--text2)' }}>Subject: <strong style={{ color: 'var(--text)' }}>{preview.subject}</strong></div>
            <div className="preview-box" dangerouslySetInnerHTML={{ __html: preview.body }} />
          </div>
        </div>
      )}
    </div>
  );
}
