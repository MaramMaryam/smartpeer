'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Sparkles, User, Mail, Lock, Eye, EyeOff, 
  ArrowLeft, CheckCircle2, 
} from 'lucide-react';

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    role: 'learner',
    agreedToTerms: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // اینجا منطق ثبت‌نام رو اضافه کن
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 flex items-center justify-center px-4 py-12">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold-500/10 rounded-full filter blur-3xl animate-pulse" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-card p-8 w-full max-w-2xl relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-gold-500 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-navy-950" />
            </div>
            <span className="text-xl font-bold">
              Smart<span className="text-primary-400">Peer</span>
            </span>
          </Link>
          <h1 className="text-3xl font-black mb-2">ایجاد حساب کاربری</h1>
          <p className="text-gray-400">
            {step === 1 
              ? 'اطلاعات اولیه رو وارد کن' 
              : 'نقش خودت رو انتخاب کن'}
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
            step >= 1 ? 'bg-primary-500 text-white' : 'bg-white/10 text-gray-500'
          }`}>
            {step > 1 ? <CheckCircle2 className="w-5 h-5" /> : '۱'}
          </div>
          <div className={`w-16 h-1 rounded-full transition-all ${
            step >= 2 ? 'bg-primary-500' : 'bg-white/10'
          }`} />
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
            step >= 2 ? 'bg-primary-500 text-white' : 'bg-white/10 text-gray-500'
          }`}>
            ۲
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  نام و نام خانوادگی
                </label>
                <div className="relative">
                  <User className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="input-field pr-10"
                    placeholder="مثال: سارا محمدی"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  ایمیل
                </label>
                <div className="relative">
                  <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input-field pr-10"
                    placeholder="example@email.com"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  رمز عبور
                </label>
                <div className="relative">
                  <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="input-field pr-10 pl-10"
                    placeholder="حداقل ۸ کاراکتر"
                    required
                    minLength={8}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">حداقل ۸ کاراکتر شامل حروف و اعداد</p>
              </div>

              <button
                type="button"
                onClick={() => setStep(2)}
                className="btn-primary w-full text-lg"
              >
                ادامه
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Role Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-4">
                  نقش خود را انتخاب کنید
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, role: 'learner' }))}
                    className={`p-6 rounded-xl border-2 text-center transition-all ${
                      formData.role === 'learner'
                        ? 'border-primary-400 bg-primary-500/10 shadow-lg shadow-primary-500/20'
                        : 'border-white/10 hover:border-white/30 hover:bg-white/5'
                    }`}
                  >
                    <div className="text-4xl mb-3">🎓</div>
                    <h3 className="font-bold text-lg mb-1">یادگیرنده</h3>
                    <p className="text-sm text-gray-400">
                      می‌خوام مهارت جدید یاد بگیرم
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, role: 'mentor' }))}
                    className={`p-6 rounded-xl border-2 text-center transition-all ${
                      formData.role === 'mentor'
                        ? 'border-gold-400 bg-gold-500/10 shadow-lg shadow-gold-500/20'
                        : 'border-white/10 hover:border-white/30 hover:bg-white/5'
                    }`}
                  >
                    <div className="text-4xl mb-3">⭐</div>
                    <h3 className="font-bold text-lg mb-1">منتور</h3>
                    <p className="text-sm text-gray-400">
                      می‌خوام دانشم رو به اشتراک بذارم
                    </p>
                  </button>
                </div>
              </div>

              {/* Terms */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  name="agreedToTerms"
                  checked={formData.agreedToTerms}
                  onChange={handleChange}
                  className="mt-1 w-5 h-5 rounded border-white/20 bg-white/5 text-primary-500 focus:ring-primary-500"
                  required
                />
                <label className="text-sm text-gray-400">
                  با{' '}
                  <Link href="/terms" className="text-primary-400 hover:underline">
                    قوانین و مقررات
                  </Link>{' '}
                  و{' '}
                  <Link href="/privacy" className="text-primary-400 hover:underline">
                    حریم خصوصی
                  </Link>{' '}
                  SmartPeer موافقم
                </label>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="btn-ghost flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  برگشت
                </button>
                <button
                  type="submit"
                  disabled={!formData.agreedToTerms}
                  className="btn-primary flex-1 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ایجاد حساب
                </button>
              </div>
            </motion.div>
          )}
        </form>

        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-navy-900 text-gray-400">یا ثبت‌نام با</span>
          </div>
        </div>

        {/* Social Login */}
        <div className="grid grid-cols-2 gap-3">
          {/* <button className="btn-outline flex items-center justify-center gap-2 py-3">
            <Chrome className="w-5 h-5" />
            گوگل
          </button>
          <button className="btn-outline flex items-center justify-center gap-2 py-3">
            <Github className="w-5 h-5" />
            گیت‌هاب
          </button> */}
        </div>

        {/* Login Link */}
        <p className="text-center text-gray-400 text-sm mt-8">
          قبلاً ثبت‌نام کردی؟{' '}
          <Link href="/login" className="text-primary-400 hover:underline font-bold">
            وارد شو
          </Link>
        </p>
      </motion.div>
    </div>
  );
}