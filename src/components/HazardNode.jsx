import React, { useState, useMemo } from 'react';
import { AlertTriangle, ShieldCheck, Layers, SlidersHorizontal } from 'lucide-react';
import { calculateLandslideRisk } from '../utils/landslideRiskModel';

export default function HazardNode({ telemetry }) {
  const [simRainMmHr, setSimRainMmHr] = useState(null);

  const liveRainMmHr = simRainMmHr !== null ? simRainMmHr : (telemetry?.env?.rainMm ?? 1.8);
  const liveSoilPercent = telemetry?.soil?.moisturePercent ?? 78;
  const livePitchDeg = telemetry?.imu?.pitch ?? 14.5;
  const liveVibrationG = telemetry?.imu?.vibrationG ?? 0.08;

  const assessment = useMemo(() => {
    return calculateLandslideRisk({
      soilMoisturePercent: liveSoilPercent,
      rainMmHr: liveRainMmHr,
      pitchDeg: livePitchDeg,
      vibrationG: liveVibrationG
    });
  }, [liveSoilPercent, liveRainMmHr, livePitchDeg, liveVibrationG]);

  return (
    <div className="bg-slate-950 text-slate-100 border border-slate-800 rounded-xl shadow-xl font-mono overflow-hidden">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 px-4 py-3">
        <div className="flex items-center space-x-2">
          <Layers className="w-5 h-5 text-amber-400" />
          <h2 className="text-sm font-semibold tracking-wide">
            LANDSLIDE HAZARD & RAINFALL MATRIX
          </h2>
        </div>
        <span className={`px-2.5 py-0.5 rounded-full border text-xs font-semibold ${assessment.rainTier.badgeStyle}`}>
          {assessment.rainTier.label.toUpperCase()} ({liveRainMmHr} mm/hr)
        </span>
      </div>

      {/* Body */}
      <div className="p-4 space-y-4">
        {/* Main Landslide Percentage Readout */}
        <div className={`bg-slate-900 border ${assessment.borderColor} rounded-lg p-3 flex items-center justify-between`}>
          <div>
            <div className="text-[11px] text-slate-400">COMPUTED LANDSLIDE PROBABILITY</div>
            <div className={`text-3xl font-bold ${assessment.textColor}`}>
              {assessment.totalRiskPercent}%
            </div>
            <div className={`text-xs font-semibold mt-0.5 ${assessment.textColor}`}>
              {assessment.riskTier}
            </div>
          </div>
          {assessment.totalRiskPercent >= 50 ? (
            <AlertTriangle className={`w-9 h-9 ${assessment.textColor} animate-pulse`} />
          ) : (
            <ShieldCheck className="w-9 h-9 text-emerald-400" />
          )}
        </div>

        {/* Recommended UGV Protocol */}
        <div className="bg-slate-900/80 border border-slate-800 rounded px-3 py-2 text-xs flex flex-wrap items-center justify-between gap-2">
          <span className="text-slate-400">UGV PROTOCOL:</span>
          <span className="text-cyan-300 font-semibold">{assessment.rainTier.ugvAction}</span>
        </div>

        {/* 4-Factor Weight Breakdown */}
        <div className="space-y-2 text-[11px]">
          <div className="flex justify-between">
            <span className="text-slate-400">1. Subsurface Soil Saturation ({liveSoilPercent}%)</span>
            <span className="text-cyan-300 font-bold">{assessment.breakdown.soilPts} / 40%</span>
          </div>
          <div className="w-full bg-slate-900 h-1.5 rounded overflow-hidden">
            <div className="bg-cyan-500 h-full transition-all" style={{ width: `${(assessment.breakdown.soilPts / 40) * 100}%` }} />
          </div>

          <div className="flex justify-between pt-1">
            <span className="text-slate-400">2. Rainfall Intensity ({assessment.rainTier.rangeText})</span>
            <span className="text-blue-300 font-bold">{assessment.breakdown.rainPts} / 20%</span>
          </div>
          <div className="w-full bg-slate-900 h-1.5 rounded overflow-hidden">
            <div className="bg-blue-500 h-full transition-all" style={{ width: `${(assessment.breakdown.rainPts / 20) * 100}%` }} />
          </div>

          <div className="flex justify-between pt-1">
            <span className="text-slate-400">3. Slope Tilt Angle ({Math.abs(livePitchDeg)}°)</span>
            <span className="text-amber-300 font-bold">{assessment.breakdown.slopePts} / 25%</span>
          </div>
          <div className="w-full bg-slate-900 h-1.5 rounded overflow-hidden">
            <div className="bg-amber-500 h-full transition-all" style={{ width: `${(assessment.breakdown.slopePts / 25) * 100}%` }} />
          </div>

          <div className="flex justify-between pt-1">
            <span className="text-slate-400">4. Seismic / Ground Vibration ({liveVibrationG} G)</span>
            <span className="text-emerald-300 font-bold">{assessment.breakdown.vibePts} / 15%</span>
          </div>
          <div className="w-full bg-slate-900 h-1.5 rounded overflow-hidden">
            <div className="bg-emerald-500 h-full transition-all" style={{ width: `${(assessment.breakdown.vibePts / 15) * 100}%` }} />
          </div>
        </div>

        {/* 4-Tier Rainfall Simulator Controls */}
        <div className="pt-2 border-t border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-[10px] text-slate-400">
            <span className="flex items-center gap-1">
              <SlidersHorizontal className="w-3 h-3 text-cyan-400" />
              SIMULATE RAIN INTENSITY TIER:
            </span>
            {simRainMmHr !== null && (
              <button
                type="button"
                onClick={() => setSimRainMmHr(null)}
                className="text-amber-400 hover:underline cursor-pointer"
              >
                Reset to Live Sensor
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
            {[
              { label: 'Light (<2.5)', val: 1.5 },
              { label: 'Moderate (2.5-7.5)', val: 5.0 },
              { label: 'Heavy (7.5-15)', val: 11.2 },
              { label: 'Intense (>15)', val: 22.0 }
            ].map((preset) => (
              <button
                key={preset.label}
                type="button"
                onClick={() => setSimRainMmHr(preset.val)}
                className={`h-7 rounded border text-[10px] px-1.5 transition-colors cursor-pointer ${
                  liveRainMmHr === preset.val
                    ? 'bg-cyan-950 text-cyan-300 border-cyan-600 font-semibold'
                    : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}