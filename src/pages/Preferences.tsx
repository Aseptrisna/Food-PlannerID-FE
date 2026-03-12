import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/auth.service';
import { userService } from '../services/user.service';
import { useAuth } from '../contexts/AuthContext';
import type { Subscription } from '../services/user.service';

export const Preferences = () => {
  const navigate = useNavigate();
  const { user, logout, refreshUser } = useAuth();
  const [dislikedFoods, setDislikedFoods] = useState<string[]>([]);
  const [newFood, setNewFood] = useState('');
  const [subscription, setSubscription] = useState<Subscription>({
    email_notification: false,
    telegram_notification: false,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Get user preferences
        if (user) {
          setDislikedFoods(user.disliked_foods || []);
        }

        // Get subscription settings
        const sub = await userService.getSubscription();
        setSubscription(sub);
      } catch (error) {
        console.error('Failed to fetch preferences:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleAddFood = () => {
    const food = newFood.trim();
    if (food && !dislikedFoods.includes(food)) {
      setDislikedFoods([...dislikedFoods, food]);
      setNewFood('');
    }
  };

  const handleRemoveFood = (food: string) => {
    setDislikedFoods(dislikedFoods.filter((f) => f !== food));
  };

  const handleSavePreferences = async () => {
    try {
      setSaving(true);
      setMessage({ type: '', text: '' });

      await authService.updatePreferences(dislikedFoods);
      await userService.updateSubscription(subscription);
      await refreshUser();

      setMessage({
        type: 'success',
        text: 'Preferensi berhasil disimpan!',
      });
    } catch (error: any) {
      setMessage({
        type: 'error',
        text: 'Gagal menyimpan preferensi. Silakan coba lagi.',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleToggleEmail = async () => {
    try {
      const updated = await userService.toggleEmailNotification();
      setSubscription(updated);
      setMessage({
        type: 'success',
        text: `Notifikasi email ${updated.email_notification ? 'diaktifkan' : 'dinonaktifkan'}`,
      });
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Gagal mengubah pengaturan email',
      });
    }
  };

  const handleToggleTelegram = async () => {
    try {
      const updated = await userService.toggleTelegramNotification();
      setSubscription(updated);
      setMessage({
        type: 'success',
        text: `Notifikasi Telegram ${updated.telegram_notification ? 'diaktifkan' : 'dinonaktifkan'}`,
      });
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Gagal mengubah pengaturan Telegram',
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat preferensi...</p>
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
              <Link to="/weekly" className="text-gray-600 hover:text-green-600">Menu Mingguan</Link>
              <Link to="/preferences" className="text-green-600 font-medium">Preferensi</Link>
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
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Preferensi Saya</h1>

          {message.text && (
            <div
              className={`mb-6 px-4 py-3 rounded ${
                message.type === 'success'
                  ? 'bg-green-50 border border-green-200 text-green-800'
                  : 'bg-red-50 border border-red-200 text-red-700'
              }`}
            >
              {message.text}
            </div>
          )}

          {/* Disliked Foods */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Makanan yang Tidak Disukai</h2>
            <p className="text-gray-600 mb-4">
              AI akan menghindari makanan ini saat membuat rekomendasi menu
            </p>

            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={newFood}
                onChange={(e) => setNewFood(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddFood()}
                placeholder="Contoh: sapi, babi, kambing"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
              <button
                onClick={handleAddFood}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium"
              >
                Tambah
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {dislikedFoods.length === 0 ? (
                <p className="text-gray-500 text-sm">Belum ada makanan yang ditambahkan</p>
              ) : (
                dislikedFoods.map((food) => (
                  <span
                    key={food}
                    className="inline-flex items-center gap-1 bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm"
                  >
                    {food}
                    <button
                      onClick={() => handleRemoveFood(food)}
                      className="hover:bg-red-200 rounded-full p-1"
                    >
                      ✕
                    </button>
                  </span>
                ))
              )}
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Pengaturan Notifikasi</h2>
            <p className="text-gray-600 mb-4">
              Terima rekomendasi menu setiap pagi pukul 07:05
            </p>

            <div className="space-y-4">
              {/* Email Notification */}
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-semibold text-gray-900">📧 Notifikasi Email</h3>
                  <p className="text-sm text-gray-600">Email: {user?.email}</p>
                </div>
                <button
                  onClick={handleToggleEmail}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    subscription.email_notification ? 'bg-green-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      subscription.email_notification ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Telegram Notification */}
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-semibold text-gray-900">📱 Notifikasi Telegram</h3>
                  {user?.telegram_id ? (
                    <p className="text-sm text-gray-600">ID: {user.telegram_id}</p>
                  ) : (
                    <p className="text-sm text-yellow-600">
                      Hubungkan Telegram: Cari @FoodPlannerIDBot dan kirim /start
                    </p>
                  )}
                </div>
                <button
                  onClick={handleToggleTelegram}
                  disabled={!user?.telegram_id}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    subscription.telegram_notification ? 'bg-green-600' : 'bg-gray-300'
                  } ${!user?.telegram_id ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      subscription.telegram_notification ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSavePreferences}
              disabled={saving}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium disabled:bg-gray-400"
            >
              {saving ? 'Menyimpan...' : 'Simpan Preferensi'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
