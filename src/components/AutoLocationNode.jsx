import React from 'react';
import { Navigation, Radio, AlertTriangle, ExternalLink } from 'lucide-react';
import { useAutoLocationTracker } from '../hooks/useAutoLocationTracker';

export default function AutoLocationNode({ telemetry }) {
  const {
    operatorPos,
    operatorError,
    robotPos,
    distanceToRobotMeters,
    landslideAlerts
  } = useAutoLocationTracker(telemetry);

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 font-mono space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
        <div className="flex items-center gap-2">
          <Navigation className="w-4 h-4 text-amber-500" />
          <h2 className="text-xs font-bold tracking-wider uppercase text-neutral-200">
            LIVE AUTO-LOCATION & LANDSLIDE TRACKER
          </h2>
        </div>
        {distanceToRobotMeters !== null && (
          <span className="text-[11px] bg-neutral-950 border border-neutral-800 px-2 py-0.5 rounded text-cyan-400">
            DISTANCE: {distanceToRobotMeters}m
          </span>
        )}
      </div>

      {/* Operator vs. Robot Live Coordinates */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        {/* Where YOU are */}
        <div className="bg-neutral-950 border border-neutral-800 rounded-lg p-3">
          <div className="text-[10px] text-neutral-500 mb-1">YOUR LOCATION (OPERATOR GCS)</div>
          {operatorPos ? (
            <div className="text-emerald-400 font-bold">
              {operatorPos.lat.toFixed(5)}° N, {operatorPos.lng.toFixed(5)}° E
              <span className="block text-[10px] text-neutral-500 font-normal mt-0.5">
                GPS Accuracy: ±{operatorPos.accuracy}m
              </span>
            </div>
          ) : (
            <div className="text-amber-400 text-[11px]">
              {operatorError ? `Location blocked: ${operatorError}` : 'Detecting your GPS...'}
            </div>
          )}
        </div>

        {/* Where the ROBOT is */}
        <div className="bg-neutral-950 border border-neutral-800 rounded-lg p-3">
          <div className="text-[10px] text-neutral-500 mb-1 flex items-center gap-1">
            <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
            ROBOT LIVE LOCATION (UGV)
          </div>
          {robotPos ? (
            <div className="text-cyan-400 font-bold">
              {robotPos.lat.toFixed(5)}° N, {robotPos.lng.toFixed(5)}° E
              <a
                href={`https://www.google.com/maps?q=${robotPos.lat},${robotPos.lng}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-[10px] text-neutral-400 hover:text-cyan-300 font-normal mt-0.5"
              >
                Open Robot Pin in Maps <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
          ) : (
            <div className="text-neutral-500 text-[11px]">Waiting for UGV GPS fix...</div>
          )}
        </div>
      </div>

      {/* Automatic Landslide Detection Coordinates */}
      <div className="space-y-2">
        <div className="text-[10px] text-neutral-400 uppercase tracking-wider">
          DETECTED LANDSLIDE HAZARD ZONES ({landslideAlerts.length})
        </div>

        {landslideAlerts.length === 0 ? (
          <div className="bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-xs text-neutral-500">
            No active landslide zones detected yet. System automatically pins GPS coordinates when risk reaches ≥ 50%.
          </div>
        ) : (
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {landslideAlerts.map((alert) => (
              <div
                key={alert.id}
                className="bg-rose-950/30 border border-rose-800/70 rounded-lg p-2.5 flex items-center justify-between text-xs"
              >
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5 animate-pulse" />
                  <div>
                    <div className="font-bold text-rose-300">
                      {alert.riskTier} ({alert.riskPercent}%) — {alert.rainLabel}
                    </div>
                    <div className="text-[11px] text-neutral-300">
                      Coords: {alert.lat.toFixed(5)}° N, {alert.lng.toFixed(5)}° E • {alert.timestamp}
                    </div>
                  </div>
                </div>
                <a
                  href={`https://www.google.com/maps?q=${alert.lat},${alert.lng}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-2 py-1 bg-rose-900/60 hover:bg-rose-800 text-rose-200 rounded text-[10px] flex items-center gap-1 shrink-0"
                >
                  Map <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}