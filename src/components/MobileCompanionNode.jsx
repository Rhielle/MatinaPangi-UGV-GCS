import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useTelemetryStore } from '../store/useTelemetryStore';
import 'leaflet/dist/leaflet.css';

// Map auto-follower helper
function FollowingMapUpdater({ center, follow }) {
  const map = useMap();
  useEffect(() => {
    if (follow) {
      map.setView(center, 17, { animate: true });
    }
  }, [center, follow, map]);
  return null;
}

export default function MobileCompanionNode() {
  const { lat, lng, battery, signal, isConnected, addLog, publishCommand } = useTelemetryStore();
  if (lat === undefined || lng === undefined) return null;
  
  const [isFollowing, setIsFollowing] = useState(true);
  const [eStopActive, setEStopActive] = useState(false);

  const position = [lat, lng];

  const handleMobileEmergencyStop = () => {
    setEStopActive(true);
    publishCommand('EMERGENCY_STOP_MOBILE');
    addLog('[MOBILE] CRITICAL: Emergency E-STOP triggered from mobile field companion!');
    if (navigator.vibrate) {
      navigator.vibrate([200, 100, 200]); // Haptic feedback vibration
    }
  };

  const handleResetEStop = () => {
    setEStopActive(false);
    publishCommand('RESET_STOP');
    addLog('[MOBILE] System interlock disengaged. Actuators restored.');
  };

  return (
    <section className="bg-amber-50 text-neutral-900 p-5 rounded-none shadow-lg border-2 border-neutral-900 font-mono mt-6">
      <div className="border-b-2 border-neutral-900 pb-2 mb-4 flex justify-between items-center text-xs font-bold uppercase tracking-wide">
        <span>FIELD MOBILE COMPANION // SMARTPHONE OPERATOR VIEW</span>
        <span className="bg-neutral-900 text-amber-50 px-2 py-0.5 text-xs font-bold">
          CLIENT: PWA READY
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Simulated Mobile Phone Frame */}
        <div className="mx-auto w-full max-w-xs bg-neutral-950 border-4 border-neutral-800 rounded-3xl p-3 shadow-2xl relative">
          {/* Phone speaker notch */}
          <div className="w-20 h-3 bg-neutral-900 mx-auto rounded-full mb-3"></div>

          {/* Mobile Screen Content */}
          <div className="bg-neutral-900 text-amber-50 rounded-2xl p-3 font-mono space-y-3 border border-neutral-800">
            {/* Top mobile bar */}
            <div className="flex justify-between items-center text-[10px] text-neutral-400 border-b border-neutral-800 pb-2">
              <span>TERMINUS // MOB</span>
              <span className={isConnected ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                {isConnected ? 'ONLINE' : 'OFFLINE'}
              </span>
            </div>

            {/* Mobile Moving Map Viewport */}
            <div className="h-48 rounded-xl overflow-hidden border border-neutral-800 relative z-0">
              <MapContainer
                center={position}
                zoom={17}
                zoomControl={false}
                attributionControl={false}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={position}>
                  <Popup>UGV-01 Field Position</Popup>
                </Marker>
                <FollowingMapUpdater center={position} follow={isFollowing} />
              </MapContainer>
            </div>

            {/* Mobile Quick Stats */}
            <div className="grid grid-cols-2 gap-2 text-[10px]">
              <div className="bg-neutral-950 p-2 border border-neutral-800 rounded">
                <div className="text-neutral-500">BATTERY</div>
                <div className="text-amber-400 font-bold">{battery}%</div>
              </div>
              <div className="bg-neutral-950 p-2 border border-neutral-800 rounded">
                <div className="text-neutral-500">SIGNAL</div>
                <div className="text-emerald-400 font-bold">{signal} dBm</div>
              </div>
            </div>

            {/* Haptic Emergency Stop Button */}
            {eStopActive ? (
              <button
                onClick={handleResetEStop}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-3 rounded-xl uppercase tracking-wider transition-all shadow-lg animate-pulse"
              >
                Reset E-Stop Interlock
              </button>
            ) : (
              <button
                onClick={handleMobileEmergencyStop}
                className="w-full bg-rose-700 hover:bg-rose-600 text-white font-bold text-xs py-3 rounded-xl uppercase tracking-wider transition-all shadow-lg active:scale-95"
              >
                🚨 Emergency E-Stop
              </button>
            )}
          </div>

          {/* Phone home indicator bar */}
          <div className="w-24 h-1 bg-neutral-800 mx-auto rounded-full mt-3"></div>
        </div>

        {/* Mobile Companion Control Settings */}
        <div className="lg:col-span-2 space-y-4 bg-amber-100/60 p-4 border border-neutral-400 flex flex-col justify-between h-full">
          <div>
            <div className="text-xs font-bold text-neutral-800 border-b border-neutral-300 pb-2 mb-3">
              FIELD COMPANION CONFIGURATION
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center bg-amber-50 p-3 border border-neutral-300">
                <div>
                  <div className="font-bold">AUTO-FOLLOWING MAP CAMERA</div>
                  <div className="text-[10px] text-neutral-600">Centers map automatically on moving UGV coordinates.</div>
                </div>
                <button
                  onClick={() => setIsFollowing(!isFollowing)}
                  className={`px-3 py-1 font-bold text-xs uppercase border transition-all ${
                    isFollowing ? 'bg-neutral-900 text-amber-50 border-neutral-900' : 'bg-amber-200 text-neutral-900 border-neutral-400'
                  }`}
                >
                  {isFollowing ? 'FOLLOW: ON' : 'FOLLOW: OFF'}
                </button>
              </div>

              <div className="flex justify-between items-center bg-amber-50 p-3 border border-neutral-300">
                <div>
                  <div className="font-bold">HAPTIC FEEDBACK INTERLOCK</div>
                  <div className="text-[10px] text-neutral-600">Vibrates smartphone upon emergency motor cutoff.</div>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 border border-emerald-300">
                  ENABLED
                </span>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-neutral-700 leading-relaxed pt-3 border-t border-neutral-300">
            Field personnel can access this companion view directly via smartphone browser to track slope progression on foot while maintaining a direct emergency override switch.
          </p>
        </div>
      </div>
    </section>
  );
}