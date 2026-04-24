'use client';

import React, { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import GlassCard from '@/components/ui/GlassCard';
import PremiumButton from '@/components/ui/PremiumButton';
import { Mail, Lock, ArrowRight, Zap, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const supabase = createClient();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        window.location.href = '/';
      } else {
        const { data, error } = await supabase.auth.signUp({ 
          email, 
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          }
        });
        if (error) throw error;
        
        if (data.session) {
          setMessage('Account created! Redirecting to dashboard...');
          setTimeout(() => {
            window.location.href = '/';
          }, 1500);
        } else {
          setMessage('Account created successfully! You can now sign in.');
        }
      }
    } catch (error: any) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container flex-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="auth-box"
      >
        <div className="brand-header">
           <div className="brand-logo"><Zap size={32} fill="var(--primary)" /></div>
           <h1>FinOS <span>Platform</span></h1>
           <p>{isLogin ? 'Welcome back to the future of finance.' : 'Join the elite financial operating system.'}</p>
        </div>

        <GlassCard className="auth-card">
          <form onSubmit={handleAuth} className="auth-form">
            <div className="input-group">
              <label>Email Address</label>
              <div className="input-field">
                <Mail size={18} />
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label>Password</label>
              <div className="input-field">
                <Lock size={18} />
                <input 
                  type="password" 
                  placeholder="Enter your password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <PremiumButton type="submit" className="auth-btn" disabled={loading}>
              {loading ? 'Processing...' : isLogin ? 'Sign In' : 'Create Account'} 
              {!loading && <ArrowRight size={18} />}
            </PremiumButton>

            <AnimatePresence>
              {message && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="auth-message"
                >
                  {message}
                </motion.p>
              )}
            </AnimatePresence>
          </form>

          <div className="auth-footer">
            <button onClick={() => setIsLogin(!isLogin)} className="toggle-btn">
              {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
            </button>
          </div>
        </GlassCard>

        <div className="security-badge">
           <ShieldCheck size={14} />
           <span>Secured by End-to-End Encryption</span>
        </div>
      </motion.div>

      <style jsx>{`
        .auth-container {
          min-height: 100vh;
          background: radial-gradient(circle at top right, var(--primary-glow), transparent),
                      radial-gradient(circle at bottom left, var(--accent-glow), transparent);
          padding: 2rem;
        }

        .auth-box {
          width: 100%;
          max-width: 400px;
        }

        .brand-header {
          text-align: center;
          margin-bottom: 2.5rem;
        }

        .brand-logo {
          margin-bottom: 1rem;
          display: flex;
          justify-content: center;
        }

        .brand-header h1 {
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }

        .brand-header h1 span { color: var(--primary); }

        .brand-header p {
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .input-group label {
          display: block;
          font-size: 0.8rem;
          color: var(--text-muted);
          margin-bottom: 0.75rem;
          font-weight: 500;
        }

        .input-field {
          display: flex;
          align-items: center;
          gap: 12px;
          background: var(--bg-accent);
          padding: 12px 16px;
          border-radius: var(--radius-md);
          border: 1px solid var(--glass-border);
          transition: var(--transition);
        }

        .input-field:focus-within {
          border-color: var(--primary);
          box-shadow: 0 0 15px var(--primary-glow);
        }

        .input-field input {
          background: none;
          border: none;
          color: var(--text-primary);
          font-family: inherit;
          width: 100%;
          outline: none;
        }

        .auth-btn {
          width: 100% !important;
          margin-top: 0.5rem;
        }

        .auth-message {
          font-size: 0.8rem;
          color: var(--accent);
          text-align: center;
          margin-top: 0.5rem;
        }

        .auth-footer {
          margin-top: 1.5rem;
          text-align: center;
        }

        .toggle-btn {
          font-size: 0.85rem;
          color: var(--text-secondary);
          background: none;
          border: none;
          cursor: pointer;
        }

        .security-badge {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          margin-top: 2rem;
          font-size: 0.7rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 1px;
        }
      `}</style>
    </div>
  );
}
