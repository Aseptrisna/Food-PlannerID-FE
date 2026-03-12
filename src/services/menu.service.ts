import api from './api';
import type { DailyMenu } from '../types/menu.types';

export const menuService = {
  async getTodayMenu(): Promise<DailyMenu> {
    const response = await api.get<DailyMenu>('/menu/today');
    return response.data;
  },

  async getWeeklyMenu(): Promise<DailyMenu[]> {
    const response = await api.get<DailyMenu[]>('/menu/weekly');
    return response.data;
  },

  async generateMenu(): Promise<DailyMenu> {
    const response = await api.post<DailyMenu>('/menu/generate');
    return response.data;
  },
};
