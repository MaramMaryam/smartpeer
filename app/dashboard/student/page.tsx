'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Users, BookOpen, Calendar, TrendingUp, Star,
  Zap, Target, Award, Clock, CheckCircle2, ArrowLeft,
  Play, MessageCircle, BarChart3, Sparkles
} from 'lucide-react';
import ProgressChart, { CircularProgress } from '@/components/dashboard/ProgressChart';
import { SimpleSkillRadar } from '@/components/dashboard/SkillRadar';
import StatsCard from '@/components/dashboard/StatsCard';

export default function StudentDashboard() {
  // Mock Data
  const stats = [
    { icon: BookOpen, label: 'دوره‌های فعال', value: '۴', change: '+۲ این ماه', color: 'from-blue-500 to-cyan-500' },
    { icon: Users, label: 'هم‌مسیرها', value: '۸', change: '۳ فعال', color: 'from-purple-500 to-pink-500' },
    { icon: Calendar, label: 'جلسات این هفته', value: '۵', change: '۲ امروز', color: 'from-orange-500 to-red-500' },
    { icon: TrendingUp, label: 'پیشرفت کلی', value: '۶۸٪', change: '+۱۲٪', color: 'from-green-500 to-teal-500' },
  ];

  const currentPeers = [
    { name: 'سارا محمدی', skill: 'React', match: 98, avatar: 'SM', status: 'online' },
    { name: 'مریم احمدی', skill: 'UI/UX', match: 92, avatar: 'MA', status: 'offline' },
    { name: 'رضا کریمی', skill: 'Python', match: 88, avatar: 'RK', status: 'online' },
  ];

  const upcomingSessions = [
    { title: 'منتورینگ React', with: 'علی کریمی', date: 'امروز - ۱۶:۰۰', type: 'mentor' },
    { title: 'تمرین Pair Programming', with: 'سارا محمدی', date: 'فردا - ۱۰:۰۰', type: 'peer' },
  ];

  const learningPath = [
    { title: 'مبانی React', progress: 100, status: 'completed' },
    { title: 'Hooks پیشرفته', progress: 75, status: 'in-progress' },
    { title: 'State Management', progress: 40, status: 'in-progress' },
    { title: 'Next.js Fundamentals', progress: 0, status: 'locked' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6 md:p-8 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-l from-primary-500/10 to-transparent" />
        <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-black mb-2">
              سلام سارا! 👋
            </h1>
            <p className="text-gray-400">
              امروز ۳ جلسه داری. آماده یادگیری هستی؟
            </p>
          </div>
          <Link href="/smart-match" className="btn-primary flex items-center gap-2">
            <Zap className="w-5 h-5" />
            پیدا کردن هم‌مسیر جدید
          </Link>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card p-6"
          >
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-black mb-1">{stat.value}</div>
            <div className="text-sm text-gray-400">{stat.label}</div>
            <div className="text-xs text-green-400 mt-2">{stat.change}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Learning Path */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 glass-card p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Target className="w-6 h-6 text-primary-400" />
              مسیر یادگیری
            </h2>
            <Link href="/learning-path" className="text-sm text-primary-400 hover:underline">
              مشاهده کامل
            </Link>
          </div>

          <div className="space-y-4">
            {learningPath.map((item, index) => (
              <div key={item.title} className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  item.status === 'completed' ? 'bg-green-500/10 text-green-400' :
                  item.status === 'in-progress' ? 'bg-primary-500/10 text-primary-400' :
                  'bg-white/5 text-gray-500'
                }`}>
                  {item.status === 'completed' ? <CheckCircle2 className="w-5 h-5" /> :
                   item.status === 'in-progress' ? <Play className="w-5 h-5" /> :
                   <Lock className="w-5 h-5" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`font-medium ${
                      item.status === 'locked' ? 'text-gray-500' : 'text-white'
                    }`}>
                      {item.title}
                    </span>
                    <span className="text-sm text-gray-400">{item.progress}٪</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        item.status === 'completed' ? 'bg-green-400' : 'bg-primary-400'
                      }`}
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Current Peers */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Users className="w-6 h-6 text-primary-400" />
              هم‌مسیرها
            </h2>
            <Link href="/dashboard/student/peers" className="text-sm text-primary-400 hover:underline">
              همه
            </Link>
          </div>

          <div className="space-y-4">
            {currentPeers.map((peer) => (
              <div key={peer.name} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-all cursor-pointer">
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-400 to-gold-500 flex items-center justify-center font-bold">
                    {peer.avatar}
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-navy-900 ${
                    peer.status === 'online' ? 'bg-green-400' : 'bg-gray-500'
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm truncate">{peer.name}</h3>
                  <p className="text-xs text-gray-400">{peer.skill}</p>
                </div>
                <span className="badge-primary text-xs">{peer.match}٪</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Upcoming Sessions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Calendar className="w-6 h-6 text-primary-400" />
            جلسات پیش رو
          </h2>
          <Link href="/dashboard/student/sessions" className="text-sm text-primary-400 hover:underline">
            همه جلسات
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {upcomingSessions.map((session) => (
            <div key={session.title} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all cursor-pointer">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                session.type === 'mentor' ? 'bg-gold-500/10' : 'bg-primary-500/10'
              }`}>
                {session.type === 'mentor' ? (
                  <Star className="w-6 h-6 text-gold-400" />
                ) : (
                  <Users className="w-6 h-6 text-primary-400" />
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-bold">{session.title}</h3>
                <p className="text-sm text-gray-400">با {session.with}</p>
                <div className="flex items-center gap-1 mt-1 text-xs text-primary-400">
                  <Clock className="w-3 h-3" />
                  {session.date}
                </div>
              </div>
              <Link href="#" className="btn-primary text-sm py-2 px-4">
                ورود
              </Link>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: Users, label: 'هم‌مسیر جدید', href: '/smart-match', color: 'from-blue-500 to-purple-500' },
          { icon: BookOpen, label: 'ادامه یادگیری', href: '/learning-path', color: 'from-green-500 to-teal-500' },
          { icon: MessageCircle, label: 'پیام‌ها', href: '/dashboard/student/messages', color: 'from-orange-500 to-red-500' },
          { icon: BarChart3, label: 'گزارش', href: '/dashboard/student/reports', color: 'from-purple-500 to-pink-500' },
        ].map((action, index) => (
          <motion.div
            key={action.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
          >
            <Link
              href={action.href}
              className="glass-card p-6 text-center hover:bg-white/10 transition-all block group"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${action.color} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                <action.icon className="w-7 h-7 text-white" />
              </div>
              <span className="text-sm font-medium">{action.label}</span>
            </Link>
          </motion.div>
        ))}
      </div>

      // کارت آمار
<StatsCard
  icon={BookOpen}
  label="دوره‌های فعال"
  value="۴"
  change="+۲ این ماه"
  trend="up"
  color="from-blue-500 to-cyan-500"
/>

// نمودار مهارت
<SimpleSkillRadar
  skills={[
    { name: 'React', level: 80 },
    { name: 'TypeScript', level: 65 },
    { name: 'Node.js', level: 45 },
  ]}
/>

// نمودار پیشرفت
<ProgressChart
  type="bar"
  title="پیشرفت هفتگی"
  data={[
    { label: 'هفته ۱', value: 30 },
    { label: 'هفته ۲', value: 50 },
    { label: 'هفته ۳', value: 70 },
  ]}
/>

// دایره پیشرفت
<CircularProgress value={68} label="پیشرفت کلی" />
    </div>
  );
}

// Lock icon component
function Lock({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0110 0v4" />
    </svg>
  );
}