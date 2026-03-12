import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const checkPasswordStrength = (pwd: string) => {
    let strength = 0;
    if (pwd.length >= 6) strength++;
    if (pwd.length >= 10) strength++;
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength++;
    if (/\d/.test(pwd)) strength++;
    if (/[!@#$%^&*]/.test(pwd)) strength++;
    setPasswordStrength(strength);
  };

  const handlePasswordChange = (pwd: string) => {
    setPassword(pwd);
    checkPasswordStrength(pwd);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (password.length < 6) {
      setError('Password harus minimal 6 karakter');
      return;
    }

    if (password !== confirmPassword) {
      setError('Password dan konfirmasi password tidak cocok');
      return;
    }

    setIsLoading(true);

    try {
      await register({ name, email, password });
      navigate('/today');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Pendaftaran gagal. Email mungkin sudah terdaftar.');
    } finally {
      setIsLoading(false);
    }
  };

  const getStrengthColor = () => {
    if (passwordStrength <= 1) return 'bg-red-500';
    if (passwordStrength <= 3) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getStrengthText = () => {
    if (passwordStrength <= 1) return 'Lemah';
    if (passwordStrength <= 3) return 'Sedang';
    return 'Kuat';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl w-full flex bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Left Side - Registration Form */}
        <div className="w-full lg:w-1/2 p-12">
          <div className="max-w-md mx-auto">
            {/* Logo Mobile */}
            <div className="lg:hidden text-center mb-8">
              <div className="text-6xl mb-4">🍽️</div>
              <h2 className="text-3xl font-bold text-gray-900">FoodPlannerID</h2>
            </div>

            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Buat Akun Baru
              </h2>
              <p className="text-gray-600">
                Sudah punya akun?{' '}
                <Link to="/login" className="text-blue-600 hover:text-blue-700 font-semibold">
                  Masuk di sini
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

            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* Name Input */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                  Nama Lengkap
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-400 text-xl">👤</span>
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full pl-12 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-gray-900 placeholder-gray-400"
                    placeholder="John Doe"
                  />
                </div>
              </div>

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
                    className="block w-full pl-12 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-gray-900 placeholder-gray-400"
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
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={(e) => handlePasswordChange(e.target.value)}
                    className="block w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-gray-900 placeholder-gray-400"
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
                {password && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-600">Kekuatan Password:</span>
                      <span className={`text-xs font-semibold ${passwordStrength <= 1 ? 'text-red-600' : passwordStrength <= 3 ? 'text-yellow-600' : 'text-green-600'}`}>
                        {getStrengthText()}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor()}`}
                        style={{ width: `${(passwordStrength / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}
                <p className="mt-1 text-xs text-gray-500">Minimal 6 karakter</p>
              </div>

              {/* Confirm Password Input */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                  Konfirmasi Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-400 text-xl">🔐</span>
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="block w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-gray-900 placeholder-gray-400"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    <span className="text-xl">{showConfirmPassword ? '👁️' : '👁️‍🗨️'}</span>
                  </button>
                </div>
                {confirmPassword && password !== confirmPassword && (
                  <p className="mt-1 text-xs text-red-600">❌ Password tidak cocok</p>
                )}
                {confirmPassword && password === confirmPassword && (
                  <p className="mt-1 text-xs text-green-600">✅ Password cocok</p>
                )}
              </div>

              {/* Terms & Conditions */}
              <div className="flex items-start">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                  Saya setuju dengan{' '}
                  <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                    Syarat & Ketentuan
                  </a>
                  {' '}dan{' '}
                  <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                    Kebijakan Privasi
                  </a>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] font-semibold text-lg"
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
                    <span className="mr-2">🎉</span>
                    Daftar Sekarang
                  </>
                )}
              </button>
            </form>

            {/* Back to Home */}
            <div className="mt-6 text-center">
              <Link to="/" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
                ← Kembali ke Beranda
              </Link>
            </div>
          </div>
        </div>

        {/* Right Side - Illustration */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-500 to-blue-600 p-12 items-center justify-center">
          <div className="text-white text-center">
            <div className="text-8xl mb-6 animate-bounce">🎯</div>
            <h2 className="text-4xl font-bold mb-4">Bergabung Dengan Kami!</h2>
            <p className="text-blue-100 text-lg mb-8">
              Dapatkan rekomendasi menu harian yang dipersonalisasi khusus untuk Anda
            </p>
            <div className="grid grid-cols-2 gap-6 text-blue-100">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl mb-2">✨</div>
                <p className="font-semibold">AI Smart</p>
                <p className="text-sm">Rekomendasi pintar</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl mb-2">🗺️</div>
                <p className="font-semibold">Maps</p>
                <p className="text-sm">Lihat lokasi</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl mb-2">📧</div>
                <p className="font-semibold">Email</p>
                <p className="text-sm">Notif harian</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl mb-2">📱</div>
                <p className="font-semibold">Telegram</p>
                <p className="text-sm">Bot support</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
