'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, Home, Users, BookOpen, Calendar, BarChart3,
  MessageCircle, Settings, LogOut, Menu, X, Bell,
  User, TrendingUp, Award, Zap, ChevronLeft
} from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  const isStudent = pathname?.includes('/student');
  const isMentor = pathname?.includes('/mentor');

  const menuItems = isStudent
    ? [
        { icon: Home, label: 'داشبورد', href: '/dashboard/student' },
        { icon: Users, label: 'هم‌مسیرهای من', href: '/dashboard/student/peers' },
        { icon: BookOpen, label: 'مسیر یادگیری', href: '/dashboard/student/learning-path' },
        { icon: Calendar, label: 'جلسات', href: '/dashboard/student/sessions' },
        { icon: BarChart3, label: 'گزارش پیشرفت', href: '/dashboard/student/reports' },
        { icon: MessageCircle, label: 'پیام‌ها', href: '/dashboard/student/messages' },
        { icon: Award, label: 'گواهی‌ها', href: '/dashboard/student/certificates' },
      ]
    : [
        { icon: Home, label: 'داشبورد', href: '/dashboard/mentor' },
        { icon: Users, label: 'شاگردان من', href: '/dashboard/mentor/students' },
        { icon: Calendar, label: 'جلسات', href: '/dashboard/mentor/sessions' },
        { icon: TrendingUp, label: 'درآمد', href: '/dashboard/mentor/earnings' },
        { icon: MessageCircle, label: 'پیام‌ها', href: '/dashboard/mentor/messages' },
        { icon: Award, label: 'اعتبارسنجی', href: '/dashboard/mentor/credentials' },
      ];

  return (
    <div className="min-h-screen bg-navy-950 flex">
      {/* Sidebar - Desktop */}
      <aside className={`hidden lg:flex flex-col fixed top-0 right-0 h-full bg-navy-900/95 backdrop-blur-xl border-l border-white/10 transition-all duration-300 z-40 ${
        isSidebarOpen ? 'w-64' : 'w-20'
      }`}>
        {/* Logo */}
        <div className="p-4 border-b border-white/10">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-gold-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6 text-navy-950" />
            </div>
            {isSidebarOpen && (
              <span className="text-lg font-bold">
                Smart<span className="text-primary-400">Peer</span>
              </span>
            )}
          </Link>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all group ${
                  isActive
                    ? 'bg-primary-500/10 text-primary-400'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-primary-400' : ''}`} />
                {isSidebarOpen && (
                  <span className="text-sm font-medium">{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="p-4 border-t border-white/10 space-y-2">
          <Link
            href="/dashboard/settings"
            className="flex items-center gap-3 px-3 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all"
          >
            <Settings className="w-5 h-5" />
            {isSidebarOpen && <span className="text-sm">تنظیمات</span>}
          </Link>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="flex items-center gap-3 px-3 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all w-full"
          >
            <ChevronLeft className={`w-5 h-5 transition-transform ${isSidebarOpen ? '' : 'rotate-180'}`} />
            {isSidebarOpen && <span className="text-sm">بستن منو</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 ${
        isSidebarOpen ? 'lg:mr-64' : 'lg:mr-20'
      }`}>
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-navy-950/80 backdrop-blur-xl border-b border-white/10">
          <div className="flex items-center justify-between h-16 px-4">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="lg:hidden text-white p-2"
            >
              {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <div className="flex items-center gap-4 mr-auto">
              {/* Notifications */}
              <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* User Avatar */}
              <div className="flex items-center gap-3">
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-white">
                    {isStudent ? 'سارا محمدی' : 'علی کریمی'}
                  </p>
                  <p className="text-xs text-gray-400">
                    {isStudent ? 'دانشجو' : 'منتور'}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-400 to-gold-500 flex items-center justify-center font-bold">
                  {isStudent ? 'SM' : 'AK'}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4 md:p-6 lg:p-8">
          {children}
        </div>
      </main>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/50" onClick={() => setIsMobileOpen(false)} />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="absolute right-0 top-0 h-full w-64 bg-navy-900 border-l border-white/10"
            >
              <div className="p-4 border-b border-white/10">
                <Link href="/" className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-gold-500 rounded-xl flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-navy-950" />
                  </div>
                  <span className="text-lg font-bold">
                    Smart<span className="text-primary-400">Peer</span>
                  </span>
                </Link>
              </div>

              <nav className="p-4 space-y-1">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileOpen(false)}
                    className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${
                      pathname === item.href
                        ? 'bg-primary-500/10 text-primary-400'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="text-sm">{item.label}</span>
                  </Link>
                ))}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}