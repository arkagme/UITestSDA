import React, { useEffect, useState } from 'react';
import { Bus } from 'lucide-react';

interface SplashScreenProps {
  theme: string;
  platform: string;
}

export function SplashScreen({ theme, platform }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Fade in animation
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const getThemeClasses = () => {
    if (theme === 'dark') {
      return {
        background: 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900',
        surface: platform === 'ios' ? 'bg-slate-800/30 backdrop-blur-xl border-slate-700/30' : 'bg-slate-800 border-slate-700',
        text: 'text-green-400',
        textSecondary: 'text-yellow-400',
        accent: 'bg-green-500',
        logo: 'text-green-400'
      };
    } else {
      return {
        background: 'bg-gradient-to-br from-blue-50 via-white to-blue-100',
        surface: platform === 'ios' ? 'bg-white/70 backdrop-blur-xl border-blue-200/50' : 'bg-white border-blue-200',
        text: 'text-blue-900',
        textSecondary: 'text-blue-700',
        accent: 'bg-blue-500',
        logo: 'text-blue-600'
      };
    }
  };

  const themeClasses = getThemeClasses();

  return (
    <div className={`min-h-screen ${themeClasses.background} flex items-center justify-center relative overflow-hidden`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-current animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 rounded-full bg-current animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-20 h-20 rounded-full bg-current animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Main Content */}
      <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* Logo */}
        <div className={`${platform === 'ios' ? 'bg-white/10 backdrop-blur-xl border border-white/20' : 'bg-white shadow-lg'} rounded-3xl p-8 mb-8 mx-auto w-32 h-32 flex items-center justify-center`}>
          <Bus size={64} className={`${themeClasses.logo} animate-bounce`} />
        </div>

        {/* App Name */}
        <h1 className={`text-4xl font-bold ${themeClasses.text} mb-4 tracking-tight`}>
          BusTrack Pro
        </h1>

        {/* Tagline */}
        <p className={`${themeClasses.textSecondary} text-lg mb-8 max-w-md mx-auto px-6`}>
          Real-time GPS tracking for smart campus transportation
        </p>

        {/* Loading Animation */}
        <div className="flex justify-center space-x-2">
          <div 
            className={`w-3 h-3 ${themeClasses.accent} rounded-full animate-bounce`}
            style={{ animationDelay: '0ms' }}
          ></div>
          <div 
            className={`w-3 h-3 ${themeClasses.accent} rounded-full animate-bounce`}
            style={{ animationDelay: '150ms' }}
          ></div>
          <div 
            className={`w-3 h-3 ${themeClasses.accent} rounded-full animate-bounce`}
            style={{ animationDelay: '300ms' }}
          ></div>
        </div>
      </div>

      {/* Version Info */}
      <div className="absolute bottom-8 left-0 right-0 text-center">
        <p className={`${themeClasses.textSecondary} text-sm opacity-60`}>
          Version 1.0.0
        </p>
      </div>
    </div>
  );
}