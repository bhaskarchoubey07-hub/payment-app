'use client';

import React from 'react';
import { 
  Activity, 
  Users, 
  AlertTriangle, 
  ArrowUpRight, 
  ArrowDownRight, 
  Search,
  Filter,
  MoreVertical,
  Briefcase
} from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';

export default function AdminDashboard() {
  return (
    <div className="admin-wrapper">
      <aside className="admin-sidebar glass">
        <div className="admin-logo">
          <h2>Fin<span>OS</span></h2>
          <span className="badge">Admin</span>
        </div>
        
        <nav className="admin-nav">
          <div className="nav-group">
            <p>Main</p>
            <div className="nav-link active"><Activity size={18} /> Dashboard</div>
            <div className="nav-link"><Users size={18} /> User Management</div>
            <div className="nav-link"><Briefcase size={18} /> Loan Assets</div>
          </div>
          <div className="nav-group">
            <p>Security</p>
            <div className="nav-link"><AlertTriangle size={18} /> Fraud Alerts <span className="warning-count">3</span></div>
          </div>
        </nav>
      </aside>

      <main className="admin-content">
        <header className="admin-header">
           <div className="search-bar glass">
              <Search size={18} />
              <input type="text" placeholder="Search transactions, users, or loans..." />
           </div>
           <div className="admin-profile">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" alt="Admin" className="avatar" />
              <span>System Admin</span>
           </div>
        </header>

        <section className="stats-grid">
          <GlassCard className="stat-card">
            <p className="label">Total Ecosystem Volume</p>
            <h3>₹14.2 Cr</h3>
            <span className="trend positive">+12.4% vs last mo.</span>
          </GlassCard>
          <GlassCard className="stat-card">
            <p className="label">Active Loan Book</p>
            <h3>₹2.8 Cr</h3>
            <span className="trend positive">+5.2% vs last mo.</span>
          </GlassCard>
          <GlassCard className="stat-card">
            <p className="label">Fraud Risk Score</p>
            <h3>0.04%</h3>
            <span className="trend negative">Stable</span>
          </GlassCard>
        </section>

        <section className="admin-tables">
          <GlassCard className="table-card">
            <div className="table-header">
               <h3>Pending Loan Approvals</h3>
               <button className="text-btn">View All</button>
            </div>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Amount</th>
                  <th>AI Score</th>
                  <th>Risk Level</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Aditya V.', amount: '₹45,000', score: 812, risk: 'Low' },
                  { name: 'Meera K.', amount: '₹12,000', score: 645, risk: 'Medium' },
                  { name: 'Rohan S.', amount: '₹85,000', score: 889, risk: 'Low' },
                ].map((row, i) => (
                  <tr key={i}>
                    <td className="user-cell">
                      <div className="avatar-small"></div>
                      {row.name}
                    </td>
                    <td>{row.amount}</td>
                    <td>{row.score}</td>
                    <td><span className={`risk-badge ${row.risk.toLowerCase()}`}>{row.risk}</span></td>
                    <td><button className="icon-btn"><MoreVertical size={16} /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </GlassCard>
        </section>
      </main>

      <style jsx>{`
        .admin-wrapper {
          display: flex;
          min-height: 100vh;
          background: #050505;
          color: white;
        }

        /* Sidebar */
        .admin-sidebar {
          width: 260px;
          border-right: 1px solid var(--glass-border);
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 3rem;
        }

        .admin-logo h2 {
          font-size: 1.5rem;
          margin-bottom: 4px;
        }

        .admin-logo h2 span { color: var(--primary); }
        .badge {
          font-size: 0.6rem;
          background: var(--primary);
          padding: 2px 6px;
          border-radius: 4px;
          text-transform: uppercase;
          font-weight: 700;
        }

        .nav-group p {
          font-size: 0.7rem;
          text-transform: uppercase;
          color: var(--text-muted);
          letter-spacing: 1px;
          margin-bottom: 1rem;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          border-radius: 12px;
          color: var(--text-secondary);
          margin-bottom: 4px;
          cursor: pointer;
          transition: 0.2s;
        }

        .nav-link.active {
          background: var(--primary-glow);
          color: var(--primary);
        }

        .warning-count {
          margin-left: auto;
          background: var(--error);
          color: white;
          font-size: 0.7rem;
          padding: 2px 6px;
          border-radius: 50%;
        }

        /* Content Area */
        .admin-content {
          flex: 1;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .admin-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .search-bar {
          width: 400px;
          padding: 10px 15px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .search-bar input {
          background: transparent;
          border: none;
          color: white;
          outline: none;
          width: 100%;
        }

        .admin-profile {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 2px solid var(--primary);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .stat-card {
          padding: 1.5rem;
        }

        .stat-card h3 {
          font-size: 2rem;
          margin: 10px 0;
        }

        .trend { font-size: 0.8rem; }
        .trend.positive { color: var(--success); }
        .trend.negative { color: var(--text-muted); }

        /* Table */
        .table-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .admin-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .admin-table th {
          padding: 1rem;
          font-size: 0.8rem;
          color: var(--text-muted);
          border-bottom: 1px solid var(--glass-border);
        }

        .admin-table td {
          padding: 1.25rem 1rem;
          font-size: 0.9rem;
          border-bottom: 1px solid var(--glass-border);
        }

        .user-cell {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .avatar-small {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: var(--bg-accent);
        }

        .risk-badge {
          padding: 4px 10px;
          border-radius: var(--radius-full);
          font-size: 0.75rem;
          font-weight: 600;
        }

        .risk-badge.low { background: hsla(142, 70%, 45%, 0.15); color: var(--success); }
        .risk-badge.medium { background: hsla(38, 92%, 50%, 0.15); color: var(--warning); }

        .text-btn { color: var(--primary); font-weight: 600; }
      `}</style>
    </div>
  );
}
