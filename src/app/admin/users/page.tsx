'use client';

import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Search, 
  MoreVertical, 
  Mail, 
  Shield, 
  ChevronLeft,
  Loader2
} from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import { getAllUsers } from '@/app/actions/admin';

export default function UserManagementPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const data = await getAllUsers();
        setUsers(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filteredUsers = users.filter(u => 
    u.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <div className="admin-logo" onClick={() => window.location.href = '/admin'} style={{ cursor: 'pointer' }}>
          <ChevronLeft size={20} />
          <span>Back to Dash</span>
        </div>
        <div className="sidebar-title">
           <Users size={20} />
           <h3>User Base</h3>
        </div>
      </aside>

      <main className="admin-content">
        <header className="admin-header">
           <div className="search-bar glass">
              <Search size={18} />
              <input 
                type="text" 
                placeholder="Search by name or email..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
           </div>
        </header>

        <section className="user-list">
          <GlassCard className="table-card">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Contact</th>
                  <th>Total Balance</th>
                  <th>TX Count</th>
                  <th>Joined</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="user-cell">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`} alt="Avatar" className="avatar-small" />
                      <div className="name-box">
                        <p>{user.name}</p>
                        <span className="role-tag">USER</span>
                      </div>
                    </td>
                    <td>
                      <p className="email-text"><Mail size={12} /> {user.email}</p>
                    </td>
                    <td className="balance-cell">
                      ₹{user.accounts.reduce((acc: number, a: any) => acc + (a.type === 'BANK' ? a.balance : 0), 0).toLocaleString()}
                    </td>
                    <td>{user._count.transactions}</td>
                    <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td>
                      <button className="icon-btn"><MoreVertical size={16} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </GlassCard>
        </section>
      </main>

      <style jsx>{`
        .admin-wrapper { display: flex; min-height: 100vh; background: #050505; color: white; }
        .admin-sidebar { width: 260px; border-right: 1px solid var(--glass-border); padding: 2rem; }
        .admin-logo { display: flex; align-items: center; gap: 8px; color: var(--text-muted); margin-bottom: 2rem; font-size: 0.9rem; }
        .sidebar-title { display: flex; align-items: center; gap: 12px; color: var(--primary); }
        .admin-content { flex: 1; padding: 2rem; display: flex; flex-direction: column; gap: 2rem; }
        .admin-header { display: flex; justify-content: space-between; align-items: center; }
        .search-bar { width: 400px; padding: 10px 15px; border-radius: 12px; display: flex; align-items: center; gap: 10px; }
        .search-bar input { background: transparent; border: none; color: white; outline: none; width: 100%; }
        
        .admin-table { width: 100%; border-collapse: collapse; text-align: left; }
        .admin-table th { padding: 1rem; font-size: 0.8rem; color: var(--text-muted); border-bottom: 1px solid var(--glass-border); }
        .admin-table td { padding: 1.25rem 1rem; font-size: 0.9rem; border-bottom: 1px solid var(--glass-border); }

        .user-cell { display: flex; align-items: center; gap: 12px; }
        .avatar-small { width: 32px; height: 32px; border-radius: 50%; background: var(--bg-accent); }
        .role-tag { font-size: 0.6rem; color: var(--primary); font-weight: 700; opacity: 0.7; }
        
        .email-text { display: flex; align-items: center; gap: 6px; font-size: 0.85rem; color: var(--text-secondary); }
        .balance-cell { font-weight: 700; color: var(--success); }

        .icon-btn { color: var(--text-muted); }
      `}</style>
    </div>
  );
}
