import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Bell, HelpCircle, MapPin, Users, AlertTriangle } from 'lucide-react';

interface HomeScreenProps {
  currentUser: {
    id: string;
    name: string;
    type: string;
    assignedBus: string;
    route: string;
  };
  greeting: string;
  theme: string;
  platform: string;
}

// Mock data for bus information
const busData = {
  'Bus 1A': {
    route: 'Campus to City Center',
    status: 'En Route',
    eta: 12,
    nextStop: 'Metro Station',
    currentLocation: 'Oak Street',
    delay: 0
  },
  'Bus 2B': {
    route: 'University to Downtown',
    status: 'On Time',
    eta: 25,
    nextStop: 'University Gate',
    currentLocation: 'Campus Drive',
    delay: 0
  },
  'Bus 3C': {
    route: 'Residential to Business District',
    status: 'Delayed',
    eta: 35,
    nextStop: 'Pine Avenue',
    currentLocation: 'Main Street',
    delay: 10
  }
};

export function HomeScreen({ currentUser, greeting, theme, platform }: HomeScreenProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [myBusEta, setMyBusEta] = useState(busData[currentUser.assignedBus as keyof typeof busData]?.eta || 12);

  // Simulate real-time ETA updates
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      // Randomly adjust ETA by ±1 minute occasionally
      if (Math.random() < 0.3) {
        setMyBusEta(prev => Math.max(1, prev + (Math.random() > 0.5 ? 1 : -1)));
      }
    }, 10000); // Update every 10 seconds for demo

    return () => clearInterval(timer);
  }, []);

  const myBus = busData[currentUser.assignedBus as keyof typeof busData];
  const otherBuses = Object.entries(busData).filter(([busId]) => busId !== currentUser.assignedBus);

  const getThemeClasses = () => {
    if (theme === 'dark') {
      return {
        surface: platform === 'ios' ? 'bg-slate-800/30 backdrop-blur-xl border-slate-700/30' : 'bg-slate-800 border-slate-700',
        surfaceElevated: platform === 'ios' ? 'bg-slate-700/40 backdrop-blur-xl border-slate-600/40' : 'bg-slate-700 border-slate-600',
        text: 'text-green-400',
        textSecondary: 'text-yellow-400',
        textMuted: 'text-slate-400',
        accent: 'bg-green-500 hover:bg-green-600',
        accentSecondary: 'bg-yellow-500 hover:bg-yellow-600',
        success: 'bg-green-500/20 border-green-400/30 text-green-400',
        warning: 'bg-orange-500/20 border-orange-400/30 text-orange-400',
        danger: 'bg-red-500/20 border-red-400/30 text-red-400'
      };
    } else {
      return {
        surface: platform === 'ios' ? 'bg-white/70 backdrop-blur-xl border-blue-200/50' : 'bg-white border-blue-200 shadow-sm',
        surfaceElevated: platform === 'ios' ? 'bg-white/80 backdrop-blur-xl border-blue-300/60' : 'bg-white border-blue-300 shadow-md',
        text: 'text-blue-900',
        textSecondary: 'text-violet-700',
        textMuted: 'text-blue-600',
        accent: 'bg-blue-500 hover:bg-blue-600',
        accentSecondary: 'bg-violet-500 hover:bg-violet-600',
        success: 'bg-green-500/10 border-green-400/30 text-green-700',
        warning: 'bg-orange-500/10 border-orange-400/30 text-orange-700',
        danger: 'bg-red-500/10 border-red-400/30 text-red-700'
      };
    }
  };

  const themeClasses = getThemeClasses();

  const quickActions = [
    { title: 'Schedule', icon: Calendar, action: 'view_schedule' },
    { title: 'History', icon: Clock, action: 'view_history' },
    { title: 'Notifications', icon: Bell, action: 'view_notifications', badge: 3 },
    { title: 'Support', icon: HelpCircle, action: 'contact_support' }
  ];

  return (
    <div className="p-4 space-y-6">
      {/* Status Bar */}
      <div className={`${themeClasses.surface} border ${platform === 'ios' ? 'rounded-2xl' : 'rounded-xl'} p-6 ${platform === 'ios' ? 'shadow-lg' : 'shadow-md'}`}>
        <div className="flex justify-between items-start">
          <div>
            <h1 className={`${themeClasses.text} text-2xl mb-1 font-semibold`}>{greeting}, {currentUser.name.split(' ')[0]}</h1>
            <p className={`${themeClasses.textMuted} text-sm`}>{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
          </div>
          <div className={`${themeClasses.surfaceElevated} border ${platform === 'ios' ? 'rounded-lg' : 'rounded-md'} px-3 py-1`}>
            <span className={`${themeClasses.textSecondary} text-sm capitalize font-medium`}>{currentUser.type}</span>
          </div>
        </div>
      </div>

      {/* My Bus Card */}
      <div className={`${themeClasses.surfaceElevated} border ${platform === 'ios' ? 'rounded-2xl' : 'rounded-xl'} p-6 ${platform === 'ios' ? 'shadow-xl' : 'shadow-lg'}`}>
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className={`${themeClasses.text} text-xl mb-1 font-semibold`}>{currentUser.assignedBus}</h2>
            <p className={`${themeClasses.textMuted} text-sm`}>{myBus?.route}</p>
          </div>
          <div className={`${themeClasses.success} border ${platform === 'ios' ? 'rounded-lg' : 'rounded-md'} px-3 py-1`}>
            <span className="text-sm font-medium">{myBus?.status}</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Clock size={18} className={themeClasses.textMuted} />
              <span className={`${themeClasses.textMuted} text-sm font-medium`}>ETA</span>
            </div>
            <span className={`${themeClasses.text} text-lg font-bold`}>{myBusEta} mins</span>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <MapPin size={18} className={themeClasses.textMuted} />
              <span className={`${themeClasses.textMuted} text-sm font-medium`}>Next Stop</span>
            </div>
            <span className={`${themeClasses.text} text-sm font-medium`}>{myBus?.nextStop}</span>
          </div>
        </div>

        <button className={`w-full ${themeClasses.accent} text-white ${platform === 'ios' ? 'rounded-xl' : 'rounded-lg'} py-3 mt-6 transition-all duration-200 font-semibold hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center`}>
          Track Live
        </button>
      </div>

      {/* Quick Actions */}
      <div className={`${themeClasses.surface} border ${platform === 'ios' ? 'rounded-2xl' : 'rounded-xl'} p-6 ${platform === 'ios' ? 'shadow-lg' : 'shadow-md'}`}>
        <h3 className={`${themeClasses.text} text-lg mb-4 font-semibold`}>Quick Actions</h3>
        <div className="grid grid-cols-2 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.title}
                className={`${themeClasses.surfaceElevated} hover:scale-105 border ${platform === 'ios' ? 'rounded-xl' : 'rounded-lg'} p-4 transition-all duration-200 relative active:scale-95`}
              >
                <div className="flex flex-col items-center space-y-3">
                  <div className="relative">
                    <Icon size={24} className={themeClasses.textMuted} />
                    {action.badge && (
                      <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                        {action.badge}
                      </div>
                    )}
                  </div>
                  <span className={`${themeClasses.text} text-sm font-medium`}>{action.title}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Other Buses Section */}
      <div className={`${themeClasses.surface} border ${platform === 'ios' ? 'rounded-2xl' : 'rounded-xl'} p-6 ${platform === 'ios' ? 'shadow-lg' : 'shadow-md'}`}>
        <div className="mb-4">
          <h3 className={`${themeClasses.text} text-lg font-semibold`}>Other Active Routes</h3>
          <p className={`${themeClasses.textMuted} text-sm`}>Tap to view general info only</p>
        </div>

        <div className="space-y-3">
          {otherBuses.map(([busId, bus]) => (
            <div
              key={busId}
              className={`${themeClasses.surfaceElevated} border ${platform === 'ios' ? 'rounded-xl' : 'rounded-lg'} p-4 ${
                currentUser.type === 'admin' ? 'cursor-pointer hover:scale-[1.02]' : 'cursor-default'
              } transition-all duration-200`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className={`${themeClasses.text} font-semibold`}>{busId}</h4>
                    <div className={`px-3 py-1 ${platform === 'ios' ? 'rounded-md' : 'rounded'} text-xs font-medium ${
                      bus.status === 'On Time' 
                        ? themeClasses.success
                        : bus.status === 'Delayed'
                        ? themeClasses.danger
                        : themeClasses.warning
                    }`}>
                      {bus.status === 'Delayed' ? `${bus.status} - Traffic` : bus.status}
                    </div>
                  </div>
                  <p className={`${themeClasses.textMuted} text-sm mb-3`}>{bus.route}</p>
                  <div className="flex justify-between items-center text-sm">
                    <span className={themeClasses.textMuted}>ETA to campus</span>
                    <span className={`${themeClasses.text} font-semibold`}>{bus.eta} mins</span>
                  </div>
                  {currentUser.type === 'admin' && (
                    <div className="flex justify-between items-center text-sm mt-2">
                      <span className={themeClasses.textMuted}>Passengers</span>
                      <span className={`${themeClasses.text} font-semibold`}>28/45</span>
                    </div>
                  )}
                </div>
              </div>
              
              {currentUser.type !== 'admin' && (
                <div className={`mt-3 pt-3 border-t ${theme === 'dark' ? 'border-slate-600/50' : 'border-blue-200/60'}`}>
                  <button 
                    disabled
                    className={`${themeClasses.textMuted} text-sm cursor-not-allowed opacity-60`}
                  >
                    Live tracking restricted
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Service Updates */}
      <div className={`${themeClasses.surface} border ${platform === 'ios' ? 'rounded-2xl' : 'rounded-xl'} p-6 ${platform === 'ios' ? 'shadow-lg' : 'shadow-md'}`}>
        <h3 className={`${themeClasses.text} text-lg mb-4 font-semibold`}>Service Updates</h3>
        <div className="space-y-3">
          <div className={`${themeClasses.warning} border ${platform === 'ios' ? 'rounded-xl' : 'rounded-lg'} p-4`}>
            <div className="flex items-start space-x-3">
              <AlertTriangle size={20} className="mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium">Route 1A: 5 min delay due to road construction</p>
                <p className={`${themeClasses.textMuted} text-xs mt-1`}>2 mins ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}