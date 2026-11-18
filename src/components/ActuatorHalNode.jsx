import React, { useState } from 'react';
import { useTelemetryStore } from '../store/useTelemetryStore';

export default function ActuatorHalNode() {
  const { addLog } = useTelemetryStore();
  const [actuators, setActuators] = useState([
    { id: 'MOT_FL', name: 'Front-Left Drive', temp: 38.2, status: 'ONLINE', pwm: 1450 },
    { id: 'MOT_FR', name: 'Front-Right Drive', temp: 39.0, status: 'ONLINE', pwm: 1450 },
    { id: 'MOT_RL', name: 'Rear-Left Drive', temp: 37.5, status: 'ONLINE', pwm: 1420 },
    { id: 'MOT_RR', name: 'Rear-Right Drive', temp: 38.1, status: 'ONLINE', pwm: 1420 },
    { id: 'GIMBAL', name: 'Sensor Mast Pan/Tilt', temp: 34.0, status: 'STANDBY', pwm: 1500 },
  ]);

  const handleToggleActuator = (id) => {
    setActuators((prev) =>
      prev.map((act) => {
        if (act.id === id) {
          const newStatus = act.status === 'ONLINE' ? 'DISABLED' : 'ONLINE';
          addLog(`[HAL] Actuator ${act.id} state changed to ${newStatus}`);
          return { ...act, status: newStatus };
        }
        return act;
      })
    );
  };

  return (
    <section className="bg-amber-50 text-neutral-900 p-5 rounded-none shadow-lg border-2 border-neutral-900 font-mono mt-6">
      {/* Node Header */}
      <div className="border-b-2 border-neutral-900 pb-2 mb-4 flex justify-between items-center text-xs font-bold uppercase tracking-wide">
        <span>NODE_07 // HAL & ACTUATOR SUBSYSTEMS</span>
        <span className="bg-neutral-900 text-amber-50 px-2 py-0.5 text-xs font-bold">
          BUS: I2C/CAN
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
        {actuators.map((act) => (
          <div key={act.id} className="bg-amber-100/60 p-3 border border-neutral-400 flex flex-col justify-between space-y-2">
            <div>
              <div className="flex justify-between items-center text-[10px] font-bold text-neutral-600 mb-1">
                <span>{act.id}</span>
                <span className={act.status === 'ONLINE' ? 'text-emerald-800' : 'text-rose-700'}>
                  {act.status}
                </span>
              </div>
              <div className="text-xs font-bold text-neutral-900 truncate">{act.name}</div>
            </div>

            <div className="space-y-1 text-[11px] font-mono border-t border-neutral-300 pt-2">
              <div className="flex justify-between">
                <span className="text-neutral-600">TEMP:</span>
                <span className="font-bold">{act.temp}°C</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">PWM:</span>
                <span className="font-bold">{act.pwm} µs</span>
              </div>
            </div>

            <button
              onClick={() => handleToggleActuator(act.id)}
              className={`w-full text-[10px] font-bold uppercase py-1 border transition-all ${
                act.status === 'ONLINE'
                  ? 'bg-rose-800 text-white border-rose-900 hover:bg-rose-900'
                  : 'bg-neutral-900 text-amber-50 border-neutral-900 hover:bg-neutral-800'
              }`}
            >
              {act.status === 'ONLINE' ? 'Cut Power' : 'Initialize'}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}