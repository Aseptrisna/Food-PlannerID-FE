import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsMobileMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const linkClass = (path: string) => {
    return isActive(path)
      ? 'text-green-600 font-medium'
      : 'text-gray-600 hover:text-green-600';
  };

  const mobileLinkClass = (path: string) => {
    return isActive(path)
      ? 'block px-4 py-3 text-green-600 font-medium bg-green-50'
      : 'block px-4 py-3 text-gray-600 hover:text-green-600 hover:bg-gray-50';
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 sm:py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl sm:text-2xl font-bold text-green-600 flex items-center">
            <span className="text-2xl sm:text-3xl mr-1">🍽️</span>
            <span className="hidden xs:inline">FoodPlannerID</span>
          </Link>

          {/* Desktop Menu */}
          {isAuthenticated ? (
            <>
              <div className="hidden md:flex items-center gap-3 lg:gap-4">
                <Link to="/today" className={linkClass('/today')}>
                  Menu Hari Ini
                </Link>
                <Link to="/weekly" className={linkClass('/weekly')}>
                  Menu Mingguan
                </Link>
                <Link to="/preferences" className={linkClass('/preferences')}>
                  Preferensi
                </Link>
                <div className="border-l pl-3 lg:pl-4 ml-2">
                  <span className="text-gray-600 mr-2 text-sm lg:text-base hidden lg:inline">
                    Halo, {user?.name}!
                  </span>
                  <button
                    onClick={handleLogout}
                    className="text-red-600 hover:text-red-700 font-medium text-sm lg:text-base"
                  >
                    Logout
                  </button>
                </div>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden text-gray-600 hover:text-green-600 p-2"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </>
          ) : (
            <div className="flex items-center gap-2 sm:gap-4">
              <Link
                to="/login"
                className="text-gray-600 hover:text-green-600 font-medium text-sm sm:text-base"
              >
                Masuk
              </Link>
              <Link
                to="/register"
                className="bg-green-600 hover:bg-green-700 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-md font-medium text-sm sm:text-base"
              >
                Daftar
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Dropdown */}
        {isAuthenticated && isMobileMenuOpen && (
          <div className="md:hidden mt-3 border-t pt-2">
            <Link
              to="/today"
              className={mobileLinkClass('/today')}
              onClick={closeMobileMenu}
            >
              📅 Menu Hari Ini
            </Link>
            <Link
              to="/weekly"
              className={mobileLinkClass('/weekly')}
              onClick={closeMobileMenu}
            >
              📆 Menu Mingguan
            </Link>
            <Link
              to="/preferences"
              className={mobileLinkClass('/preferences')}
              onClick={closeMobileMenu}
            >
              ⚙️ Preferensi
            </Link>
            <div className="border-t mt-2 pt-2 px-4 py-3">
              <p className="text-gray-600 text-sm mb-2">
                Halo, {user?.name}! 👋
              </p>
              <button
                onClick={handleLogout}
                className="w-full text-left text-red-600 hover:text-red-700 font-medium"
              >
                🚪 Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
