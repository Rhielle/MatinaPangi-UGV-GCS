import React from 'react';
import { useTelemetryStore } from '../store/useTelemetryStore';

export default function PowerManagementNode() {
  const { battery } = useTelemetryStore();

  const powerRails = [
    { id: 'BUS_5V', name: 'Logic & Sensors', voltage: 5.02, current: 1.45, status: 'NOMINAL' },
    { id: 'BUS_12V', name: 'Actuators & Relays', voltage: 12.14, current: 3.82, status: 'NOMINAL' },
    { id: 'BUS_24V', name: 'Drive Motors', voltage: 24.20, current: 5.60, status: 'NOMINAL' },
    { id: 'SOLAR', name: 'Solar Trickle Array', voltage: 18.65, current: 0.92, status: 'CHARGING' },
  ];

  return (
    <section className="bg-amber-50 text-neutral-900 p-5 rounded-none shadow-lg border-2 border-neutral-900 font-mono mt-6">
      {/* Node Header */}
      <div className="border-b-2 border-neutral-900 pb-2 mb-4 flex justify-between items-center text-xs font-bold uppercase tracking-wide">
        <span>NODE_12 // POWER & THERMAL DISTRIBUTION</span>
        <span className="bg-neutral-900 text-amber-50 px-2 py-0.5 text-xs font-bold">
          MAIN: {battery}% // 24V LI-PO
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {powerRails.map((rail) => (
          <div key={rail.id} className="bg-amber-100/60 p-4 border border-neutral-400 space-y-3">
            <div className="flex justify-between items-center text-[10px] font-bold text-neutral-600">
              <span>{rail.id}</span>
              <span className="text-emerald-800">{rail.status}</span>
            </div>

            <div>
              <div className="text-xs font-bold text-neutral-900">{rail.name}</div>
            </div>

            <div className="space-y-1 text-xs font-mono border-t border-neutral-300 pt-2">
              <div className="flex justify-between">
                <span className="text-neutral-600">VOLTAGE:</span>
                <span className="font-bold">{rail.voltage} V</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">CURRENT:</span>
                <span className="font-bold">{rail.current} A</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}