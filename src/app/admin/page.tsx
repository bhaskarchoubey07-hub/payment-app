'use client';

import React, { useState, useEffect, useTransition } from 'react';
import { 
  Activity, 
  Users, 
  AlertTriangle, 
  ArrowUpRight, 
  ArrowDownRight, 
  Search,
  Filter,
  MoreVertical,
  Briefcase,
  CheckCircle2,
  XCircle,
  Loader2
} from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import { getAdminStats, getPendingLoans, updateLoanStatus, getFraudAlerts } from '@/app/actions/admin';

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loans, setLoans] = useState<any[]>([]);
  const [fraudAlerts, setFraudAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  const loadData = async () => {
    try {
      const [statsData, loansData, fraudData] = await Promise.all([
        getAdminStats(),
        getPendingLoans(),
        getFraudAlerts()
      ]);
      setStats(statsData);
      setLoans(loansData);
      setFraudAlerts(fraudData);
    } catch (error) {
      console.error('Admin Load Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStatusUpdate = (id: string, status: 'APPROVED' | 'REJECTED') => {
    startTransition(async () => {
      try {
        await updateLoanStatus(id, status);
        await loadData();
      } catch (error) {
        alert('Action failed');
      }
    });
  };

  if (loading) {
    return (
      <div className="flex-center" style={{ height: '100vh', background: '#050505', color: 'white' }}>
        <Loader2 className="animate-spin" size={32} color="var(--primary)" />
      </div>
    );
  }

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
            <div className="nav-link active" onClick={() => window.location.href = '/admin'}><Activity size={18} /> Dashboard</div>
            <div className="nav-link" onClick={() => window.location.href = '/admin/users'}><Users size={18} /> User Management</div>
            <div className="nav-link"><Briefcase size={18} /> Loan Assets</div>
          </div>
          <div className="nav-group">
            <p>Security</p>
            <div className="nav-link"><AlertTriangle size={18} /> Fraud Alerts <span className="warning-count">{fraudAlerts.length}</span></div>
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
            <h3>₹{(stats?.totalVolume / 10000000).toFixed(2)} Cr</h3>
            <span className="trend positive">+12.4% vs last mo.</span>
          </GlassCard>
          <GlassCard className="stat-card">
            <p className="label">Active Loan Book</p>
            <h3>₹{(stats?.activeLoans / 100000).toFixed(2)} L</h3>
            <span className="trend positive">+5.2% vs last mo.</span>
          </GlassCard>
          <GlassCard className="stat-card">
            <p className="label">Fraud Risk Score</p>
            <h3>{stats?.fraudScore}%</h3>
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
                {loans.map((loan) => (
                  <tr key={loan.id}>
                    <td className="user-cell">
                      <div className="avatar-small"></div>
                      {loan.user.name || loan.user.email}
                    </td>
                    <td>₹{loan.amount.toLocaleString()}</td>
                    <td>{loan.aiCreditScore}</td>
                    <td>
                      <span className={`risk-badge ${loan.aiCreditScore > 750 ? 'low' : 'medium'}`}>
                        {loan.aiCreditScore > 750 ? 'Low' : 'Medium'}
                      </span>
                    </td>
                    <td>
                      <div className="action-btns">
                        <button 
                          className="status-btn approve" 
                          onClick={() => handleStatusUpdate(loan.id, 'APPROVED')}
                          disabled={isPending}
                        >
                          <CheckCircle2 size={18} />
                        </button>
                        <button 
                          className="status-btn reject" 
                          onClick={() => handleStatusUpdate(loan.id, 'REJECTED')}
                          disabled={isPending}
                        >
                          <XCircle size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {loans.length === 0 && (
                  <tr>
                    <td colSpan={5} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                      No pending loan applications found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </GlassCard>

          <GlassCard className="table-card mt-8">
            <div className="table-header">
               <h3>Critical Fraud Alerts</h3>
               <button className="text-btn">Clear All</button>
            </div>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Merchant</th>
                  <th>Amount</th>
                  <th>Risk Flag</th>
                  <th>Time</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {fraudAlerts.map((alert) => (
                  <tr key={alert.id}>
                    <td>{alert.merchantName}</td>
                    <td>₹{alert.amount.toLocaleString()}</td>
                    <td><span className="risk-badge high">{alert.riskFlag}</span></td>
                    <td style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {new Date(alert.createdAt).toLocaleString()}
                    </td>
                    <td><button className="text-btn">Review</button></td>
                  </tr>
                ))}
                {fraudAlerts.length === 0 && (
                  <tr>
                    <td colSpan={5} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                      System is secure. No fraud alerts detected.
                    </td>
                  </tr>
                )}
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
        .risk-badge.high { background: hsla(0, 70%, 45%, 0.15); color: var(--error); }

        .mt-8 { margin-top: 2rem; }

        .action-btns {
          display: flex;
          gap: 8px;
        }

        .status-btn {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: 0.2s;
        }

        .status-btn.approve { background: hsla(142, 70%, 45%, 0.1); color: var(--success); }
        .status-btn.approve:hover { background: var(--success); color: white; }
        
        .status-btn.reject { background: hsla(0, 70%, 45%, 0.1); color: var(--error); }
        .status-btn.reject:hover { background: var(--error); color: white; }

        .text-btn { color: var(--primary); font-weight: 600; }
      `}</style>
    </div>
  );
}
