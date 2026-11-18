import { create } from 'zustand';
import mqtt from 'mqtt';

export const useTelemetryStore = create((set, get) => ({
  isConnected: false,
  battery: 88,
  signal: -62,
  lat: 7.0736,
  lng: 125.6128,
  speed: 0.0,
  heading: 142,
  moisture: 38,
  vibration: 0.12,
  logs: ['[SYS] Initializing Landslide GCS Terminus core...'],
  mqttClient: null,

  initMqtt: () => {
    if (get().mqttClient) return;

    const client = mqtt.connect('wss://broker.hivemq.com:8884/mqtt', {
      clientId: 'gcs_terminus_' + Math.random().toString(16).substring(2, 8),
    });

    client.on('connect', () => {
      set({ isConnected: true });
      get().addLog('[MQTT] Connected to telemetry broker successfully.');
      client.subscribe('landslide/ugv/telemetry', (err) => {
        if (!err) get().addLog('[MQTT] Subscribed to landslide/ugv/telemetry');
      });
    });

    client.on('message', (topic, payload) => {
      try {
        const data = JSON.parse(payload.toString());
        set({
          battery: data.battery ?? get().battery,
          signal: data.signal ?? get().signal,
          lat: data.lat ?? get().lat,
          lng: data.lng ?? get().lng,
          speed: data.speed ?? get().speed,
          moisture: data.moisture ?? get().moisture,
          vibration: data.vibration ?? get().vibration,
        });
      } catch (e) {
        get().addLog(`[MQTT] Failed to parse payload: ${payload.toString()}`);
      }
    });

    client.on('offline', () => {
      set({ isConnected: false });
      get().addLog('[WARN] MQTT broker connection lost.');
    });

    set({ mqttClient: client });
  },

  publishCommand: (commandString) => {
    const client = get().mqttClient;
    if (client && client.connected) {
      client.publish('landslide/ugv/commands', commandString);
      get().addLog(`[MQTT-PUB] Sent command: ${commandString}`);
    } else {
      get().addLog(`[ERROR] MQTT offline.`);
    }
  },

  addLog: (msg) => set((state) => ({ logs: [msg, ...state.logs.slice(0, 99)] })),

  tickSimulation: () => {
    if (get().isConnected) return;
    set((state) => ({
      battery: Math.max(10, +(state.battery - 0.1).toFixed(1)),
      speed: +(Math.sin(Date.now() / 1000) * 1.5 + 1.5).toFixed(2),
    }));
  },
}));