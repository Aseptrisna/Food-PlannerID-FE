import type { MealItem } from '../../types/menu.types';

interface MealCardProps {
  title: string;
  icon: string;
  meal: MealItem;
  onViewMap?: () => void;
}

export const MealCard: React.FC<MealCardProps> = ({
  title,
  icon,
  meal,
  onViewMap,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        <span className="text-3xl mr-3">{icon}</span>
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      </div>

      <h3 className="text-xl font-semibold text-green-600 mb-2">{meal.menu}</h3>

      <div className="mb-4">
        <p className="text-gray-700 font-medium mb-1">
          📍 {meal.restaurant}
        </p>
        <p className="text-gray-600">{meal.address}</p>
        <p className="text-sm text-gray-500 mt-1">
          Koordinat: {meal.latitude}, {meal.longitude}
        </p>
      </div>

      {onViewMap && (
        <button
          onClick={onViewMap}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-medium transition duration-200"
        >
          🗺️ Lihat di Peta
        </button>
      )}
    </div>
  );
};
