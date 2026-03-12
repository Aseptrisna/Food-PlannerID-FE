import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const linkClass = (path: string) => {
    return isActive(path)
      ? 'text-green-600 font-medium'
      : 'text-gray-600 hover:text-green-600';
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-green-600">
            🍽️ FoodPlannerID
          </Link>

          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <Link to="/today" className={linkClass('/today')}>
                Menu Hari Ini
              </Link>
              <Link to="/weekly" className={linkClass('/weekly')}>
                Menu Mingguan
              </Link>
              <Link to="/preferences" className={linkClass('/preferences')}>
                Preferensi
              </Link>
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
          ) : (
            <div className="flex items-center gap-4">
              <Link
                to="/login"
                className="text-gray-600 hover:text-green-600 font-medium"
              >
                Masuk
              </Link>
              <Link
                to="/register"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium"
              >
                Daftar
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
