import React, { useState } from 'react';
import { Zap, AlertTriangle, RefreshCw, Cpu } from 'lucide-react';

export default function MotorDiagnosticsNode({ currentAmps = 2.4, driverTempC = 41.5 }) {
  const isOverheating = driverTempC > 65.0;
  const isOverCurrent = currentAmps > 8.0;

  return (
    <div className="bg-slate-950 text-slate-100 border border-slate-800 rounded-xl p-4 font-mono shadow-xl space-y-3">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div className="flex items-center space-x-2">
          <Zap className="w-5 h-5 text-yellow-400" />
          <h2 className="text-sm font-semibold tracking-wide">BTS7960 MOTOR & THERMAL HEALTH</h2>
        </div>
        <span className={`px-2 py-0.5 rounded text-[10px] border ${isOverheating || isOverCurrent ? 'bg-red-950 text-red-300 border-red-700 animate-pulse' : 'bg-emerald-950 text-emerald-300 border-emerald-800'}`}>
          {isOverheating || isOverCurrent ? 'DRIVER WARNING' : 'DRIVERS NOMINAL'}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="bg-slate-900 p-2.5 rounded border border-slate-800 space-y-1">
          <span className="text-slate-500 text-[10px]">TOTAL CURRENT DRAW</span>
          <div className="text-lg font-bold text-yellow-400">{currentAmps} A</div>
          <span className="text-[10px] text-slate-400">Max Limit: 10.0 A</span>
        </div>
        <div className="bg-slate-900 p-2.5 rounded border border-slate-800 space-y-1">
          <span className="text-slate-500 text-[10px]">HEATSINK TEMP</span>
          <div className={`text-lg font-bold ${isOverheating ? 'text-red-400' : 'text-cyan-400'}`}>{driverTempC}°C</div>
          <span className="text-[10px] text-slate-400">Threshold: 75°C</span>
        </div>
      </div>
    </div>
  );
}