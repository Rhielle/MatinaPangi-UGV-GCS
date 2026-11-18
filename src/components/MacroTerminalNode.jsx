import React, { useState } from 'react';
import { useTelemetryStore } from '../store/useTelemetryStore';

export default function MacroTerminalNode() {
  const { addLog } = useTelemetryStore();
  const [macroCode, setMacroCode] = useState(
    '# TERM_MACRO v1.2\nARM;\nSET_SPEED 2.5;\nMOVE_TO 7.0740 125.6130;\nDEPLOY_SONDE;\nDISARM;'
  );
  const [status, setStatus] = useState('READY');

  const handleExecuteMacro = () => {
    setStatus('EXECUTING...');
    addLog('[MACRO] Uploading sequence buffer to UGV execution engine...');
    
    setTimeout(() => {
      setStatus('COMPLETED');
      addLog('[MACRO] Sequence executed successfully. All instructions acknowledged.');
    }, 1200);
  };

  return (
    <section className="bg-amber-50 text-neutral-900 p-5 rounded-none shadow-lg border-2 border-neutral-900 font-mono mt-6">
      <div className="border-b-2 border-neutral-900 pb-2 mb-4 flex justify-between items-center text-xs font-bold uppercase tracking-wide">
        <span>NODE_11 // MISSION SCRIPTING & MACRO TERMINAL</span>
        <span className="bg-neutral-900 text-amber-50 px-2 py-0.5 text-xs font-bold">
          STATUS: {status}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col space-y-2">
          <label className="text-[10px] font-bold text-neutral-700 uppercase">
            MACRO SCRIPT EDITOR (.TXT / G-CODE)
          </label>
          <textarea
            value={macroCode}
            onChange={(e) => setMacroCode(e.target.value)}
            rows="6"
            className="w-full bg-neutral-950 text-amber-400 p-3 font-mono text-xs border border-neutral-800 focus:outline-none focus:border-amber-500 shadow-inner"
          ></textarea>
        </div>

        <div className="space-y-4 bg-amber-100/60 p-4 border border-neutral-400 flex flex-col justify-between">
          <div>
            <div className="text-xs font-bold text-neutral-800 border-b border-neutral-300 pb-2 mb-3">
              COMPILER & ROUTINE
            </div>
            <p className="text-[11px] text-neutral-700 leading-relaxed mb-4">
              Write custom macro instructions to automate deployment routines, sensor sweeps, and emergency recovery maneuvers.
            </p>
          </div>

          <button
            onClick={handleExecuteMacro}
            className="w-full bg-neutral-900 text-amber-50 text-xs py-2.5 font-bold uppercase hover:bg-neutral-800 active:translate-y-0.5 transition-all shadow"
          >
            Compile & Execute Script
          </button>
        </div>
      </div>
    </section>
  );
}
