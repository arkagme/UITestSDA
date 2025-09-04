import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Users, AlertCircle, Navigation, Zap } from 'lucide-react';

interface TrackScreenProps {
  currentUser: {
    id: string;
    name: string;
    type: string;
    assignedBus: string;
    route: string;
  };
  theme: string;
  platform: string;
}

// Mock bus location data with active status
const busLocations = {
  'Bus 1A': { lat: 40.7128, lng: -74.0060, speed: 25, isActive: true },
  'Bus 2B': { lat: 40.7589, lng: -73.9851, speed: 30, isActive: true },
  'Bus 3C': { lat: 40.7282, lng: -73.7949, speed: 15, isActive: false }
};

export function TrackScreen({ currentUser, theme, platform }: TrackScreenProps) {
  const [selectedBus, setSelectedBus] = useState(currentUser.assignedBus);
  const [currentLocation, setCurrentLocation] = useState(busLocations[selectedBus as keyof typeof busLocations]);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Simulate real-time location updates only for active buses
  useEffect(() => {
    const timer = setInterval(() => {
      const busData = busLocations[selectedBus as keyof typeof busLocations];
      if (busData?.isActive) {
        setCurrentLocation(prev => ({
          ...prev,
          lat: prev.lat + (Math.random() - 0.5) * 0.001,
          lng: prev.lng + (Math.random() - 0.5) * 0.001,
          speed: Math.max(0, prev.speed + (Math.random() - 0.5) * 5)
        }));
        setLastUpdated(new Date());
      }
    }, 5000);

    return () => clearInterval(timer);
  }, [selectedBus]);

  const getThemeClasses = () => {
    if (theme === 'dark') {
      return {
        surface: platform === 'ios' ? 'bg-slate-800/30 backdrop-blur-xl border-slate-700/30' : 'bg-slate-800 border-slate-700',
        surfaceElevated: platform === 'ios' ? 'bg-slate-700/40 backdrop-blur-xl border-slate-600/40' : 'bg-slate-700 border-slate-600',
        text: 'text-green-400',
        textSecondary: 'text-yellow-400',
        textMuted: 'text-slate-400',
        accent: 'bg-green-500 hover:bg-green-600',
        mapBg: 'from-slate-900 via-slate-800 to-slate-900',
        busActive: 'bg-green-500',
        busInactive: 'bg-slate-500'
      };
    } else {
      return {
        surface: platform === 'ios' ? 'bg-white/70 backdrop-blur-xl border-blue-200/50' : 'bg-white border-blue-200 shadow-sm',
        surfaceElevated: platform === 'ios' ? 'bg-white/80 backdrop-blur-xl border-blue-300/60' : 'bg-white border-blue-300 shadow-md',
        text: 'text-blue-900',
        textSecondary: 'text-violet-700',
        textMuted: 'text-blue-600',
        accent: 'bg-blue-500 hover:bg-blue-600',
        mapBg: 'from-blue-100 via-white to-violet-100',
        busActive: 'bg-blue-500',
        busInactive: 'bg-gray-400'
      };
    }
  };

  const themeClasses = getThemeClasses();
  const busOptions = currentUser.type === 'admin' 
    ? Object.keys(busLocations)
    : [currentUser.assignedBus];

  const isCurrentBusActive = busLocations[selectedBus as keyof typeof busLocations]?.isActive;

  return (
    <div className="relative h-full">
      {/* Simplified Map Container */}
      <div className={`absolute inset-0 bg-gradient-to-br ${themeClasses.mapBg}`}>
        {/* Map grid pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `
            linear-gradient(${theme === 'dark' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(59, 130, 246, 0.1)'} 1px, transparent 1px),
            linear-gradient(90deg, ${theme === 'dark' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(59, 130, 246, 0.1)'} 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}>
        </div>

        {/* Only show bus location if active */}
        {isCurrentBusActive && (
          <>
            {/* Pulsating bus location indicator */}
            <div 
              className={`absolute w-6 h-6 ${themeClasses.busActive} rounded-full shadow-lg transform -translate-x-3 -translate-y-3 z-10`}
              style={{
                left: `${(currentLocation.lat - 40.7128) * 2000 + 50}%`,
                top: `${(currentLocation.lng + 74.0060) * 2000 + 50}%`
              }}
            >
              {/* Pulsing animation rings */}
              <div className={`absolute inset-0 ${themeClasses.busActive} rounded-full animate-ping opacity-75`}></div>
              <div className={`absolute inset-0 ${themeClasses.busActive} rounded-full animate-pulse`}></div>
              {/* Center dot */}
              <div className="absolute inset-2 bg-white rounded-full"></div>
            </div>

            {/* Route line (simplified) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-60">
              <polyline
                points="10,300 150,250 300,200 450,150 600,100"
                fill="none"
                stroke={theme === 'dark' ? '#22c55e' : '#3b82f6'}
                strokeWidth="3"
                strokeDasharray="10,5"
              />
            </svg>
          </>
        )}

        {/* Map center indicator */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <MapPin size={24} className={themeClasses.textMuted} />
        </div>
      </div>

      {/* Admin Control Panel */}
      {currentUser.type === 'admin' && (
        <div className="absolute top-4 right-4 z-30 space-y-2">
          <div className={`${themeClasses.surface} border ${platform === 'ios' ? 'rounded-xl' : 'rounded-lg'} p-4 ${platform === 'ios' ? 'shadow-lg' : 'shadow-md'}`}>
            <label className={`block ${themeClasses.text} text-sm mb-2 font-medium`}>Select Bus</label>
            <select
              value={selectedBus}
              onChange={(e) => setSelectedBus(e.target.value)}
              className={`w-full ${themeClasses.surfaceElevated} border ${platform === 'ios' ? 'rounded-lg' : 'rounded-md'} px-3 py-2 ${themeClasses.text} text-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              {Object.keys(busLocations).map(busId => (
                <option key={busId} value={busId} className={theme === 'dark' ? 'bg-slate-800' : 'bg-white'}>
                  {busId} {!busLocations[busId as keyof typeof busLocations].isActive ? '(Inactive)' : ''}
                </option>
              ))}
            </select>
          </div>

          <button className={`w-full bg-red-500/80 hover:bg-red-500 border border-red-400/30 ${platform === 'ios' ? 'rounded-xl' : 'rounded-lg'} px-4 py-2 text-white text-sm transition-colors font-medium flex items-center justify-center`}>
            Emergency Alert
          </button>
        </div>
      )}

      {/* Floating Info Panel */}
      <div className="absolute bottom-4 left-4 right-4 z-20">
        <div className={`${themeClasses.surface} border ${platform === 'ios' ? 'rounded-2xl' : 'rounded-xl'} p-6 ${platform === 'ios' ? 'shadow-xl' : 'shadow-lg'}`}>
          {/* Bus Header */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className={`${themeClasses.text} text-xl font-bold`}>{selectedBus}</h2>
              <p className={`${themeClasses.textMuted} text-sm`}>Campus to City Center</p>
            </div>
            <div className="flex items-center space-x-2">
              {isCurrentBusActive ? (
                <>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-500 text-sm font-medium">Live</span>
                </>
              ) : (
                <>
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <span className={`${themeClasses.textMuted} text-sm`}>Inactive</span>
                </>
              )}
            </div>
          </div>

          {isCurrentBusActive ? (
            <>
              {/* Current Status for Active Bus */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className={`${themeClasses.surfaceElevated} border ${platform === 'ios' ? 'rounded-xl' : 'rounded-lg'} p-3`}>
                  <div className="flex items-center space-x-2 mb-1">
                    <MapPin size={16} className={themeClasses.textMuted} />
                    <span className={`${themeClasses.textMuted} text-sm font-medium`}>Location</span>
                  </div>
                  <p className={`${themeClasses.text} font-semibold`}>Oak Street</p>
                </div>

                <div className={`${themeClasses.surfaceElevated} border ${platform === 'ios' ? 'rounded-xl' : 'rounded-lg'} p-3`}>
                  <div className="flex items-center space-x-2 mb-1">
                    <Zap size={16} className={themeClasses.textMuted} />
                    <span className={`${themeClasses.textMuted} text-sm font-medium`}>Speed</span>
                  </div>
                  <p className={`${themeClasses.text} font-semibold`}>{Math.round(currentLocation.speed)} mph</p>
                </div>
              </div>

              {/* ETA Information */}
              <div className="space-y-3 mb-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Clock size={16} className={themeClasses.textMuted} />
                    <span className={`${themeClasses.textMuted} text-sm font-medium`}>Next Stop</span>
                  </div>
                  <div className="text-right">
                    <p className={`${themeClasses.text} font-semibold`}>Metro Station</p>
                    <p className={`${themeClasses.textMuted} text-sm`}>12 mins</p>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Navigation size={16} className={themeClasses.textMuted} />
                    <span className={`${themeClasses.textMuted} text-sm font-medium`}>Destination</span>
                  </div>
                  <div className="text-right">
                    <p className={`${themeClasses.text} font-semibold`}>City Center</p>
                    <p className={`${themeClasses.textMuted} text-sm`}>40 mins</p>
                  </div>
                </div>
              </div>

              {/* Admin Only Info */}
              {currentUser.type === 'admin' && (
                <>
                  <div className={`border-t pt-4 mb-4 ${theme === 'dark' ? 'border-slate-600/50' : 'border-blue-200/60'}`}>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <Users size={16} className={themeClasses.textMuted} />
                        <span className={`${themeClasses.textMuted} text-sm font-medium`}>Passengers</span>
                      </div>
                      <div className="text-right">
                        <p className={`${themeClasses.text} font-semibold`}>32 / 45</p>
                        <p className={`${themeClasses.textMuted} text-sm`}>71% capacity</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <button className={`w-full bg-orange-500/80 hover:bg-orange-500 border border-orange-400/30 ${platform === 'ios' ? 'rounded-xl' : 'rounded-lg'} py-2 text-white text-sm transition-colors font-medium flex items-center justify-center`}>
                      Override ETA
                    </button>
                    <button className={`w-full ${themeClasses.accent} text-white ${platform === 'ios' ? 'rounded-xl' : 'rounded-lg'} py-2 text-sm transition-colors font-medium flex items-center justify-center`}>
                      Send Notification
                    </button>
                  </div>
                </>
              )}

              {/* Last Updated */}
              <div className={`text-center mt-4 pt-4 border-t ${theme === 'dark' ? 'border-slate-600/50' : 'border-blue-200/60'}`}>
                <p className={`${themeClasses.textMuted} text-xs`}>
                  Last updated: {lastUpdated.toLocaleTimeString()}
                </p>
              </div>
            </>
          ) : (
            /* Inactive Bus Message */
            <div className="text-center py-8">
              <AlertCircle size={48} className={`${themeClasses.textMuted} mx-auto mb-3`} />
              <h3 className={`${themeClasses.text} text-lg font-semibold mb-2`}>Bus Not Active</h3>
              <p className={`${themeClasses.textMuted} text-sm`}>
                {selectedBus} is currently not in service. Live tracking is not available.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}