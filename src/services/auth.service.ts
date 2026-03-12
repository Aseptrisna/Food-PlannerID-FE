import api from './api';
import type { AuthResponse, LoginCredentials, RegisterCredentials, User } from '../types/user.types';

export const authService = {
  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/register', credentials);
    return response.data;
  },

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    return response.data;
  },

  async getProfile(): Promise<User> {
    const response = await api.get<User>('/users/profile');
    return response.data;
  },

  async updatePreferences(disliked_foods: string[]): Promise<User> {
    const response = await api.patch<User>('/users/preferences', {
      disliked_foods,
    });
    return response.data;
  },

  saveToken(token: string): void {
    localStorage.setItem('access_token', token);
  },

  saveUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  },

  getToken(): string | null {
    return localStorage.getItem('access_token');
  },

  getUser(): User | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },
};
