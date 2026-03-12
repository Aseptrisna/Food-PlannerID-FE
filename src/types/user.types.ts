export interface User {
  _id: string;
  name: string;
  email: string;
  telegram_id?: string;
  disliked_foods: string[];
  created_at: string;
}

export interface AuthResponse {
  user: User;
  access_token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}
