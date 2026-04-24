'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/ui/Header';
import GlassCard from '@/components/ui/GlassCard';
import { 
  Search, 
  Filter, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Download,
  Loader2
} from 'lucide-react';
import { getDashboardData } from '@/app/actions/dashboard';

export default function HistoryPage() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('ALL');

  useEffect(() => {
    async function load() {
      const data = await getDashboardData();
      if (data && data.transactions) {
        // Fetching more transactions would be better, but using dashboard data for now
        // In a real app, we'd have a specific getTransactions action
        setTransactions(data.transactions);
        setFilteredTransactions(data.transactions);
      }
      setLoading(false);
    }
    load();
  }, []);

  useEffect(() => {
    let result = transactions;
    
    if (searchTerm) {
      result = result.filter(tx => 
        tx.merchantName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterType !== 'ALL') {
      result = result.filter(tx => tx.type === filterType);
    }

    setFilteredTransactions(result);
  }, [searchTerm, filterType, transactions]);

  if (loading) {
    return (
      <div className="flex-center" style={{ height: '100vh', background: 'var(--bg-primary)' }}>
        <Loader2 className="animate-spin" size={32} color="var(--primary)" />
      </div>
    );
  }

  return (
    <div className="history-wrapper">
      <Header />
      
      <main className="container history-layout">
        <header className="page-header">
          <h1>Transaction <span>History</span></h1>
          <button className="download-btn glass">
            <Download size={18} />
            <span>Export CSV</span>
          </button>
        </header>

        <section className="search-filter-row">
           <div className="search-box glass">
              <Search size={18} />
              <input 
                type="text" 
                placeholder="Search merchant or description..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
           </div>
           <div className="filter-box glass">
              <Filter size={18} />
              <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                <option value="ALL">All Types</option>
                <option value="DEBIT">Debits</option>
                <option value="CREDIT">Credits</option>
              </select>
           </div>
        </section>

        <section className="transactions-list">
          <GlassCard className="history-card">
            {filteredTransactions.length > 0 ? (
              <div className="tx-table">
                {filteredTransactions.map((tx) => (
                  <div key={tx.id} className="tx-row">
                    <div className="tx-left">
                      <div className={`tx-icon ${tx.amount > 0 ? 'success' : 'out'}`}>
                        {tx.amount > 0 ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
                      </div>
                      <div className="tx-info">
                        <p className="tx-name">{tx.merchantName}</p>
                        <p className="tx-meta">{new Date(tx.createdAt).toLocaleDateString()} • {tx.category || 'General'}</p>
                      </div>
                    </div>
                    <div className={`tx-amount ${tx.amount > 0 ? 'positive' : ''}`}>
                      {tx.amount > 0 ? '+' : ''}₹{Math.abs(tx.amount).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>No transactions match your search criteria.</p>
              </div>
            )}
          </GlassCard>
        </section>
      </main>

      <style jsx>{`
        .history-layout {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          padding-bottom: 4rem;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .download-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          border-radius: 12px;
          font-size: 0.9rem;
          font-weight: 600;
        }

        .search-filter-row {
          display: flex;
          gap: 1rem;
        }

        .search-box {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 18px;
          border-radius: 14px;
        }

        .search-box input {
          background: transparent;
          border: none;
          color: white;
          outline: none;
          width: 100%;
        }

        .filter-box {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 18px;
          border-radius: 14px;
        }

        .filter-box select {
          background: transparent;
          border: none;
          color: white;
          outline: none;
          cursor: pointer;
        }

        .filter-box option {
          background: #111;
          color: white;
        }

        .tx-table {
          display: flex;
          flex-direction: column;
        }

        .tx-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.25rem 0;
          border-bottom: 1px solid var(--glass-border);
        }

        .tx-row:last-child { border-bottom: none; }

        .tx-left {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .tx-icon {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255,255,255,0.03);
        }

        .tx-icon.success { color: var(--success); background: hsla(142, 70%, 45%, 0.1); }
        .tx-icon.out { color: var(--error); background: hsla(0, 70%, 45%, 0.1); }

        .tx-name { font-weight: 600; font-size: 1.05rem; }
        .tx-meta { font-size: 0.8rem; color: var(--text-muted); margin-top: 2px; }

        .tx-amount { font-size: 1.1rem; font-weight: 700; }
        .tx-amount.positive { color: var(--success); }

        .empty-state {
          padding: 4rem;
          text-align: center;
          color: var(--text-muted);
        }

        @media (max-width: 600px) {
          .search-filter-row { flex-direction: column; }
        }
      `}</style>
    </div>
  );
}
