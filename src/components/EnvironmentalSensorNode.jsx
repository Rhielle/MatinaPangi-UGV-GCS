import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Thermometer, CloudRain, Droplets, Wind } from 'lucide-react';

export default function EnvironmentalSensorNode() {
  const [envData, setEnvData] = useState({
    soilTemp: 28.4,
    ambientTemp: 31.2,
    humidity: 88.5,
    rainfallMm: 12.4,
    rainStatus: 'MODERATE_DOWNPOUR'
  });

  return (
    <Card className="bg-slate-950 text-slate-100 border-slate-800 shadow-xl font-mono">
      <CardHeader className="flex flex-row items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-2">
          <CloudRain className="w-5 h-5 text-cyan-400" />
          <CardTitle className="text-sm font-semibold tracking-wide">GEOTECHNICAL & WEATHER TELEMETRY</CardTitle>
        </div>
        <Badge variant="outline" className="text-xs text-cyan-400 border-cyan-800">
          Sensors Active
        </Badge>
      </CardHeader>

      <CardContent className="p-4 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          {/* Soil Temperature */}
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 space-y-1">
            <div className="flex justify-between items-center text-xs text-slate-400">
              <span>DS18B20 SOIL TEMP</span>
              <Thermometer className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-lg font-bold text-amber-400">
              {envData.soilTemp}°C
            </div>
            <div className="text-[10px] text-slate-500">Subsurface thermal probe</div>
          </div>

          {/* Ambient Weather */}
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 space-y-1">
            <div className="flex justify-between items-center text-xs text-slate-400">
              <span>DHT22 AMBIENT</span>
              <Wind className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-lg font-bold text-cyan-300">
              {envData.ambientTemp}°C <span className="text-xs text-slate-400">({envData.humidity}% RH)</span>
            </div>
            <div className="text-[10px] text-slate-500">Air temperature & humidity</div>
          </div>
        </div>

        {/* Rainfall & Precipitation */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 flex justify-between items-center">
          <div>
            <div className="text-xs text-slate-400">RAINFALL INTENSITY (HL-01)</div>
            <div className="text-sm font-bold text-emerald-400">{envData.rainfallMm} mm/h ({envData.rainStatus})</div>
          </div>
          <Droplets className="w-6 h-6 text-emerald-400 animate-pulse" />
        </div>
      </CardContent>
    </Card>
  );
}