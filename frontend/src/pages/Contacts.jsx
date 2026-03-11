import { useEffect, useState, useCallback } from 'react';
import { Users, Plus, Search, Trash2, Edit2, X, Check, Phone, Mail, Download } from 'lucide-react';
import toast from 'react-hot-toast';
import { contactsApi } from '../utils/api';
import { formatDistanceToNow } from 'date-fns';

function AddModal({ onClose, onSaved }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!form.name || !form.email) return toast.error('Name and email are required');
    setLoading(true);
    try {
      await contactsApi.create(form);
      toast.success('Contact added!');
      onSaved();
      onClose();
    } catch (e) { toast.error(e.message); }
    finally { setLoading(false); }
  };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <h3>Add New Contact</h3>
        <div className="form-group">
          <label>Full Name <span>*</span></label>
          <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="John Doe" />
        </div>
        <div className="form-group">
          <label>Email Address <span>*</span></label>
          <input type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} placeholder="john@example.com" />
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input type="tel" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} placeholder="+1 234 567 8900" />
        </div>
        <div className="modal-actions">
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSubmit} disabled={loading}>
            {loading ? 'Saving...' : 'Add Contact'}
          </button>
        </div>
      </div>
    </div>
  );
}

function EditModal({ contact, onClose, onSaved }) {
  const [form, setForm] = useState({ name: contact.name, phone: contact.phone || '', subscribed: contact.subscribed });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await contactsApi.update(contact.id, form);
      toast.success('Contact updated!');
      onSaved();
      onClose();
    } catch (e) { toast.error(e.message); }
    finally { setLoading(false); }
  };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <h3>Edit Contact</h3>
        <div className="form-group">
          <label>Full Name</label>
          <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
        </div>
        <div className="form-group">
          <label>Email (readonly)</label>
          <input value={contact.email} disabled style={{ opacity: 0.6 }} />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} />
        </div>
        <div className="checkbox-row">
          <input type="checkbox" id="sub" checked={!!form.subscribed} onChange={e => setForm(p => ({ ...p, subscribed: e.target.checked ? 1 : 0 }))} />
          <label htmlFor="sub" style={{ margin: 0, color: 'var(--text)' }}>Subscribed to mailing list</label>
        </div>
        <div className="modal-actions">
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSubmit} disabled={loading}>Save Changes</button>
        </div>
      </div>
    </div>
  );
}

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [showAdd, setShowAdd] = useState(false);
  const [editContact, setEditContact] = useState(null);
  const [selected, setSelected] = useState([]);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await contactsApi.getAll({ search, page, limit: 20 });
      setContacts(res.contacts || []);
      setPagination(res.pagination || {});
    } catch (e) { toast.error(e.message); }
    finally { setLoading(false); }
  }, [search, page]);

  useEffect(() => { load(); }, [load]);

  const handleDelete = async (id) => {
    if (!confirm('Delete this contact?')) return;
    try {
      await contactsApi.delete(id);
      toast.success('Deleted');
      load();
    } catch (e) { toast.error(e.message); }
  };

  const handleBulkDelete = async () => {
    if (!confirm(`Delete ${selected.length} contacts?`)) return;
    try {
      await Promise.all(selected.map(id => contactsApi.delete(id)));
      toast.success(`${selected.length} contacts deleted`);
      setSelected([]);
      load();
    } catch (e) { toast.error(e.message); }
  };

  const exportCSV = () => {
    const header = 'Name,Email,Phone,Subscribed,Created At';
    const rows = contacts.map(c => `"${c.name}","${c.email}","${c.phone || ''}","${c.subscribed ? 'Yes' : 'No'}","${c.created_at}"`);
    const blob = new Blob([[header, ...rows].join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'contacts.csv'; a.click();
  };

  const toggleSelect = (id) => setSelected(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);
  const toggleAll = () => setSelected(selected.length === contacts.length ? [] : contacts.map(c => c.id));

  return (
    <div className="page">
      <div className="page-header">
        <div><h2>Contacts</h2><p>{pagination.total || 0} total contacts</p></div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn-ghost btn-sm" onClick={exportCSV}><Download size={15} /> Export</button>
          <button className="btn btn-primary" onClick={() => setShowAdd(true)}><Plus size={16} /> Add Contact</button>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 20 }}>
        <div className="search-bar">
          <Search size={16} />
          <input value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} placeholder="Search by name, email or phone..." />
        </div>
      </div>

      {selected.length > 0 && (
        <div className="bulk-bar">
          <span>{selected.length} selected</span>
          <button className="btn btn-danger btn-sm" onClick={handleBulkDelete}><Trash2 size={14} /> Delete Selected</button>
        </div>
      )}

      <div className="card">
        {loading ? (
          <div className="loading"><div className="spinner" /></div>
        ) : contacts.length === 0 ? (
          <div className="empty-state">
            <Users size={48} />
            <h3>No contacts found</h3>
            <p>Add your first contact to get started</p>
          </div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th><input type="checkbox" onChange={toggleAll} checked={selected.length === contacts.length && contacts.length > 0} /></th>
                  <th>Contact</th>
                  <th>Phone</th>
                  <th>Status</th>
                  <th>Joined</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map(c => (
                  <tr key={c.id}>
                    <td><input type="checkbox" checked={selected.includes(c.id)} onChange={() => toggleSelect(c.id)} /></td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div className="contact-avatar">{c.name?.charAt(0)?.toUpperCase()}</div>
                        <div>
                          <div style={{ fontWeight: 500 }}>{c.name}</div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text2)', display: 'flex', alignItems: 'center', gap: 4 }}>
                            <Mail size={11} /> {c.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td style={{ color: 'var(--text2)', fontSize: '0.9rem' }}>
                      {c.phone ? <><Phone size={13} style={{ marginRight: 4, verticalAlign: 'middle' }} />{c.phone}</> : '—'}
                    </td>
                    <td>
                      <span className={`badge ${c.subscribed ? 'badge-green' : 'badge-red'}`}>
                        {c.subscribed ? <Check size={11} style={{ marginRight: 3 }} /> : <X size={11} style={{ marginRight: 3 }} />}
                        {c.subscribed ? 'Subscribed' : 'Unsubscribed'}
                      </span>
                    </td>
                    <td style={{ color: 'var(--text2)', fontSize: '0.85rem' }}>
                      {formatDistanceToNow(new Date(c.created_at), { addSuffix: true })}
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button className="btn btn-ghost btn-sm" onClick={() => setEditContact(c)} title="Edit"><Edit2 size={14} /></button>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(c.id)} title="Delete"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {pagination.pages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 20 }}>
            <button className="btn btn-ghost btn-sm" onClick={() => setPage(p => p - 1)} disabled={page === 1}>Prev</button>
            <span style={{ padding: '6px 12px', color: 'var(--text2)', fontSize: '0.9rem' }}>Page {page} of {pagination.pages}</span>
            <button className="btn btn-ghost btn-sm" onClick={() => setPage(p => p + 1)} disabled={page >= pagination.pages}>Next</button>
          </div>
        )}
      </div>

      {showAdd && <AddModal onClose={() => setShowAdd(false)} onSaved={load} />}
      {editContact && <EditModal contact={editContact} onClose={() => setEditContact(null)} onSaved={load} />}
    </div>
  );
}
