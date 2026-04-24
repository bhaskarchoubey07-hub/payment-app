'use client';

import React from 'react';
import PremiumButton from '@/components/ui/PremiumButton';
import { AlertCircle, RefreshCcw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex-center" style={{ height: '100vh', background: 'var(--bg-primary)', color: 'white', padding: '2rem', textAlign: 'center' }}>
      <div className="error-box glass" style={{ padding: '3rem', borderRadius: '24px', maxWidth: '400px' }}>
        <div className="icon-error" style={{ color: 'var(--error)', marginBottom: '1.5rem' }}>
          <AlertCircle size={64} />
        </div>
        <h2 style={{ marginBottom: '1rem' }}>Gateway Interrupted</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem', lineHeight: 1.6 }}>
          We encountered a secure synchronization error. This is usually temporary.
        </p>
        <PremiumButton onClick={() => reset()} className="w-full">
          <RefreshCcw size={18} style={{ marginRight: '8px' }} />
          Retry Connection
        </PremiumButton>
        <button 
          onClick={() => window.location.href = '/'} 
          style={{ marginTop: '1.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}
        >
          Return to Safe Zone
        </button>
      </div>
    </div>
  );
}
