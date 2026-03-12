import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="text-3xl">🍽️</span>
              <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
                FoodPlannerID
              </span>
            </div>
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <Link
                  to="/today"
                  className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2.5 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  Dashboard →
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-gray-700 font-medium hover:text-green-600 transition-colors"
                  >
                    Masuk
                  </Link>
                  <Link
                    to="/register"
                    className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2.5 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    Daftar Gratis
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-green-50 border border-green-200 rounded-full px-4 py-2 mb-8">
              <span className="text-green-600 font-semibold text-sm">✨ AI-Powered</span>
              <span className="text-gray-400">|</span>
              <span className="text-gray-600 text-sm">Bandar Lampung</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Rekomendasi Menu
              <br />
              <span className="bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent">
                Setiap Hari
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Bingung mau makan apa? Biarkan AI kami merekomendasikan menu sarapan,
              makan siang, dan makan malam dari restoran terbaik di Bandar Lampung.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              {isAuthenticated ? (
                <Link
                  to="/today"
                  className="group bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-200 flex items-center"
                >
                  Lihat Menu Hari Ini
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="group bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-200 flex items-center"
                  >
                    Mulai Gratis
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                  <Link
                    to="/login"
                    className="bg-white text-gray-700 px-8 py-4 rounded-full font-semibold text-lg border-2 border-gray-200 hover:border-green-500 hover:text-green-600 transition-all duration-200"
                  >
                    Sudah Punya Akun
                  </Link>
                </>
              )}
            </div>

            {/* Social Proof */}
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <span>⭐⭐⭐⭐⭐</span>
              </div>
              <span className="hidden sm:inline">|</span>
              <span className="font-medium">10+ Restoran Tersedia</span>
              <span className="hidden sm:inline">|</span>
              <span className="font-medium">100% Gratis</span>
            </div>
          </div>

          {/* Hero Image/Illustration */}
          <div className="mt-16 relative">
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-3xl p-8 shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Sample Menu Cards */}
                <div className="bg-white rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-transform">
                  <span className="text-4xl mb-3 block">🌅</span>
                  <h3 className="font-bold text-lg mb-2">Sarapan</h3>
                  <p className="text-gray-600 text-sm mb-1">Nasi Uduk Komplit</p>
                  <p className="text-green-600 text-xs font-medium">Warung Bu Kris</p>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-transform md:mt-8">
                  <span className="text-4xl mb-3 block">☀️</span>
                  <h3 className="font-bold text-lg mb-2">Makan Siang</h3>
                  <p className="text-gray-600 text-sm mb-1">Seruit Khas Lampung</p>
                  <p className="text-green-600 text-xs font-medium">Pagi Sore</p>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-transform">
                  <span className="text-4xl mb-3 block">🌙</span>
                  <h3 className="font-bold text-lg mb-2">Makan Malam</h3>
                  <p className="text-gray-600 text-sm mb-1">Pempek Palembang</p>
                  <p className="text-green-600 text-xs font-medium">Pempek Vico</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Kenapa Pilih FoodPlannerID?
            </h2>
            <p className="text-gray-600 text-lg">
              Fitur lengkap untuk pengalaman kuliner yang lebih baik
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow">
              <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center text-3xl mb-6">
                🤖
              </div>
              <h3 className="text-xl font-bold mb-3">AI-Powered</h3>
              <p className="text-gray-600 leading-relaxed">
                Powered by Google Gemini AI untuk rekomendasi menu yang personal
                dan sesuai dengan preferensi Anda.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center text-3xl mb-6">
                📍
              </div>
              <h3 className="text-xl font-bold mb-3">Lokasi Real</h3>
              <p className="text-gray-600 leading-relaxed">
                Semua restoran adalah lokasi asli di Bandar Lampung dengan
                alamat lengkap dan koordinat yang akurat.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center text-3xl mb-6">
                🔔
              </div>
              <h3 className="text-xl font-bold mb-3">Notifikasi Harian</h3>
              <p className="text-gray-600 leading-relaxed">
                Dapatkan rekomendasi menu setiap pagi via Email dan Telegram,
                langsung ke inbox Anda.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow">
              <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl flex items-center justify-center text-3xl mb-6">
                🗺️
              </div>
              <h3 className="text-xl font-bold mb-3">Interactive Maps</h3>
              <p className="text-gray-600 leading-relaxed">
                Lihat lokasi restoran di peta interaktif dengan Leaflet dan
                OpenStreetMap integration.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow">
              <div className="w-14 h-14 bg-gradient-to-br from-red-400 to-red-600 rounded-2xl flex items-center justify-center text-3xl mb-6">
                ⚙️
              </div>
              <h3 className="text-xl font-bold mb-3">Personalisasi</h3>
              <p className="text-gray-600 leading-relaxed">
                Atur preferensi makanan yang tidak disukai, dan AI akan
                menghindari rekomendasi tersebut.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow">
              <div className="w-14 h-14 bg-gradient-to-br from-pink-400 to-pink-600 rounded-2xl flex items-center justify-center text-3xl mb-6">
                📅
              </div>
              <h3 className="text-xl font-bold mb-3">Weekly Calendar</h3>
              <p className="text-gray-600 leading-relaxed">
                Lihat riwayat menu 7 hari terakhir dalam format kalender
                yang mudah dibaca.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Cara Kerja
            </h2>
            <p className="text-gray-600 text-lg">
              Mulai dalam 4 langkah mudah
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { num: '1', icon: '📝', title: 'Daftar Gratis', desc: 'Buat akun dalam 1 menit' },
              { num: '2', icon: '⚙️', title: 'Atur Preferensi', desc: 'Beritahu makanan favoritmu' },
              { num: '3', icon: '✨', title: 'AI Generate', desc: 'Menu dipersonalisasi untukmu' },
              { num: '4', icon: '🎉', title: 'Nikmati!', desc: 'Coba restoran yang direkomendasi' },
            ].map((step) => (
              <div key={step.num} className="text-center">
                <div className="relative inline-block mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-4xl shadow-lg">
                    {step.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {step.num}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-green-500 to-green-600">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Siap Mencoba Menu Harian?
          </h2>
          <p className="text-green-50 text-xl mb-10">
            Bergabung sekarang dan dapatkan rekomendasi menu personal dari AI
          </p>
          {isAuthenticated ? (
            <Link
              to="/today"
              className="inline-block bg-white text-green-600 px-10 py-4 rounded-full font-bold text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
            >
              Lihat Menu Hari Ini →
            </Link>
          ) : (
            <Link
              to="/register"
              className="inline-block bg-white text-green-600 px-10 py-4 rounded-full font-bold text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
            >
              Daftar Gratis Sekarang →
            </Link>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-3xl">🍽️</span>
                <span className="text-xl font-bold text-white">FoodPlannerID</span>
              </div>
              <p className="text-gray-400 mb-4">
                Rekomendasi menu harian powered by AI untuk Bandar Lampung.
                Temukan restoran terbaik setiap hari.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">📧</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">📱</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">🌐</a>
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">How it Works</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-sm">
              © 2026 FoodPlannerID. Made with ❤️ in Bandar Lampung.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
