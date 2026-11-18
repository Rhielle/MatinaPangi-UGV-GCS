import React, { useState } from 'react';
import { ShieldAlert, MapPin, CheckCircle2, AlertOctagon } from 'lucide-react';

export default function GeofenceBoundaryNode({ currentLat = 7.0709, currentLng = 125.6089 }) {
  // Matina Pangi boundary box parameters
  const bounds = { minLat: 7.0650, maxLat: 7.0750, minLng: 125.6000, maxLng: 125.6150 };
  
  const isInside = currentLat >= bounds.minLat && currentLat <= bounds.maxLat && 
                   currentLng >= bounds.minLng && currentLng <= bounds.maxLng;

  return (
    <div className="bg-slate-950 text-slate-100 border border-slate-800 rounded-xl p-4 font-mono shadow-xl space-y-3">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div className="flex items-center space-x-2">
          <MapPin className="w-5 h-5 text-cyan-400" />
          <h2 className="text-sm font-semibold tracking-wide">GEOFENCE BOUNDARY GUARD</h2>
        </div>
        <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold border ${isInside ? 'bg-emerald-950 text-emerald-300 border-emerald-800' : 'bg-red-950 text-red-300 border-red-700 animate-pulse'}`}>
          {isInside ? 'WITHIN SAFE PERIMETER' : 'BREACH DETECTED'}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="bg-slate-900 p-2.5 rounded border border-slate-800">
          <span className="text-slate-500 block text-[10px]">CURRENT POSITION</span>
          <span className="text-cyan-300 font-bold">{currentLat.toFixed(4)}° N, {currentLng.toFixed(4)}° E</span>
        </div>
        <div className="bg-slate-900 p-2.5 rounded border border-slate-800">
          <span className="text-slate-500 block text-[10px]">ZONE STATUS</span>
          <span className={isInside ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'}>
            {isInside ? 'Nominal Field Zone' : 'Trigger RTL Protocol'}
          </span>
        </div>
      </div>
    </div>
  );
}