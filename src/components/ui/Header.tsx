'use client';

import React from 'react';
import { Bell, Search, User } from 'lucide-react';

export default function Header() {
  return (
    <header className="app-header">
      <div className="header-left">
        <h1 className="brand-logo">Fin<span>OS</span></h1>
      </div>
      <div className="header-right">
        <button className="icon-btn">
          <Search size={20} />
        </button>
        <button className="icon-btn">
          <Bell size={20} />
          <span className="notification-dot"></span>
        </button>
        <div className="user-avatar">
          <User size={18} />
        </div>
      </div>

      <style jsx>{`
        .app-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem;
          background: transparent;
        }

        .brand-logo {
          font-size: 1.5rem;
          letter-spacing: -0.5px;
        }

        .brand-logo span {
          color: var(--primary);
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .icon-btn {
          position: relative;
          color: var(--text-secondary);
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: var(--bg-accent);
          transition: var(--transition);
        }

        .icon-btn:hover {
          color: var(--text-primary);
          background: var(--glass-border);
        }

        .notification-dot {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 8px;
          height: 8px;
          background: var(--error);
          border-radius: 50%;
          border: 2px solid var(--bg-primary);
        }

        .user-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: var(--primary);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          margin-left: 4px;
        }
      `}</style>
    </header>
  );
}
