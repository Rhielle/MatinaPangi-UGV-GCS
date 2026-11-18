import React, { useEffect, useRef, useState } from 'react';
import { TrendingUp, Activity } from 'lucide-react';

export default function SensorChartNode() {
  const canvasRef = useRef(null);
  const [dataPoints, setDataPoints] = useState([76, 77, 76.5, 78, 79, 81, 80, 82, 84]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDataPoints(prev => [...prev.slice(1), +(prev[prev.length - 1] + (Math.random() * 0.8 - 0.4)).toFixed(1)]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    for (let i = 0; i < canvas.width; i += 40) {
      ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, canvas.height); ctx.stroke();
    }

    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    ctx.beginPath();
    const step = canvas.width / (dataPoints.length - 1);
    dataPoints.forEach((val, i) => {
      const x = i * step;
      const y = canvas.height - ((val - 60) / 40) * canvas.height;
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    });
    ctx.stroke();
  }, [dataPoints]);

  return (
    <div className="bg-slate-950 text-slate-100 border border-slate-800 rounded-xl p-4 font-mono shadow-xl space-y-3">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div className="flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-cyan-400" />
          <h2 className="text-sm font-semibold tracking-wide">KALMAN-FILTERED SOIL TREND</h2>
        </div>
        <span className="text-xs text-cyan-400 font-bold">{dataPoints[dataPoints.length - 1]}% Saturation</span>
      </div>
      <div className="bg-slate-900 p-2 rounded border border-slate-800">
        <canvas ref={canvasRef} width={420} height={110} className="w-full h-28 rounded bg-slate-950" />
      </div>
    </div>
  );
}