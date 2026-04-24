'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/ui/Header';
import GlassCard from '@/components/ui/GlassCard';
import { 
  TrendingUp, 
  TrendingDown, 
  PieChart, 
  Target, 
  ArrowUpRight,
  Sparkles,
  Zap,
  Loader2
} from 'lucide-react';
import { motion } from 'framer-motion';
import { getAetherInsights } from '@/app/actions/insights';

export default function InsightsPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const insights = await getAetherInsights();
      setData(insights);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex-center" style={{ height: '100vh', background: 'var(--bg-primary)' }}>
        <Loader2 className="animate-spin" size={32} color="var(--primary)" />
      </div>
    );
  }

  if (!data) return <div className="flex-center" style={{ height: '100vh' }}>Failed to load insights.</div>;

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
            <h2 className="score-val--big">{data.healthScore}<span>/100</span></h2>
            <div className="progress-bar-container">
              <div className="progress-bar-fill" style={{ width: `${data.healthScore}%` }}></div>
            </div>
            <p className="score-desc">{data.aiInsight}</p>
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
                    <span className="val">₹{data.spendingSplit.Essential.toLocaleString()}</span>
                 </div>
                 <div className="split-item">
                    <span>Lifestyle</span>
                    <span className="val">₹{data.spendingSplit.Lifestyle.toLocaleString()}</span>
                 </div>
                 <div className="split-item highlighted">
                    <span>Investments</span>
                    <span className="val">₹{data.spendingSplit.Investments.toLocaleString()}</span>
                 </div>
              </div>
           </GlassCard>

           <GlassCard className="mini-card">
              <Target className="icon-primary" size={20} />
              <h4>Savings Goal</h4>
              <div className="goal-info">
                 <p className="goal-name">{data.goal.name}</p>
                 <p className="goal-progress">₹{data.goal.current.toLocaleString()} / ₹{data.goal.target.toLocaleString()}</p>
                 <div className="progress-mini">
                    <div className="progress-mini-fill" style={{ width: `${Math.min(100, (data.goal.current / data.goal.target) * 100)}%` }}></div>
                 </div>
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
                   <p className="p-val">₹{Math.round(data.prediction.nextMonth).toLocaleString()}</p>
                </div>
                <div className="p-icon"><ArrowUpRight className="icon-success" /></div>
             </div>
             <p className="p-footer">Based on your current retention rate, you are on track with a <b>{(data.prediction.confidence * 100).toFixed(0)}% confidence</b> interval.</p>
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

        .progress-mini {
           height: 4px;
           background: rgba(255,255,255,0.05);
           border-radius: 2px;
           margin-top: 8px;
           overflow: hidden;
        }

        .progress-mini-fill {
           height: 100%;
           background: var(--primary);
        }

        @media (max-width: 600px) {
           .insights-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
