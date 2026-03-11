import { useEffect, useState } from 'react';
import { Mail, Eye, X, Clock, Users } from 'lucide-react';
import { mailApi } from '../utils/api';
import { formatDistanceToNow, format } from 'date-fns';

function LogModal({ log, onClose }) {
  let recipients = [];
  try { recipients = JSON.parse(log.recipients); } catch (e) {}

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal modal-lg">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
          <h3 style={{ margin: 0 }}>Email Details</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text2)' }}><X size={20} /></button>
        </div>
        <div className="grid-2" style={{ marginBottom: 16 }}>
          <div><span style={{ fontSize: '0.8rem', color: 'var(--text2)' }}>Subject</span><div style={{ fontWeight: 600, marginTop: 4 }}>{log.subject}</div></div>
          <div><span style={{ fontSize: '0.8rem', color: 'var(--text2)' }}>Sent At</span><div style={{ marginTop: 4 }}>{format(new Date(log.sent_at), 'PPpp')}</div></div>
          <div><span style={{ fontSize: '0.8rem', color: 'var(--text2)' }}>Recipients</span><div style={{ marginTop: 4 }}><span className="badge badge-purple">{log.recipient_count} emails</span></div></div>
          <div><span style={{ fontSize: '0.8rem', color: 'var(--text2)' }}>Status</span><div style={{ marginTop: 4 }}><span className="badge badge-green">{log.status}</span></div></div>
        </div>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text2)', marginBottom: 8 }}>Email Body Preview</div>
          <div className="preview-box" style={{ maxHeight: 300, overflow: 'auto' }} dangerouslySetInnerHTML={{ __html: log.body }} />
        </div>
        {recipients.length > 0 && (
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text2)', marginBottom: 8 }}>Recipient Emails ({recipients.length})</div>
            <div style={{ maxHeight: 150, overflow: 'auto', background: 'var(--bg3)', borderRadius: 'var(--radius2)', padding: 12, fontSize: '0.85rem', display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {recipients.map(email => <span key={email} className="badge badge-purple">{email}</span>)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function MailLogs() {
  const [logs, setLogs] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [selectedLog, setSelectedLog] = useState(null);

  useEffect(() => {
    setLoading(true);
    mailApi.getLogs({ page, limit: 20 }).then(r => {
      setLogs(r.logs || []);
      setPagination(r.pagination || {});
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [page]);

  return (
    <div className="page">
      <div className="page-header">
        <div><h2>Mail Logs</h2><p>{pagination.total || 0} emails sent total</p></div>
      </div>

      <div className="card">
        {loading ? (
          <div className="loading"><div className="spinner" /></div>
        ) : logs.length === 0 ? (
          <div className="empty-state">
            <Mail size={48} />
            <h3>No emails sent yet</h3>
            <p>Compose your first email campaign to see logs here</p>
          </div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Recipients</th>
                  <th>Status</th>
                  <th>Sent</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {logs.map(log => (
                  <tr key={log.id}>
                    <td>
                      <div style={{ fontWeight: 500 }}>{log.subject}</div>
                    </td>
                    <td>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text2)', fontSize: '0.9rem' }}>
                        <Users size={14} /> {log.recipient_count}
                      </span>
                    </td>
                    <td><span className="badge badge-green">{log.status}</span></td>
                    <td style={{ color: 'var(--text2)', fontSize: '0.85rem' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Clock size={13} /> {formatDistanceToNow(new Date(log.sent_at), { addSuffix: true })}
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-ghost btn-sm" onClick={() => setSelectedLog(log)}>
                        <Eye size={14} /> View
                      </button>
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

      {selectedLog && <LogModal log={selectedLog} onClose={() => setSelectedLog(null)} />}
    </div>
  );
}
