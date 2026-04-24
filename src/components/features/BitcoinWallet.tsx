'use client';

import React, { useState, useEffect } from 'react';
import GlassCard from '@/components/ui/GlassCard';
import { Bitcoin, ArrowRightLeft, TrendingUp, TrendingDown, RefreshCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BitcoinWallet({ btcBalance = 0.0045 }: { btcBalance?: number }) {
  const [price, setPrice] = useState<number | null>(null);
  const [change, setChange] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [btcAmount, setBtcAmount] = useState<string>('1');
  const [inrAmount, setInrAmount] = useState<string>('');

  const fetchPrice = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=inr&include_24hr_change=true');
      const data = await res.json();
      setPrice(data.bitcoin.inr);
      setChange(data.bitcoin.inr_24h_change);
      
      if (btcAmount) {
        setInrAmount((parseFloat(btcAmount) * data.bitcoin.inr).toFixed(2));
      }
    } catch (error) {
      console.error('Error fetching BTC price:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrice();
    const interval = setInterval(fetchPrice, 60000); // 1 minute
    return () => clearInterval(interval);
  }, []);

  const handleBtcChange = (val: string) => {
    setBtcAmount(val);
    if (!val || !price) {
      setInrAmount('');
      return;
    }
    setInrAmount((parseFloat(val) * price).toFixed(2));
  };

  const handleInrChange = (val: string) => {
    setInrAmount(val);
    if (!val || !price) {
      setBtcAmount('');
      return;
    }
    setBtcAmount((parseFloat(val) / price).toFixed(8));
  };

  return (
    <GlassCard className="bitcoin-wallet">
      <div className="wallet-header">
        <div className="coin-info">
          <div className="coin-icon">
            <Bitcoin color="#f7931a" fill="#f7931a" fillOpacity={0.2} />
          </div>
          <div>
            <h3>Bitcoin Wallet</h3>
            <p className="subtitle">Real-time Trading</p>
          </div>
        </div>
        <button onClick={fetchPrice} className={`refresh-btn ${loading ? 'spinning' : ''}`}>
          <RefreshCcw size={16} />
        </button>
      </div>

      <div className="balance-section">
        <div className="main-balance">
          <span className="btc-val">{btcBalance.toFixed(8)} BTC</span>
          <span className="inr-val">≈ ₹{(btcBalance * (price || 0)).toLocaleString()}</span>
        </div>
        {price && (
          <div className={`price-badge ${change >= 0 ? 'up' : 'down'}`}>
            {change >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            <span>{Math.abs(change).toFixed(2)}%</span>
          </div>
        )}
      </div>

      <div className="converter-box">
        <p className="box-title">Instant Converter</p>
        <div className="converter-inputs">
          <div className="input-field">
            <label>BTC</label>
            <input 
              type="number" 
              value={btcAmount} 
              onChange={(e) => handleBtcChange(e.target.value)}
              placeholder="0.00"
            />
          </div>
          <div className="convert-icon">
            <ArrowRightLeft size={16} />
          </div>
          <div className="input-field">
            <label>INR</label>
            <input 
              type="number" 
              value={inrAmount} 
              onChange={(e) => handleInrChange(e.target.value)}
              placeholder="0.00"
            />
          </div>
        </div>
        <p className="rate-text">
          1 BTC = {price ? `₹${price.toLocaleString()}` : 'Loading...'}
        </p>
      </div>

      <div className="wallet-actions">
        <button className="action-btn buy">Buy Bitcoin</button>
        <button className="action-btn sell">Sell</button>
      </div>

      <style jsx>{`
        .bitcoin-wallet {
          padding: 1.5rem;
          background: linear-gradient(135deg, rgba(247, 147, 26, 0.1) 0%, rgba(0, 0, 0, 0) 100%);
          border: 1px solid rgba(247, 147, 26, 0.2);
        }

        .wallet-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1.5rem;
        }

        .coin-info {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .coin-icon {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          background: rgba(247, 147, 26, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .subtitle {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .refresh-btn {
          color: var(--text-muted);
        }

        .refresh-btn.spinning {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .balance-section {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 1.5rem;
        }

        .main-balance {
          display: flex;
          flex-direction: column;
        }

        .btc-val {
          font-size: 1.5rem;
          font-weight: 700;
          font-family: 'Outfit', sans-serif;
        }

        .inr-val {
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .price-badge {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 4px 8px;
          border-radius: 8px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .price-badge.up { background: rgba(16, 185, 129, 0.1); color: var(--success); }
        .price-badge.down { background: rgba(239, 68, 68, 0.1); color: var(--error); }

        .converter-box {
          background: rgba(255, 255, 255, 0.03);
          border-radius: 12px;
          padding: 1rem;
          margin-bottom: 1.5rem;
        }

        .box-title {
          font-size: 0.7rem;
          text-transform: uppercase;
          color: var(--text-muted);
          font-weight: 700;
          margin-bottom: 10px;
        }

        .converter-inputs {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 8px;
        }

        .input-field {
          flex: 1;
        }

        .input-field label {
          display: block;
          font-size: 0.65rem;
          color: var(--text-muted);
          margin-bottom: 4px;
        }

        .input-field input {
          width: 100%;
          background: transparent;
          border: none;
          color: var(--text-primary);
          font-size: 1rem;
          font-weight: 600;
          padding: 0;
          outline: none;
        }

        .convert-icon {
          color: var(--text-muted);
          padding-top: 15px;
        }

        .rate-text {
          font-size: 0.7rem;
          color: var(--text-muted);
        }

        .wallet-actions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .action-btn {
          padding: 10px;
          border-radius: 10px;
          font-size: 0.85rem;
          font-weight: 600;
          transition: var(--transition);
        }

        .action-btn.buy {
          background: #f7931a;
          color: white;
        }

        .action-btn.sell {
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-primary);
          border: 1px solid var(--glass-border);
        }

        .action-btn:hover {
          filter: brightness(1.1);
        }
      `}</style>
    </GlassCard>
  );
}
