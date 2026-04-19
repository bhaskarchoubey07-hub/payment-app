'use client';

import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import GlassCard from '../ui/GlassCard';
import { Info, ShieldCheck } from 'lucide-react';

interface UniversalQRProps {
  amount?: number;
  receiverId: string;
  receiverName: string;
}

export default function UniversalQR({ amount, receiverId, receiverName }: UniversalQRProps) {
  const [network, setNetwork] = useState<'UPI' | 'CRYPTO'>('UPI');

  // Multi-network URI generation
  const getQRValue = () => {
    if (network === 'UPI') {
      return `upi://pay?pa=${receiverId}@okaxis&pn=${encodeURIComponent(receiverName)}&am=${amount || ''}&cu=INR`;
    } else {
      return `ethereum:0x${receiverId}?value=${amount || ''}`;
    }
  };

  return (
    <GlassCard className="qr-container">
      <div className="qr-header">
        <div className="qr-network-tabs">
          <button 
            className={`tab ${network === 'UPI' ? 'active' : ''}`}
            onClick={() => setNetwork('UPI')}
          >
            UPI
          </button>
          <button 
            className={`tab ${network === 'CRYPTO' ? 'active' : ''}`}
            onClick={() => setNetwork('CRYPTO')}
          >
            Crypto
          </button>
        </div>
      </div>

      <div className="qr-body flex-center">
        <div className="qr-wrapper glass">
          <QRCodeSVG 
            value={getQRValue()} 
            size={200}
            level="H"
            includeMargin={true}
            imageSettings={{
              src: network === 'UPI' ? "/upi-icon.png" : "/crypto-icon.png",
              x: undefined,
              y: undefined,
              height: 40,
              width: 40,
              excavate: true,
            }}
          />
        </div>
      </div>

      <div className="qr-footer">
        <div className="receiver-info">
          <p className="label">Paying to</p>
          <p className="name">{receiverName}</p>
        </div>
        
        <div className="security-badge">
          <ShieldCheck size={16} className="icon-success" />
          <span>FinOS Secured</span>
        </div>
      </div>

      <style jsx>{`
        .qr-container {
          max-width: 350px;
          margin: 0 auto;
          text-align: center;
        }

        .qr-network-tabs {
          display: flex;
          background: var(--bg-accent);
          padding: 4px;
          border-radius: var(--radius-md);
          margin-bottom: 1.5rem;
        }

        .tab {
          flex: 1;
          padding: 8px;
          border-radius: var(--radius-sm);
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--text-secondary);
        }

        .tab.active {
          background: var(--glass-border);
          color: var(--text-primary);
          box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        }

        .qr-wrapper {
          padding: 1rem;
          border-radius: var(--radius-lg);
          background: white; /* QR codes need contrast */
          margin-bottom: 1.5rem;
        }

        .receiver-info {
          margin-bottom: 1rem;
        }

        .label {
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        .name {
          font-size: 1.1rem;
          font-weight: 600;
        }

        .security-badge {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          font-size: 0.8rem;
          color: var(--text-secondary);
          opacity: 0.8;
        }

        .icon-success {
          color: var(--success);
        }
      `}</style>
    </GlassCard>
  );
}
