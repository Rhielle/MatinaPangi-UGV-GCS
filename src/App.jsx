import React, { useEffect, useState } from 'react';

// Core Telemetry & Hazard Nodes (Primary View)
import TelemetryNode from './components/TelemetryNode';
import CommandNode from './components/CommandNode';
import SpatialNode from './components/SpatialNode';
import HazardNode from './components/HazardNode';
import EmergencyBar from './components/EmergencyBar';
import DiagnosticRibbon from './components/DiagnosticRibbon';

// Advanced Safety & Monitoring Nodes
import GeofenceBoundaryNode from './components/GeofenceBoundaryNode';
import MotorDiagnosticsNode from './components/MotorDiagnosticsNode';
import SensorChartNode from './components/SensorChartNode';
import MqttHealthWatchdog from './components/MqttHealthWatchdog';
import RtlControllerNode from './components/RtlControllerNode';

// Secondary Subsystem Nodes (Organized into Tabs/Drawers)
import WaypointQueue from './components/WaypointQueue';
import SensorChart from './components/SensorChart';
import InteractiveMapNode from './components/InteractiveMapNode';
import PidTuningNode from './components/PidTuningNode';
import ActuatorHalNode from './components/ActuatorHalNode';
import CameraReconNode from './components/CameraReconNode';
import MacroTerminalNode from './components/MacroTerminalNode';
import PowerManagementNode from './components/PowerManagementNode';
import MobileCompanionNode from './components/MobileCompanionNode';
import EventLogStreamer from './components/EventLogStreamer';

import { useTelemetryStore } from './store/useTelemetryStore';

export default function App() {
  const isConnected = useTelemetryStore((state) => state.isConnected);
  const telemetry = useTelemetryStore((state) => state.telemetry);
  const initMqtt = useTelemetryStore((state) => state.initMqtt);
  const tickSimulation = useTelemetryStore((state) => state.tickSimulation);

  // Clean Navigation State for Tabs
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'gis' | 'subsystems' | 'logs'

  useEffect(() => {
    initMqtt();
    const interval = setInterval(() => {
      tickSimulation();
    }, 2000);
    return () => clearInterval(interval);
  }, [initMqtt, tickSimulation]);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-mono p-4 sm:p-6 flex flex-col justify-between selection:bg-amber-500 selection:text-neutral-950">
      <div className="space-y-6">
        
        {/* Modern Clean Header */}
        <header className="border-b border-neutral-800 pb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
              <h1 className="text-lg sm:text-xl font-bold tracking-wider text-amber-500 uppercase">
                MATINA PANGI // GCS TERMINUS
              </h1>
            </div>
            <p className="text-xs text-neutral-400 mt-0.5">
              Landslide Monitoring UGV Command & Telemetry Interface
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick Status Pill */}
            <div className="text-xs bg-neutral-900 border border-neutral-800 px-3 py-1.5 rounded-lg flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-emerald-500 animate-ping' : 'bg-rose-500'}`} />
              <span>LINK:</span>
              <span className={isConnected ? 'text-emerald-400 font-semibold' : 'text-rose-400 font-semibold'}>
                {isConnected ? 'ACTIVE' : 'OFFLINE'}
              </span>
            </div>
          </div>
        </header>

        {/* Global Emergency Interlock Bar (Always Visible for Safety) */}
        <EmergencyBar />

        {/* Clean Modern Navigation Tabs */}
        <nav className="flex flex-wrap gap-2 border-b border-neutral-800 pb-3">
          {[
            { id: 'dashboard', label: '1. MISSION DASHBOARD & HAZARDS' },
            { id: 'gis', label: '2. GIS MAPPING & WAYPOINTS' },
            { id: 'subsystems', label: '3. HARDWARE & ACTUATORS' },
            { id: 'logs', label: '4. EVENT LOGS & TERMINAL' }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-xs font-bold tracking-wide transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30 shadow-lg'
                  : 'bg-neutral-900 text-neutral-400 border border-neutral-800 hover:bg-neutral-800 hover:text-neutral-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* ================= TAB 1: MAIN MISSION DASHBOARD ================= */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Top Primary Telemetry Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <TelemetryNode />
              <CommandNode />
              <SpatialNode />
              <HazardNode telemetry={telemetry} />
            </div>

            {/* Advanced Geotechnical & Safety Subsystems */}
            <div className="bg-neutral-900/40 border border-neutral-800/80 rounded-2xl p-4 sm:p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <h2 className="text-xs font-bold tracking-widest text-neutral-400 uppercase">
                  ADVANCED SAFETY & TELEMETRY MONITORS
                </h2>
                <span className="text-[10px] text-neutral-500">REAL-TIME TELEMETRY FUSION</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <GeofenceBoundaryNode
                  currentLat={telemetry?.gps?.lat ?? 7.0709}
                  currentLng={telemetry?.gps?.lng ?? 125.6089}
                />
                <MotorDiagnosticsNode
                  currentAmps={telemetry?.power?.current ?? 3.8}
                  driverTempC={telemetry?.power?.driverTempC ?? 44.2}
                />
                <MqttHealthWatchdog />
                <RtlControllerNode
                  onTriggerRtl={(active) => console.log('RTL State Changed:', active)}
                />
              </div>

              <SensorChartNode />
            </div>
          </div>
        )}

        {/* ================= TAB 2: GIS & WAYPOINTS ================= */}
        {activeTab === 'gis' && (
          <div className="space-y-6 animate-fadeIn">
            <InteractiveMapNode />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <WaypointQueue />
              <SensorChart />
            </div>
            <MobileCompanionNode />
          </div>
        )}

        {/* ================= TAB 3: HARDWARE & SUBSYSTEMS ================= */}
        {activeTab === 'subsystems' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ActuatorHalNode />
              <PowerManagementNode />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PidTuningNode />
              <CameraReconNode />
            </div>
          </div>
        )}

        {/* ================= TAB 4: LOGS & SCRIPTING ================= */}
        {activeTab === 'logs' && (
          <div className="space-y-6 animate-fadeIn">
            <MacroTerminalNode />
            <EventLogStreamer />
          </div>
        )}

      </div>

      {/* Footer Diagnostic Bar */}
      <div className="mt-8 pt-4 border-t border-neutral-800">
        <DiagnosticRibbon />
      </div>
    </div>
  );
}