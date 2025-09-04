import React from 'react';
import { 
  Edit, 
  Clock, 
  Star, 
  Calendar, 
  User, 
  Bell, 
  Shield, 
  HelpCircle, 
  Mail, 
  AlertTriangle,
  Bus,
  Users,
  BarChart3,
  Settings,
  LogOut,
  ChevronRight
} from 'lucide-react';

interface ProfileScreenProps {
  currentUser: {
    id: string;
    name: string;
    type: string;
    assignedBus: string;
    route: string;
  };
  onLogout: () => void;
  theme: string;
  platform: string;
}

export function ProfileScreen({ currentUser, onLogout, theme, platform }: ProfileScreenProps) {
  const getThemeClasses = () => {
    if (theme === 'dark') {
      return {
        surface: platform === 'ios' ? 'bg-slate-800/30 backdrop-blur-xl border-slate-700/30' : 'bg-slate-800 border-slate-700',
        surfaceElevated: platform === 'ios' ? 'bg-slate-700/40 backdrop-blur-xl border-slate-600/40' : 'bg-slate-700 border-slate-600',
        gradient: 'from-green-500/30 to-yellow-500/30',
        text: 'text-green-400',
        textSecondary: 'text-yellow-400',
        textMuted: 'text-slate-400',
        accent: 'bg-green-500 hover:bg-green-600',
        accentSecondary: 'bg-yellow-500 hover:bg-yellow-600',
        danger: 'bg-red-500/20 hover:bg-red-500/30 border-red-400/30 text-red-400'
      };
    } else {
      return {
        surface: platform === 'ios' ? 'bg-white/70 backdrop-blur-xl border-blue-200/50' : 'bg-white border-blue-200 shadow-sm',
        surfaceElevated: platform === 'ios' ? 'bg-white/80 backdrop-blur-xl border-blue-300/60' : 'bg-white border-blue-300 shadow-md',
        gradient: 'from-blue-500/30 to-violet-600/30',
        text: 'text-blue-900',
        textSecondary: 'text-violet-700',
        textMuted: 'text-blue-600',
        accent: 'bg-blue-500 hover:bg-blue-600',
        accentSecondary: 'bg-violet-500 hover:bg-violet-600',
        danger: 'bg-red-500/20 hover:bg-red-500/30 border-red-400/30 text-red-700'
      };
    }
  };

  const themeClasses = getThemeClasses();

  const travelMenuItems = [
    {
      title: 'Travel History',
      subtitle: 'View past trips and analytics',
      icon: Clock,
      action: 'view_history'
    },
    {
      title: 'Saved Locations',
      subtitle: 'Quick access to frequent stops',
      icon: Star,
      action: 'manage_saved_locations'
    },
    {
      title: 'Route Schedule',
      subtitle: 'Complete timetable',
      icon: Calendar,
      action: 'view_full_schedule'
    }
  ];

  const accountMenuItems = [
    {
      title: 'Personal Information',
      subtitle: 'Update profile details',
      icon: User,
      action: 'edit_profile'
    },
    {
      title: 'Notifications',
      subtitle: 'Manage alert preferences',
      icon: Bell,
      action: 'notification_settings'
    },
    {
      title: 'Privacy & Security',
      subtitle: 'Account security settings',
      icon: Shield,
      action: 'security_settings'
    }
  ];

  const supportMenuItems = [
    {
      title: 'Help Center',
      subtitle: 'FAQs and guides',
      icon: HelpCircle,
      action: 'help_center'
    },
    {
      title: 'Contact Support',
      subtitle: 'Get help from our team',
      icon: Mail,
      action: 'contact_support'
    },
    {
      title: 'Report Issue',
      subtitle: 'Report bugs or problems',
      icon: AlertTriangle,
      action: 'report_issue'
    }
  ];

  const adminMenuItems = [
    {
      title: 'Fleet Management',
      subtitle: 'Manage all buses and routes',
      icon: Bus,
      action: 'fleet_dashboard'
    },
    {
      title: 'User Management',
      subtitle: 'Manage student and faculty accounts',
      icon: Users,
      action: 'user_management'
    },
    {
      title: 'Analytics Dashboard',
      subtitle: 'View usage statistics and reports',
      icon: BarChart3,
      action: 'analytics_dashboard'
    },
    {
      title: 'System Settings',
      subtitle: 'Configure app-wide settings',
      icon: Settings,
      action: 'system_settings'
    }
  ];

  const MenuSection = ({ title, items }: { title: string; items: any[] }) => (
    <div className={`${themeClasses.surface} border ${platform === 'ios' ? 'rounded-2xl' : 'rounded-xl'} p-6 ${platform === 'ios' ? 'shadow-lg' : 'shadow-md'}`}>
      <h3 className={`${themeClasses.text} text-lg mb-4 font-semibold`}>{title}</h3>
      <div className="space-y-1">
        {items.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={item.title}
              className={`w-full ${themeClasses.surfaceElevated} hover:scale-[1.02] border ${platform === 'ios' ? 'rounded-xl' : 'rounded-lg'} p-4 transition-all duration-200 group active:scale-[0.98]`}
            >
              <div className="flex items-center space-x-4">
                <div className={`p-2 ${theme === 'dark' ? 'bg-slate-600/50' : 'bg-blue-100'} ${platform === 'ios' ? 'rounded-lg' : 'rounded-md'}`}>
                  <Icon size={20} className={themeClasses.textMuted} />
                </div>
                <div className="flex-1 text-left">
                  <h4 className={`${themeClasses.text} font-semibold`}>{item.title}</h4>
                  <p className={`${themeClasses.textMuted} text-sm`}>{item.subtitle}</p>
                </div>
                <ChevronRight size={16} className={`${themeClasses.textMuted} group-hover:${themeClasses.text} transition-colors`} />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="p-4 space-y-6">
      {/* Profile Header */}
      <div className={`relative bg-gradient-to-r ${themeClasses.gradient} ${themeClasses.surface} border ${platform === 'ios' ? 'rounded-2xl' : 'rounded-xl'} p-6 ${platform === 'ios' ? 'shadow-xl' : 'shadow-lg'} overflow-hidden`}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className={`absolute top-0 right-0 w-32 h-32 ${theme === 'dark' ? 'bg-green-400' : 'bg-blue-400'} rounded-full transform translate-x-16 -translate-y-16`}></div>
          <div className={`absolute bottom-0 left-0 w-24 h-24 ${theme === 'dark' ? 'bg-yellow-400' : 'bg-violet-400'} rounded-full transform -translate-x-12 translate-y-12`}></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center space-x-4">
              <div className={`w-16 h-16 ${themeClasses.surfaceElevated} ${platform === 'ios' ? 'rounded-full' : 'rounded-xl'} flex items-center justify-center border-2 ${theme === 'dark' ? 'border-slate-600/50' : 'border-blue-300/60'}`}>
                <User size={32} className={themeClasses.text} />
              </div>
              <div>
                <h1 className={`${themeClasses.text} text-2xl font-bold`}>{currentUser.name}</h1>
                <p className={`${themeClasses.textMuted} text-sm`}>ID: {currentUser.id}</p>
                <div className={`${themeClasses.surfaceElevated} border ${platform === 'ios' ? 'rounded-lg' : 'rounded-md'} px-3 py-1 mt-1 inline-block`}>
                  <span className={`${themeClasses.textSecondary} text-sm capitalize font-semibold`}>{currentUser.type}</span>
                </div>
              </div>
            </div>
            <button className={`p-2 ${themeClasses.surfaceElevated} border ${platform === 'ios' ? 'rounded-lg' : 'rounded-md'} hover:scale-105 transition-transform active:scale-95`}>
              <Edit size={20} className={themeClasses.textMuted} />
            </button>
          </div>
        </div>
      </div>

      {/* Assigned Bus Card */}
      <div className={`${themeClasses.surfaceElevated} border ${platform === 'ios' ? 'rounded-2xl' : 'rounded-xl'} p-6 ${platform === 'ios' ? 'shadow-xl' : 'shadow-lg'}`}>
        <h3 className={`${themeClasses.text} text-lg mb-4 font-semibold`}>Assigned Bus</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className={`${themeClasses.textMuted} font-medium`}>Bus Number</span>
            <span className={`${themeClasses.text} font-bold`}>{currentUser.assignedBus}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className={`${themeClasses.textMuted} font-medium`}>Route</span>
            <span className={`${themeClasses.text} font-bold`}>{currentUser.route}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className={`${themeClasses.textMuted} font-medium`}>Pickup Points</span>
            <span className={`${themeClasses.text} font-bold`}>Campus Gate, Library</span>
          </div>
          <div className={`pt-3 border-t ${theme === 'dark' ? 'border-slate-600/50' : 'border-blue-200/60'}`}>
            <button className={`${themeClasses.textSecondary} text-sm hover:underline transition-colors font-medium`}>
              Request Route Change
            </button>
          </div>
        </div>
      </div>

      {/* Menu Sections */}
      <MenuSection title="Travel" items={travelMenuItems} />
      <MenuSection title="Account" items={accountMenuItems} />
      <MenuSection title="Support" items={supportMenuItems} />

      {/* Admin Section */}
      {currentUser.type === 'admin' && (
        <MenuSection title="Administration" items={adminMenuItems} />
      )}

      {/* Logout Section */}
      <div className={`${themeClasses.surface} border ${platform === 'ios' ? 'rounded-2xl' : 'rounded-xl'} p-6 ${platform === 'ios' ? 'shadow-lg' : 'shadow-md'}`}>
        <button 
          onClick={onLogout}
          className={`w-full ${themeClasses.danger} border ${platform === 'ios' ? 'rounded-xl' : 'rounded-lg'} p-4 transition-all duration-200 group hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center`}
        >
          <div className="flex items-center justify-center space-x-3">
            <LogOut size={20} />
            <span className="font-semibold">Sign Out</span>
          </div>
        </button>
      </div>
    </div>
  );
}