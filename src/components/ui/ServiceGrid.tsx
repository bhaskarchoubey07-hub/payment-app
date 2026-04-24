'use client';

import React from 'react';
import { 
  Smartphone, 
  Tv, 
  Zap, 
  Droplets, 
  CreditCard, 
  Wifi, 
  IndianRupee, 
  ShoppingBag,
  MoreHorizontal,
  Clapperboard,
  ShieldAlert,
  TrendingUp
} from 'lucide-react';
import { motion } from 'framer-motion';

const services = [
  { id: 'mobile', name: 'Recharge', icon: <Smartphone size={24} />, color: '#00baf2' },
  { id: 'dth', name: 'DTH', icon: <Tv size={24} />, color: '#002e6e' },
  { id: 'electricity', name: 'Electricity', icon: <Zap size={24} />, color: '#ffcc00' },
  { id: 'water', name: 'Water', icon: <Droplets size={24} />, color: '#3399ff' },
  { id: 'credit', name: 'Credit Card', icon: <CreditCard size={24} />, color: '#ff5555' },
  { id: 'broadband', name: 'Broadband', icon: <Wifi size={24} />, color: '#6633ff' },
  { id: 'loan', name: 'Loan Emi', icon: <IndianRupee size={24} />, color: '#00aa00' },
  { id: 'gold', name: 'Digi Gold', icon: <ShoppingBag size={24} />, color: '#ffcc00' },
  { id: 'stocks', name: 'Stocks', icon: <TrendingUp size={24} />, color: '#00aa00' },
  { id: 'insurance', name: 'Insurance', icon: <ShieldAlert size={24} />, color: '#6633ff' },
  { id: 'tickets', name: 'Movie Tickets', icon: <Clapperboard size={24} />, color: '#ff5555' },
  { id: 'more', name: 'More', icon: <MoreHorizontal size={24} />, color: '#888888' },
];

export default function ServiceGrid() {
  return (
    <div className="service-grid">
      {services.map((service, index) => (
        <motion.div 
          key={service.id}
          className="service-item"
          whileHover={{ y: -5 }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.05 }}
        >
          <div className="service-icon-wrapper" style={{ backgroundColor: `${service.color}15`, color: service.color }}>
            {service.icon}
          </div>
          <span className="service-name">{service.name}</span>
        </motion.div>
      ))}
      <style jsx>{`
        .service-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem 1rem;
          padding: 1rem 0;
        }

        .service-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          cursor: pointer;
        }

        .service-icon-wrapper {
          width: 52px;
          height: 52px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition);
        }

        .service-item:hover .service-icon-wrapper {
          transform: scale(1.05);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .service-name {
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--text-primary);
          text-align: center;
        }

        @media (max-width: 480px) {
          .service-grid {
            gap: 1.25rem 0.75rem;
          }
          .service-icon-wrapper {
            width: 48px;
            height: 48px;
          }
        }
      `}</style>
    </div>
  );
}
