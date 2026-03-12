import api from './api';

export interface Subscription {
  email_notification: boolean;
  telegram_notification: boolean;
}

export const userService = {
  async getSubscription(): Promise<Subscription> {
    const response = await api.get<Subscription>('/subscriptions');
    return response.data;
  },

  async updateSubscription(subscription: Subscription): Promise<Subscription> {
    const response = await api.post<Subscription>('/subscriptions', subscription);
    return response.data;
  },

  async toggleEmailNotification(): Promise<Subscription> {
    const response = await api.post<Subscription>('/subscriptions/toggle-email');
    return response.data;
  },

  async toggleTelegramNotification(): Promise<Subscription> {
    const response = await api.post<Subscription>('/subscriptions/toggle-telegram');
    return response.data;
  },
};
