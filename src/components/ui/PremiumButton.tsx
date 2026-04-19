'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface PremiumButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  className?: string;
  disabled?: boolean;
}

export default function PremiumButton({ 
  children, 
  onClick, 
  variant = 'primary', 
  className = '',
  disabled = false
}: PremiumButtonProps) {
  
  const variants = {
    primary: {
      background: 'var(--primary)',
      color: 'white',
      boxShadow: '0 4px 15px var(--primary-glow)',
    },
    secondary: {
      background: 'var(--bg-accent)',
      color: 'var(--text-primary)',
      border: '1px solid var(--glass-border)',
    },
    outline: {
      background: 'transparent',
      border: '1px solid var(--primary)',
      color: 'var(--primary)',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--text-secondary)',
    }
  };

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.02, translateY: -2 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      onClick={onClick}
      disabled={disabled}
      className={`premium-btn ${variant} ${className}`}
      style={variants[variant]}
    >
      {children}
      <style jsx>{`
        .premium-btn {
          padding: 0.75rem 1.5rem;
          border-radius: var(--radius-md);
          font-weight: 600;
          font-size: 0.95rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: var(--transition);
          opacity: ${disabled ? 0.5 : 1};
          cursor: ${disabled ? 'not-allowed' : 'pointer'};
          border: none;
        }
      `}</style>
    </motion.button>
  );
}
