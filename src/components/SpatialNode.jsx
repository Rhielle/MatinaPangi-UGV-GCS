import React from 'react';
import { useTelemetryStore } from '../store/useTelemetryStore';

export default function SpatialNode() {
  const store = useTelemetryStore();
  
  // Safely extract coordinates whether stored flat or nested
  const lat = store.lat ?? store.position?.lat ?? 7.0736;
  const lng = store.lng ?? store.position?.lng ?? 125.6128;
  const alt = store.alt ?? store.position?.alt ?? 142.5;
  const heading = store.heading ?? 0;
  const addLog = store.addLog || (() => {});

  const handleMarkWaypoint = () => {
    addLog(`[GPS] Waypoint logged: ${lat.toFixed(4)}, ${lng.toFixed(4)}`);
  };

  return (
    <section className="bg-amber-50 text-neutral-900 p-5 rounded-none shadow-lg border-2 border-neutral-900 font-mono">
      {/* Node Header */}
      <div className="border-b-2 border-neutral-900 pb-2 mb-4 flex justify-between items-center text-xs font-bold uppercase tracking-wide">
        <span>NODE_03 // SPATIAL & NAV</span>
        <span className="bg-neutral-900 text-amber-50 px-2 py-0.5 text-xs font-bold">
          GPS LOCK
        </span>
      </div>

      {/* Coordinate Display */}
      <div className="space-y-2 mb-4">
        <div className="bg-amber-100/60 p-2 border border-neutral-400 flex justify-between text-xs">
          <span className="text-neutral-600 font-bold">LATITUDE</span>
          <span className="font-bold font-mono">{lat.toFixed(4)}° N</span>
        </div>
        <div className="bg-amber-100/60 p-2 border border-neutral-400 flex justify-between text-xs">
          <span className="text-neutral-600 font-bold">LONGITUDE</span>
          <span className="font-bold font-mono">{lng.toFixed(4)}° E</span>
        </div>
        <div className="bg-amber-100/60 p-2 border border-neutral-400 flex justify-between text-xs">
          <span className="text-neutral-600 font-bold">ALTITUDE</span>
          <span className="font-bold font-mono">{alt} m</span>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex justify-between items-center pt-2 border-t border-neutral-300">
        <span className="text-[11px] font-bold text-neutral-700">HEADING: {heading}°</span>
        <button
          onClick={handleMarkWaypoint}
          className="bg-neutral-900 text-amber-50 text-xs px-3 py-1.5 font-bold uppercase hover:bg-neutral-800 active:translate-y-0.5 transition-all"
        >
          Mark Waypoint
        </button>
      </div>
    </section>
  );
}