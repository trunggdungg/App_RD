// services/storage-service.ts
import * as SecureStore from 'expo-secure-store';

// Đặt tên key cố định để tránh nhầm lẫn
const KEYS = {
  ACCESS_TOKEN:  'auth_token',
  REFRESH_TOKEN: 'refresh_token',
};

export const storageService = {
  // Lưu access token
  async setToken(token: string): Promise<void> {
    await SecureStore.setItemAsync(KEYS.ACCESS_TOKEN, token);
  },

  // Đọc access token
  async getToken(): Promise<string | null> {
    return await SecureStore.getItemAsync(KEYS.ACCESS_TOKEN);
  },

  // Lưu refresh token
  async setRefreshToken(refreshToken: string): Promise<void> {
    await SecureStore.setItemAsync(KEYS.REFRESH_TOKEN, refreshToken);
  },

  // Đọc refresh token
  async getRefreshToken(): Promise<string | null> {
    return await SecureStore.getItemAsync(KEYS.REFRESH_TOKEN);
  },

  // Xóa toàn bộ khi logout
  async clearAuth(): Promise<void> {
    await SecureStore.deleteItemAsync(KEYS.ACCESS_TOKEN);
    await SecureStore.deleteItemAsync(KEYS.REFRESH_TOKEN);
  },

  // Kiểm tra đã đăng nhập chưa
  async isLoggedIn(): Promise<boolean> {
    const token = await this.getToken();
    return !!token;
  },
};

export default storageService;