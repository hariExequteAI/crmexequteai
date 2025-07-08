// src/components/shared/ZoomWidget.tsx
import React, { useState, useEffect } from 'react';
import { Rnd } from 'react-rnd';
import { Minimize2, Maximize2, X } from 'lucide-react';
import './ZoomWidget.css';

const STORAGE_KEY = 'zoom-widget';

interface State {
  width: number;
  height: number;
  x: number;
  y: number;
  minimized: boolean;
}

const DEFAULT: State = {
  width: 300, height: 400,
  x: window.innerWidth - 320, y: 80,
  minimized: false,
};

export const ZoomWidget: React.FC = () => {
  const [s, setS] = useState<State>(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)!) || DEFAULT;
    } catch {
      return DEFAULT;
    }
  });

  // persist
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
  }, [s]);

  // minimized bar
  if (s.minimized) {
    return (
      <div
        className="zoom-widget-bar"
        style={{ top: s.y, left: s.x }}
        onClick={() => setS(st => ({ ...st, minimized: false }))}
      >
        <Maximize2 size={16} /> Zoom
      </div>
    );
  }

  return (
    <Rnd
      size={{ width: s.width, height: s.height }}
      position={{ x: s.x, y: s.y }}
      onDragStop={(_, d) => setS(st => ({ ...st, x: d.x, y: d.y }))}
      onResizeStop={(_, __, ref, ___, pos) =>
        setS({ width: ref.offsetWidth, height: ref.offsetHeight, x: pos.x, y: pos.y, minimized: false })
      }
      bounds="window"
      className="zoom-widget-rnd"
    >
      <div className="zoom-widget-header">
        <span>Zoom Contact Center</span>
        <div className="controls">
          <button onClick={() => setS(st => ({ ...st, minimized: true }))}><Minimize2 size={14} /></button>
          <button onClick={() => setS(st => ({ ...st, minimized: true }))}><X size={14} /></button>
        </div>
      </div>
      <iframe
        title="Zoom Contact Center"
        className="zoom-widget-iframe"
        src="https://zoom.us/cci/callbar/crm/?origin=https://app.konnectinsights.com"
        sandbox="allow-forms allow-popups allow-popups-to-escape-sandbox allow-scripts allow-same-origin allow-downloads"
        allow="autoplay;microphone;camera;display-capture;midi;encrypted-media;clipboard-write;"
      />
    </Rnd>
  );
};
