import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, Mail, Send, FileText, TrendingUp, Clock } from 'lucide-react';
import { statsApi } from '../utils/api';
import { formatDistanceToNow } from 'date-fns';

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    statsApi.get().then(res => { setData(res); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="page"><div className="loading"><div className="spinner" /></div></div>;

  const stats = data?.stats || {};
  const recentMails = data?.recent_mails || [];
  const recentContacts = data?.recent_contacts || [];

  const statCards = [
    { label: 'Total Contacts', value: stats.total_contacts ?? 0, icon: Users, color: '#6c63ff' },
    { label: 'Subscribed', value: stats.subscribed_contacts ?? 0, icon: TrendingUp, color: '#43e97b' },
    { label: 'Emails Sent', value: stats.total_mails_sent ?? 0, icon: Send, color: '#ff6584' },
    { label: 'Total Recipients', value: stats.total_recipients ?? 0, icon: Mail, color: '#ffa502' },
    { label: 'Templates', value: stats.total_templates ?? 0, icon: FileText, color: '#54a0ff' },
  ];

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h2>Dashboard</h2>
          <p>Welcome back! Here's what's happening with your mailer.</p>
        </div>
        <Link to="/compose" className="btn btn-primary"><Send size={16} /> Compose Mail</Link>
      </div>

      <div className="stats-grid">
        {statCards.map(({ label, value, icon: Icon, color }) => (
          <div className="stat-card" key={label} style={{ '--accent-color': color }}>
            <h3>{label}</h3>
            <div className="stat-value">{value.toLocaleString()}</div>
            <div className="stat-icon"><Icon /></div>
          </div>
        ))}
      </div>

      <div className="grid-2" style={{ gap: 24 }}>
        <div className="card">
          <h3 style={{ fontFamily: 'var(--font-head)', marginBottom: 16, fontSize: '1rem' }}>
            <Mail size={16} style={{ marginRight: 8, verticalAlign: 'middle', color: 'var(--accent)' }} />
            Recent Campaigns
          </h3>
          {recentMails.length === 0 ? (
            <div className="empty-state" style={{ padding: '30px 0' }}>
              <Mail size={32} style={{ opacity: 0.3, display: 'block', margin: '0 auto 8px' }} />
              <p style={{ fontSize: '0.9rem' }}>No emails sent yet</p>
            </div>
          ) : recentMails.map((mail, i) => (
            <div key={i} style={{ padding: '12px 0', borderBottom: i < recentMails.length - 1 ? '1px solid var(--border)' : 'none' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1, marginRight: 12 }}>
                  <div style={{ fontWeight: 500, fontSize: '0.9rem', marginBottom: 2 }}>{mail.subject}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span className="badge badge-purple">{mail.recipient_count} recipients</span>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text2)', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Clock size={12} /> {formatDistanceToNow(new Date(mail.sent_at), { addSuffix: true })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <Link to="/logs" className="btn btn-ghost btn-sm" style={{ marginTop: 12, width: '100%', justifyContent: 'center' }}>View All Logs</Link>
        </div>

        <div className="card">
          <h3 style={{ fontFamily: 'var(--font-head)', marginBottom: 16, fontSize: '1rem' }}>
            <Users size={16} style={{ marginRight: 8, verticalAlign: 'middle', color: 'var(--accent)' }} />
            Recent Contacts
          </h3>
          {recentContacts.length === 0 ? (
            <div className="empty-state" style={{ padding: '30px 0' }}>
              <Users size={32} style={{ opacity: 0.3, display: 'block', margin: '0 auto 8px' }} />
              <p style={{ fontSize: '0.9rem' }}>No contacts yet</p>
            </div>
          ) : recentContacts.map((c, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: i < recentContacts.length - 1 ? '1px solid var(--border)' : 'none' }}>
              <div className="contact-avatar">{c.name?.charAt(0)?.toUpperCase()}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 500, fontSize: '0.9rem' }}>{c.name}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text2)' }}>{c.email}</div>
              </div>
              <span style={{ fontSize: '0.78rem', color: 'var(--text2)' }}>
                {formatDistanceToNow(new Date(c.created_at), { addSuffix: true })}
              </span>
            </div>
          ))}
          <Link to="/contacts" className="btn btn-ghost btn-sm" style={{ marginTop: 12, width: '100%', justifyContent: 'center' }}>View All Contacts</Link>
        </div>
      </div>

      <div className="card" style={{ marginTop: 24 }}>
        <h3 style={{ fontFamily: 'var(--font-head)', marginBottom: 8, fontSize: '1rem' }}>🚀 Quick Actions</h3>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 16 }}>
          <Link to="/compose" className="btn btn-primary"><Send size={15} /> Send Campaign</Link>
          <Link to="/contacts" className="btn btn-ghost"><Users size={15} /> Manage Contacts</Link>
          <Link to="/templates" className="btn btn-ghost"><FileText size={15} /> Manage Templates</Link>
          <a href="/subscribe" target="_blank" rel="noreferrer" className="btn btn-success" style={{ color: '#0a0a0f' }}>
            📋 Subscribe Page
          </a>
        </div>
      </div>
    </div>
  );
}
