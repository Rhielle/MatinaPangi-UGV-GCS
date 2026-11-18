import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useTelemetryStore } from '../store/useTelemetryStore';
import L from 'leaflet';

import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

function MapUpdater({ center }) {
  const map = useMap();
  useEffect(() => {
    if (map) {
      map.setView(center, map.getZoom());
    }
  }, [center, map]);
  return null;
}

export default function InteractiveMapNode() {
  const { lat, lng, addLog } = useTelemetryStore();
  if (lat === undefined || lng === undefined) return null;
  
  const [isMounted, setIsMounted] = useState(false);
  const position = [lat, lng];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    addLog(`[GIS] Target waypoint flagged at: Lat ${lat.toFixed(4)}, Lng ${lng.toFixed(4)}`);
  };

  if (!isMounted) return null;

  return (
    <section className="bg-amber-50 text-neutral-900 p-5 rounded-none shadow-lg border-2 border-neutral-900 font-mono mt-6">
      <div className="border-b-2 border-neutral-900 pb-2 mb-4 flex justify-between items-center text-xs font-bold uppercase tracking-wide">
        <span>NODE_13 // LIVE GIS & TERRAIN TOPOGRAPHY (MATINA PANGI)</span>
        <span className="bg-neutral-900 text-amber-50 px-2 py-0.5 text-xs font-bold">
          RASTER: ACTIVE // EPSG:4326
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 h-80 border-2 border-neutral-900 relative shadow-inner z-0">
          <MapContainer
            center={position}
            zoom={15}
            scrollWheelZoom={true}
            style={{ height: '100%', width: '100%' }}
            onClick={handleMapClick}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
              <Popup>
                <div className="font-mono text-xs">
                  <strong>UGV-01 TERMINUS</strong>
                  <br />
                  Lat: {lat.toFixed(4)}
                  <br />
                  Lng: {lng.toFixed(4)}
                </div>
              </Popup>
            </Marker>
            <MapUpdater center={position} />
          </MapContainer>
        </div>

        <div className="space-y-4 bg-amber-100/60 p-4 border border-neutral-400 flex flex-col justify-between">
          <div>
            <div className="text-xs font-bold text-neutral-800 border-b border-neutral-300 pb-2 mb-3">
              GEOSPATIAL TELEMETRY
            </div>
            
            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-neutral-600">SECTOR:</span>
                <span className="font-bold">MATINA PANGI B</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">LATITUDE:</span>
                <span className="font-bold">{lat.toFixed(4)}° N</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">LONGITUDE:</span>
                <span className="font-bold">{lng.toFixed(4)}° E</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">HAZARD OVERLAY:</span>
                <span className="text-amber-800 font-bold">ACTIVE (QGIS)</span>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-neutral-700 leading-relaxed pt-2 border-t border-neutral-300">
            Click anywhere on the raster canvas to log target coordinates or queue autonomous survey waypoints.
          </p>
        </div>
      </div>
    </section>
  );
}