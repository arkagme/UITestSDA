import React, { useState } from 'react';
import { Bus, Eye, EyeOff, Sun, Moon, User, Shield } from 'lucide-react';
import { defaultUsers } from '../App';

interface LoginScreenProps {
  onLogin: (user: any) => void;
  theme: string;
  platform: string;
  onToggleTheme: () => void;
}

export function LoginScreen({ onLogin, theme, platform, onToggleTheme }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const getThemeClasses = () => {
    if (theme === 'dark') {
      return {
        background: 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900',
        surface: platform === 'ios' ? 'bg-slate-800/30 backdrop-blur-xl border-slate-700/30' : 'bg-slate-800 border-slate-700',
        input: platform === 'ios' ? 'bg-slate-700/50 backdrop-blur-xl border-slate-600/50' : 'bg-slate-700 border-slate-600',
        text: 'text-green-400',
        textSecondary: 'text-yellow-400',
        textMuted: 'text-slate-400',
        accent: 'bg-green-500 hover:bg-green-600',
        accentSecondary: 'bg-yellow-500 hover:bg-yellow-600',
        logo: 'text-green-400',
        placeholder: 'placeholder-slate-500'
      };
    } else {
      return {
        background: 'bg-gradient-to-br from-blue-50 via-white to-blue-100',
        surface: platform === 'ios' ? 'bg-white/70 backdrop-blur-xl border-blue-200/50' : 'bg-white border-blue-200',
        input: platform === 'ios' ? 'bg-white/60 backdrop-blur-xl border-blue-200/60' : 'bg-white border-blue-300',
        text: 'text-blue-900',
        textSecondary: 'text-blue-700',
        textMuted: 'text-blue-600',
        accent: 'bg-blue-500 hover:bg-blue-600',
        accentSecondary: 'bg-blue-600 hover:bg-blue-700',
        logo: 'text-blue-600',
        placeholder: 'placeholder-blue-400'
      };
    }
  };

  const themeClasses = getThemeClasses();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check credentials against default users
    const user = Object.values(defaultUsers).find(
      u => u.email === email && u.password === password
    );

    if (user) {
      onLogin(user);
    } else {
      setError('Invalid email or password');
    }

    setIsLoading(false);
  };

  const quickLogin = (userType: 'student' | 'admin') => {
    const user = defaultUsers[userType];
    setEmail(user.email);
    setPassword(user.password);
  };

  return (
    <div className={`min-h-screen ${themeClasses.background} flex items-center justify-center p-6 relative overflow-hidden`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-current opacity-10"
             style={{
               backgroundImage: `radial-gradient(circle at 25% 25%, currentColor 2px, transparent 2px),
                                radial-gradient(circle at 75% 75%, currentColor 2px, transparent 2px)`,
               backgroundSize: '50px 50px'
             }}>
        </div>
      </div>

      {/* Theme Toggle */}
      <button
        onClick={onToggleTheme}
        className={`fixed top-6 right-6 z-50 p-3 rounded-full ${themeClasses.surface} border shadow-lg transition-all duration-200 hover:scale-105`}
      >
        {theme === 'dark' ? (
          <Sun size={20} className={themeClasses.textSecondary} />
        ) : (
          <Moon size={20} className={themeClasses.textMuted} />
        )}
      </button>

      {/* Login Card */}
      <div className={`w-full max-w-md ${themeClasses.surface} border ${platform === 'ios' ? 'rounded-3xl' : 'rounded-2xl'} shadow-2xl p-8 relative z-10`}>
        {/* Logo */}
        <div className="text-center mb-8">
          <div className={`${platform === 'ios' ? 'bg-white/10 backdrop-blur-xl border border-white/20' : 'bg-white shadow-lg'} rounded-2xl p-4 mb-4 inline-block`}>
            <Bus size={40} className={themeClasses.logo} />
          </div>
          <h1 className={`text-3xl font-bold ${themeClasses.text} mb-2`}>
            Welcome Back
          </h1>
          <p className={`${themeClasses.textMuted} text-sm`}>
            Sign in to track your bus
          </p>
        </div>

        {/* Quick Login Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            onClick={() => quickLogin('student')}
            className={`p-3 ${themeClasses.input} border ${platform === 'ios' ? 'rounded-xl' : 'rounded-lg'} transition-all duration-200 hover:scale-105 flex flex-col items-center space-y-1`}
          >
            <User size={20} className={themeClasses.textMuted} />
            <span className={`${themeClasses.textMuted} text-xs`}>Student Login</span>
          </button>
          <button
            onClick={() => quickLogin('admin')}
            className={`p-3 ${themeClasses.input} border ${platform === 'ios' ? 'rounded-xl' : 'rounded-lg'} transition-all duration-200 hover:scale-105 flex flex-col items-center space-y-1`}
          >
            <Shield size={20} className={themeClasses.textMuted} />
            <span className={`${themeClasses.textMuted} text-xs`}>Admin Login</span>
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className={`block ${themeClasses.text} text-sm font-medium mb-2`}>
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-3 ${themeClasses.input} border ${platform === 'ios' ? 'rounded-xl' : 'rounded-lg'} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${themeClasses.text} ${themeClasses.placeholder}`}
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className={`block ${themeClasses.text} text-sm font-medium mb-2`}>
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-3 pr-12 ${themeClasses.input} border ${platform === 'ios' ? 'rounded-xl' : 'rounded-lg'} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${themeClasses.text} ${themeClasses.placeholder}`}
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${themeClasses.textMuted} hover:${themeClasses.text} transition-colors`}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {error && (
            <div className={`${platform === 'ios' ? 'bg-red-500/20 backdrop-blur-xl border-red-400/30' : 'bg-red-100 border-red-300'} border ${platform === 'ios' ? 'rounded-xl' : 'rounded-lg'} p-3`}>
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full ${themeClasses.accent} text-white py-3 ${platform === 'ios' ? 'rounded-xl' : 'rounded-lg'} font-medium transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Signing In...</span>
              </div>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Demo Credentials */}
        <div className={`mt-6 p-4 ${themeClasses.input} border ${platform === 'ios' ? 'rounded-xl' : 'rounded-lg'}`}>
          <h4 className={`${themeClasses.text} text-sm font-medium mb-2`}>Demo Credentials:</h4>
          <div className="space-y-1 text-xs">
            <p className={themeClasses.textMuted}>
              <strong>Student:</strong> student@bustrack.com / student123
            </p>
            <p className={themeClasses.textMuted}>
              <strong>Admin:</strong> admin@bustrack.com / admin123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}