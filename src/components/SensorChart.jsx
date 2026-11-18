import React, { useState, useEffect } from 'react';
import { useTelemetryStore } from '../store/useTelemetryStore';

export default function SensorChart() {
  const { vibration, soilMoisture, isConnected } = useTelemetryStore();
  const [history, setHistory] = useState([]);

  // Record data points every time telemetry updates
  useEffect(() => {
    if (!isConnected) return;
    const now = new Date().toLocaleTimeString();
    setHistory((prev) => {
      const newEntry = { time: now, vib: vibration, moist: soilMoisture };
      const updated = [...prev, newEntry];
      return updated.slice(-10); // Keep last 10 points for live wave view
    });
  }, [vibration, soilMoisture, isConnected]);

  return (
    <section className="bg-amber-50 text-neutral-900 p-5 rounded-none shadow-lg border-2 border-neutral-900 font-mono mt-6">
      {/* Header */}
      <div className="border-b-2 border-neutral-900 pb-2 mb-4 flex justify-between items-center text-xs font-bold uppercase tracking-wide">
        <span>NODE_05 // SENSOR TELEMETRY WAVEFORM</span>
        <span className="bg-neutral-900 text-amber-50 px-2 py-0.5 text-xs font-bold">
          LIVE STREAM
        </span>
      </div>

      {/* Waveform Visualization Grid */}
      <div className="bg-amber-100/60 p-4 border border-neutral-400 space-y-3">
        <div className="flex justify-between text-xs font-bold text-neutral-700">
          <span>RECENT BUFFER HISTORY (10 TICKS)</span>
          <span>VIB (g) / MOIST (%)</span>
        </div>

        <div className="space-y-2">
          {history.length === 0 ? (
            <div className="text-xs text-neutral-500 italic text-center py-4">
              Awaiting telemetry transmission frames...
            </div>
          ) : (
            history.map((pt, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs font-mono border-b border-neutral-300 pb-1">
                <span className="text-neutral-500">{pt.time}</span>
                <div className="flex items-center gap-4">
                  <span className="text-neutral-700">VIB: <strong className="text-neutral-900">{pt.vib}g</strong></span>
                  <span className="text-neutral-700">MOIST: <strong className="text-neutral-900">{pt.moist}%</strong></span>
                </div>
                {/* Visual meter bar */}
                <div className="w-24 bg-neutral-300 h-2 overflow-hidden border border-neutral-500">
                  <div 
                    className="bg-neutral-900 h-full transition-all duration-500" 
                    style={{ width: `${Math.min(100, pt.moist)}%` }}
                  ></div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}