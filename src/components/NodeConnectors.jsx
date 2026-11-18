import React from 'react';

export default function NodeConnectors() {
  return (
    <div className="hidden lg:flex justify-between items-center px-4 py-2 my-2 text-[10px] font-mono text-neutral-500 uppercase tracking-widest border-y border-dashed border-neutral-800">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-amber-500"></span>
        <span>BUS_01: TELEMETRY ➔ COMMAND</span>
      </div>
      <span className="text-neutral-700">|</span>
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
        <span>BUS_02: SPATIAL ➔ HAZARD SCAN</span>
      </div>
      <span className="text-neutral-700">|</span>
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-sky-500"></span>
        <span>BUS_03: TELEMETRY ➔ DIAGNOSTICS</span>
      </div>
    </div>
  );
}