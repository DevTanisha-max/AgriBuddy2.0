// src/components/FarmMap.jsx  —  AgriBuddy 2.0  |  VIT_Coders
import React from 'react';
import { MapContainer, TileLayer, useMapEvents, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Custom green SVG pin marker
const greenPinIcon = L.divIcon({
  className: '',
  html: `
    <div style="
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
    ">
      <div style="
        width: 36px;
        height: 36px;
        background: linear-gradient(135deg, #2d6a4f 0%, #1a4d2e 100%);
        border-radius: 50% 50% 50% 0%;
        transform: rotate(-45deg);
        border: 3px solid #ffffff;
        box-shadow: 0 4px 14px rgba(26,77,46,0.45);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <span style="transform: rotate(45deg); font-size: 16px; line-height: 1;">🌾</span>
      </div>
      <div style="
        width: 4px;
        height: 12px;
        background: rgba(26,77,46,0.4);
        border-radius: 0 0 4px 4px;
        margin-top: -3px;
      "></div>
    </div>
  `,
  iconSize: [36, 52],
  iconAnchor: [18, 52],
  popupAnchor: [0, -52],
});

function LocationMarker({ onLocationFound }) {
  const [position, setPosition] = React.useState(null);

  const map = useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      setPosition(e.latlng);
      map.flyTo(e.latlng, Math.max(map.getZoom(), 9), { duration: 1 });

      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
        );
        const data = await res.json();
        const district =
          data.address.state_district || data.address.county || 'Unknown District';
        const state = data.address.state || 'Unknown State';
        onLocationFound({ lat, lng, district, state });
      } catch (error) {
        console.error('Geocoding failed:', error);
        onLocationFound({ lat, lng, district: 'Unknown', state: 'Unknown' });
      }
    },
  });

  return position === null ? null : (
    <Marker position={position} icon={greenPinIcon} />
  );
}

const FarmMap = ({ onLocationFound }) => {
  // Default: near Ropar, Punjab
  const center = [30.97, 76.53];

  return (
    <div style={{ 
      height: '100%', 
      width: '100%',
      position: 'relative',
      zIndex: 1,
      isolation: 'isolate',
      overflow: 'hidden',
      borderRadius: '20px'
    }}>
      <MapContainer
        center={center}
        zoom={7}
        style={{ 
          height: '100%', 
          width: '100%',
          position: 'relative',
          zIndex: 1
        }}
        aria-label="Interactive farm location map. Click to select your farm."
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker onLocationFound={onLocationFound} />
      </MapContainer>
    </div>
  );
};

export default FarmMap;


