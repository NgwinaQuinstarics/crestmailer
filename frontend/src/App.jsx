import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Menu } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Contacts from './pages/Contacts';
import Compose from './pages/Compose';
import MailLogs from './pages/MailLogs';
import Templates from './pages/Templates';
import Settings from './pages/Settings';
import Subscribe from './pages/Subscribe';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: 'var(--card-bg)',
            color: 'var(--text)',
            border: '1px solid var(--border)',
            fontFamily: 'var(--font-body)',
          },
          success: { iconTheme: { primary: '#2ed573', secondary: '#0a0a0f' } },
          error: { iconTheme: { primary: '#ff4757', secondary: '#0a0a0f' } },
        }}
      />
      <Routes>
        {/* Public subscribe page */}
        <Route path="/subscribe" element={<Subscribe />} />

        {/* Admin layout */}
        <Route path="/*" element={
          <div className="app-layout">
            <button className="hamburger" onClick={() => setSidebarOpen(true)}>
              <Menu size={20} color="var(--text)" />
            </button>
            <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/compose" element={<Compose />} />
                <Route path="/logs" element={<MailLogs />} />
                <Route path="/templates" element={<Templates />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </main>
          </div>
        } />
      </Routes>
    </>
  );
}
