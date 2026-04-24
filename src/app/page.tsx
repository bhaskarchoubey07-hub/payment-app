'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/ui/Header';
import GlassCard from '@/components/ui/GlassCard';
import ServiceGrid from '@/components/ui/ServiceGrid';
import BitcoinWallet from '@/components/features/BitcoinWallet';
import { getDashboardData, signOut } from '@/app/actions/dashboard';
import { 
  Scan, 
  Send, 
  User, 
  ArrowRightLeft, 
  Home as HomeIcon, 
  History, 
  Wallet as WalletIcon,
  Search,
  Bell,
  Menu,
  ChevronRight,
  TrendingUp,
  Loader2,
  Phone,
  ArrowUpRight,
  ArrowDownLeft
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="flex-center" style={{ height: '100vh', background: 'var(--bg-primary)' }}>
        <Loader2 className="animate-spin" size={32} color="var(--primary)" />
      </div>
    );
  }

  const primaryAccount = data.accounts.find((a: any) => a.type === 'BANK') || data.accounts[0];
  const bitcoinAccount = data.accounts.find((a: any) => a.provider === 'Bitcoin');
  const balance = primaryAccount?.balance || 0;

  return (
    <div className="app-shell">
      {/* Search Header */}
      <header className="page-header">
        <div className="header-left">
          <div className="profile-btn"><User size={20} /></div>
          <div className="search-bar">
            <Search size={16} />
            <input type="text" placeholder="Search for anything..." />
          </div>
        </div>
        <div className="header-right">
          <div className="action-btn"><Bell size={20} /></div>
          <div className="action-btn"><Menu size={20} /></div>
        </div>
      </header>

      <main className="main-content container animate-fade-in">
        
        {/* Core Pay/Receive Section */}
        <section className="pay-section">
          <div className="pay-grid">
            <div className="pay-item main" onClick={() => window.location.href = '/scan'}>
              <div className="pay-icon-wrapper scan">
                <Scan size={28} />
              </div>
              <span>Scan & Pay</span>
            </div>
            <div className="pay-item">
              <div className="pay-icon-wrapper">
                <Phone size={24} />
              </div>
              <span>To Mobile</span>
            </div>
            <div className="pay-item">
              <div className="pay-icon-wrapper">
                <ArrowRightLeft size={24} />
              </div>
              <span>To Self</span>
            </div>
            <div className="pay-item">
              <div className="pay-icon-wrapper">
                <Send size={24} />
              </div>
              <span>To Bank</span>
            </div>
          </div>
        </section>

        {/* Promo Banner */}
        <section className="promo-section">
          <div className="promo-card">
            <div className="promo-text">
              <h4>Get ₹50 Cashback</h4>
              <p>On your 1st Petrol Payment of ₹500+</p>
            </div>
            <div className="promo-tag">LOCKED</div>
          </div>
        </section>

        {/* Balance & Account Info */}
        <section className="balance-info-section">
          <GlassCard className="balance-summary-card">
            <div className="info-top">
              <div>
                <p className="label">Wallet Balance</p>
                <h2 className="balance-amount">₹{balance.toLocaleString()}</h2>
              </div>
              <div className="growth-tag">
                <TrendingUp size={14} />
                <span>+2.4%</span>
              </div>
            </div>
            <div className="info-actions">
              <button className="text-action">Check History <ChevronRight size={14} /></button>
              <button className="add-money-btn">+ Add Money</button>
            </div>
          </GlassCard>
        </section>

        {/* Service Grid - Recharges & Bills */}
        <section className="services-section">
          <div className="section-header">
            <h3>Recharges & Bill Payments</h3>
            <button className="view-link">View All</button>
          </div>
          <ServiceGrid />
        </section>

        {/* Ticket Booking */}
        <section className="booking-section">
          <div className="section-header">
            <h3>Ticket Booking</h3>
          </div>
          <div className="booking-grid">
            <div className="booking-item">
              <div className="booking-icon b-bus">🚌</div>
              <span>Bus</span>
            </div>
            <div className="booking-item">
              <div className="booking-icon b-flight">✈️</div>
              <span>Flight</span>
            </div>
            <div className="booking-item">
              <div className="booking-icon b-train">🚄</div>
              <span>Train</span>
            </div>
            <div className="booking-item">
              <div className="booking-icon b-movie">🎬</div>
              <span>Movies</span>
            </div>
          </div>
        </section>

        {/* Bitcoin Wallet Integration */}
        <section className="crypto-section">
          <div className="section-header">
            <h3>Invest in Crypto</h3>
          </div>
          <BitcoinWallet btcBalance={bitcoinAccount?.balance || 0.0045} />
        </section>

        {/* Recent Transactions */}
        <section className="recent-activity">
          <div className="section-header">
            <h3>Recent Transactions</h3>
            <button className="view-link" onClick={() => window.location.href = '/transactions'}>All</button>
          </div>
          <div className="tx-list">
            {(data.transactions || []).map((tx: any) => (
              <div key={tx.id} className="tx-row">
                <div className="tx-left">
                  <div className={`tx-icon ${tx.amount > 0 ? 'success' : 'out'}`}>
                    {tx.amount > 0 ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}
                  </div>
                  <div className="tx-details">
                    <p className="tx-name">{tx.merchantName}</p>
                    <p className="tx-meta">{new Date(tx.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className={`tx-right ${tx.amount > 0 ? 'positive' : ''}`}>
                  {tx.amount > 0 ? '+' : ''}₹{Math.abs(tx.amount).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        <div className="nav-item active">
          <HomeIcon size={24} />
          <span>Home</span>
        </div>
        <div className="nav-item" onClick={() => window.location.href = '/scan'}>
          <Scan size={24} />
          <span>Scan</span>
        </div>
        <div className="nav-item">
          <History size={24} />
          <span>History</span>
        </div>
        <div className="nav-item">
          <WalletIcon size={24} />
          <span>Wallet</span>
        </div>
      </nav>

      <style jsx>{`
        .app-shell {
          min-height: 100vh;
          background: #f8fbff; /* Very light blue background */
          color: #222;
          padding-bottom: 80px;
        }

        :global(.dark) .app-shell {
          background: var(--bg-primary);
          color: white;
        }

        .page-header {
          position: sticky;
          top: 0;
          z-index: 100;
          background: #00baf2;
          padding: 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: white;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 12px;
          flex: 1;
        }

        .profile-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255,255,255,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .search-bar {
          background: rgba(255,255,255,0.2);
          border-radius: 20px;
          padding: 6px 14px;
          display: flex;
          align-items: center;
          gap: 10px;
          flex: 1;
          max-width: 300px;
        }

        .search-bar input {
          background: transparent;
          border: none;
          color: white;
          font-size: 0.85rem;
          outline: none;
        }

        .search-bar input::placeholder {
          color: rgba(255,255,255,0.7);
        }

        .header-right {
          display: flex;
          gap: 15px;
        }

        .main-content {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          padding-top: 1.5rem;
        }

        /* Pay Section */
        .pay-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
          background: white;
          padding: 1.25rem;
          border-radius: var(--radius-md);
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }

        :global(.dark) .pay-grid {
          background: var(--bg-secondary);
        }

        .pay-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .pay-icon-wrapper {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          background: #f0f7ff;
          color: #00baf2;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .pay-icon-wrapper.scan {
          background: #00baf2;
          color: white;
          width: 60px;
          height: 60px;
          border-radius: 16px;
        }

        .pay-item span {
          font-size: 0.75rem;
          font-weight: 600;
        }

        /* Promo Section */
        .promo-card {
          background: linear-gradient(90deg, #002e6e 0%, #00baf2 100%);
          padding: 1.25rem;
          border-radius: var(--radius-md);
          color: white;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .promo-text h4 {
          margin-bottom: 4px;
        }

        .promo-text p {
          font-size: 0.8rem;
          opacity: 0.8;
        }

        .promo-tag {
          font-size: 0.7rem;
          font-weight: 700;
          background: rgba(255,255,255,0.2);
          padding: 4px 8px;
          border-radius: 4px;
        }

        /* Balance Info */
        .balance-summary-card {
          padding: 1.25rem;
          background: white;
          border: 1px solid #e1e8f5;
        }

        :global(.dark) .balance-summary-card {
          background: var(--bg-secondary);
          border: 1px solid var(--glass-border);
        }

        .info-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 2rem;
        }

        .label {
          font-size: 0.85rem;
          color: #666;
          margin-bottom: 4px;
        }

        .balance-amount {
          font-size: 2rem;
          font-weight: 700;
        }

        .growth-tag {
          padding: 4px 8px;
          border-radius: 8px;
          background: #e6f7ef;
          color: #00aa00;
          font-size: 0.75rem;
          display: flex;
          align-items: center;
          gap: 4px;
          font-weight: 600;
        }

        .info-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .text-action {
          font-size: 0.85rem;
          font-weight: 600;
          color: #00baf2;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .add-money-btn {
          background: #00baf2;
          color: white;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
        }

        /* Services section */
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .section-header h3 {
          font-size: 1.1rem;
          font-weight: 700;
        }

        /* Booking Section */
        .booking-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
          background: white;
          padding: 1.25rem;
          border-radius: var(--radius-md);
        }

        :global(.dark) .booking-grid {
          background: var(--bg-secondary);
        }

        .booking-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          cursor: pointer;
        }

        .booking-icon {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          background: #f8fbff;
        }

        :global(.dark) .booking-icon {
          background: rgba(255,255,255,0.05);
        }

        .booking-item span {
          font-size: 0.75rem;
          font-weight: 600;
        }

        .view-link {
          font-size: 0.85rem;
          font-weight: 600;
          color: #00baf2;
        }

        /* Transactions */
        .tx-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          background: white;
          padding: 1.25rem;
          border-radius: var(--radius-md);
        }

        :global(.dark) .tx-list {
          background: var(--bg-secondary);
        }

        .tx-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 12px;
          border-bottom: 1px solid #f0f0f0;
        }

        :global(.dark) .tx-row {
          border-bottom: 1px solid var(--glass-border);
        }

        .tx-row:last-child { border-bottom: none; }

        .tx-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .tx-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f0f7ff;
          color: #00baf2;
        }

        .tx-icon.success { background: #e6f7ef; color: #00aa00; }
        .tx-icon.out { background: #fff1f1; color: #ff5555; }

        .tx-name {
          font-size: 0.95rem;
          font-weight: 600;
        }

        .tx-meta {
          font-size: 0.75rem;
          color: #888;
        }

        .tx-right {
          font-size: 1rem;
          font-weight: 700;
        }

        .tx-right.positive { color: #00aa00; }

        /* Bottom Nav */
        .bottom-nav {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          height: 70px;
          background: white;
          border-top: 1px solid #eee;
          display: flex;
          justify-content: space-around;
          align-items: center;
          padding: 0 10px;
          z-index: 1000;
        }

        :global(.dark) .bottom-nav {
          background: var(--bg-secondary);
          border-top: 1px solid var(--glass-border);
        }

        .nav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          color: #888;
        }

        .nav-item.active {
          color: #00baf2;
        }

        .nav-item span {
          font-size: 0.7rem;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}
