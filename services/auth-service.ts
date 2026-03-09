// services/auth-service.ts
import api from './api';

// Kiểu dữ liệu gửi lên
export interface LoginRequest {
  username: string;
  password: string;
}

// Kiểu dữ liệu server trả về khi login thành công
export interface LoginResponse {
  token: string;
  refreshToken: string;
}

export const authService = {
  async login(credentials: LoginRequest): Promise<{
    success: boolean;
    data?: LoginResponse;
    error?: string;
  }> {
    // Gọi POST http://14.252.164.238:8080/api/auth/login
    const response = await api.post<LoginResponse>(
      '/api/auth/login',
      credentials,
    );

    if (response.error) {
      return { success: false, error: response.error };
    }

    return { success: true, data: response.data };
  },
};

export default authService;