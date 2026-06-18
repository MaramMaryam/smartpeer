'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatsCardProps {
  icon: React.ElementType;
  label: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  color?: string;
  delay?: number;
  className?: string;
  onClick?: () => void;
}

export default function StatsCard({
  icon: Icon,
  label,
  value,
  change,
  trend = 'neutral',
  color = 'from-primary-400 to-gold-500',
  delay = 0,
  className,
  onClick,
}: StatsCardProps) {
  const trendIcon = {
    up: TrendingUp,
    down: TrendingDown,
    neutral: Minus,
  };

  const trendColor = {
    up: 'text-green-400',
    down: 'text-red-400',
    neutral: 'text-gray-400',
  };

  const TrendIcon = trendIcon[trend];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: delay * 0.1, type: 'spring', stiffness: 100 }}
      className={cn(
        'glass-card p-6 hover:bg-white/10 transition-all duration-300 group',
        onClick && 'cursor-pointer hover:scale-105',
        className
      )}
      onClick={onClick}
    >
      {/* Icon */}
      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
        <Icon className="w-6 h-6 text-white" />
      </div>

      {/* Value */}
      <div className="text-3xl font-black mb-1 text-white">{value}</div>

      {/* Label */}
      <div className="text-sm text-gray-400 mb-2">{label}</div>

      {/* Change Indicator */}
      {change && (
        <div className={`flex items-center gap-1 text-xs ${trendColor[trend]}`}>
          <TrendIcon className="w-3 h-3" />
          <span>{change}</span>
        </div>
      )}

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-br from-white/5 to-transparent" />
    </motion.div>
  );
}

// نسخه ساده‌تر برای استفاده سریع
export function SimpleStatsCard({
  icon: Icon,
  label,
  value,
  color = 'from-primary-400 to-gold-500',
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  color?: string;
}) {
  return (
    <div className="glass-card p-6 text-center">
      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mx-auto mb-3`}>
        <Icon className="w-7 h-7 text-white" />
      </div>
      <div className="text-2xl font-black text-white mb-1">{value}</div>
      <div className="text-sm text-gray-400">{label}</div>
    </div>
  );
}