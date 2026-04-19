'use client';

import React, { useState } from 'react';
import Header from '@/components/ui/Header';
import GlassCard from '@/components/ui/GlassCard';
import PremiumButton from '@/components/ui/PremiumButton';
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
  Globe
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const [balance, setBalance] = useState(124500.85);

  return (
    <div className="home-wrapper">
      <Header />
      
      <main className="container main-layout">
        {/* Balance Card Section */}
        <section className="hero-balance">
          <GlassCard className="balance-card">
            <div className="balance-info">
              <p className="label">Total Balance</p>
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
            <div className="action-item">
              <div className="action-circle primary"><ArrowUpRight /></div>
              <span>Send</span>
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
              <p>You're spending 15% more on Dining than last month. Consider shifting ₹5,000 to your <b>Crypto Index</b> to maintain your goals.</p>
            </div>
            <button className="banner-action">
              <ChevronRight />
            </button>
          </GlassCard>
        </section>

        {/* Smart Payment Routing Hub */}
        <section className="routing-hub">
          <div className="section-header">
            <h3>Nexus Path Routing</h3>
            <span className="badge-live">Live</span>
          </div>
          
          <div className="routing-options">
            <div className="route-card active">
              <div className="route-info">
                <p className="route-name">UPI Payment</p>
                <p className="route-meta">Best for: Daily Expenses</p>
              </div>
              <div className="route-reward">
                <span>1% Cash</span>
              </div>
            </div>
            <div className="route-card">
              <div className="route-info">
                <p className="route-name">Crypto Rail</p>
                <p className="route-meta">Best for: Int'l Transfers</p>
              </div>
              <div className="route-reward">
                <span>5% Yield</span>
              </div>
            </div>
          </div>
        </section>

        {/* Recent Transactions Section */}
        <section className="recent-activity">
          <div className="section-header">
            <h3>Recent Activity</h3>
            <button className="view-all">View All</button>
          </div>
          
          <div className="tx-list">
            {[
              { id: 1, name: 'Apple Store', category: 'Shopping', amount: -69900, icon: <div className="tx-icon dark"><ShieldAlert size={18} /></div> },
              { id: 2, name: 'S. Rawat', category: 'UPI Transfer', amount: 4500, icon: <div className="tx-icon primary"><ArrowDownLeft size={18} /></div> },
              { id: 3, name: 'Binance', category: 'Crypto Yield', amount: 1250, icon: <div className="tx-icon accent"><Globe size={18} /></div> },
            ].map((tx) => (
              <div key={tx.id} className="tx-row">
                <div className="tx-left">
                  {tx.icon}
                  <div className="tx-details">
                    <p className="tx-name">{tx.name}</p>
                    <p className="tx-category">{tx.category}</p>
                  </div>
                </div>
                <div className={`tx-right ${tx.amount > 0 ? 'positive' : 'negative'}`}>
                  {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </section>
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
