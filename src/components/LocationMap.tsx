import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import type { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default markers in react-leaflet
if (typeof window !== 'undefined') {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  });
}

interface LocationMapProps {
  className?: string;
}

const LocationMap = ({ className = "" }: LocationMapProps) => {
  // Restaurant location coordinates (example: Downtown area)
  const position: LatLngExpression = [40.7589, -73.9851]; // Times Square, NYC as example

  return (
    <div className={`w-full h-64 rounded-2xl overflow-hidden shadow-lg ${className}`}>
      <MapContainer
        center={position}
        zoom={15}
        style={{ height: '100%', width: '100%' }}
        zoomControl={true}
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>
            <div className="text-center p-2">
              <h3 className="font-semibold text-primary-600 mb-1">Café Fausse</h3>
              <p className="text-sm text-gray-600">
                123 Culinary Street<br />
                Food District, FD 12345
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Award-winning fine dining restaurant
              </p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default LocationMap;