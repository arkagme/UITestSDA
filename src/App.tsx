import React, { useState, useEffect } from 'react';
import { Home, MapPin, User, BarChart3, Bell } from 'lucide-react';
import { SplashScreen } from './components/SplashScreen';
import { LoginScreen } from './components/LoginScreen';
import { HomeScreen } from './components/HomeScreen';
import { TrackScreen } from './components/TrackScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { AnalyticsScreen } from './components/AnalyticsScreen';
import { NotificationsScreen } from './components/NotificationsScreen';

// Default users with credentials
export const defaultUsers = {
  student: {
    id: 'std_001',
    name: 'Alex Johnson',
    type: 'student',
    email: 'student@bustrack.com',
    password: 'student123',
    assignedBus: 'Bus 1A',
    route: 'Campus to City Center'
  },
  admin: {
    id: 'adm_001', 
    name: 'Sarah Wilson',
    type: 'admin',
    email: 'admin@bustrack.com',
    password: 'admin123',
    assignedBus: 'Bus 1A',
    route: 'Campus to City Center'
  }
};

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState('dark'); // 'light' or 'dark'
  const [platform, setPlatform] = useState('ios'); // 'ios' or 'android'

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Splash screen timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Show splash for 3 seconds
    return () => clearTimeout(timer);
  }, []);

  // Detect platform (simplified for demo)
  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.includes('android')) {
      setPlatform('android');
    } else {
      setPlatform('ios'); // Default to iOS
    }
  }, []);

  const handleLogin = (user: any) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveTab('home');
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const getThemeClasses = () => {
    if (theme === 'dark') {
      return {
        background: 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900',
        surface: platform === 'ios' ? 'bg-slate-800/30 backdrop-blur-xl border-slate-700/30' : 'bg-slate-800 border-slate-700',
        navigation: platform === 'ios' ? 'bg-slate-800/40 backdrop-blur-xl border-t border-slate-700/40' : 'bg-slate-800 border-t border-slate-700',
        text: 'text-green-400',
        textSecondary: 'text-yellow-400',
        textMuted: 'text-slate-400',
        accent: 'bg-green-500 hover:bg-green-600',
        accentSecondary: 'bg-yellow-500 hover:bg-yellow-600'
      };
    } else {
      return {
        background: 'bg-gradient-to-br from-blue-50 via-white to-violet-50',
        surface: platform === 'ios' ? 'bg-white/70 backdrop-blur-xl border-blue-200/50' : 'bg-white border-blue-200',
        navigation: platform === 'ios' ? 'bg-white/80 backdrop-blur-xl border-t border-blue-200/60' : 'bg-white border-t border-blue-200',
        text: 'text-blue-900',
        textSecondary: 'text-violet-700',
        textMuted: 'text-blue-600',
        accent: 'bg-blue-500 hover:bg-blue-600',
        accentSecondary: 'bg-violet-500 hover:bg-violet-600'
      };
    }
  };

  const renderScreen = () => {
    if (!currentUser) return null;
    
    switch (activeTab) {
      case 'home':
        return <HomeScreen currentUser={currentUser} greeting={getGreeting()} theme={theme} platform={platform} />;
      case 'track':
        return <TrackScreen currentUser={currentUser} theme={theme} platform={platform} />;
      case 'profile':
        return <ProfileScreen currentUser={currentUser} onLogout={handleLogout} theme={theme} platform={platform} />;
      case 'analytics':
        return currentUser.type === 'admin' ? <AnalyticsScreen theme={theme} platform={platform} /> : <HomeScreen currentUser={currentUser} greeting={getGreeting()} theme={theme} platform={platform} />;
      case 'notifications':
        return currentUser.type === 'admin' ? <NotificationsScreen theme={theme} platform={platform} /> : <HomeScreen currentUser={currentUser} greeting={getGreeting()} theme={theme} platform={platform} />;
      default:
        return <HomeScreen currentUser={currentUser} greeting={getGreeting()} theme={theme} platform={platform} />;
    }
  };

  // Show splash screen
  if (isLoading) {
    return <SplashScreen theme={theme} platform={platform} />;
  }

  // Show login screen if no user is logged in
  if (!currentUser) {
    return (
      <LoginScreen 
        onLogin={handleLogin} 
        theme={theme} 
        platform={platform}
        onToggleTheme={toggleTheme}
      />
    );
  }

  const themeClasses = getThemeClasses();

  const navigationItems = [
    ...(currentUser?.type === 'admin' ? [
      { id: 'analytics', label: 'Analytics', icon: BarChart3, position: 'far_left' }
    ] : []),
    { id: 'home', label: 'Home', icon: Home, position: 'left' },
    { id: 'track', label: 'Track', icon: MapPin, position: 'center', highlighted: true },
    { id: 'profile', label: 'Profile', icon: User, position: 'right' },
    ...(currentUser?.type === 'admin' ? [
      { id: 'notifications', label: 'Alerts', icon: Bell, position: 'far_right' }
    ] : [])
  ];

  return (
    <div className={`min-h-screen ${themeClasses.background} relative overflow-hidden`}>
      {/* Main content */}
      <div className="relative z-10 flex flex-col h-screen">
        {/* Screen content */}
        <div className="flex-1 overflow-auto pb-20">
          {renderScreen()}
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 z-50">
          <div className={`${themeClasses.navigation} px-4 py-3 ${platform === 'ios' ? '' : 'shadow-lg'}`}>
            <div className="flex items-center justify-center space-x-8">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                const isHighlighted = item.highlighted;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex flex-col items-center space-y-1 transition-all duration-200 ${
                      isHighlighted
                        ? 'transform scale-110'
                        : ''
                    }`}
                  >
                    <div className={`p-3 rounded-full transition-all duration-200 ${
                      isActive
                        ? isHighlighted
                          ? `${theme === 'dark' ? 'bg-green-500' : 'bg-blue-500'} shadow-lg ${theme === 'dark' ? 'shadow-green-500/50' : 'shadow-blue-500/50'}`
                          : platform === 'ios' 
                            ? theme === 'dark' ? 'bg-slate-700/50' : 'bg-white/30'
                            : theme === 'dark' ? 'bg-slate-700' : 'bg-blue-100'
                        : isHighlighted
                          ? `${theme === 'dark' ? 'bg-green-500/80' : 'bg-blue-500/80'}`
                          : 'bg-transparent'
                    }`}>
                      <Icon 
                        size={isHighlighted ? 24 : 20} 
                        className={`${
                          isActive || isHighlighted 
                            ? 'text-white' 
                            : theme === 'dark' 
                              ? 'text-slate-400' 
                              : 'text-blue-600/70'
                        }`} 
                      />
                    </div>
                    <span className={`text-xs transition-colors duration-200 ${
                      isActive 
                        ? theme === 'dark' ? 'text-green-400' : 'text-blue-900'
                        : theme === 'dark' ? 'text-slate-400' : 'text-blue-600/70'
                    }`}>
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}