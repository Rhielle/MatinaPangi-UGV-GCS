import React, { useState } from 'react';
import { useTelemetryStore } from '../store/useTelemetryStore';

export default function EventLogStreamer() {
  const { logs, addLog } = useTelemetryStore();
  const [filter, setFilter] = useState('ALL');

  const handleTestErrorLog = () => {
    addLog('[WARN] Sensor packet drop detected on CAN bus 1');
  };

  const filteredLogs = logs.filter((log) => {
    if (filter === 'WARN') return log.includes('WARN') || log.includes('FATAL');
    if (filter === 'CMD') return log.includes('CMD') || log.includes('WAYPOINT');
    return true;
  });

  return (
    <section className="bg-amber-50 text-neutral-900 p-5 rounded-none shadow-lg border-2 border-neutral-900 font-mono mt-6">
      {/* Node Header */}
      <div className="border-b-2 border-neutral-900 pb-2 mb-4 flex justify-between items-center text-xs font-bold uppercase tracking-wide">
        <span>NODE_08 // TELEMETRY & EVENT STREAM BUFFER</span>
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('ALL')}
            className={`px-2 py-0.5 text-[10px] font-bold border ${
              filter === 'ALL' ? 'bg-neutral-900 text-amber-50 border-neutral-900' : 'bg-transparent border-neutral-400'
            }`}
          >
            ALL
          </button>
          <button
            onClick={() => setFilter('CMD')}
            className={`px-2 py-0.5 text-[10px] font-bold border ${
              filter === 'CMD' ? 'bg-neutral-900 text-amber-50 border-neutral-900' : 'bg-transparent border-neutral-400'
            }`}
          >
            COMMANDS
          </button>
          <button
            onClick={() => setFilter('WARN')}
            className={`px-2 py-0.5 text-[10px] font-bold border ${
              filter === 'WARN' ? 'bg-rose-900 text-white border-rose-900' : 'bg-transparent border-neutral-400'
            }`}
          >
            ALERTS
          </button>
        </div>
      </div>

      {/* Log Console Window */}
      <div className="bg-neutral-950 text-amber-400 p-3 h-40 overflow-y-auto border border-neutral-800 text-xs font-mono space-y-1 mb-4 shadow-inner">
        {filteredLogs.length === 0 ? (
          <div className="text-neutral-600 italic">No events match the active filter criteria.</div>
        ) : (
          filteredLogs.map((log, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-2 ${
                log.includes('FATAL') || log.includes('WARN') ? 'text-rose-400 font-bold' : 'text-amber-400/90'
              }`}
            >
              <span className="text-neutral-600 select-none">&gt;</span>
              <span className="break-all">{log}</span>
            </div>
          ))
        )}
      </div>

      {/* Footer Controls */}
      <div className="flex justify-between items-center pt-2 border-t border-neutral-300">
        <span className="text-[11px] font-bold text-neutral-700">BUFFER CAPACITY: {logs.length} ENTRIES</span>
        <button
          onClick={handleTestErrorLog}
          className="bg-neutral-900 text-amber-50 text-xs px-3 py-1.5 font-bold uppercase hover:bg-neutral-800 active:translate-y-0.5 transition-all"
        >
          Inject Test Alert
        </button>
      </div>
    </section>
  );
}