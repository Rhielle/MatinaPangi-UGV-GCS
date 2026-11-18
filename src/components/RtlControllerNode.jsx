import React, { useState } from 'react';
import { Navigation, RotateCcw, Home, ShieldAlert } from 'lucide-react';

export default function RtlControllerNode({ onTriggerRtl }) {
  const [rtlActive, setRtlActive] = useState(false);

  const handleRtlToggle = () => {
    const nextState = !rtlActive;
    setRtlActive(nextState);
    if (onTriggerRtl) onTriggerRtl(nextState);
  };

  return (
    <div className="bg-slate-950 text-slate-100 border border-slate-800 rounded-xl p-4 font-mono shadow-xl space-y-3">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div className="flex items-center space-x-2">
          <Home className="w-5 h-5 text-amber-400" />
          <h2 className="text-sm font-semibold tracking-wide">RETURN-TO-LAUNCH (RTL) CONTROLLER</h2>
        </div>
        <span className={`px-2 py-0.5 rounded text-[10px] border ${rtlActive ? 'bg-amber-950 text-amber-300 border-amber-600 animate-pulse' : 'bg-slate-900 text-slate-400 border-slate-800'}`}>
          {rtlActive ? 'RTL AUTONOMOUSLY ENGAGED' : 'STANDBY'}
        </span>
      </div>

      <div className="flex items-center justify-between gap-3 pt-1">
        <div className="text-xs text-slate-400">
          Retracts soil probe, clears waypoint queue, and navigates back to base GPS coordinates.
        </div>
        <button
          type="button"
          onClick={handleRtlToggle}
          className={`px-4 py-2 rounded font-bold text-xs cursor-pointer transition-colors shrink-0 ${
            rtlActive 
              ? 'bg-amber-600 hover:bg-amber-700 text-slate-950' 
              : 'bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700'
          }`}
        >
          {rtlActive ? 'ABORT RTL / MANUAL' : 'TRIGGER RTL'}
        </button>
      </div>
    </div>
  );
}