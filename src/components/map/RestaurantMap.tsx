import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { MealItem } from '../../types/menu.types';

// Fix for default marker icon
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// @ts-ignore
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

interface RestaurantMapProps {
  center?: [number, number];
  zoom?: number;
  restaurants: Array<{
    name: string;
    address: string;
    latitude: number;
    longitude: number;
    type?: string;
  }>;
  highlightedMeal?: MealItem;
}

export const RestaurantMap: React.FC<RestaurantMapProps> = ({
  center = [-5.4292, 105.2619], // Default: Bandar Lampung
  zoom = 13,
  restaurants,
  highlightedMeal,
}) => {
  // If highlightedMeal is provided, center the map on it
  const mapCenter: [number, number] = highlightedMeal
    ? [highlightedMeal.latitude, highlightedMeal.longitude]
    : center;

  const mapZoom = highlightedMeal ? 15 : zoom;

  return (
    <div className="h-[500px] w-full rounded-lg overflow-hidden shadow-md">
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        scrollWheelZoom={true}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {restaurants.map((restaurant, index) => {
          const isHighlighted =
            highlightedMeal &&
            restaurant.latitude === highlightedMeal.latitude &&
            restaurant.longitude === highlightedMeal.longitude;

          return (
            <Marker
              key={index}
              position={[restaurant.latitude, restaurant.longitude]}
            >
              <Popup>
                <div className="text-center">
                  <h3 className="font-bold text-lg mb-1">
                    {isHighlighted ? '⭐ ' : ''}
                    {restaurant.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">{restaurant.address}</p>
                  {restaurant.type && (
                    <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                      {restaurant.type}
                    </span>
                  )}
                  <div className="mt-2">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${restaurant.latitude},${restaurant.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      Buka di Google Maps →
                    </a>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};
