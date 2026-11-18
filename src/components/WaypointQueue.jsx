import React, { useState } from 'react';
import { useTelemetryStore } from '../store/useTelemetryStore';

export default function WaypointQueue() {
  const store = useTelemetryStore();
  const waypoints = store.waypoints ?? [];
  const position = store.position ?? { lat: store.lat ?? 7.0736, lng: store.lng ?? 125.6128 };
  const addWaypoint = store.addWaypoint || (() => {});
  const clearWaypoints = store.clearWaypoints || (() => {});
  
  const [targetAlt, setTargetAlt] = useState(15.0);

  const handleAddCurrentLocation = () => {
    const newWp = {
      id: `WP-0${waypoints.length + 1}`,
      lat: +(position.lat + (Math.random() * 0.002 - 0.001)).toFixed(4),
      lng: +(position.lng + (Math.random() * 0.002 - 0.001)).toFixed(4),
      alt: Number(targetAlt),
      status: 'PENDING'
    };
    addWaypoint(newWp);
  };

  return (
    <section className="bg-amber-50 text-neutral-900 p-5 rounded-none shadow-lg border-2 border-neutral-900 font-mono mt-6">
      {/* Drawer Header */}
      <div className="border-b-2 border-neutral-900 pb-2 mb-4 flex justify-between items-center text-xs font-bold uppercase tracking-wide">
        <span>MISSION_PLAN // WAYPOINT QUEUE</span>
        <span className="bg-neutral-900 text-amber-50 px-2 py-0.5 text-xs font-bold">
          {waypoints.length} QUEUED
        </span>
      </div>

      {/* Control Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 bg-amber-100/60 p-3 border border-neutral-400">
        <div className="flex items-center gap-3">
          <label className="text-xs font-bold text-neutral-700">ALTITUDE (m):</label>
          <input
            type="number"
            value={targetAlt}
            onChange={(e) => setTargetAlt(e.target.value)}
            className="w-20 bg-amber-50 border border-neutral-900 px-2 py-1 text-xs font-mono font-bold"
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleAddCurrentLocation}
            className="bg-neutral-900 text-amber-50 text-xs px-3 py-1.5 font-bold uppercase hover:bg-neutral-800 active:translate-y-0.5 transition-all"
          >
            + Add Target WP
          </button>
          <button
            onClick={clearWaypoints}
            className="border-2 border-neutral-900 bg-transparent text-neutral-900 text-xs px-3 py-1.5 font-bold uppercase hover:bg-neutral-200 active:translate-y-0.5 transition-all"
          >
            Clear List
          </button>
        </div>
      </div>

      {/* Waypoint Table */}
      <div className="overflow-x-auto border border-neutral-400">
        <table className="w-full text-left text-xs">
          <thead className="bg-amber-200/60 border-b border-neutral-400 font-bold">
            <tr>
              <th className="p-2">ID</th>
              <th className="p-2">LATITUDE</th>
              <th className="p-2">LONGITUDE</th>
              <th className="p-2">ALTITUDE</th>
              <th className="p-2">STATUS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-300">
            {waypoints.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-3 text-center text-neutral-500 italic">
                  No mission waypoints active in queue.
                </td>
              </tr>
            ) : (
              waypoints.map((wp) => (
                <tr key={wp.id} className="hover:bg-amber-100/50">
                  <td className="p-2 font-bold">{wp.id}</td>
                  <td className="p-2 font-mono">{wp.lat}° N</td>
                  <td className="p-2 font-mono">{wp.lng}° E</td>
                  <td className="p-2 font-mono">{wp.alt} m</td>
                  <td className="p-2">
                    <span className="bg-neutral-900 text-amber-50 text-[10px] px-1.5 py-0.5 font-bold">
                      {wp.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}