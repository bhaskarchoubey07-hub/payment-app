'use client';

import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex-center" style={{ height: '100vh', background: 'var(--bg-primary)', color: 'white' }}>
      <div className="loading-container">
        <Loader2 className="animate-spin" size={40} color="var(--primary)" />
        <p style={{ marginTop: '1rem', fontStyle: 'italic', opacity: 0.7 }}>Aether AI is optimizing your wealth gateway...</p>
      </div>
    </div>
  );
}
