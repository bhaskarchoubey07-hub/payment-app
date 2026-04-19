'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/ui/Header';
import GlassCard from '@/components/ui/GlassCard';
import PremiumButton from '@/components/ui/PremiumButton';
import { getDashboardData, signOut } from '@/app/actions/dashboard';
import { processPayment } from '@/app/actions/transactions';
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  Plus, 
  Zap, 
  TrendingUp, 
  ShieldAlert,
  ChevronRight,
  Wallet,
  CreditCard,
  Globe,
  Loader2,
  LogOut
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    async function loadData() {
      const dbData = await getDashboardData();
      if (!dbData) {
        window.location.href = '/auth';
        return;
      }
      setData(dbData);
      setLoading(false);
    }
    loadData();
  }, []);

  const handleTestPayment = async () => {
    setProcessing(true);
    try {
       await processPayment({
         amount: 1200,
         currency: 'INR',
         merchantName: 'Aether Cloud Services',
         method: 'UPI'
       });
       // Refresh data
       const updated = await getDashboardData();
       setData(updated);
    } catch (e: any) {
       alert(e.message);
    } finally {
       setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex-center" style={{ height: '100vh' }}>
        <Loader2 className="animate-spin" size={32} />
      </div>
    );
  }

  const primaryAccount = data.accounts[0];
  const balance = primaryAccount?.balance || 0;

  return (
    <div className="home-wrapper">
      <Header />
      
      <main className="container main-layout">
        {/* Balance Card Section */}
        <section className="hero-balance">
          <GlassCard className="balance-card">
            <div className="balance-info">
              <div className="balance-head">
                <p className="label">Total Balance</p>
                <button onClick={signOut} className="signout-icon"><LogOut size={16} /></button>
              </div>
              <h2 className="amount">₹{balance.toLocaleString()}</h2>
              <div className="growth-tag">
                <TrendingUp size={14} />
                <span>+2.4% this month</span>
              </div>
            </div>
            
            <div className="card-visual">
              <div className="card-circle"></div>
              <div className="card-circle small"></div>
            </div>
          </GlassCard>
        </section>

        {/* Quick Actions Container */}
        <section className="quick-actions">
          <div className="actions-grid">
            <div className="action-item" onClick={handleTestPayment}>
              <div className="action-circle primary">
                {processing ? <Loader2 className="animate-spin" /> : <ArrowUpRight />}
              </div>
              <span>{processing ? '...' : 'Send ₹1.2k'}</span>
            </div>
            <div className="action-item">
              <div className="action-circle secondary"><ArrowDownLeft /></div>
              <span>Receive</span>
            </div>
            <div className="action-item">
              <div className="action-circle accent"><Wallet /></div>
              <span>Assets</span>
            </div>
            <div className="action-item">
              <div className="action-circle muted"><Plus /></div>
              <span>More</span>
            </div>
          </div>
        </section>

        {/* AI Financial Brain Aspect */}
        <section className="ai-insights">
          <GlassCard className="ai-insight-banner">
            <div className="banner-icon">
              <Zap className="zap-icon" />
            </div>
            <div className="banner-content">
              <h3>Aether AI Insight</h3>
              <p>You recently spent ₹1,200 on <b>Aether Cloud Services</b>. Your spending in 'Transport' is trending 5% lower than average.</p>
            </div>
            <button className="banner-action">
              <ChevronRight />
            </button>
          </GlassCard>
        </section>

        {/* Recent Transactions Section */}
        <section className="recent-activity">
          <div className="section-header">
            <h3>Recent Activity</h3>
            <button className="view-all">View All</button>
          </div>
          
          <div className="tx-list">
            {(data.transactions || []).map((tx: any) => (
              <div key={tx.id} className="tx-row">
                <div className="tx-left">
                  <div className={`tx-icon ${tx.amount > 0 ? 'accent' : 'primary'}`}>
                    {tx.amount > 0 ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}
                  </div>
                  <div className="tx-details">
                    <p className="tx-name">{tx.merchantName}</p>
                    <p className="tx-category">{tx.category || tx.method}</p>
                  </div>
                </div>
                <div className={`tx-right ${tx.amount > 0 ? 'positive' : 'negative'}`}>
                  {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString()}
                </div>
              </div>
            ))}
            {data.transactions.length === 0 && (
                <p className="empty-msg">No recent activity found.</p>
            )}
          </div>
        </section>
      </main>

      </main>

      <style jsx>{`
        .home-wrapper {
          padding-bottom: 2rem;
        }

        .main-layout {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        /* Balance Card Styles */
        .balance-card {
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, var(--primary) 0%, var(--bg-secondary) 100%);
          height: 180px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .balance-info .label {
          font-size: 0.9rem;
          opacity: 0.8;
          margin-bottom: 0.5rem;
        }

        .balance-info .amount {
          font-size: 2.25rem;
          font-weight: 700;
          margin-bottom: 0.75rem;
        }

        .growth-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255, 255, 255, 0.1);
          padding: 4px 10px;
          border-radius: var(--radius-full);
          font-size: 0.8rem;
          font-weight: 500;
        }

        .card-visual .card-circle {
          position: absolute;
          top: -20px;
          right: -20px;
          width: 140px;
          height: 140px;
          border-radius: 50%;
          background: radial-gradient(circle, hsla(0, 0%, 100%, 0.15) 0%, transparent 70%);
        }

        .card-visual .card-circle.small {
          width: 80px;
          height: 80px;
          top: 40px;
          right: 20px;
        }

        /* Quick Actions */
        .actions-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
        }

        .action-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .action-circle {
          width: 50px;
          height: 50px;
          border-radius: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-accent);
          transition: var(--transition);
          color: var(--text-primary);
        }

        .action-circle.primary { background: var(--primary-glow); color: var(--primary); }
        .action-circle.secondary { background: hsla(142, 70%, 45%, 0.15); color: var(--success); }
        .action-circle.accent { background: var(--accent-glow); color: var(--accent); }

        .action-item span {
          font-size: 0.8rem;
          font-weight: 500;
          color: var(--text-secondary);
        }

        /* AI Insight Banner */
        .ai-insight-banner {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          padding: 1.25rem;
          border: 1px solid var(--primary-glow);
        }

        .zap-icon {
          color: var(--warning);
          filter: drop-shadow(0 0 5px var(--warning));
        }

        .banner-content h3 {
          font-size: 0.95rem;
          margin-bottom: 4px;
        }

        .banner-content p {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.4;
        }

        /* Routing Hub */
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .badge-live {
          font-size: 0.7rem;
          background: var(--error);
          padding: 2px 8px;
          border-radius: var(--radius-full);
          text-transform: uppercase;
          font-weight: 700;
          letter-spacing: 0.5px;
        }

        .routing-options {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .route-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          background: var(--bg-secondary);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-md);
        }

        .route-card.active {
          border-color: var(--primary);
        }

        .route-name {
          font-size: 0.95rem;
          font-weight: 600;
          margin-bottom: 2px;
        }

        .route-meta {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .route-reward {
          background: var(--glass-border);
          padding: 4px 10px;
          border-radius: var(--radius-full);
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--accent);
        }

        /* Transaction List */
        .tx-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .tx-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--glass-border);
        }

        .tx-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .tx-icon {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .tx-icon.dark { background: #1a1a1a; }
        .tx-icon.primary { background: var(--primary-glow); color: var(--primary); }
        .tx-icon.accent { background: var(--accent-glow); color: var(--accent); }

        .tx-name {
          font-size: 0.95rem;
          font-weight: 600;
        }

        .tx-category {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .tx-right {
          font-size: 1rem;
          font-weight: 600;
        }

        .tx-right.positive { color: var(--success); }
        .tx-right.negative { color: var(--text-primary); }

        .view-all {
          font-size: 0.85rem;
          color: var(--primary);
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}
