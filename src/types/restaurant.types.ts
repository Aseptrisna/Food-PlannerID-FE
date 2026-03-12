export interface Restaurant {
  _id: string;
  name: string;
  address: string;
  city: string;
  latitude: number;
  longitude: number;
  cuisine_types: string[];
  is_active: boolean;
  created_at: string;
}
