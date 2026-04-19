'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/ui/Header';
import GlassCard from '@/components/ui/GlassCard';
import PremiumButton from '@/components/ui/PremiumButton';
import { getLiveCreditScore, applyForLoan } from '@/app/actions/lending';
import { 
  ShieldCheck, 
  Coins, 
  ArrowRight, 
  BarChart3, 
  Info,
  Calendar,
  Lock,
  Loader2,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LendingPage() {
  const [scoreData, setScoreData] = useState<any>(null);
  const [loanAmount, setLoanAmount] = useState(25000);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function loadScore() {
      const data = await getLiveCreditScore();
      if (!data) {
          window.location.href = '/auth';
          return;
      }
      setScoreData(data);
      setLoading(false);
    }
    loadScore();
  }, []);

  const handleApply = async () => {
    setApplying(true);
    try {
      await applyForLoan(loanAmount, scoreData.rate, scoreData.score);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 5000);
    } catch (e: any) {
      alert(e.message);
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <div className="flex-center" style={{ height: '100vh' }}>
        <Loader2 className="animate-spin" size={32} />
      </div>
    );
  }

  return (
    <div className="lending-wrapper">
      <Header />
      
      <main className="container lending-layout">
        <header className="page-header">
          <h1>TrustBridge <span>Credit</span></h1>
          <p>AI-driven instant lending based on your ecosystem activity.</p>
        </header>

        {/* Credit Score Overview */}
        <section className="score-section">
          <GlassCard className="score-card">
            <div className="score-main">
              <div className="score-gauge flex-center">
                <div className="gauge-outer">
                   <div className="gauge-inner flex-center">
                      <div className="score-value">
                        <span className="number">{scoreData.score}</span>
                        <span className="label">
                            {scoreData.score > 800 ? 'Exceptional' : scoreData.score > 700 ? 'Excellent' : 'Good'}
                        </span>
                      </div>
                   </div>
                </div>
              </div>
              <div className="score-details">
                <h3>Your Credit Health</h3>
                <p>Calculated by Aether AI based on your transaction depth and consistency.</p>
                <div className="score-factors">
                  <div className="factor">
                    <span className="dot success"></span>
                    <span>Saving Behavior (Active)</span>
                  </div>
                  <div className="factor">
                    <span className="dot success"></span>
                    <span>Merchant Consistency</span>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </section>

        {/* Loan Eligibility & Slider */}
        <section className="eligibility-section">
          <GlassCard className="eligibility-card">
            <div className="section-title">
              <Coins className="icon-accent" />
              <h3>Instant eligibility</h3>
            </div>
            
            <div className="calculator">
              <div className="calc-row">
                <span className="label">Amount</span>
                <span className="value">₹{loanAmount.toLocaleString()}</span>
              </div>
              <input 
                type="range" 
                min="5000" 
                max={Math.max(5000, scoreData.eligibility)} 
                step="5000" 
                value={loanAmount}
                onChange={(e) => setLoanAmount(parseInt(e.target.value))}
                className="loan-slider"
              />
              
              <div className="calc-details">
                <div className="detail-item">
                  <p className="d-label">Int. Rate</p>
                  <p className="d-value">{scoreData.rate}% p.a</p>
                </div>
                <div className="detail-item">
                  <p className="d-label">Duration</p>
                  <p className="d-value">6 Months</p>
                </div>
                <div className="detail-item">
                  <p className="d-label">Est. EMI</p>
                  <p className="d-value">₹{(loanAmount * 0.175).toFixed(0)}</p>
                </div>
              </div>
            </div>

            <PremiumButton className="apply-btn" onClick={handleApply} disabled={applying || success}>
              {applying ? <Loader2 className="animate-spin" /> : success ? <CheckCircle2 /> : 'Apply Instantly'}
              {!applying && !success && <ArrowRight size={18} />}
            </PremiumButton>
            
            {success && <p className="success-txt">Application submitted for review!</p>}
          </GlassCard>
        </section>


        {/* Benefits Section */}
        <section className="benefits-section">
          <div className="benefit-card">
             <BarChart3 className="benefit-icon" />
             <h4>Zero Paperwork</h4>
             <p>Fully digital disbursement within 30 seconds.</p>
          </div>
          <div className="benefit-card">
             <Calendar className="benefit-icon" />
             <h4>Flexible Repayment</h4>
             <p>Autopay via UPI or Crypto Yield surplus.</p>
          </div>
          <div className="benefit-card">
             <Lock className="benefit-icon" />
             <h4>Asset-Backing</h4>
             <p>Use your crypto assets as additional collateral.</p>
          </div>
        </section>
      </main>

      <style jsx>{`
        .lending-layout {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          padding-bottom: 3rem;
        }

        .page-header h1 {
          font-size: 1.75rem;
          margin-bottom: 4px;
        }

        .page-header h1 span { color: var(--accent); }
        
        .page-header p {
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        /* Score Gauge */
        .score-card {
        }

        .score-main {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .gauge-outer {
          width: 140px;
          height: 140px;
          border-radius: 50%;
          background: conic-gradient(var(--accent) 70%, var(--bg-accent) 0);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .gauge-inner {
          width: 120px;
          height: 120px;
          background: var(--bg-secondary);
          border-radius: 50%;
          text-align: center;
        }

        .score-value {
          display: flex;
          flex-direction: column;
        }

        .score-value .number {
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .score-value .label {
          font-size: 0.75rem;
          color: var(--accent);
          font-weight: 600;
          text-transform: uppercase;
        }

        .score-factors {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 1rem;
        }

        .factor {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .dot.success { background: var(--success); }

        /* Calculator section */
        .eligibility-card {
          padding: 1.5rem;
        }

        .section-title {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 1.5rem;
          color: var(--text-primary);
        }

        .icon-accent { color: var(--accent); }

        .calc-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .calc-row .value {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .loan-slider {
          width: 100%;
          height: 6px;
          -webkit-appearance: none;
          background: var(--bg-accent);
          border-radius: var(--radius-full);
          margin-bottom: 2rem;
          outline: none;
        }

        .loan-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 24px;
          height: 24px;
          background: var(--accent);
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 0 15px var(--accent-glow);
        }

        .calc-details {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          margin-bottom: 2rem;
          padding: 1rem;
          background: rgba(255,255,255,0.03);
          border-radius: var(--radius-md);
        }

        .d-label {
          font-size: 0.7rem;
          color: var(--text-muted);
          margin-bottom: 4px;
        }

        .d-value {
          font-size: 0.9rem;
          font-weight: 600;
        }

        .apply-btn {
          width: 100% !important;
          background: var(--accent) !important;
          box-shadow: 0 4px 15px var(--accent-glow) !important;
        }

        /* Benefits Grid */
        .benefits-section {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
        }

        .benefit-card {
          text-align: center;
        }

        .benefit-icon {
          color: var(--text-muted);
          margin-bottom: 8px;
        }

        .benefit-card h4 {
          font-size: 0.85rem;
          margin-bottom: 4px;
        }

        .benefit-card p {
          font-size: 0.7rem;
          color: var(--text-muted);
          line-height: 1.3;
        }

        @media (max-width: 600px) {
          .score-main { flex-direction: column; text-align: center; }
          .benefits-section { grid-template-columns: 1fr; gap: 1.5rem; }
        }
      `}</style>
    </div>
  );
}
