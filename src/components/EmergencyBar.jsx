import React from 'react';
import { useTelemetryStore } from '../store/useTelemetryStore';

export default function EmergencyBar() {
  const { emergencyStop, triggerEmergencyStop } = useTelemetryStore();

  return (
    <div
      className={`my-4 p-3 border-2 font-mono flex justify-between items-center transition-all ${
        emergencyStop
          ? 'bg-rose-950 border-rose-600 text-rose-100 animate-pulse shadow-2xl'
          : 'bg-neutral-900 border-neutral-800 text-neutral-300'
      }`}
    >
      <div className="flex items-center gap-3 text-xs">
        <span
          className={`w-3 h-3 rounded-full ${
            emergencyStop ? 'bg-rose-500 animate-ping' : 'bg-neutral-600'
          }`}
        ></span>
        <span className="font-bold tracking-wider">
          {emergencyStop ? 'SYSTEM HALTED // E-STOP ACTIVE' : 'SAFETY INTERLOCK: STANDBY'}
        </span>
      </div>

      <button
        onClick={triggerEmergencyStop}
        className={`px-4 py-2 text-xs font-bold uppercase tracking-wider border-2 transition-all active:translate-y-0.5 ${
          emergencyStop
            ? 'bg-neutral-100 text-neutral-900 border-neutral-100 hover:bg-neutral-200'
            : 'bg-rose-600 text-white border-rose-700 hover:bg-rose-700'
        }`}
      >
        {emergencyStop ? 'RELEASE E-STOP' : 'EMERGENCY STOP (E-STOP)'}
      </button>
    </div>
  );
}