import React, { useState } from 'react';
import { useTelemetryStore } from '../store/useTelemetryStore';

export default function PidTuningNode() {
  const { addLog } = useTelemetryStore();
  const [kp, setKp] = useState(1.25);
  const [ki, setKi] = useState(0.05);
  const [kd, setKd] = useState(0.40);
  const [maxSpeed, setMaxSpeed] = useState(3.5);

  const handleUpdateGains = (e) => {
    e.preventDefault();
    addLog(`[PID] Gains updated -> Kp: ${kp}, Ki: ${ki}, Kd: ${kd}, MaxSpd: ${maxSpeed}m/s`);
  };

  return (
    <section className="bg-amber-50 text-neutral-900 p-5 rounded-none shadow-lg border-2 border-neutral-900 font-mono mt-6">
      {/* Node Header */}
      <div className="border-b-2 border-neutral-900 pb-2 mb-4 flex justify-between items-center text-xs font-bold uppercase tracking-wide">
        <span>NODE_06 // AUTONOMOUS PID & STABILITY</span>
        <span className="bg-neutral-900 text-amber-50 px-2 py-0.5 text-xs font-bold">
          LOOP: ACTIVE
        </span>
      </div>

      <form onSubmit={handleUpdateGains} className="space-y-3">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-amber-100/60 p-2 border border-neutral-400">
            <label className="block text-[10px] font-bold text-neutral-600 mb-1">PROPORTIONAL (Kp)</label>
            <input
              type="number"
              step="0.01"
              value={kp}
              onChange={(e) => setKp(e.target.value)}
              className="w-full bg-amber-50 border border-neutral-900 px-2 py-1 text-xs font-mono font-bold"
            />
          </div>
          <div className="bg-amber-100/60 p-2 border border-neutral-400">
            <label className="block text-[10px] font-bold text-neutral-600 mb-1">INTEGRAL (Ki)</label>
            <input
              type="number"
              step="0.01"
              value={ki}
              onChange={(e) => setKi(e.target.value)}
              className="w-full bg-amber-50 border border-neutral-900 px-2 py-1 text-xs font-mono font-bold"
            />
          </div>
          <div className="bg-amber-100/60 p-2 border border-neutral-400">
            <label className="block text-[10px] font-bold text-neutral-600 mb-1">DERIVATIVE (Kd)</label>
            <input
              type="number"
              step="0.01"
              value={kd}
              onChange={(e) => setKd(e.target.value)}
              className="w-full bg-amber-50 border border-neutral-900 px-2 py-1 text-xs font-mono font-bold"
            />
          </div>
          <div className="bg-amber-100/60 p-2 border border-neutral-400">
            <label className="block text-[10px] font-bold text-neutral-600 mb-1">MAX VELOCITY</label>
            <input
              type="number"
              step="0.1"
              value={maxSpeed}
              onChange={(e) => setMaxSpeed(e.target.value)}
              className="w-full bg-amber-50 border border-neutral-900 px-2 py-1 text-xs font-mono font-bold"
            />
          </div>
        </div>

        <div className="flex justify-between items-center pt-2 border-t border-neutral-300">
          <span className="text-[11px] font-bold text-neutral-700">STATUS: READY TO UPLOAD</span>
          <button
            type="submit"
            className="bg-neutral-900 text-amber-50 text-xs px-3 py-1.5 font-bold uppercase hover:bg-neutral-800 active:translate-y-0.5 transition-all"
          >
            Push Gains to UGV
          </button>
        </div>
      </form>
    </section>
  );
}