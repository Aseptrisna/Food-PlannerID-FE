import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { menuService } from '../services/menu.service';
import { useAuth } from '../contexts/AuthContext';
import type { DailyMenu } from '../types/menu.types';

export const WeeklyMenu = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [menus, setMenus] = useState<DailyMenu[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWeeklyMenu = async () => {
      try {
        setLoading(true);
        const data = await menuService.getWeeklyMenu();

        // Filter out menus with old structure
        const validMenus = data.filter(menu =>
          menu.breakfast?.main && menu.lunch?.main && menu.dinner?.main
        );

        setMenus(validMenus);
      } catch (err: any) {
        setError('Gagal memuat menu mingguan. Silakan coba lagi.');
      } finally {
        setLoading(false);
      }
    };

    fetchWeeklyMenu();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const isToday = (dateString: string) => {
    const menuDate = new Date(dateString);
    const today = new Date();
    return (
      menuDate.getDate() === today.getDate() &&
      menuDate.getMonth() === today.getMonth() &&
      menuDate.getFullYear() === today.getFullYear()
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat menu mingguan...</p>
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
              <Link to="/today" className="text-gray-600 hover:text-green-600">Menu Hari Ini</Link>
              <Link to="/weekly" className="text-green-600 font-medium">Menu Mingguan</Link>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Menu 7 Hari Terakhir</h1>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {menus.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <p className="text-gray-600 mb-4">Belum ada riwayat menu</p>
              <Link
                to="/today"
                className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium"
              >
                Generate Menu Hari Ini
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {menus.map((menu) => (
                <div
                  key={menu._id}
                  className={`bg-white rounded-lg shadow-md p-6 ${
                    isToday(menu.date) ? 'border-2 border-green-500' : ''
                  }`}
                >
                  <div className="mb-4 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-900">
                      {formatDate(menu.date)}
                      {isToday(menu.date) && (
                        <span className="ml-2 text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                          Hari Ini
                        </span>
                      )}
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Breakfast */}
                    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center mb-3">
                        <span className="text-2xl mr-2">🌅</span>
                        <h3 className="font-bold text-gray-900">Sarapan</h3>
                      </div>
                      <div className="mb-3">
                        <span className="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-0.5 rounded mb-2">
                          ⭐ Utama
                        </span>
                        <p className="font-semibold text-green-600 mb-1">{menu.breakfast.main.menu}</p>
                        <p className="text-sm text-gray-600">{menu.breakfast.main.restaurant}</p>
                        <p className="text-xs text-gray-500 mt-1">{menu.breakfast.main.address}</p>
                      </div>
                      {menu.breakfast.alternatives.length > 0 && (
                        <div className="pt-3 border-t">
                          <p className="text-xs text-gray-500 font-semibold mb-1">Alternatif:</p>
                          {menu.breakfast.alternatives?.map((alt, idx) => (
                            <p key={idx} className="text-xs text-gray-600 truncate">
                              • {alt.menu}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Lunch */}
                    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center mb-3">
                        <span className="text-2xl mr-2">☀️</span>
                        <h3 className="font-bold text-gray-900">Makan Siang</h3>
                      </div>
                      <div className="mb-3">
                        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded mb-2">
                          ⭐ Utama
                        </span>
                        <p className="font-semibold text-green-600 mb-1">{menu.lunch.main.menu}</p>
                        <p className="text-sm text-gray-600">{menu.lunch.main.restaurant}</p>
                        <p className="text-xs text-gray-500 mt-1">{menu.lunch.main.address}</p>
                      </div>
                      {menu.lunch.alternatives.length > 0 && (
                        <div className="pt-3 border-t">
                          <p className="text-xs text-gray-500 font-semibold mb-1">Alternatif:</p>
                          {menu.lunch.alternatives?.map((alt, idx) => (
                            <p key={idx} className="text-xs text-gray-600 truncate">
                              • {alt.menu}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Dinner */}
                    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center mb-3">
                        <span className="text-2xl mr-2">🌙</span>
                        <h3 className="font-bold text-gray-900">Makan Malam</h3>
                      </div>
                      <div className="mb-3">
                        <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-0.5 rounded mb-2">
                          ⭐ Utama
                        </span>
                        <p className="font-semibold text-green-600 mb-1">{menu.dinner.main.menu}</p>
                        <p className="text-sm text-gray-600">{menu.dinner.main.restaurant}</p>
                        <p className="text-xs text-gray-500 mt-1">{menu.dinner.main.address}</p>
                      </div>
                      {menu.dinner.alternatives.length > 0 && (
                        <div className="pt-3 border-t">
                          <p className="text-xs text-gray-500 font-semibold mb-1">Alternatif:</p>
                          {menu.dinner.alternatives?.map((alt, idx) => (
                            <p key={idx} className="text-xs text-gray-600 truncate">
                              • {alt.menu}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
