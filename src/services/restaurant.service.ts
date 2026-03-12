import api from './api';
import type { Restaurant } from '../types/restaurant.types';

export const restaurantService = {
  async getAll(): Promise<Restaurant[]> {
    const response = await api.get<Restaurant[]>('/restaurants');
    return response.data;
  },

  async getById(id: string): Promise<Restaurant> {
    const response = await api.get<Restaurant>(`/restaurants/${id}`);
    return response.data;
  },
};
