import React, { useState } from 'react';
import { useTelemetryStore } from '../store/useTelemetryStore';

export default function CameraReconNode() {
  const { addLog } = useTelemetryStore();
  const [thermalMode, setThermalMode] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  const handleCaptureSnapshot = () => {
    addLog(`[OPTICAL] High-res snapshot captured (Zoom: ${zoomLevel}x, Thermal: ${thermalMode ? 'ACTIVE' : 'OFF'})`);
  };

  return (
    <section className="bg-amber-50 text-neutral-900 p-5 rounded-none shadow-lg border-2 border-neutral-900 font-mono mt-6">
      <div className="border-b-2 border-neutral-900 pb-2 mb-4 flex justify-between items-center text-xs font-bold uppercase tracking-wide">
        <span>NODE_09 // OPTICAL RECON & THERMAL IMAGING</span>
        <span className="bg-neutral-900 text-amber-50 px-2 py-0.5 text-xs font-bold">
          CAM_01: {thermalMode ? 'FLIR_THERMAL' : 'RGB_HD'}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
        <div className={`lg:col-span-2 relative border-2 border-neutral-900 h-64 flex flex-col justify-between p-4 overflow-hidden transition-all ${
          thermalMode ? 'bg-gradient-to-br from-indigo-950 via-purple-950 to-amber-950 text-amber-300' : 'bg-neutral-900 text-emerald-400'
        }`}>
          <div className="flex justify-between items-start text-[10px] font-mono tracking-widest opacity-80">
            <span>REC // 30 FPS</span>
            <span>ZOOM: {zoomLevel}.0X</span>
            <span>FOV: 65°</span>
          </div>

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
            <div className="w-32 h-32 border border-current rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-current rounded-full"></div>
            </div>
          </div>

          <div className="text-center font-bold text-xs tracking-wider">
            {thermalMode ? 'THERMAL SIGNATURE SCAN // SLOPE STABILITY CHECK' : 'OPTICAL FEED // MATINA PANGI SECTOR B'}
          </div>

          <div className="flex justify-between items-end text-[10px] font-mono opacity-80">
            <span>LAT: 7.0736° N</span>
            <span>LNG: 125.6128° E</span>
          </div>
        </div>

        <div className="space-y-4 bg-amber-100/60 p-4 border border-neutral-400">
          <div className="text-xs font-bold text-neutral-800 border-b border-neutral-300 pb-2">
            OPTICAL CONTROLS
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-neutral-700">FLIR THERMAL:</span>
              <button
                onClick={() => setThermalMode(!thermalMode)}
                className={`px-3 py-1 font-bold uppercase text-[10px] border transition-all ${
                  thermalMode ? 'bg-amber-600 text-white border-amber-700' : 'bg-neutral-900 text-amber-50 border-neutral-900'
                }`}
              >
                {thermalMode ? 'Enabled' : 'Disabled'}
              </button>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-neutral-700">MAGNIFICATION:</span>
              <div className="flex gap-1">
                {[1, 2, 4].map((z) => (
                  <button
                    key={z}
                    onClick={() => setZoomLevel(z)}
                    className={`px-2 py-0.5 text-[10px] font-bold border ${
                      zoomLevel === z ? 'bg-neutral-900 text-amber-50 border-neutral-900' : 'bg-amber-50 border-neutral-400'
                    }`}
                  >
                    {z}x
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={handleCaptureSnapshot}
            className="w-full bg-neutral-900 text-amber-50 text-xs py-2 font-bold uppercase hover:bg-neutral-800 active:translate-y-0.5 transition-all mt-2"
          >
            Capture Snapshot
          </button>
        </div>
      </div>
    </section>
  );
}