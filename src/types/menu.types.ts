export interface MealItem {
  menu: string;
  restaurant: string;
  address: string;
  latitude: number;
  longitude: number;
}

export interface DailyMenu {
  _id: string;
  date: string;
  breakfast: MealItem;
  lunch: MealItem;
  dinner: MealItem;
  generated_by?: string;
  created_at: string;
}

export type MealType = 'breakfast' | 'lunch' | 'dinner';
