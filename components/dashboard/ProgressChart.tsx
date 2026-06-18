'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface DataPoint {
  label: string;
  value: number;
  color?: string;
}

interface ProgressChartProps {
  data: DataPoint[];
  type?: 'bar' | 'line' | 'circle';
  title?: string;
  className?: string;
  height?: number;
}

export default function ProgressChart({
  data,
  type = 'bar',
  title,
  className,
  height = 200,
}: ProgressChartProps) {
  const [isVisible, setIsVisible] = useState(false);
  const maxValue = Math.max(...data.map(d => d.value), 1);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Bar Chart
  if (type === 'bar') {
    return (
      <div className={cn('glass-card p-6', className)}>
        {title && <h3 className="text-lg font-bold mb-6">{title}</h3>}
        <div className="space-y-4">
          {data.map((item, index) => (
            <div key={item.label}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-300">{item.label}</span>
                <span className="text-sm text-gray-400">{item.value}٪</span>
              </div>
              <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={isVisible ? { width: `${(item.value / maxValue) * 100}%` } : {}}
                  transition={{ duration: 1, delay: index * 0.2, ease: 'easeOut' }}
                  className={cn(
                    'h-full rounded-full',
                    item.color || 'bg-gradient-to-r from-primary-400 to-gold-400'
                  )}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Circle/Donut Chart
  if (type === 'circle') {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let cumulativeAngle = -90;

    return (
      <div className={cn('glass-card p-6 text-center', className)}>
        {title && <h3 className="text-lg font-bold mb-6">{title}</h3>}
        
        <div className="relative w-48 h-48 mx-auto mb-6">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            {data.map((item, index) => {
              const percentage = (item.value / total) * 100;
              const angle = (percentage / 100) * 360;
              const startAngle = cumulativeAngle;
              cumulativeAngle += angle;

              const startX = 50 + 40 * Math.cos((startAngle * Math.PI) / 180);
              const startY = 50 + 40 * Math.sin((startAngle * Math.PI) / 180);
              const endX = 50 + 40 * Math.cos(((startAngle + angle) * Math.PI) / 180);
              const endY = 50 + 40 * Math.sin(((startAngle + angle) * Math.PI) / 180);
              const largeArc = angle > 180 ? 1 : 0;

              return (
                <path
                  key={item.label}
                  d={`M 50 50 L ${startX} ${startY} A 40 40 0 ${largeArc} 1 ${endX} ${endY} Z`}
                  fill={item.color || ['#ec7a0e', '#d4a017', '#7c3aed', '#10b981', '#3b82f6'][index % 5]}
                  className="transition-all duration-1000"
                  style={{ opacity: isVisible ? 1 : 0 }}
                />
              );
            })}
            <circle cx="50" cy="50" r="25" fill="#1c2132" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div>
              <div className="text-3xl font-black">{total}٪</div>
              <div className="text-xs text-gray-400">مجموع پیشرفت</div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="space-y-2">
          {data.map((item, index) => (
            <div key={item.label} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color || ['#ec7a0e', '#d4a017', '#7c3aed', '#10b981', '#3b82f6'][index % 5] }}
                />
                <span className="text-sm text-gray-300">{item.label}</span>
              </div>
              <span className="text-sm text-gray-400">{item.value}٪</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Line Chart (ساده شده)
  if (type === 'line') {
    const points = data.map((item, index) => {
      const x = (index / (data.length - 1)) * 100;
      const y = 100 - (item.value / maxValue) * 100;
      return `${x},${y}`;
    }).join(' ');

    return (
      <div className={cn('glass-card p-6', className)}>
        {title && <h3 className="text-lg font-bold mb-6">{title}</h3>}
        
        <div style={{ height }}>
          <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
            {/* Grid */}
            {[0, 25, 50, 75, 100].map((y) => (
              <line
                key={y}
                x1="0" y1={y} x2="100" y2={y}
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="0.5"
              />
            ))}

            {/* Area */}
            <motion.polygon
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
              points={`0,100 ${points} 100,100`}
              fill="url(#lineGradient)"
            />

            {/* Line */}
            <motion.polyline
              initial={{ pathLength: 0 }}
              animate={isVisible ? { pathLength: 1 } : {}}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
              points={points}
              fill="none"
              stroke="url(#lineStroke)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Dots */}
            {data.map((item, index) => {
              const x = (index / (data.length - 1)) * 100;
              const y = 100 - (item.value / maxValue) * 100;
              return (
                <motion.circle
                  key={item.label}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 1 + index * 0.2 }}
                  cx={x}
                  cy={y}
                  r="2"
                  fill="#ec7a0e"
                />
              );
            })}

            <defs>
              <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(236, 122, 14, 0.3)" />
                <stop offset="100%" stopColor="rgba(236, 122, 14, 0)" />
              </linearGradient>
              <linearGradient id="lineStroke" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#ec7a0e" />
                <stop offset="100%" stopColor="#d4a017" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Labels */}
        <div className="flex justify-between mt-4">
          {data.map((item) => (
            <div key={item.label} className="text-center">
              <div className="text-xs text-gray-400">{item.label}</div>
              <div className="text-sm font-bold">{item.value}٪</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}

// کامپوننت کوچک برای نمایش درصد
export function CircularProgress({
  value,
  size = 100,
  strokeWidth = 8,
  color = 'from-primary-400 to-gold-400',
  label,
}: {
  value: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  label?: string;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="text-center">
      <div className="relative inline-flex items-center justify-center">
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth={strokeWidth}
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={`url(#gradient-${value})`}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          />
          <defs>
            <linearGradient id={`gradient-${value}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ec7a0e" />
              <stop offset="100%" stopColor="#d4a017" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-black">{value}%</span>
        </div>
      </div>
      {label && <p className="text-sm text-gray-400 mt-2">{label}</p>}
    </div>
  );
}