'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Zap, Users, Brain, Sparkles, Star, ArrowLeft, CheckCircle2, Loader2 } from 'lucide-react';

interface MatchResult {
  name: string;
  role: string;
  matchPercentage: number;
  skills: string[];
  avatar: string;
  type: 'peer' | 'mentor';
}

export default function SmartMatchingDemo() {
  const [step, setStep] = useState(1);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');

  const skills = ['React', 'Node.js', 'Python', 'UI/UX Design', 'Data Science', 'Flutter'];
  const styles = [
    { id: 'visual', label: '👁️ دیداری', desc: 'با نمودار و تصویر' },
    { id: 'auditory', label: '👂 شنیداری', desc: 'با پادکست و بحث' },
    { id: 'reading', label: '📖 خواندنی', desc: 'با مطالعه و نوشتن' },
    { id: 'kinesthetic', label: '🛠️ عملی', desc: 'با پروژه و تمرین' },
  ];
  const levels = [
    { id: 'beginner', label: '🌱 مبتدی', desc: 'تازه شروع کردم' },
    { id: 'intermediate', label: '🌿 متوسط', desc: 'مفاهیم پایه را می‌دانم' },
    { id: 'advanced', label: '🌳 پیشرفته', desc: 'آماده پروژه حرفه‌ای' },
  ];

  const mockResults: MatchResult[] = [
    {
      name: 'سارا محمدی',
      role: 'توسعه‌دهنده React',
      matchPercentage: 98,
      skills: ['React', 'TypeScript', 'Next.js'],
      avatar: 'SM',
      type: 'peer',
    },
    {
      name: 'علی کریمی',
      role: 'منتور ارشد',
      matchPercentage: 95,
      skills: ['React', 'Node.js', 'System Design'],
      avatar: 'AK',
      type: 'mentor',
    },
    {
      name: 'مریم احمدی',
      role: 'توسعه‌دهنده Full-stack',
      matchPercentage: 92,
      skills: ['React', 'Python', 'Django'],
      avatar: 'MA',
      type: 'peer',
    },
  ];

  const handleSearch = () => {
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setShowResults(true);
    }, 2500);
  };

  const resetDemo = () => {
    setStep(1);
    setShowResults(false);
    setSelectedSkill('');
    setSelectedStyle('');
    setSelectedLevel('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <Brain className="w-6 h-6 text-primary-400" />
          <span className="gradient-text">تطبیق هوشمند</span>
        </h3>
        {!showResults && (
          <span className="text-sm text-gray-400 bg-white/5 px-3 py-1 rounded-full">
            قدم {step}/۳
          </span>
        )}
      </div>

      {/* Progress Bar */}
      {!showResults && (
        <div className="flex gap-2 mb-6">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-2 flex-1 rounded-full transition-all duration-500 ${
                step > s
                  ? 'bg-gradient-to-r from-primary-400 to-gold-400'
                  : step === s
                  ? 'bg-primary-500/50'
                  : 'bg-white/10'
              }`}
            />
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        {/* Step 1: Select Skill */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <label className="block text-lg font-bold text-white mb-4">
              چه مهارتی می‌خوای یاد بگیری؟
            </label>
            <div className="grid grid-cols-2 gap-3">
              {skills.map((skill) => (
                <button
                  key={skill}
                  onClick={() => {
                    setSelectedSkill(skill);
                    setStep(2);
                  }}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 text-right ${
                    selectedSkill === skill
                      ? 'border-primary-400 bg-primary-500/10'
                      : 'border-white/10 hover:border-primary-400/30 hover:bg-white/5'
                  }`}
                >
                  <span className="text-white font-medium">{skill}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 2: Learning Style */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2 mb-4">
              <button onClick={() => setStep(1)} className="text-gray-400 hover:text-white">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <label className="text-lg font-bold text-white">سبک یادگیریت چیه؟</label>
            </div>
            <div className="space-y-2">
              {styles.map((style) => (
                <button
                  key={style.id}
                  onClick={() => {
                    setSelectedStyle(style.id);
                    setStep(3);
                  }}
                  className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-right ${
                    selectedStyle === style.id
                      ? 'border-primary-400 bg-primary-500/10'
                      : 'border-white/10 hover:border-primary-400/30 hover:bg-white/5'
                  }`}
                >
                  <div className="font-medium text-white">{style.label}</div>
                  <div className="text-sm text-gray-400">{style.desc}</div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 3: Level */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2 mb-4">
              <button onClick={() => setStep(2)} className="text-gray-400 hover:text-white">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <label className="text-lg font-bold text-white">سطح فعلیت چقدره؟</label>
            </div>
            <div className="space-y-2">
              {levels.map((level) => (
                <button
                  key={level.id}
                  onClick={() => {
                    setSelectedLevel(level.id);
                    handleSearch();
                  }}
                  className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-right ${
                    selectedLevel === level.id
                      ? 'border-primary-400 bg-primary-500/10'
                      : 'border-white/10 hover:border-primary-400/30 hover:bg-white/5'
                  }`}
                >
                  <div className="font-medium text-white">{level.label}</div>
                  <div className="text-sm text-gray-400">{level.desc}</div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Searching State */}
        {isSearching && (
          <motion.div
            key="searching"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center py-12"
          >
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-primary-400/20 to-gold-400/20 rounded-full animate-pulse" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="w-12 h-12 text-primary-400 animate-spin" />
              </div>
            </div>
            <p className="mt-6 text-lg font-bold text-white">در حال تحلیل...</p>
            <p className="text-sm text-gray-400 mt-2">بررسی مهارت‌ها و سبک یادگیری</p>
            <div className="flex gap-2 mt-4">
              <span className="text-xs text-gray-500 bg-white/5 px-3 py-1 rounded-full">تحلیل مهارت‌ها</span>
              <span className="text-xs text-gray-500 bg-white/5 px-3 py-1 rounded-full">تطبیق سبک یادگیری</span>
              <span className="text-xs text-gray-500 bg-white/5 px-3 py-1 rounded-full">یافتن همتا</span>
            </div>
          </motion.div>
        )}

        {/* Results */}
        {showResults && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-gold-400" />
                <span className="gradient-text">۳ هم‌مسیر پیدا شد!</span>
              </h3>
              <button
                onClick={resetDemo}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                جستجوی جدید
              </button>
            </div>

            <div className="space-y-3">
              {mockResults.map((result, index) => (
                <motion.div
                  key={result.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="glass-card p-4 hover:bg-white/10 transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-400 to-gold-500 flex items-center justify-center font-bold text-lg flex-shrink-0">
                      {result.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-bold text-white truncate">{result.name}</h4>
                        <span className="text-xs bg-gradient-to-r from-primary-500/20 to-gold-500/20 text-primary-300 px-2 py-1 rounded-full flex-shrink-0">
                          {result.matchPercentage}٪ تطبیق
                        </span>
                      </div>
                      <p className="text-sm text-gray-400 mb-2">
                        {result.role}
                        {result.type === 'mentor' && ' ⭐'}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {result.skills.map((skill) => (
                          <span
                            key={skill}
                            className="text-xs bg-white/5 text-gray-300 px-2 py-0.5 rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <CheckCircle2 className="w-6 h-6 text-primary-400" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <button className="w-full btn-primary text-lg flex items-center justify-center gap-2">
              <Users className="w-5 h-5" />
              ثبت‌نام و ارتباط با هم‌مسیرها
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}