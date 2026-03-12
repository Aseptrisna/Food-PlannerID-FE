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

  const handleRegenerateMenu = async () => {
    try {
      setGenerating(true);
      setError('');
      const data = await menuService.regenerateMenu();
      setMenu(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Gagal regenerate menu. Silakan coba lagi.');
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
            <div className="space-y-8">
              {/* Breakfast */}
              <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-orange-400">
                <div className="flex items-center mb-6">
                  <span className="text-4xl mr-3">🌅</span>
                  <h2 className="text-3xl font-bold text-gray-900">Sarapan</h2>
                </div>

                {/* Main Recommendation */}
                <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg p-5 mb-4 border-2 border-orange-200">
                  <div className="flex items-center mb-2">
                    <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      ⭐ REKOMENDASI UTAMA
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-green-600 mb-2">{menu.breakfast.main.menu}</h3>
                  <p className="text-gray-700 font-medium mb-1">📍 {menu.breakfast.main.restaurant}</p>
                  <p className="text-gray-600 mb-3 text-sm">{menu.breakfast.main.address}</p>
                  <button
                    onClick={() => viewOnMap(menu.breakfast.main)}
                    className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg font-semibold shadow-md transform hover:scale-105 transition-all"
                  >
                    🗺️ Lihat di Peta
                  </button>
                </div>

                {/* Alternatives */}
                <div className="mt-4">
                  <h4 className="text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wide">
                    Pilihan Lain:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {menu.breakfast.alternatives.map((alt, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-green-300 hover:shadow-md transition-all">
                        <h4 className="font-bold text-gray-800 mb-1">{alt.menu}</h4>
                        <p className="text-sm text-gray-600 mb-1">📍 {alt.restaurant}</p>
                        <p className="text-xs text-gray-500 mb-2">{alt.address}</p>
                        <button
                          onClick={() => viewOnMap(alt)}
                          className="text-green-600 hover:text-green-700 text-sm font-semibold"
                        >
                          🗺️ Lihat Peta
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Lunch */}
              <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-400">
                <div className="flex items-center mb-6">
                  <span className="text-4xl mr-3">☀️</span>
                  <h2 className="text-3xl font-bold text-gray-900">Makan Siang</h2>
                </div>

                {/* Main Recommendation */}
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-5 mb-4 border-2 border-blue-200">
                  <div className="flex items-center mb-2">
                    <span className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      ⭐ REKOMENDASI UTAMA
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-green-600 mb-2">{menu.lunch.main.menu}</h3>
                  <p className="text-gray-700 font-medium mb-1">📍 {menu.lunch.main.restaurant}</p>
                  <p className="text-gray-600 mb-3 text-sm">{menu.lunch.main.address}</p>
                  <button
                    onClick={() => viewOnMap(menu.lunch.main)}
                    className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg font-semibold shadow-md transform hover:scale-105 transition-all"
                  >
                    🗺️ Lihat di Peta
                  </button>
                </div>

                {/* Alternatives */}
                <div className="mt-4">
                  <h4 className="text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wide">
                    Pilihan Lain:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {menu.lunch.alternatives.map((alt, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-green-300 hover:shadow-md transition-all">
                        <h4 className="font-bold text-gray-800 mb-1">{alt.menu}</h4>
                        <p className="text-sm text-gray-600 mb-1">📍 {alt.restaurant}</p>
                        <p className="text-xs text-gray-500 mb-2">{alt.address}</p>
                        <button
                          onClick={() => viewOnMap(alt)}
                          className="text-green-600 hover:text-green-700 text-sm font-semibold"
                        >
                          🗺️ Lihat Peta
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Dinner */}
              <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-purple-400">
                <div className="flex items-center mb-6">
                  <span className="text-4xl mr-3">🌙</span>
                  <h2 className="text-3xl font-bold text-gray-900">Makan Malam</h2>
                </div>

                {/* Main Recommendation */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-5 mb-4 border-2 border-purple-200">
                  <div className="flex items-center mb-2">
                    <span className="bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      ⭐ REKOMENDASI UTAMA
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-green-600 mb-2">{menu.dinner.main.menu}</h3>
                  <p className="text-gray-700 font-medium mb-1">📍 {menu.dinner.main.restaurant}</p>
                  <p className="text-gray-600 mb-3 text-sm">{menu.dinner.main.address}</p>
                  <button
                    onClick={() => viewOnMap(menu.dinner.main)}
                    className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg font-semibold shadow-md transform hover:scale-105 transition-all"
                  >
                    🗺️ Lihat di Peta
                  </button>
                </div>

                {/* Alternatives */}
                <div className="mt-4">
                  <h4 className="text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wide">
                    Pilihan Lain:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {menu.dinner.alternatives.map((alt, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-green-300 hover:shadow-md transition-all">
                        <h4 className="font-bold text-gray-800 mb-1">{alt.menu}</h4>
                        <p className="text-sm text-gray-600 mb-1">📍 {alt.restaurant}</p>
                        <p className="text-xs text-gray-500 mb-2">{alt.address}</p>
                        <button
                          onClick={() => viewOnMap(alt)}
                          className="text-green-600 hover:text-green-700 text-sm font-semibold"
                        >
                          🗺️ Lihat Peta
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Regenerate Menu */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl p-6 mt-8">
                <div className="text-center">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    🎲 Ingin Menu yang Berbeda?
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    AI kami dapat membuat berbagai rekomendasi unik! Klik tombol di bawah untuk mendapatkan pilihan menu yang benar-benar berbeda.
                  </p>
                  <button
                    onClick={handleRegenerateMenu}
                    disabled={generating}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200 shadow-lg"
                  >
                    {generating ? (
                      <>
                        <span className="inline-block animate-spin mr-2">🔄</span>
                        Sedang Generate Ulang...
                      </>
                    ) : (
                      <>
                        <span className="mr-2">✨</span>
                        Generate Menu Berbeda
                      </>
                    )}
                  </button>
                  <p className="text-xs text-gray-500 mt-3">
                    💡 Tip: Setiap generate akan menghasilkan kombinasi restoran dan menu yang unik!
                  </p>
                </div>
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
