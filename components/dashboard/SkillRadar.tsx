'use client';

import React, { useEffect, useRef } from 'react';

interface Skill {
  name: string;
  level: number; // 0-100
  color?: string;
}

interface SkillRadarProps {
  skills: Skill[];
  size?: number;
  className?: string;
}

export default function SkillRadar({ skills, size = 300, className = '' }: SkillRadarProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size * 0.35;
    const levels = 5;
    const angleStep = (Math.PI * 2) / skills.length;

    // Clear canvas
    ctx.clearRect(0, 0, size, size);

    // Draw grid
    for (let level = 1; level <= levels; level++) {
      ctx.beginPath();
      for (let i = 0; i <= skills.length; i++) {
        const angle = angleStep * i - Math.PI / 2;
        const r = (radius / levels) * level;
        const x = centerX + r * Math.cos(angle);
        const y = centerY + r * Math.sin(angle);

        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Draw axes
    for (let i = 0; i < skills.length; i++) {
      const angle = angleStep * i - Math.PI / 2;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(
        centerX + radius * Math.cos(angle),
        centerY + radius * Math.sin(angle)
      );
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.stroke();
    }

    // Draw data
    ctx.beginPath();
    for (let i = 0; i <= skills.length; i++) {
      const skill = skills[i % skills.length];
      const angle = angleStep * i - Math.PI / 2;
      const r = (radius * skill.level) / 100;
      const x = centerX + r * Math.cos(angle);
      const y = centerY + r * Math.sin(angle);

      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();

    // Fill
    const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
    gradient.addColorStop(0, 'rgba(236, 122, 14, 0.3)');
    gradient.addColorStop(1, 'rgba(212, 160, 23, 0.1)');
    ctx.fillStyle = gradient;
    ctx.fill();

    // Stroke
    ctx.strokeStyle = 'rgba(236, 122, 14, 0.8)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw points
    for (let i = 0; i < skills.length; i++) {
      const skill = skills[i];
      const angle = angleStep * i - Math.PI / 2;
      const r = (radius * skill.level) / 100;
      const x = centerX + r * Math.cos(angle);
      const y = centerY + r * Math.sin(angle);

      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#ec7a0e';
      ctx.fill();
    }

    // Draw labels
    ctx.fillStyle = '#9ca3af';
    ctx.font = '12px Vazirmatn, system-ui, sans-serif';
    ctx.textAlign = 'center';

    for (let i = 0; i < skills.length; i++) {
      const angle = angleStep * i - Math.PI / 2;
      const labelR = radius + 25;
      const x = centerX + labelR * Math.cos(angle);
      const y = centerY + labelR * Math.sin(angle);

      ctx.fillText(skills[i].name, x, y + 4);
    }

  }, [skills, size]);

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        className="max-w-full"
      />
    </div>
  );
}

// نسخه ساده‌تر با SVG
export function SimpleSkillRadar({ skills }: { skills: Skill[] }) {
  return (
    <div className="space-y-4">
      {skills.map((skill) => (
        <div key={skill.name}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-300">{skill.name}</span>
            <span className="text-xs text-gray-400">{skill.level}٪</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary-400 to-gold-400 transition-all duration-1000"
              style={{ width: `${skill.level}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}