import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login({ email, password });
      navigate('/today');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login gagal. Periksa email dan password Anda.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-green-500 to-green-600 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl w-full flex bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Left Side - Illustration */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-green-500 to-green-600 p-12 items-center justify-center">
          <div className="text-white text-center">
            <div className="text-8xl mb-6 animate-bounce">🍽️</div>
            <h2 className="text-4xl font-bold mb-4">Selamat Datang Kembali!</h2>
            <p className="text-green-100 text-lg mb-8">
              Login untuk mendapatkan rekomendasi menu harian spesial untuk Anda
            </p>
            <div className="flex justify-center gap-8 text-green-100">
              <div className="text-center">
                <div className="text-3xl mb-2">🤖</div>
                <p className="text-sm">AI Powered</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">📍</div>
                <p className="text-sm">Real Location</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🔔</div>
                <p className="text-sm">Daily Notif</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 p-12">
          <div className="max-w-md mx-auto">
            {/* Logo Mobile */}
            <div className="lg:hidden text-center mb-8">
              <div className="text-6xl mb-4">🍽️</div>
              <h2 className="text-3xl font-bold text-gray-900">FoodPlannerID</h2>
            </div>

            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Masuk ke Akun Anda
              </h2>
              <p className="text-gray-600">
                Belum punya akun?{' '}
                <Link to="/register" className="text-green-600 hover:text-green-700 font-semibold">
                  Daftar di sini
                </Link>
              </p>
            </div>

            {error && (
              <div className="mb-6 bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-r animate-shake">
                <div className="flex items-center">
                  <span className="text-xl mr-2">⚠️</span>
                  <span>{error}</span>
                </div>
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-400 text-xl">📧</span>
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-12 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 text-gray-900 placeholder-gray-400"
                    placeholder="email@example.com"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-400 text-xl">🔒</span>
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 text-gray-900 placeholder-gray-400"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    <span className="text-xl">{showPassword ? '👁️' : '👁️‍🗨️'}</span>
                  </button>
                </div>
              </div>

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Ingat saya
                  </label>
                </div>
                <div className="text-sm">
                  <a href="#" className="text-green-600 hover:text-green-700 font-medium">
                    Lupa password?
                  </a>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] font-semibold text-lg"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Memproses...
                  </>
                ) : (
                  <>
                    <span className="mr-2">🚀</span>
                    Masuk Sekarang
                  </>
                )}
              </button>
            </form>

            {/* Social Login (Optional - for future) */}
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Atau masuk dengan</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button className="w-full inline-flex justify-center items-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition duration-200">
                  <span className="text-xl mr-2">🔵</span>
                  Google
                </button>
                <button className="w-full inline-flex justify-center items-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition duration-200">
                  <span className="text-xl mr-2">📘</span>
                  Facebook
                </button>
              </div>
            </div>

            {/* Back to Home */}
            <div className="mt-8 text-center">
              <Link to="/" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
                ← Kembali ke Beranda
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
