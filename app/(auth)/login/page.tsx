import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 flex items-center justify-center px-4">
      <div className="glass-card p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-gold-500 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-navy-950" />
            </div>
            <span className="text-xl font-bold">
              Smart<span className="text-primary-400">Peer</span>
            </span>
          </Link>
          <h1 className="text-2xl font-bold">ورود به SmartPeer</h1>
          <p className="text-gray-400 mt-2">به پلتفرم یادگیری هوشمند خوش آمدید</p>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">ایمیل</label>
            <input
              type="email"
              className="input-field"
              placeholder="example@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">رمز عبور</label>
            <input
              type="password"
              className="input-field"
              placeholder="••••••••"
            />
          </div>
          <button type="submit" className="btn-primary w-full">
            ورود
          </button>
        </form>

        <p className="text-center text-gray-400 text-sm mt-6">
          حساب کاربری ندارید؟{' '}
          <Link href="/register" className="text-primary-400 hover:underline">
            ثبت‌نام کنید
          </Link>
        </p>
      </div>
    </div>
  );
}