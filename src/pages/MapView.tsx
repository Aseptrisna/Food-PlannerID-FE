import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { RestaurantMap } from '../components/map/RestaurantMap';
import type { MealItem } from '../types/menu.types';

export const MapView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const meal = location.state?.meal as MealItem | undefined;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-green-600">
              🍽️ FoodPlannerID
            </Link>
            <div className="flex items-center gap-4">
              <Link to="/today" className="text-gray-600 hover:text-green-600">Menu Hari Ini</Link>
              <Link to="/weekly" className="text-gray-600 hover:text-green-600">Menu Mingguan</Link>
              <Link to="/preferences" className="text-gray-600 hover:text-green-600">Preferensi</Link>
              <div className="border-l pl-4 ml-2">
                <span className="text-gray-600 mr-2">Halo, {user?.name}!</span>
                <button
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-700 font-medium"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <button
              onClick={() => navigate(-1)}
              className="text-green-600 hover:text-green-700 font-medium"
            >
              ← Kembali
            </button>
          </div>

          {meal && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{meal.menu}</h2>
              <p className="text-gray-700 font-medium mb-1">📍 {meal.restaurant}</p>
              <p className="text-gray-600 mb-2">{meal.address}</p>
              <p className="text-sm text-gray-500">
                Koordinat: {meal.latitude}, {meal.longitude}
              </p>
            </div>
          )}

          {/* Interactive Map */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">📍 Lokasi Restoran</h2>
            <RestaurantMap
              restaurants={meal ? [{
                name: meal.restaurant,
                address: meal.address,
                latitude: meal.latitude,
                longitude: meal.longitude,
              }] : []}
              highlightedMeal={meal}
            />
            {meal && (
              <div className="mt-4 text-center">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${meal.latitude},${meal.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium"
                >
                  Buka di Google Maps →
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
