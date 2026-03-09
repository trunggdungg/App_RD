// services/keychain-service.ts
import * as SecureStore from 'expo-secure-store';

const KEYS = {
  USERNAME: 'keychain_username',
  PASSWORD: 'keychain_password',
};

export interface Credentials {
  username: string;
  password: string;
}

export const keychainService = {
  // Lưu username + password (để tự điền lần sau)
  async saveCredentials(username: string, password: string): Promise<boolean> {
    try {
      await SecureStore.setItemAsync(KEYS.USERNAME, username);
      await SecureStore.setItemAsync(KEYS.PASSWORD, password);
      return true;
    } catch (error) {
      console.error('Error saving credentials:', error);
      return false;
    }
  },

  // Đọc credentials đã lưu
  async getCredentials(): Promise<Credentials | null> {
    try {
      const username = await SecureStore.getItemAsync(KEYS.USERNAME);
      const password = await SecureStore.getItemAsync(KEYS.PASSWORD);
      if (username && password) {
        return { username, password };
      }
      return null;
    } catch (error) {
      console.error('Error getting credentials:', error);
      return null;
    }
  },

  // Xóa credentials (khi logout)
  async clearCredentials(): Promise<boolean> {
    try {
      await SecureStore.deleteItemAsync(KEYS.USERNAME);
      await SecureStore.deleteItemAsync(KEYS.PASSWORD);
      return true;
    } catch (error) {
      console.error('Error clearing credentials:', error);
      return false;
    }
  },
};

export default keychainService;