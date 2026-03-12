import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { menuService } from '../services/menu.service';
import { useAuth } from '../contexts/AuthContext';
import type { DailyMenu, MealItem } from '../types/menu.types';

export const TodayMenu = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [menu, setMenu] = useState<DailyMenu | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [generating, setGenerating] = useState(false);

  const fetchMenu = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await menuService.getTodayMenu();
      setMenu(data);
    } catch (err: any) {
      if (err.response?.status === 404) {
        setError('Belum ada menu untuk hari ini. Silakan generate menu terlebih dahulu.');
      } else {
        setError('Gagal memuat menu. Silakan coba lagi.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateMenu = async () => {
    try {
      setGenerating(true);
      setError('');
      const data = await menuService.generateMenu();
      setMenu(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Gagal generate menu. Silakan coba lagi.');
    } finally {
      setGenerating(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const viewOnMap = (meal: MealItem) => {
    navigate('/map', { state: { meal } });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat menu...</p>
        </div>
      </div>
    );
  }

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
              <Link to="/today" className="text-green-600 font-medium">Menu Hari Ini</Link>
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
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Menu Hari Ini</h1>
            <p className="text-gray-600">
              {new Date().toLocaleDateString('id-ID', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>

          {error && (
            <div className="mb-6 bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded">
              <p>{error}</p>
              {!menu && (
                <button
                  onClick={handleGenerateMenu}
                  disabled={generating}
                  className="mt-2 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded font-medium disabled:bg-gray-400"
                >
                  {generating ? '🤖 Generating...' : '✨ Generate Menu'}
                </button>
              )}
            </div>
          )}

          {menu ? (
            <div className="space-y-6">
              {/* Breakfast */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-3">🌅</span>
                  <h2 className="text-2xl font-bold text-gray-900">Sarapan</h2>
                </div>
                <h3 className="text-xl font-semibold text-green-600 mb-2">{menu.breakfast.menu}</h3>
                <p className="text-gray-700 font-medium mb-1">📍 {menu.breakfast.restaurant}</p>
                <p className="text-gray-600 mb-4">{menu.breakfast.address}</p>
                <button
                  onClick={() => viewOnMap(menu.breakfast)}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-medium"
                >
                  🗺️ Lihat di Peta
                </button>
              </div>

              {/* Lunch */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-3">☀️</span>
                  <h2 className="text-2xl font-bold text-gray-900">Makan Siang</h2>
                </div>
                <h3 className="text-xl font-semibold text-green-600 mb-2">{menu.lunch.menu}</h3>
                <p className="text-gray-700 font-medium mb-1">📍 {menu.lunch.restaurant}</p>
                <p className="text-gray-600 mb-4">{menu.lunch.address}</p>
                <button
                  onClick={() => viewOnMap(menu.lunch)}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-medium"
                >
                  🗺️ Lihat di Peta
                </button>
              </div>

              {/* Dinner */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-3">🌙</span>
                  <h2 className="text-2xl font-bold text-gray-900">Makan Malam</h2>
                </div>
                <h3 className="text-xl font-semibold text-green-600 mb-2">{menu.dinner.menu}</h3>
                <p className="text-gray-700 font-medium mb-1">📍 {menu.dinner.restaurant}</p>
                <p className="text-gray-600 mb-4">{menu.dinner.address}</p>
                <button
                  onClick={() => viewOnMap(menu.dinner)}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-medium"
                >
                  🗺️ Lihat di Peta
                </button>
              </div>

              {/* Generate New Menu */}
              <div className="text-center mt-8">
                <button
                  onClick={handleGenerateMenu}
                  disabled={generating}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium disabled:bg-gray-400"
                >
                  {generating ? '🤖 Generating Menu Baru...' : '✨ Generate Menu Baru'}
                </button>
                <p className="text-sm text-gray-500 mt-2">
                  Generate menu baru sesuai preferensi Anda
                </p>
              </div>
            </div>
          ) : !error && (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">Belum ada menu untuk hari ini</p>
              <button
                onClick={handleGenerateMenu}
                disabled={generating}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium disabled:bg-gray-400"
              >
                {generating ? '🤖 Generating...' : '✨ Generate Menu Sekarang'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
