import React from 'react';
import { useTelemetryStore } from '../store/useTelemetryStore';

export default function CommandNode() {
  const { isArmed, toggleArm, logs, addLog } = useTelemetryStore();

  const handleManualOverride = () => {
    addLog('[CMD] Manual override requested');
  };

  return (
    <section className="bg-amber-50 text-neutral-900 p-5 rounded-none shadow-lg border-2 border-neutral-900 font-mono">
      {/* Node Header */}
      <div className="border-b-2 border-neutral-900 pb-2 mb-4 flex justify-between items-center text-xs font-bold uppercase tracking-wide">
        <span>NODE_02 // COMMAND & CONTROL</span>
        <span
          className={`px-2 py-0.5 text-xs font-bold ${
            isArmed ? 'bg-rose-800 text-rose-100' : 'bg-neutral-800 text-neutral-100'
          }`}
        >
          {isArmed ? 'ARMED' : 'SAFE'}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <button
          onClick={toggleArm}
          className={`p-2.5 text-xs font-bold uppercase border-2 border-neutral-900 transition-all active:translate-y-0.5 ${
            isArmed
              ? 'bg-rose-600 text-white hover:bg-rose-700'
              : 'bg-emerald-600 text-white hover:bg-emerald-700'
          }`}
        >
          {isArmed ? 'DISARM UGV' : 'ARM UGV'}
        </button>

        <button
          onClick={handleManualOverride}
          className="p-2.5 text-xs font-bold uppercase border-2 border-neutral-900 bg-neutral-900 text-amber-50 hover:bg-neutral-800 active:translate-y-0.5 transition-all"
        >
          Override
        </button>
      </div>

      {/* Terminal Log Output */}
      <div className="border border-neutral-400 bg-neutral-900 text-emerald-400 p-3 h-32 overflow-y-auto text-[11px]">
        <div className="text-neutral-500 text-[10px] uppercase border-b border-neutral-800 pb-1 mb-1">
          // AUDIT LOG
        </div>
        {logs.map((log, index) => (
          <div key={index} className="leading-tight mb-1">
            {log}
          </div>
        ))}
      </div>
    </section>
  );
}