import { useState, useEffect } from 'react';
import { calculateLandslideRisk } from '../utils/landslideRiskModel';

// Haversine formula to calculate exact distance (in meters) between Operator and Robot
function getDistanceMeters(lat1, lon1, lat2, lon2) {
  if (!lat1 || !lon1 || !lat2 || !lon2) return null;
  const R = 6371e3; // Earth radius in meters
  const toRad = (deg) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

export function useAutoLocationTracker(telemetry) {
  const [operatorPos, setOperatorPos] = useState(null);
  const [operatorError, setOperatorError] = useState(null);
  const [landslideAlerts, setLandslideAlerts] = useState([]);

  // 1. Automatically detect where YOU (the operator) are via browser Geolocation
  useEffect(() => {
    if (!('geolocation' in navigator)) {
      setOperatorError('Browser Geolocation not supported');
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setOperatorPos({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: Math.round(position.coords.accuracy)
        });
        setOperatorError(null);
      },
      (err) => {
        setOperatorError(err.message);
      },
      { enableHighAccuracy: true, maximumAge: 5000, timeout: 10000 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  // 2. Read where the ROBOT is from live telemetry
  const robotPos = telemetry?.gps?.lat && telemetry?.gps?.lng
    ? { lat: telemetry.gps.lat, lng: telemetry.gps.lng }
    : null;

  // 3. Calculate live distance between YOU and the ROBOT
  const distanceToRobotMeters = getDistanceMeters(
    operatorPos?.lat,
    operatorPos?.lng,
    robotPos?.lat,
    robotPos?.lng
  );

  // 4. Automatically record the exact GPS location where the robot detects a landslide
  useEffect(() => {
    if (!robotPos || !telemetry) return;

    const risk = calculateLandslideRisk({
      soilMoisturePercent: telemetry?.soil?.moisturePercent ?? 0,
      rainMmHr: telemetry?.env?.rainMm ?? 0,
      pitchDeg: telemetry?.imu?.pitch ?? 0,
      vibrationG: telemetry?.imu?.vibrationG ?? 0
    });

    // Trigger automatic landslide location pin when risk hits 50% or higher
    if (risk.totalRiskPercent >= 50) {
      setLandslideAlerts((prev) => {
        const lastAlert = prev[0];
        // Avoid duplicate pins if the robot is still within 5 meters of the last logged spot
        if (lastAlert && getDistanceMeters(lastAlert.lat, lastAlert.lng, robotPos.lat, robotPos.lng) < 5) {
          return prev;
        }
        return [
          {
            id: Date.now(),
            lat: robotPos.lat,
            lng: robotPos.lng,
            riskPercent: risk.totalRiskPercent,
            riskTier: risk.riskTier,
            rainLabel: risk.rainTier.label,
            timestamp: new Date().toLocaleTimeString()
          },
          ...prev
        ];
      });
    }
  }, [telemetry, robotPos]);

  return {
    operatorPos,
    operatorError,
    robotPos,
    distanceToRobotMeters,
    landslideAlerts
  };
}