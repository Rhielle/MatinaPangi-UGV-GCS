import React, { useState, useEffect } from 'react';
import { Wifi, Radio, AlertCircle } from 'lucide-react';

export default function MqttHealthWatchdog() {
  const [latency, setLatency] = useState(18);
  const [packetCount, setPacketCount] = useState(1420);

  useEffect(() => {
    const timer = setInterval(() => {
      setLatency(Math.floor(12 + Math.random() * 25));
      setPacketCount(prev => prev + 1);
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-slate-950 text-slate-100 border border-slate-800 rounded-xl p-4 font-mono shadow-xl space-y-3">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div className="flex items-center space-x-2">
          <Wifi className="w-5 h-5 text-emerald-400" />
          <h2 className="text-sm font-semibold tracking-wide">MQTT WEBSOCKET LINK WATCHDOG</h2>
        </div>
        <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold">
          BROKER ONLINE
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 text-xs">
        <div className="bg-slate-900 p-2.5 rounded border border-slate-800">
          <span className="text-slate-500 text-[10px] block">PING LATENCY</span>
          <span className="text-emerald-400 font-bold text-sm">{latency} ms</span>
        </div>
        <div className="bg-slate-900 p-2.5 rounded border border-slate-800">
          <span className="text-slate-500 text-[10px] block">PACKETS RECEIVED</span>
          <span className="text-cyan-300 font-bold text-sm">{packetCount}</span>
        </div>
        <div className="bg-slate-900 p-2.5 rounded border border-slate-800">
          <span className="text-slate-500 text-[10px] block">QOS LEVEL</span>
          <span className="text-amber-300 font-bold text-sm">QoS 1</span>
        </div>
      </div>
    </div>
  );
}