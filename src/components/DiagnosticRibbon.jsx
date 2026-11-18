import React, { useState, useEffect } from 'react';
import { useTelemetryStore } from '../store/useTelemetryStore';

export default function DiagnosticRibbon() {
  const isConnected = useTelemetryStore((state) => state.isConnected);
  const [packetCount, setPacketCount] = useState(1420);
  const [latency, setLatency] = useState(18);

  // Simulate incoming packet rate fluctuations
  useEffect(() => {
    if (!isConnected) return;
    const interval = setInterval(() => {
      setPacketCount((prev) => prev + Math.floor(Math.random() * 5) + 1);
      setLatency(Math.floor(15 + Math.random() * 10));
    }, 1500);
    return () => clearInterval(interval);
  }, [isConnected]);

  return (
    <footer className="mt-6 bg-amber-50 text-neutral-900 border-2 border-neutral-900 p-4 font-mono text-xs flex flex-col md:flex-row justify-between items-center gap-3 shadow-lg">
      <div className="flex items-center gap-4">
        <span className="font-bold uppercase tracking-wider text-neutral-700">
          SYS_DIAGNOSTICS // PROTOCOL v4.2
        </span>
        <span className="bg-neutral-900 text-amber-50 px-2 py-0.5 text-[10px]">
          MQTT_BROKER: LOCALHOST:1883
        </span>
      </div>

      <div className="flex items-center gap-6 text-[11px]">
        <div>
          <span className="text-neutral-600">PACKETS_RX:</span>{' '}
          <span className="font-bold font-mono">{packetCount}</span>
        </div>
        <div>
          <span className="text-neutral-600">LATENCY:</span>{' '}
          <span className="font-bold font-mono text-emerald-800">{latency} ms</span>
        </div>
        <div>
          <span className="text-neutral-600">BUFFER:</span>{' '}
          <span className="font-bold font-mono">0.02 KB</span>
        </div>
      </div>
    </footer>
  );
}