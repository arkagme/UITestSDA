import React from 'react';
import { 
  Bus, 
  Users, 
  Clock, 
  TrendingUp, 
  MapPin, 
  AlertCircle,
  CheckCircle,
  Timer,
  BarChart3
} from 'lucide-react';

interface AnalyticsScreenProps {
  theme: string;
  platform: string;
}

// Mock analytics data
const metricsData = [
  {
    title: 'Active Buses',
    value: '12',
    trend: '+2 from yesterday',
    icon: Bus,
    color: 'blue',
    trendPositive: true
  },
  {
    title: 'Total Passengers',
    value: '348',
    trend: '+15% this week',
    icon: Users,
    color: 'green',
    trendPositive: true
  },
  {
    title: 'On-Time Rate',
    value: '94%',
    trend: '+3% improvement',
    icon: CheckCircle,
    color: 'emerald',
    trendPositive: true
  },
  {
    title: 'Avg Delay',
    value: '4.2 min',
    trend: '-1.3 min from last week',
    icon: Timer,
    color: 'orange',
    trendPositive: true
  }
];

const fleetStatus = [
  {
    id: 'Bus 1A',
    status: 'on_time',
    passengers: '32/45',
    nextStop: 'Metro Station',
    driver: 'John Doe',
    route: 'Campus to City Center',
    eta: '12 min'
  },
  {
    id: 'Bus 2B', 
    status: 'delayed',
    passengers: '28/45',
    nextStop: 'University Gate',
    driver: 'Jane Smith',
    route: 'University to Downtown',
    eta: '25 min'
  },
  {
    id: 'Bus 3C',
    status: 'on_time',
    passengers: '15/40',
    nextStop: 'Pine Avenue',
    driver: 'Mike Johnson',
    route: 'Residential to Business',
    eta: '18 min'
  },
  {
    id: 'Bus 4D',
    status: 'maintenance',
    passengers: '0/45',
    nextStop: 'Depot',
    driver: 'Sarah Wilson',
    route: 'Out of Service',
    eta: '-'
  }
];

const routePerformance = [
  { route: 'Campus to City Center', punctuality: 96, passengers: 145, avgDelay: 2.1 },
  { route: 'University to Downtown', punctuality: 89, passengers: 98, avgDelay: 5.3 },
  { route: 'Residential to Business', punctuality: 97, passengers: 67, avgDelay: 1.8 },
  { route: 'Express Loop', punctuality: 92, passengers: 123, avgDelay: 3.4 }
];

export function AnalyticsScreen({ theme, platform }: AnalyticsScreenProps) {
  const getThemeClasses = () => {
    if (theme === 'dark') {
      return {
        surface: platform === 'ios' ? 'bg-slate-800/30 backdrop-blur-xl border-slate-700/30' : 'bg-slate-800 border-slate-700',
        surfaceElevated: platform === 'ios' ? 'bg-slate-700/40 backdrop-blur-xl border-slate-600/40' : 'bg-slate-700 border-slate-600',
        text: 'text-green-400',
        textSecondary: 'text-yellow-400',
        textMuted: 'text-slate-400',
        success: 'bg-green-500/20 text-green-400 border-green-400/30',
        warning: 'bg-orange-500/20 text-orange-400 border-orange-400/30',
        danger: 'bg-red-500/20 text-red-400 border-red-400/30',
        info: 'bg-blue-500/20 text-blue-400 border-blue-400/30',
        accent: 'bg-green-500 hover:bg-green-600',
        accentSecondary: 'bg-yellow-500 hover:bg-yellow-600'
      };
    } else {
      return {
        surface: platform === 'ios' ? 'bg-white/70 backdrop-blur-xl border-blue-200/50' : 'bg-white border-blue-200 shadow-sm',
        surfaceElevated: platform === 'ios' ? 'bg-white/80 backdrop-blur-xl border-blue-300/60' : 'bg-white border-blue-300 shadow-md',
        text: 'text-blue-900',
        textSecondary: 'text-violet-700',
        textMuted: 'text-blue-600',
        success: 'bg-green-500/10 text-green-700 border-green-400/30',
        warning: 'bg-orange-500/10 text-orange-700 border-orange-400/30',
        danger: 'bg-red-500/10 text-red-700 border-red-400/30',
        info: 'bg-blue-500/10 text-blue-700 border-blue-400/30',
        accent: 'bg-blue-500 hover:bg-blue-600',
        accentSecondary: 'bg-violet-500 hover:bg-violet-600'
      };
    }
  };

  const themeClasses = getThemeClasses();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on_time': return themeClasses.success;
      case 'delayed': return themeClasses.danger;
      case 'maintenance': return themeClasses.warning;
      default: return themeClasses.info;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'on_time': return 'On Time';
      case 'delayed': return 'Delayed';
      case 'maintenance': return 'Maintenance';
      default: return 'Unknown';
    }
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className={`${themeClasses.surface} border ${platform === 'ios' ? 'rounded-2xl' : 'rounded-xl'} p-6 ${platform === 'ios' ? 'shadow-lg' : 'shadow-md'}`}>
        <div className="flex items-center space-x-3">
          <BarChart3 size={24} className={themeClasses.text} />
          <div>
            <h1 className={`${themeClasses.text} text-2xl font-bold`}>Analytics Dashboard</h1>
            <p className={`${themeClasses.textMuted} text-sm`}>Real-time fleet performance and insights</p>
          </div>
        </div>
      </div>

      {/* Metrics Overview */}
      <div className="grid grid-cols-2 gap-4">
        {metricsData.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div
              key={metric.title}
              className={`${themeClasses.surface} border ${platform === 'ios' ? 'rounded-2xl' : 'rounded-xl'} p-6 ${platform === 'ios' ? 'shadow-lg' : 'shadow-md'}`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 ${platform === 'ios' ? 'rounded-lg' : 'rounded-md'} ${
                  theme === 'dark' ? 'bg-slate-600/50' : 'bg-blue-100'
                }`}>
                  <Icon size={20} className={themeClasses.textMuted} />
                </div>
                {metric.trendPositive && (
                  <TrendingUp size={16} className="text-green-500" />
                )}
              </div>
              <div>
                <h3 className={`${themeClasses.text} text-2xl font-bold mb-1`}>{metric.value}</h3>
                <p className={`${themeClasses.textMuted} text-sm font-medium`}>{metric.title}</p>
                <p className={`text-xs mt-2 ${
                  metric.trendPositive ? 'text-green-500' : 'text-red-500'
                } font-medium`}>
                  {metric.trend}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Live Fleet Status */}
      <div className={`${themeClasses.surface} border ${platform === 'ios' ? 'rounded-2xl' : 'rounded-xl'} p-6 ${platform === 'ios' ? 'shadow-lg' : 'shadow-md'}`}>
        <h3 className={`${themeClasses.text} text-lg mb-4 font-bold`}>Live Fleet Status</h3>
        <div className="space-y-3">
          {fleetStatus.map((bus) => (
            <div
              key={bus.id}
              className={`${themeClasses.surfaceElevated} border ${platform === 'ios' ? 'rounded-xl' : 'rounded-lg'} p-4`}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="flex items-center space-x-3">
                    <h4 className={`${themeClasses.text} font-bold`}>{bus.id}</h4>
                    <div className={`px-3 py-1 ${platform === 'ios' ? 'rounded-md' : 'rounded'} text-xs border font-semibold ${getStatusColor(bus.status)}`}>
                      {getStatusText(bus.status)}
                    </div>
                  </div>
                  <p className={`${themeClasses.textMuted} text-sm mt-1 font-medium`}>{bus.route}</p>
                </div>
                <div className="text-right">
                  <p className={`${themeClasses.text} text-sm font-bold`}>{bus.eta}</p>
                  <p className={`${themeClasses.textMuted} text-xs`}>ETA</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className={`${themeClasses.textMuted} font-medium`}>Passengers</p>
                  <p className={`${themeClasses.text} font-bold`}>{bus.passengers}</p>
                </div>
                <div>
                  <p className={`${themeClasses.textMuted} font-medium`}>Next Stop</p>
                  <p className={`${themeClasses.text} font-bold`}>{bus.nextStop}</p>
                </div>
                <div>
                  <p className={`${themeClasses.textMuted} font-medium`}>Driver</p>
                  <p className={`${themeClasses.text} font-bold`}>{bus.driver}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Route Performance */}
      <div className={`${themeClasses.surface} border ${platform === 'ios' ? 'rounded-2xl' : 'rounded-xl'} p-6 ${platform === 'ios' ? 'shadow-lg' : 'shadow-md'}`}>
        <h3 className={`${themeClasses.text} text-lg mb-4 font-bold`}>Route Performance</h3>
        <div className="space-y-4">
          {routePerformance.map((route, index) => (
            <div
              key={route.route}
              className={`${themeClasses.surfaceElevated} border ${platform === 'ios' ? 'rounded-xl' : 'rounded-lg'} p-4`}
            >
              <div className="flex justify-between items-center mb-3">
                <h4 className={`${themeClasses.text} font-bold`}>{route.route}</h4>
                <div className="flex items-center space-x-2">
                  {route.punctuality >= 95 ? (
                    <CheckCircle size={16} className="text-green-500" />
                  ) : route.punctuality >= 90 ? (
                    <Clock size={16} className="text-yellow-500" />
                  ) : (
                    <AlertCircle size={16} className="text-red-500" />
                  )}
                  <span className={`text-sm font-bold ${
                    route.punctuality >= 95 ? 'text-green-500' :
                    route.punctuality >= 90 ? 'text-yellow-500' : 'text-red-500'
                  }`}>
                    {route.punctuality}%
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className={`${themeClasses.textMuted} font-medium`}>Punctuality</p>
                  <div className={`w-full ${theme === 'dark' ? 'bg-slate-600' : 'bg-blue-200'} rounded-full h-2 mt-1`}>
                    <div
                      className={`h-2 rounded-full ${
                        route.punctuality >= 95 ? 'bg-green-500' :
                        route.punctuality >= 90 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${route.punctuality}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <p className={`${themeClasses.textMuted} font-medium`}>Daily Passengers</p>
                  <p className={`${themeClasses.text} font-bold`}>{route.passengers}</p>
                </div>
                <div>
                  <p className={`${themeClasses.textMuted} font-medium`}>Avg Delay</p>
                  <p className={`${themeClasses.text} font-bold`}>{route.avgDelay} min</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className={`${themeClasses.surface} border ${platform === 'ios' ? 'rounded-2xl' : 'rounded-xl'} p-6 ${platform === 'ios' ? 'shadow-lg' : 'shadow-md'}`}>
        <h3 className={`${themeClasses.text} text-lg mb-4 font-bold`}>Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3">
          <button className={`${themeClasses.accent} text-white ${platform === 'ios' ? 'rounded-xl' : 'rounded-lg'} p-4 text-sm transition-all duration-200 font-semibold hover:scale-105 active:scale-95 flex items-center justify-center`}>
            Generate Report
          </button>
          <button className={`bg-green-500 hover:bg-green-600 text-white ${platform === 'ios' ? 'rounded-xl' : 'rounded-lg'} p-4 text-sm transition-all duration-200 font-semibold hover:scale-105 active:scale-95 flex items-center justify-center`}>
            Export Data
          </button>
          <button className={`bg-orange-500 hover:bg-orange-600 text-white ${platform === 'ios' ? 'rounded-xl' : 'rounded-lg'} p-4 text-sm transition-all duration-200 font-semibold hover:scale-105 active:scale-95 flex items-center justify-center`}>
            Send Alert
          </button>
          <button className={`${themeClasses.accentSecondary} text-white ${platform === 'ios' ? 'rounded-xl' : 'rounded-lg'} p-4 text-sm transition-all duration-200 font-semibold hover:scale-105 active:scale-95 flex items-center justify-center`}>
            View Insights
          </button>
        </div>
      </div>
    </div>
  );
}