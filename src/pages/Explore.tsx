import React, { useState } from 'react';
import { Map } from '../components/Map';
import { Globe, HelpCircle, MapPin, Copy, Check, Trash2 } from 'lucide-react';

export const Explore: React.FC = () => {
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [copied, setCopied] = useState(false);

  const handleMapClick = (lat: number, lng: number) => {
    setCoords({ lat, lng });
    setCopied(false);
  };

  const handleCopy = () => {
    if (!coords) return;
    const text = `${coords.lat.toFixed(6)}, ${coords.lng.toFixed(6)}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearCoords = () => {
    setCoords(null);
  };

  // Convert decimal to Degrees Minutes Seconds (DMS)
  const toDMS = (val: number, isLat: boolean): string => {
    const absolute = Math.abs(val);
    const degrees = Math.floor(absolute);
    const minutesNotTruncated = (absolute - degrees) * 60;
    const minutes = Math.floor(minutesNotTruncated);
    const seconds = Math.floor((minutesNotTruncated - minutes) * 60);
    
    const direction = isLat ? (val >= 0 ? 'N' : 'S') : (val >= 0 ? 'E' : 'W');

    return `${degrees}° ${minutes}' ${seconds}" ${direction}`;
  };

  const getHemisphereInfo = (lat: number, lng: number) => {
    const ns = lat >= 0 ? 'Northern' : 'Southern';
    const ew = lng >= 0 ? 'Eastern' : 'Western';
    return `${ns} & ${ew} Hemispheres`;
  };

  return (
    <div className="relative flex-grow flex flex-col md:flex-row min-h-[calc(100vh-4rem)]">
      {/* Sidebar Panel - Controls & Information */}
      <div className="w-full md:w-96 bg-slate-900 border-b md:border-b-0 md:border-r border-slate-800 flex flex-col z-10 shrink-0">
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center space-x-2.5 mb-2">
            <Globe className="h-5 w-5 text-brand-400" />
            <h1 className="text-xl font-bold text-slate-100">Explore Sandbox</h1>
          </div>
          <p className="text-slate-400 text-sm">
            Interact with the world map to inspect geographic details. Click anywhere on the globe to drop a pin.
          </p>
        </div>

        <div className="flex-grow p-6 flex flex-col justify-between overflow-y-auto">
          {/* Coordinates Details Card */}
          <div className="space-y-6">
            {!coords ? (
              <div className="rounded-xl border border-dashed border-slate-800 p-8 text-center bg-slate-950/20">
                <MapPin className="h-10 w-10 text-slate-600 mx-auto mb-4 animate-bounce" />
                <h3 className="text-sm font-semibold text-slate-300 mb-1">No Location Selected</h3>
                <p className="text-slate-500 text-xs">
                  Click on the map to place a pin and inspect coordinates.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="glass-panel rounded-xl p-5 shadow-lg border border-brand-500/10 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-brand-500/5 rounded-full blur-xl pointer-events-none" />
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold text-brand-400 uppercase tracking-wider flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-brand-400 animate-ping" />
                      Active Pin
                    </span>
                    <button
                      onClick={clearCoords}
                      className="p-1 rounded-md text-slate-500 hover:text-red-400 hover:bg-slate-800/80 transition-colors"
                      title="Clear Selection"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Decimal Degrees */}
                  <div className="space-y-3">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Latitude</span>
                      <p className="font-mono text-base font-semibold text-slate-100">{coords.lat.toFixed(6)}°</p>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Longitude</span>
                      <p className="font-mono text-base font-semibold text-slate-100">{coords.lng.toFixed(6)}°</p>
                    </div>
                  </div>

                  {/* Copy Button */}
                  <button
                    onClick={handleCopy}
                    className={`mt-4 w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-xs font-bold transition-all ${
                      copied
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        : 'bg-slate-800 text-slate-300 hover:text-slate-100 hover:bg-slate-700 border border-slate-700/50'
                    }`}
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5" />
                        <span>Coordinates Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy Coordinates</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Additional Geo Metadata */}
                <div className="bg-slate-950/40 border border-slate-900 rounded-xl p-5 space-y-4">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Geographic Info</h4>
                  
                  <div className="space-y-3">
                    <div>
                      <span className="text-[10px] text-slate-500 block">DMS Format</span>
                      <span className="font-sans text-sm text-slate-300 font-medium">
                        {toDMS(coords.lat, true)} , {toDMS(coords.lng, false)}
                      </span>
                    </div>

                    <div className="border-t border-slate-900 pt-3">
                      <span className="text-[10px] text-slate-500 block">Hemisphere</span>
                      <span className="font-sans text-sm text-slate-300 font-medium">
                        {getHemisphereInfo(coords.lat, coords.lng)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick tips */}
          <div className="mt-8 p-4 rounded-xl bg-slate-950/20 border border-slate-800/80 text-xs text-slate-500">
            <div className="flex items-center gap-1.5 mb-1.5 font-semibold text-slate-400">
              <HelpCircle className="h-3.5 w-3.5 text-brand-400" />
              <span>Sandbox Tips</span>
            </div>
            <p className="leading-relaxed">
              Use your mouse scrollwheel to zoom in and out. Click and drag to pan across different continents and oceans.
            </p>
          </div>
        </div>
      </div>

      {/* Map Area */}
      <div className="flex-grow relative h-[50vh] md:h-auto">
        <Map onMapClick={handleMapClick} clickedCoords={coords} />
      </div>
    </div>
  );
};
