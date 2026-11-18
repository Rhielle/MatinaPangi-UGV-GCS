import React from 'react';
import { useTelemetryStore } from '../store/useTelemetryStore';

export default function TelemetryNode() {
  const { isConnected, mode, battery, signalStrength, speed, heading, updateTelemetry } =
    useTelemetryStore();

  const handleSimulateSpeed = () => {
    // Quick test helper to verify state reactivity
    const newSpeed = +(Math.random() * 3).toFixed(2);
    updateTelemetry({ speed: newSpeed });
  };

  return (
    <section className="bg-amber-50 text-neutral-900 p-5 rounded-none shadow-lg border-2 border-neutral-900 font-mono">
      {/* Node Header */}
      <div className="border-b-2 border-neutral-900 pb-2 mb-4 flex justify-between items-center text-xs font-bold uppercase tracking-wide">
        <span>NODE_01 // TELEMETRY CORE</span>
        <span
          className={`px-2 py-0.5 text-xs font-bold ${
            isConnected ? 'bg-emerald-800 text-emerald-100' : 'bg-rose-800 text-rose-100'
          }`}
        >
          {isConnected ? 'ONLINE' : 'DISCONNECTED'}
        </span>
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-2 gap-3 text-xs mb-4">
        <div className="bg-amber-100/60 p-2.5 border border-neutral-400">
          <span className="block text-neutral-600 text-[10px] font-bold">BATTERY LEVEL</span>
          <span className="text-base font-bold text-neutral-900">{battery}%</span>
        </div>
        <div className="bg-amber-100/60 p-2.5 border border-neutral-400">
          <span className="block text-neutral-600 text-[10px] font-bold">SIGNAL STRENGTH</span>
          <span className="text-base font-bold text-neutral-900">{signalStrength} dBm</span>
        </div>
        <div className="bg-amber-100/60 p-2.5 border border-neutral-400">
          <span className="block text-neutral-600 text-[10px] font-bold">CURRENT SPEED</span>
          <span className="text-base font-bold text-neutral-900">{speed} m/s</span>
        </div>
        <div className="bg-amber-100/60 p-2.5 border border-neutral-400">
          <span className="block text-neutral-600 text-[10px] font-bold">HEADING</span>
          <span className="text-base font-bold text-neutral-900">{heading}°</span>
        </div>
      </div>

      {/* Control Action */}
      <div className="flex justify-between items-center pt-2 border-t border-neutral-300">
        <span className="text-[11px] font-bold text-neutral-700">MODE: {mode}</span>
        <button
          onClick={handleSimulateSpeed}
          className="bg-neutral-900 text-amber-50 text-xs px-3 py-1.5 font-bold uppercase hover:bg-neutral-800 active:translate-y-0.5 transition-all"
        >
          Simulate Pulse
        </button>
      </div>
    </section>
  );
}