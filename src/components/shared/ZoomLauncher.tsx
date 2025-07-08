// src/components/shared/ZoomLauncher.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Video, X } from 'lucide-react';

export const ZoomLauncher: React.FC = () => {
  const [open, setOpen] = useState(false);
  const launcherRef = useRef<HTMLDivElement>(null);

  // auto-close if clicked outside
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (open && launcherRef.current && !launcherRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [open]);

  return (
    <div ref={launcherRef} className="fixed bottom-4 right-4 z-[9999]">
      {open ? (
        <div className="bg-white border border-gray-300 rounded-lg shadow-lg w-80 h-96 flex flex-col overflow-hidden">
          <div className="bg-gray-100 flex items-center justify-between px-3 py-2">
            <span className="font-medium text-gray-700">Zoom Contact</span>
            <button onClick={() => setOpen(false)} className="p-1 hover:bg-gray-200 rounded">
              <X size={16} />
            </button>
          </div>
          <iframe
            src="https://zoom.us/cci/callbar/crm/?origin=https://app.konnectinsights.com"
            sandbox="allow-forms allow-popups allow-popups-to-escape-sandbox allow-scripts allow-same-origin allow-downloads"
            allow="autoplay;microphone;camera;display-capture;midi;encrypted-media;clipboard-write;"
            className="flex-1 w-full h-full"
          />
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg focus:outline-none"
        >
          <Video size={20} />
        </button>
      )}
    </div>
  );
};
