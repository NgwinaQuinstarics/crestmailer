import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Send, FileText, Settings, Mail, X } from 'lucide-react';

export default function Sidebar({ open, onClose }) {
  const navItems = [
    { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/contacts', icon: Users, label: 'Contacts' },
    { to: '/compose', icon: Send, label: 'Compose Mail' },
    { to: '/logs', icon: Mail, label: 'Mail Logs' },
    { to: '/templates', icon: FileText, label: 'Templates' },
    { to: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <>
      <div className={`mobile-overlay ${open ? 'show' : ''}`} onClick={onClose} />
      <aside className={`sidebar ${open ? 'open' : ''}`}>
        <div className="sidebar-logo">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1>✉ MailerApp</h1>
              <span>Admin Dashboard</span>
            </div>
            <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text2)', display: 'none' }} className="close-sidebar">
              <X size={18} />
            </button>
          </div>
        </div>
        <nav className="sidebar-nav">
          <div className="sidebar-section">Navigation</div>
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => isActive ? 'active' : ''} onClick={onClose}>
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>
        <div style={{ padding: '16px', borderTop: '1px solid var(--border)' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text2)' }}>
            <div style={{ fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>Admin Panel</div>
            Mailer v1.0.0
          </div>
        </div>
      </aside>
    </>
  );
}
