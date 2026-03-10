// services/auth-manager.ts
import { Alert } from 'react-native';
import { storageService } from './storage-service';

type LogoutCallback = () => void;

class AuthManager {
  private logoutCallback: LogoutCallback | null = null;

  // Đăng ký hàm điều hướng về màn hình Login
  // Gọi hàm này 1 lần duy nhất ở _layout.tsx
  setLogoutCallback(callback: LogoutCallback) {
    this.logoutCallback = callback;
  }

  async handleTokenExpired() {
    try {
      // 1. Xóa token khỏi storage
      await storageService.clearAuth();

      // 2. Điều hướng về màn hình Login
      if (this.logoutCallback) {
        this.logoutCallback();
      }

      // 3. Hiện thông báo (delay nhỏ để navigation chạy trước)
      setTimeout(() => {
        Alert.alert(
          'Phiên đăng nhập hết hạn',
          'Vui lòng đăng nhập lại.',
          [{ text: 'OK' }],
          { cancelable: false },
        );
      }, 100);
    } catch (error) {
      console.error('[AuthManager] Lỗi xử lý token hết hạn:', error);
    }
  }
}

export const authManager = new AuthManager();
export default authManager;