export const RAINFALL_INTENSITY_TIERS = [
  {
    id: 'NO_RAIN',
    label: 'No Rain / Dry',
    rangeText: '0.0 mm/hr',
    maxMmHr: 0.0,
    rainScorePts: 0,
    baselineStatus: 'Nominal / Stable',
    ugvAction: 'Standby / Scheduled Patrol',
    badgeStyle: 'bg-slate-900 text-slate-300 border-slate-700'
  },
  {
    id: 'LIGHT',
    label: 'Light Rain',
    rangeText: '< 2.5 mm/hr',
    maxMmHr: 2.5,
    rainScorePts: 5,
    baselineStatus: 'Low Risk',
    ugvAction: 'Routine Monitoring',
    badgeStyle: 'bg-cyan-950 text-cyan-300 border-cyan-800'
  },
  {
    id: 'MODERATE',
    label: 'Moderate Rain',
    rangeText: '2.5 - 7.5 mm/hr',
    maxMmHr: 7.5,
    rainScorePts: 10,
    baselineStatus: 'Elevated Monitoring',
    ugvAction: 'Increase telemetry poll rate to 1s',
    badgeStyle: 'bg-emerald-950 text-emerald-300 border-emerald-800'
  },
  {
    id: 'HEAVY',
    label: 'Heavy Rain',
    rangeText: '7.5 - 15.0 mm/hr',
    maxMmHr: 15.0,
    rainScorePts: 15,
    baselineStatus: 'High Risk / Saturation Warning',
    ugvAction: 'Deploy soil probe & check drainage zones',
    badgeStyle: 'bg-amber-950 text-amber-300 border-amber-800'
  },
  {
    id: 'INTENSE',
    label: 'Intense Rain',
    rangeText: '> 15.0 mm/hr',
    maxMmHr: Infinity,
    rainScorePts: 20,
    baselineStatus: 'Critical Slip Warning',
    ugvAction: 'Trigger E-STOP / Return UGV to safe zone',
    badgeStyle: 'bg-red-950 text-red-300 border-red-800 animate-pulse'
  }
];

export function classifyRainfall(rainMmHr = 0) {
  if (rainMmHr <= 0.0) return RAINFALL_INTENSITY_TIERS[0];
  if (rainMmHr < 2.5) return RAINFALL_INTENSITY_TIERS[1];
  if (rainMmHr <= 7.5) return RAINFALL_INTENSITY_TIERS[2];
  if (rainMmHr <= 15.0) return RAINFALL_INTENSITY_TIERS[3];
  return RAINFALL_INTENSITY_TIERS[4];
}

export function calculateLandslideRisk({
  soilMoisturePercent = 0,
  rainMmHr = 0,
  pitchDeg = 0,
  vibrationG = 0
}) {
  const rainTier = classifyRainfall(rainMmHr);

  // Subfactor calculations scaled to total 100% risk model
  const soilPts = Math.min(40, Math.max(0, (soilMoisturePercent / 100) * 40)); // Max 40%
  const rainPts = rainTier.rainScorePts;                                     // Max 20%
  const slopePts = Math.min(25, (Math.abs(pitchDeg) / 45) * 25);             // Max 25%
  const vibePts = Math.min(15, (vibrationG / 0.5) * 15);                     // Max 15%

  // Total Landslide Risk Percentage
  const totalRiskPercent = Math.min(100, Math.round(soilPts + rainPts + slopePts + vibePts));

  let riskTier = 'NOMINAL / STABLE';
  let textColor = 'text-emerald-400';
  let borderColor = 'border-emerald-800';

  if (totalRiskPercent >= 75) {
    riskTier = 'CRITICAL SLIP WARNING';
    textColor = 'text-red-400';
    borderColor = 'border-red-700';
  } else if (totalRiskPercent >= 50) {
    riskTier = 'HIGH RISK / SATURATION';
    textColor = 'text-amber-400';
    borderColor = 'border-amber-700';
  } else if (totalRiskPercent >= 25) {
    riskTier = 'ELEVATED MONITORING';
    textColor = 'text-cyan-400';
    borderColor = 'border-cyan-800';
  }

  return {
    totalRiskPercent,
    riskTier,
    textColor,
    borderColor,
    rainTier,
    breakdown: {
      soilPts: +soilPts.toFixed(1),
      soilPercentageOfTotal: +((soilPts / 40) * 100).toFixed(1),
      rainPts,
      rainPercentageOfTotal: +((rainPts / 20) * 100).toFixed(1),
      slopePts: +slopePts.toFixed(1),
      slopePercentageOfTotal: +((slopePts / 25) * 100).toFixed(1),
      vibePts: +vibePts.toFixed(1),
      vibePercentageOfTotal: +((vibePts / 15) * 100).toFixed(1)
    }
  };
}