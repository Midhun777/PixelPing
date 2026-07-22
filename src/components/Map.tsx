import React, { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';

interface MapProps {
  onMapClick: (lat: number, lng: number) => void;
  clickedCoords: { lat: number; lng: number } | null;
}

export const Map: React.FC<MapProps> = ({ onMapClick, clickedCoords }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markerRef = useRef<maplibregl.Marker | null>(null);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Define OpenStreetMap raster tile style spec
    const style: maplibregl.StyleSpecification = {
      version: 8,
      sources: {
        osm: {
          type: 'raster',
          tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
          tileSize: 256,
          attribution: '© OpenStreetMap contributors',
        },
      },
      layers: [
        {
          id: 'osm-tiles',
          type: 'raster',
          source: 'osm',
          minzoom: 0,
          maxzoom: 19,
        },
      ],
    };

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: style,
      center: [0, 20], // Centered globally
      zoom: 2,
      minZoom: 1.5,
      maxZoom: 18,
    });

    // Add zoom and rotation controls
    map.addControl(new maplibregl.NavigationControl({ showCompass: true }), 'top-right');

    mapRef.current = map;

    // Add map click listener
    map.on('click', (e) => {
      const { lat, lng } = e.lngLat;
      // Standardize longitude/latitude wrapping for realistic values
      const wrappedLng = ((lng + 180) % 360) - 180;
      onMapClick(lat, wrappedLng);
    });

    // Handle resizing on window changes
    const handleResize = () => {
      map.resize();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      map.remove();
    };
  }, [onMapClick]);

  // Sync marker position with clickedCoords
  useEffect(() => {
    if (!mapRef.current) return;

    if (!clickedCoords) {
      if (markerRef.current) {
        markerRef.current.remove();
        markerRef.current = null;
      }
      return;
    }

    const { lat, lng } = clickedCoords;

    if (markerRef.current) {
      markerRef.current.setLngLat([lng, lat]);
    } else {
      // Create a premium teal marker pin
      const marker = new maplibregl.Marker({
        color: '#14b8a6', // Brand Teal-500
        draggable: false,
      })
        .setLngLat([lng, lat])
        .addTo(mapRef.current);
      markerRef.current = marker;
    }
  }, [clickedCoords]);

  return (
    <div className="relative w-full h-full min-h-[400px] bg-slate-900 overflow-hidden">
      {/* Map Container DOM */}
      <div ref={mapContainerRef} className="w-full h-full absolute inset-0" />
    </div>
  );
};
