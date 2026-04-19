'use client';

import React, { useState } from 'react';
import Header from '@/components/ui/Header';
import GlassCard from '@/components/ui/GlassCard';
import { 
  TrendingUp, 
  TrendingDown, 
  PieChart, 
  Target, 
  ArrowUpRight,
  Sparkles,
  Zap
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function InsightsPage() {
  return (
    <div className="insights-wrapper">
      <Header />
      
      <main className="container insights-layout">
        <header className="page-header">
          <h1>Financial <span>Intelligence</span></h1>
          <p>Aether AI's deep dive into your wealth and spending habits.</p>
        </header>

        {/* Wealth Score Section */}
        <section className="wealth-score">
          <GlassCard className="score-card">
            <div className="score-header">
              <Sparkles className="icon-gold" />
              <span>Aether Health Score</span>
            </div>
            <h2 className="score-val--big">84<span>/100</span></h2>
            <div className="progress-bar-container">
              <div className="progress-bar-fill" style={{ width: '84%' }}></div>
            </div>
            <p className="score-desc">Your score improved by <b>4 points</b> this week due to increased crypto-yield harvesting.</p>
          </GlassCard>
        </section>

        {/* Charts & Breakdown */}
        <section className="insights-grid">
           <GlassCard className="mini-card">
              <PieChart className="icon-accent" size={20} />
              <h4>Spending Split</h4>
              <div className="split-list">
                 <div className="split-item">
                    <span>Essential</span>
                    <span className="val">₹42,000</span>
                 </div>
                 <div className="split-item">
                    <span>Lifestyle</span>
                    <span className="val">₹18,500</span>
                 </div>
                 <div className="split-item highlighted">
                    <span>Investments</span>
                    <span className="val">₹12,000</span>
                 </div>
              </div>
           </GlassCard>

           <GlassCard className="mini-card">
              <Target className="icon-primary" size={20} />
              <h4>Savings Goal</h4>
              <div className="goal-info">
                 <p className="goal-name">New Tesla Build</p>
                 <p className="goal-progress">₹1,45,000 / ₹45,00,000</p>
              </div>
           </GlassCard>
        </section>

        {/* AI Prediction Section */}
        <section className="predictions">
          <div className="section-header">
             <h3>Future Cashflow</h3>
             <Zap size={14} className="icon-warning" />
          </div>
          <GlassCard className="prediction-card">
             <div className="p-row">
                <div className="p-item">
                   <p className="p-label">Next Month Est.</p>
                   <p className="p-val">₹2,45,000</p>
                </div>
                <div className="p-icon"><ArrowUpRight className="icon-success" /></div>
             </div>
             <p className="p-footer">Based on your current retention rate, you are on track to exceed your savings target by <b>12.5%</b>.</p>
          </GlassCard>
        </section>
      </main>

      <style jsx>{`
        .insights-layout {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          padding-bottom: 3rem;
        }

        .page-header h1 span { color: var(--primary); }

        .score-card {
           text-align: center;
           padding: 2rem;
        }

        .score-header {
           display: flex;
           justify-content: center;
           align-items: center;
           gap: 8px;
           font-size: 0.8rem;
           color: var(--text-secondary);
           margin-bottom: 1rem;
        }

        .icon-gold { color: #ffd700; filter: drop-shadow(0 0 10px rgba(255,215,0,0.3)); }

        .score-val--big {
           font-size: 4rem;
           font-weight: 800;
           margin-bottom: 1.5rem;
        }

        .score-val--big span {
           font-size: 1.5rem;
           color: var(--text-muted);
        }

        .progress-bar-container {
           height: 8px;
           background: var(--bg-accent);
           border-radius: 4px;
           margin-bottom: 1.5rem;
           overflow: hidden;
        }

        .progress-bar-fill {
           height: 100%;
           background: linear-gradient(90deg, var(--primary), var(--accent));
           box-shadow: 0 0 20px var(--primary-glow);
        }

        .score-desc {
           font-size: 0.9rem;
           color: var(--text-secondary);
        }

        .insights-grid {
           display: grid;
           grid-template-columns: repeat(2, 1fr);
           gap: 1.5rem;
        }

        .mini-card h4 {
           margin: 12px 0;
           font-size: 0.95rem;
        }

        .split-list {
           display: flex;
           flex-direction: column;
           gap: 8px;
        }

        .split-item {
           display: flex;
           justify-content: space-between;
           font-size: 0.75rem;
           color: var(--text-secondary);
        }

        .split-item.highlighted {
           color: var(--accent);
           font-weight: 700;
        }

        .goal-info {
           margin-top: 1rem;
        }

        .goal-name { font-size: 0.85rem; font-weight: 600; }
        .goal-progress { font-size: 0.7rem; color: var(--text-muted); }

        .prediction-card {
           border: 1px dashed var(--glass-border);
        }

        .p-row {
           display: flex;
           justify-content: space-between;
           align-items: flex-start;
           margin-bottom: 1rem;
        }

        .p-label { font-size: 0.75rem; color: var(--text-muted); }
        .p-val { font-size: 1.5rem; font-weight: 700; }

        .p-footer {
           font-size: 0.8rem;
           color: var(--text-secondary);
           line-height: 1.4;
           padding-top: 1rem;
           border-top: 1px solid var(--glass-border);
        }

        .icon-success { color: var(--success); }
        .icon-warning { color: var(--warning); }

        @media (max-width: 600px) {
           .insights-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
