'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/ui/Header';
import GlassCard from '@/components/ui/GlassCard';
import PremiumButton from '@/components/ui/PremiumButton';
import { 
  Scan, 
  X, 
  Zap, 
  Smartphone, 
  Lock,
  ChevronRight,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ScanPage() {
  const [scanning, setScanning] = useState(true);
  const [detected, setDetected] = useState<null | 'UPI' | 'CRYPTO'>(null);

  // Simulate scanning logic
  useEffect(() => {
    if (scanning) {
      const timer = setTimeout(() => {
        setDetected('UPI');
        setScanning(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [scanning]);

  return (
    <div className="scan-wrapper">
      <div className="scan-header">
        <button onClick={() => window.history.back()}><X size={24} /></button>
        <h3>Universal Scanner</h3>
        <div style={{ width: 24 }}></div>
      </div>

      <main className="scan-container">
        {scanning ? (
          <div className="scanner-view">
            <div className="camera-sim flex-center">
              <div className="scan-overlay">
                <div className="scan-corner tl"></div>
                <div className="scan-corner tr"></div>
                <div className="scan-corner bl"></div>
                <div className="scan-corner br"></div>
                <motion.div 
                  className="scan-line"
                  animate={{ top: ['0%', '100%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                ></motion.div>
              </div>
              <p className="scan-hint">Scan any UPI or Crypto QR</p>
            </div>
            
            <div className="offline-badge glass">
              <ShieldCheck size={14} />
              <span>Offline Payment Enabled (L2)</span>
            </div>
          </div>
        ) : (
          <AnimatePresence>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="detection-result"
            >
              <GlassCard className="result-card">
                <div className="success-icon flex-center">
                  <Zap size={32} />
                </div>
                <h2>OmniCode Detected</h2>
                <p className="merchant-name">Starbucks Coffee #422</p>

                <div className="routing-preview">
                  <p className="label">Recommended Router Path</p>
                  <div className="best-path glass">
                    <div className="path-icon">
                      {detected === 'UPI' ? <Smartphone size={20} /> : <Lock size={20} />}
                    </div>
                    <div className="path-info">
                      <p className="name">{detected} Route</p>
                      <p className="perk">Optimized for: <b>1.2% Cashback</b></p>
                    </div>
                    <ChevronRight size={18} />
                  </div>
                </div>

                <div className="amount-input">
                  <span>₹</span>
                  <input type="number" placeholder="0.00" autoFocus />
                </div>

                <PremiumButton className="pay-btn" onClick={() => alert('Processing via Nexus Path...')}>
                  Confirm Payment
                </PremiumButton>
                
                <button className="change-route" onClick={() => setScanning(true)}>
                  Rescan or Change Method
                </button>
              </GlassCard>
            </motion.div>
          </AnimatePresence>
        )}
      </main>

      <style jsx>{`
        .scan-wrapper {
          min-height: 100vh;
          background: #000;
          display: flex;
          flex-direction: column;
        }

        .scan-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem;
          color: white;
        }

        .scan-container {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }

        /* Camera Simulation */
        .scanner-view {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .camera-sim {
          width: 280px;
          height: 280px;
          background: #111;
          border-radius: 40px;
          position: relative;
          overflow: hidden;
        }

        .scan-overlay {
          width: 200px;
          height: 200px;
          position: relative;
        }

        .scan-corner {
          position: absolute;
          width: 20px;
          height: 20px;
          border: 3px solid var(--primary);
        }

        .tl { top: 0; left: 0; border-right: 0; border-bottom: 0; border-radius: 4px 0 0 0; }
        .tr { top: 0; right: 0; border-left: 0; border-bottom: 0; border-radius: 0 4px 0 0; }
        .bl { bottom: 0; left: 0; border-right: 0; border-top: 0; border-radius: 0 0 0 4px; }
        .br { bottom: 0; right: 0; border-left: 0; border-top: 0; border-radius: 0 0 4px 0; }

        .scan-line {
          position: absolute;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--primary), transparent);
          box-shadow: 0 0 15px var(--primary-glow);
        }

        .scan-hint {
          position: absolute;
          bottom: 20px;
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        .offline-badge {
          margin-top: 2rem;
          padding: 8px 16px;
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.75rem;
          color: var(--success);
        }

        /* Result Card */
        .result-card {
          width: 320px;
          text-align: center;
        }

        .success-icon {
          width: 64px;
          height: 64px;
          background: var(--primary-glow);
          border-radius: 50%;
          color: var(--primary);
          margin: 0 auto 1.5rem;
        }

        .merchant-name {
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
        }

        .routing-preview {
          text-align: left;
          margin-bottom: 1.5rem;
        }

        .routing-preview .label {
          font-size: 0.7rem;
          color: var(--text-muted);
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .best-path {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          border-radius: var(--radius-md);
        }

        .path-icon {
          width: 36px;
          height: 36px;
          background: var(--primary);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .path-info p { margin: 0; }
        .path-info .name { font-size: 0.9rem; font-weight: 600; }
        .path-info .perk { font-size: 0.75rem; color: var(--text-secondary); }

        .amount-input {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 2rem;
        }

        .amount-input input {
          background: transparent;
          border: none;
          color: white;
          width: 150px;
          font: inherit;
          outline: none;
        }

        .pay-btn {
          width: 100% !important;
          padding: 1rem !important;
        }

        .change-route {
          margin-top: 1rem;
          font-size: 0.8rem;
          color: var(--text-muted);
        }
      `}</style>
    </div>
  );
}
