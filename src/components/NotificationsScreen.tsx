import React, { useState } from 'react';
import { 
  Bell, 
  AlertTriangle, 
  Info, 
  CheckCircle, 
  Clock,
  Send,
  Users,
  MapPin,
  Zap
} from 'lucide-react';

interface NotificationsScreenProps {
  theme: string;
  platform: string;
}

// Mock notification data
const notifications = [
  {
    id: 1,
    type: 'alert',
    title: 'Route 1A Delay',
    message: '5 minute delay due to road construction on Oak Street',
    timestamp: '2 mins ago',
    severity: 'medium',
    recipients: 32,
    status: 'sent'
  },
  {
    id: 2,
    type: 'info',
    title: 'Schedule Update',
    message: 'Bus 2B will start 10 minutes earlier tomorrow due to event',
    timestamp: '15 mins ago',
    severity: 'low',
    recipients: 28,
    status: 'sent'
  },
  {
    id: 3,
    type: 'emergency',
    title: 'Emergency Alert',
    message: 'Bus 3C temporarily out of service - mechanical issue',
    timestamp: '1 hour ago',
    severity: 'high',
    recipients: 45,
    status: 'sent'
  },
  {
    id: 4,
    type: 'success',
    title: 'Service Resumed',
    message: 'All routes back to normal schedule after morning disruption',
    timestamp: '2 hours ago',
    severity: 'low',
    recipients: 156,
    status: 'sent'
  }
];

const quickAlerts = [
  { title: 'General Delay', message: 'Buses running 5-10 minutes late', severity: 'medium' },
  { title: 'Weather Alert', message: 'Service may be affected by heavy rain', severity: 'medium' },
  { title: 'Route Change', message: 'Temporary route modification in effect', severity: 'high' },
  { title: 'Service Update', message: 'Normal service resumed', severity: 'low' }
];

export function NotificationsScreen({ theme, platform }: NotificationsScreenProps) {
  const [newAlert, setNewAlert] = useState({ title: '', message: '', severity: 'medium', recipients: 'all' });
  const [showCreateAlert, setShowCreateAlert] = useState(false);

  const getThemeClasses = () => {
    if (theme === 'dark') {
      return {
        surface: platform === 'ios' ? 'bg-slate-800/30 backdrop-blur-xl border-slate-700/30' : 'bg-slate-800 border-slate-700',
        surfaceElevated: platform === 'ios' ? 'bg-slate-700/40 backdrop-blur-xl border-slate-600/40' : 'bg-slate-700 border-slate-600',
        input: platform === 'ios' ? 'bg-slate-600/50 backdrop-blur-xl border-slate-500/50' : 'bg-slate-600 border-slate-500',
        text: 'text-green-400',
        textSecondary: 'text-yellow-400',
        textMuted: 'text-slate-400',
        accent: 'bg-green-500 hover:bg-green-600',
        accentSecondary: 'bg-yellow-500 hover:bg-yellow-600',
        success: 'bg-green-500/20 text-green-400 border-green-400/30',
        warning: 'bg-orange-500/20 text-orange-400 border-orange-400/30',
        danger: 'bg-red-500/20 text-red-400 border-red-400/30',
        info: 'bg-blue-500/20 text-blue-400 border-blue-400/30'
      };
    } else {
      return {
        surface: platform === 'ios' ? 'bg-white/70 backdrop-blur-xl border-blue-200/50' : 'bg-white border-blue-200 shadow-sm',
        surfaceElevated: platform === 'ios' ? 'bg-white/80 backdrop-blur-xl border-blue-300/60' : 'bg-white border-blue-300 shadow-md',
        input: platform === 'ios' ? 'bg-white/60 backdrop-blur-xl border-blue-200/60' : 'bg-white border-blue-300',
        text: 'text-blue-900',
        textSecondary: 'text-violet-700',
        textMuted: 'text-blue-600',
        accent: 'bg-blue-500 hover:bg-blue-600',
        accentSecondary: 'bg-violet-500 hover:bg-violet-600',
        success: 'bg-green-500/10 text-green-700 border-green-400/30',
        warning: 'bg-orange-500/10 text-orange-700 border-orange-400/30',
        danger: 'bg-red-500/10 text-red-700 border-red-400/30',
        info: 'bg-blue-500/10 text-blue-700 border-blue-400/30'
      };
    }
  };

  const themeClasses = getThemeClasses();

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'emergency': return AlertTriangle;
      case 'alert': return AlertTriangle;
      case 'info': return Info;
      case 'success': return CheckCircle;
      default: return Bell;
    }
  };

  const getNotificationColor = (severity: string) => {
    switch (severity) {
      case 'high': return themeClasses.danger;
      case 'medium': return themeClasses.warning;
      case 'low': return themeClasses.info;
      default: return themeClasses.info;
    }
  };

  const sendQuickAlert = (alert: any) => {
    console.log('Sending alert:', alert);
  };

  const sendCustomAlert = () => {
    if (newAlert.title && newAlert.message) {
      console.log('Sending custom alert:', newAlert);
      setNewAlert({ title: '', message: '', severity: 'medium', recipients: 'all' });
      setShowCreateAlert(false);
    }
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className={`${themeClasses.surface} border ${platform === 'ios' ? 'rounded-2xl' : 'rounded-xl'} p-6 ${platform === 'ios' ? 'shadow-lg' : 'shadow-md'}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Bell size={24} className={themeClasses.text} />
            <div>
              <h1 className={`${themeClasses.text} text-2xl font-bold`}>Notification Center</h1>
              <p className={`${themeClasses.textMuted} text-sm`}>Manage alerts and communications</p>
            </div>
          </div>
          <button
            onClick={() => setShowCreateAlert(!showCreateAlert)}
            className={`${themeClasses.accent} text-white ${platform === 'ios' ? 'rounded-xl' : 'rounded-lg'} px-4 py-2 text-sm font-semibold transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center`}
          >
            Create Alert
          </button>
        </div>
      </div>

      {/* Create Alert Form */}
      {showCreateAlert && (
        <div className={`${themeClasses.surfaceElevated} border ${platform === 'ios' ? 'rounded-2xl' : 'rounded-xl'} p-6 ${platform === 'ios' ? 'shadow-xl' : 'shadow-lg'}`}>
          <h3 className={`${themeClasses.text} text-lg mb-4 font-bold`}>Create Custom Alert</h3>
          <div className="space-y-4">
            <div>
              <label className={`block ${themeClasses.text} text-sm mb-2 font-semibold`}>Alert Title</label>
              <input
                type="text"
                value={newAlert.title}
                onChange={(e) => setNewAlert({ ...newAlert, title: e.target.value })}
                className={`w-full ${themeClasses.input} border ${platform === 'ios' ? 'rounded-lg' : 'rounded-md'} px-3 py-2 ${themeClasses.text} placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Enter alert title..."
              />
            </div>

            <div>
              <label className={`block ${themeClasses.text} text-sm mb-2 font-semibold`}>Message</label>
              <textarea
                value={newAlert.message}
                onChange={(e) => setNewAlert({ ...newAlert, message: e.target.value })}
                className={`w-full ${themeClasses.input} border ${platform === 'ios' ? 'rounded-lg' : 'rounded-md'} px-3 py-2 ${themeClasses.text} placeholder-slate-500 h-20 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Enter alert message..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={`block ${themeClasses.text} text-sm mb-2 font-semibold`}>Severity</label>
                <select
                  value={newAlert.severity}
                  onChange={(e) => setNewAlert({ ...newAlert, severity: e.target.value })}
                  className={`w-full ${themeClasses.input} border ${platform === 'ios' ? 'rounded-lg' : 'rounded-md'} px-3 py-2 ${themeClasses.text} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                  <option value="low" className={theme === 'dark' ? 'bg-slate-800' : 'bg-white'}>Low</option>
                  <option value="medium" className={theme === 'dark' ? 'bg-slate-800' : 'bg-white'}>Medium</option>
                  <option value="high" className={theme === 'dark' ? 'bg-slate-800' : 'bg-white'}>High</option>
                </select>
              </div>

              <div>
                <label className={`block ${themeClasses.text} text-sm mb-2 font-semibold`}>Recipients</label>
                <select
                  value={newAlert.recipients}
                  onChange={(e) => setNewAlert({ ...newAlert, recipients: e.target.value })}
                  className={`w-full ${themeClasses.input} border ${platform === 'ios' ? 'rounded-lg' : 'rounded-md'} px-3 py-2 ${themeClasses.text} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                  <option value="all" className={theme === 'dark' ? 'bg-slate-800' : 'bg-white'}>All Users</option>
                  <option value="bus1a" className={theme === 'dark' ? 'bg-slate-800' : 'bg-white'}>Bus 1A Users</option>
                  <option value="bus2b" className={theme === 'dark' ? 'bg-slate-800' : 'bg-white'}>Bus 2B Users</option>
                  <option value="bus3c" className={theme === 'dark' ? 'bg-slate-800' : 'bg-white'}>Bus 3C Users</option>
                </select>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={sendCustomAlert}
                className={`flex-1 ${themeClasses.accent} text-white ${platform === 'ios' ? 'rounded-xl' : 'rounded-lg'} py-2 font-semibold transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center space-x-2`}
              >
                <Send size={16} />
                <span>Send Alert</span>
              </button>
              <button
                onClick={() => setShowCreateAlert(false)}
                className={`flex-1 ${themeClasses.surfaceElevated} border ${platform === 'ios' ? 'rounded-xl' : 'rounded-lg'} py-2 ${themeClasses.text} font-semibold transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center`}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Alerts */}
      <div className={`${themeClasses.surface} border ${platform === 'ios' ? 'rounded-2xl' : 'rounded-xl'} p-6 ${platform === 'ios' ? 'shadow-lg' : 'shadow-md'}`}>
        <h3 className={`${themeClasses.text} text-lg mb-4 font-bold`}>Quick Alerts</h3>
        <div className="grid grid-cols-2 gap-3">
          {quickAlerts.map((alert, index) => (
            <button
              key={index}
              onClick={() => sendQuickAlert(alert)}
              className={`p-4 ${platform === 'ios' ? 'rounded-xl' : 'rounded-lg'} border transition-all duration-200 hover:scale-105 active:scale-95 ${getNotificationColor(alert.severity)} flex items-center justify-center`}
            >
              <div className="text-center">
                <h4 className="text-sm font-bold mb-1">{alert.title}</h4>
                <p className={`${themeClasses.textMuted} text-xs`}>{alert.message}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Notification History */}
      <div className={`${themeClasses.surface} border ${platform === 'ios' ? 'rounded-2xl' : 'rounded-xl'} p-6 ${platform === 'ios' ? 'shadow-lg' : 'shadow-md'}`}>
        <h3 className={`${themeClasses.text} text-lg mb-4 font-bold`}>Recent Notifications</h3>
        <div className="space-y-3">
          {notifications.map((notification) => {
            const Icon = getNotificationIcon(notification.type);
            return (
              <div
                key={notification.id}
                className={`border ${platform === 'ios' ? 'rounded-xl' : 'rounded-lg'} p-4 ${getNotificationColor(notification.severity)}`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`p-2 ${themeClasses.surfaceElevated} ${platform === 'ios' ? 'rounded-lg' : 'rounded-md'}`}>
                    <Icon size={16} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold">{notification.title}</h4>
                      <span className={`${themeClasses.textMuted} text-xs`}>{notification.timestamp}</span>
                    </div>
                    <p className="text-sm mb-3 font-medium">{notification.message}</p>
                    
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Users size={12} className={themeClasses.textMuted} />
                          <span className={themeClasses.textMuted}>{notification.recipients} recipients</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <CheckCircle size={12} className="text-green-500" />
                          <span className="text-green-500 capitalize font-medium">{notification.status}</span>
                        </div>
                      </div>
                      <div className={`px-2 py-1 ${platform === 'ios' ? 'rounded' : 'rounded-sm'} text-xs font-bold ${
                        notification.severity === 'high' ? 'bg-red-500/30 text-red-400' :
                        notification.severity === 'medium' ? 'bg-orange-500/30 text-orange-400' :
                        'bg-blue-500/30 text-blue-400'
                      }`}>
                        {notification.severity.toUpperCase()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Notification Stats */}
      <div className={`${themeClasses.surface} border ${platform === 'ios' ? 'rounded-2xl' : 'rounded-xl'} p-6 ${platform === 'ios' ? 'shadow-lg' : 'shadow-md'}`}>
        <h3 className={`${themeClasses.text} text-lg mb-4 font-bold`}>Today's Statistics</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className={`${theme === 'dark' ? 'bg-slate-600/50' : 'bg-blue-100'} ${platform === 'ios' ? 'rounded-lg' : 'rounded-md'} p-3 mb-2`}>
              <Send size={20} className={themeClasses.textMuted} />
            </div>
            <h4 className={`${themeClasses.text} text-lg font-bold`}>12</h4>
            <p className={`${themeClasses.textMuted} text-sm font-medium`}>Alerts Sent</p>
          </div>
          <div className="text-center">
            <div className={`${theme === 'dark' ? 'bg-slate-600/50' : 'bg-blue-100'} ${platform === 'ios' ? 'rounded-lg' : 'rounded-md'} p-3 mb-2`}>
              <Users size={20} className={themeClasses.textMuted} />
            </div>
            <h4 className={`${themeClasses.text} text-lg font-bold`}>284</h4>
            <p className={`${themeClasses.textMuted} text-sm font-medium`}>Users Reached</p>
          </div>
          <div className="text-center">
            <div className={`${theme === 'dark' ? 'bg-slate-600/50' : 'bg-blue-100'} ${platform === 'ios' ? 'rounded-lg' : 'rounded-md'} p-3 mb-2`}>
              <Zap size={20} className={themeClasses.textMuted} />
            </div>
            <h4 className={`${themeClasses.text} text-lg font-bold`}>98%</h4>
            <p className={`${themeClasses.textMuted} text-sm font-medium`}>Delivery Rate</p>
          </div>
        </div>
      </div>
    </div>
  );
}