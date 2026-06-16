'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, Brain, Search, Zap, Users, Star, 
  ArrowLeft, ArrowRight, Loader2, CheckCircle2,
  Filter, MessageCircle, Calendar, MapPin, Clock,
  Target, Award, TrendingUp, BookOpen, Code2
} from 'lucide-react';

// Types
interface Skill {
  name: string;
  level: number;
  type: 'has' | 'wants';
}

interface MatchResult {
  id: string;
  name: string;
  role: string;
  avatar: string;
  matchPercentage: number;
  skills: string[];
  bio: string;
  rating: number;
  completedProjects: number;
  location: string;
  availability: string;
  type: 'peer' | 'mentor';
  reasons: string[];
}

export default function SmartMatchPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<MatchResult | null>(null);
  
  // Form State
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [learningGoal, setLearningGoal] = useState('');
  const [learningStyle, setLearningStyle] = useState('');
  const [skillLevel, setSkillLevel] = useState('');
  const [availability, setAvailability] = useState('');
  const [preferredLanguage, setPreferredLanguage] = useState('');

  const totalSteps = 5;

  // Mock Skills Database
  const availableSkills = [
    'React', 'Next.js', 'TypeScript', 'Node.js', 'Python',
    'Django', 'Flutter', 'React Native', 'Vue.js', 'Angular',
    'UI/UX Design', 'Figma', 'GraphQL', 'Docker', 'AWS',
    'Machine Learning', 'Data Science', 'DevOps', 'Go', 'Rust'
  ];

  const learningStyles = [
    { id: 'visual', icon: '👁️', title: 'دیداری', desc: 'یادگیری با نمودار، فیلم و تصویر' },
    { id: 'auditory', icon: '👂', title: 'شنیداری', desc: 'یادگیری با پادکست، بحث و گفتگو' },
    { id: 'reading', icon: '📖', title: 'خواندنی', desc: 'یادگیری با مطالعه، یادداشت و مقاله' },
    { id: 'kinesthetic', icon: '🛠️', title: 'عملی', desc: 'یادگیری با پروژه، تمرین و کار عملی' },
  ];

  const levels = [
    { id: 'beginner', icon: '🌱', title: 'مبتدی', desc: 'کمتر از ۶ ماه تجربه' },
    { id: 'intermediate', icon: '🌿', title: 'متوسط', desc: '۶ ماه تا ۲ سال تجربه' },
    { id: 'advanced', icon: '🌳', title: 'پیشرفته', desc: 'بیش از ۲ سال تجربه' },
  ];

  // Mock Results
  const mockResults: MatchResult[] = [
    {
      id: '1',
      name: 'سارا محمدی',
      role: 'توسعه‌دهنده ارشد Front-end',
      avatar: 'SM',
      matchPercentage: 98,
      skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
      bio: '۴ سال تجربه در توسعه Front-end. عاشق یادگیری و اشتراک دانش هستم.',
      rating: 4.9,
      completedProjects: 23,
      location: 'تهران، ایران',
      availability: 'آخر هفته‌ها',
      type: 'peer',
      reasons: ['مهارت‌های مکمل', 'سبک یادگیری مشابه', 'علایق مشترک'],
    },
    {
      id: '2',
      name: 'علی کریمی',
      role: 'منتور و مدرس React',
      avatar: 'AK',
      matchPercentage: 95,
      skills: ['React', 'Node.js', 'System Design', 'GraphQL'],
      bio: '۸ سال تجربه در توسعه Full-stack. منتور رسمی در ۳ استارتاپ.',
      rating: 4.8,
      completedProjects: 45,
      location: 'شیراز، ایران',
      availability: 'روزهای زوج',
      type: 'mentor',
      reasons: ['منتور متخصص', 'سطح مهارت متناسب', 'در دسترس بودن'],
    },
    {
      id: '3',
      name: 'مریم احمدی',
      role: 'توسعه‌دهنده Full-stack',
      avatar: 'MA',
      matchPercentage: 92,
      skills: ['React', 'Python', 'Django', 'PostgreSQL'],
      bio: '۳ سال تجربه Full-stack. علاقه‌مند به پروژه‌های Open Source.',
      rating: 4.7,
      completedProjects: 18,
      location: 'اصفهان، ایران',
      availability: 'عصرها',
      type: 'peer',
      reasons: ['علایق مشترک', 'موقعیت مکانی نزدیک', 'سطح تجربه مشابه'],
    },
    {
      id: '4',
      name: 'رضا محمدی',
      role: 'متخصص UI/UX',
      avatar: 'RM',
      matchPercentage: 88,
      skills: ['Figma', 'UI Design', 'React', 'User Research'],
      bio: '۵ سال تجربه طراحی محصول. می‌تونم در زمینه UI کمک کنم.',
      rating: 4.6,
      completedProjects: 30,
      location: 'تهران، ایران',
      availability: 'صبح‌ها',
      type: 'mentor',
      reasons: ['مهارت طراحی', 'تجربه بالا', 'هم‌شهری'],
    },
    {
      id: '5',
      name: 'زهرا حسینی',
      role: 'برنامه‌نویس Front-end',
      avatar: 'ZH',
      matchPercentage: 85,
      skills: ['React', 'JavaScript', 'CSS', 'Vue.js'],
      bio: 'تازه‌کار ولی پرانرژی! دنبال همتای تمرینی می‌گردم.',
      rating: 4.5,
      completedProjects: 8,
      location: 'تبریز، ایران',
      availability: 'عصرها',
      type: 'peer',
      reasons: ['سطح مبتدی مشابه', 'اهداف مشترک', 'انرژی بالا'],
    },
  ];

  const handleToggleSkill = (skill: string) => {
    setSelectedSkills(prev =>
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : prev.length < 5
        ? [...prev, skill]
        : prev
    );
  };

  const handleSearch = () => {
    setCurrentStep(6);
    setIsSearching(true);
    
    setTimeout(() => {
      setIsSearching(false);
      setShowResults(true);
    }, 3000);
  };

  const handleConnect = (match: MatchResult) => {
    // اینجا منطق اتصال به همتا رو اضافه کن
    alert(`درخواست اتصال به ${match.name} ارسال شد! 🎉`);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return selectedSkills.length > 0;
      case 2: return learningGoal.length > 0;
      case 3: return learningStyle !== '';
      case 4: return skillLevel !== '';
      case 5: return availability !== '';
      default: return true;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-navy-950/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-gold-500 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-navy-950" />
            </div>
            <span className="text-xl font-bold">
              Smart<span className="text-primary-400">Peer</span>
            </span>
          </Link>
          
          {!showResults && (
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-primary-400" />
              <span className="text-sm text-gray-400">
                قدم {currentStep} از {totalSteps}
              </span>
            </div>
          )}
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Progress Bar */}
        {!showResults && currentStep <= totalSteps && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="flex gap-2">
              {Array.from({ length: totalSteps }, (_, i) => (
                <div
                  key={i}
                  className={`h-2 flex-1 rounded-full transition-all duration-500 ${
                    currentStep > i + 1
                      ? 'bg-gradient-to-r from-primary-400 to-gold-400'
                      : currentStep === i + 1
                      ? 'bg-primary-500'
                      : 'bg-white/10'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {/* Step 1: Select Skills */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass-card p-8 md:p-12"
            >
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Code2 className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl font-black mb-2">چه مهارتی می‌خوای یاد بگیری؟</h1>
                <p className="text-gray-400">حداکثر ۵ مهارت انتخاب کن</p>
              </div>

              <div className="flex flex-wrap gap-3 mb-8">
                {availableSkills.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => handleToggleSkill(skill)}
                    className={`px-4 py-2 rounded-xl border-2 transition-all duration-300 ${
                      selectedSkills.includes(skill)
                        ? 'border-primary-400 bg-primary-500/10 text-primary-400'
                        : 'border-white/10 hover:border-white/30 text-gray-300'
                    } ${selectedSkills.length >= 5 && !selectedSkills.includes(skill) ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={selectedSkills.length >= 5 && !selectedSkills.includes(skill)}
                  >
                    {skill}
                  </button>
                ))}
              </div>

              {selectedSkills.length > 0 && (
                <div className="bg-white/5 rounded-xl p-4 mb-8">
                  <p className="text-sm text-gray-400 mb-2">مهارت‌های انتخاب شده:</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedSkills.map((skill) => (
                      <span key={skill} className="badge-primary">
                        {skill}
                        <button onClick={() => handleToggleSkill(skill)} className="mr-1">×</button>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={() => setCurrentStep(2)}
                disabled={!canProceed()}
                className="btn-primary w-full text-lg flex items-center justify-center gap-2 disabled:opacity-50"
              >
                ادامه
                <ArrowLeft className="w-5 h-5" />
              </button>
            </motion.div>
          )}

          {/* Step 2: Learning Goal */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass-card p-8 md:p-12"
            >
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl font-black mb-2">هدفت از یادگیری چیه؟</h1>
                <p className="text-gray-400">این کمک می‌کنه بهترین مسیر رو برات طراحی کنیم</p>
              </div>

              <div className="space-y-4 mb-8">
                {[
                  { id: 'job', icon: '💼', title: 'پیدا کردن کار', desc: 'می‌خوام برای موقعیت شغلی آماده بشم' },
                  { id: 'project', icon: '🚀', title: 'ساخت پروژه', desc: 'یه پروژه شخصی یا استارتاپی دارم' },
                  { id: 'skill', icon: '📚', title: 'ارتقا مهارت', desc: 'می‌خوام مهارت فعلیم رو عمیق‌تر کنم' },
                  { id: 'career', icon: '📈', title: 'تغییر مسیر شغلی', desc: 'می‌خوام وارد حوزه جدیدی بشم' },
                ].map((goal) => (
                  <button
                    key={goal.id}
                    onClick={() => setLearningGoal(goal.id)}
                    className={`w-full p-4 rounded-xl border-2 text-right transition-all ${
                      learningGoal === goal.id
                        ? 'border-primary-400 bg-primary-500/10'
                        : 'border-white/10 hover:border-white/30'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{goal.icon}</span>
                      <div>
                        <div className="font-bold">{goal.title}</div>
                        <div className="text-sm text-gray-400">{goal.desc}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex gap-3">
                <button onClick={() => setCurrentStep(1)} className="btn-ghost">
                  <ArrowRight className="w-5 h-5" />
                  برگشت
                </button>
                <button
                  onClick={() => setCurrentStep(3)}
                  disabled={!canProceed()}
                  className="btn-primary flex-1 text-lg disabled:opacity-50"
                >
                  ادامه
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Learning Style */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass-card p-8 md:p-12"
            >
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl font-black mb-2">سبک یادگیریت چیه؟</h1>
                <p className="text-gray-400">شناخت سبک یادگیری به تطبیق بهتر کمک می‌کنه</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {learningStyles.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => setLearningStyle(style.id)}
                    className={`p-6 rounded-xl border-2 text-center transition-all ${
                      learningStyle === style.id
                        ? 'border-primary-400 bg-primary-500/10'
                        : 'border-white/10 hover:border-white/30'
                    }`}
                  >
                    <div className="text-4xl mb-3">{style.icon}</div>
                    <div className="font-bold mb-1">{style.title}</div>
                    <div className="text-sm text-gray-400">{style.desc}</div>
                  </button>
                ))}
              </div>

              <div className="flex gap-3">
                <button onClick={() => setCurrentStep(2)} className="btn-ghost">
                  <ArrowRight className="w-5 h-5" />
                  برگشت
                </button>
                <button
                  onClick={() => setCurrentStep(4)}
                  disabled={!canProceed()}
                  className="btn-primary flex-1 text-lg disabled:opacity-50"
                >
                  ادامه
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 4: Skill Level */}
          {currentStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass-card p-8 md:p-12"
            >
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl font-black mb-2">سطح فعلیت چقدره؟</h1>
                <p className="text-gray-400">این که بدونیم کجای مسیری، خیلی مهمه</p>
              </div>

              <div className="space-y-4 mb-8">
                {levels.map((level) => (
                  <button
                    key={level.id}
                    onClick={() => setSkillLevel(level.id)}
                    className={`w-full p-6 rounded-xl border-2 text-right transition-all ${
                      skillLevel === level.id
                        ? 'border-primary-400 bg-primary-500/10'
                        : 'border-white/10 hover:border-white/30'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-4xl">{level.icon}</span>
                      <div>
                        <div className="text-xl font-bold">{level.title}</div>
                        <div className="text-gray-400">{level.desc}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex gap-3">
                <button onClick={() => setCurrentStep(3)} className="btn-ghost">
                  <ArrowRight className="w-5 h-5" />
                  برگشت
                </button>
                <button
                  onClick={() => setCurrentStep(5)}
                  disabled={!canProceed()}
                  className="btn-primary flex-1 text-lg disabled:opacity-50"
                >
                  ادامه
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 5: Availability */}
          {currentStep === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass-card p-8 md:p-12"
            >
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl font-black mb-2">کی وقت داری یاد بگیری؟</h1>
                <p className="text-gray-400">آخرین قدم! این کمک می‌کنه همتای مناسب تایمت رو پیدا کنی</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { id: 'mornings', icon: '🌅', title: 'صبح‌ها', time: '۸ تا ۱۲' },
                  { id: 'afternoons', icon: '☀️', title: 'بعدازظهرها', time: '۱۲ تا ۱۷' },
                  { id: 'evenings', icon: '🌆', title: 'عصرها', time: '۱۷ تا ۲۱' },
                  { id: 'weekends', icon: '🎉', title: 'آخر هفته', time: 'پنجشنبه و جمعه' },
                ].map((time) => (
                  <button
                    key={time.id}
                    onClick={() => setAvailability(time.id)}
                    className={`p-6 rounded-xl border-2 text-center transition-all ${
                      availability === time.id
                        ? 'border-primary-400 bg-primary-500/10'
                        : 'border-white/10 hover:border-white/30'
                    }`}
                  >
                    <div className="text-3xl mb-2">{time.icon}</div>
                    <div className="font-bold">{time.title}</div>
                    <div className="text-sm text-gray-400">{time.time}</div>
                  </button>
                ))}
              </div>

              <div className="flex gap-3">
                <button onClick={() => setCurrentStep(4)} className="btn-ghost">
                  <ArrowRight className="w-5 h-5" />
                  برگشت
                </button>
                <button
                  onClick={handleSearch}
                  disabled={!canProceed()}
                  className="btn-primary flex-1 text-lg flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Zap className="w-5 h-5" />
                  پیدا کردن هم‌مسیر
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 6: Searching */}
          {currentStep === 6 && isSearching && (
            <motion.div
              key="searching"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card p-12 text-center"
            >
              <div className="relative w-32 h-32 mx-auto mb-8">
                <div className="absolute inset-0 bg-primary-500/20 rounded-full animate-ping" />
                <div className="absolute inset-4 bg-gradient-to-br from-primary-400 to-gold-400 rounded-full animate-pulse" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader2 className="w-16 h-16 text-white animate-spin" />
                </div>
              </div>
              <h2 className="text-2xl font-black mb-4">در حال تحلیل پروفایل‌ها...</h2>
              <div className="space-y-2 text-gray-400">
                <p className="animate-pulse">🔍 تحلیل مهارت‌های {selectedSkills.join('، ')}</p>
                <p className="animate-pulse delay-200">🧠 بررسی سبک یادگیری</p>
                <p className="animate-pulse delay-500">👥 یافتن بهترین تطابق‌ها</p>
              </div>
            </motion.div>
          )}

          {/* Results */}
          {showResults && !selectedMatch && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="text-center mb-12">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-400 to-gold-400 rounded-3xl flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-4xl font-black mb-2">
                  <span className="gradient-text">{mockResults.length} هم‌مسیر</span> پیدا شد!
                </h1>
                <p className="text-xl text-gray-400">
                  بر اساس مهارت‌ها و سبک یادگیری تو
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {mockResults.map((result, index) => (
                  <motion.div
                    key={result.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-card p-6 hover:bg-white/10 transition-all cursor-pointer"
                    onClick={() => setSelectedMatch(result)}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-400 to-gold-500 flex items-center justify-center text-2xl font-bold flex-shrink-0">
                        {result.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-bold text-lg">{result.name}</h3>
                            <p className="text-sm text-gray-400">{result.role}</p>
                          </div>
                          <span className="badge-primary text-lg font-bold">
                            {result.matchPercentage}٪
                          </span>
                        </div>
                        <p className="text-sm text-gray-300 mb-3">{result.bio}</p>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {result.skills.map((skill) => (
                            <span key={skill} className="badge-gold text-xs">{skill}</span>
                          ))}
                        </div>
                        <div className="flex items-center gap-4 text-xs text-gray-400">
                          <span className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-gold-400" />
                            {result.rating}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {result.location}
                          </span>
                          <span>{result.type === 'mentor' ? '⭐ منتور' : '👥 همتا'}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="text-center mt-8">
                <button
                  onClick={() => {
                    setCurrentStep(1);
                    setShowResults(false);
                    setSelectedSkills([]);
                    setLearningGoal('');
                    setLearningStyle('');
                    setSkillLevel('');
                    setAvailability('');
                  }}
                  className="btn-ghost"
                >
                  جستجوی جدید
                </button>
              </div>
            </motion.div>
          )}

          {/* Match Detail Modal */}
          {selectedMatch && (
            <motion.div
              key="detail"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card p-8 md:p-12"
            >
              <button
                onClick={() => setSelectedMatch(null)}
                className="btn-ghost mb-6"
              >
                <ArrowRight className="w-5 h-5" />
                بازگشت به نتایج
              </button>

              <div className="text-center mb-8">
                <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary-400 to-gold-500 flex items-center justify-center text-4xl font-black mx-auto mb-4">
                  {selectedMatch.avatar}
                </div>
                <h1 className="text-3xl font-black mb-1">{selectedMatch.name}</h1>
                <p className="text-xl text-gray-400 mb-2">{selectedMatch.role}</p>
                <div className="flex items-center justify-center gap-2">
                  <span className="badge-primary text-lg font-bold">
                    {selectedMatch.matchPercentage}٪ تطابق
                  </span>
                  <span className="badge-gold">
                    {selectedMatch.type === 'mentor' ? '⭐ منتور' : '👥 همتا'}
                  </span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <h3 className="font-bold text-lg">دلایل تطابق</h3>
                  <div className="space-y-2">
                    {selectedMatch.reasons.map((reason, i) => (
                      <div key={i} className="flex items-center gap-2 text-green-400">
                        <CheckCircle2 className="w-5 h-5" />
                        {reason}
                      </div>
                    ))}
                  </div>

                  <h3 className="font-bold text-lg mt-4">مهارت‌ها</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedMatch.skills.map((skill) => (
                      <span key={skill} className="badge-primary">{skill}</span>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-gray-300">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    {selectedMatch.location}
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Clock className="w-5 h-5 text-gray-400" />
                    {selectedMatch.availability}
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Star className="w-5 h-5 text-gold-400" />
                    امتیاز {selectedMatch.rating} از ۵
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Award className="w-5 h-5 text-gray-400" />
                    {selectedMatch.completedProjects} پروژه تکمیل شده
                  </div>
                </div>
              </div>

              <p className="text-gray-300 mb-8 leading-relaxed">{selectedMatch.bio}</p>

              <div className="flex gap-4">
                <button
                  onClick={() => handleConnect(selectedMatch)}
                  className="btn-primary flex-1 text-lg flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  درخواست ارتباط
                </button>
                <button
                  onClick={() => setSelectedMatch(null)}
                  className="btn-outline"
                >
                  برگشت
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}