export interface MealItem {
  menu: string;
  restaurant: string;
  address: string;
  latitude: number;
  longitude: number;
}

export interface MealTimeMenu {
  main: MealItem;
  alternatives: MealItem[];
}

export interface DailyMenu {
  _id: string;
  date: string;
  breakfast: MealTimeMenu;
  lunch: MealTimeMenu;
  dinner: MealTimeMenu;
  generated_by?: string;
  created_at: string;
}

export type MealType = 'breakfast' | 'lunch' | 'dinner';
