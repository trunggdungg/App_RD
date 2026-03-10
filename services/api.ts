// services/api.ts
import { authManager } from './auth-manager';
const BASE_URL = 'http://14.252.164.238:8080';

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

export const api = {
  async post<T>(
    endpoint: string,
    body: object,
    token?: string,
  ): Promise<ApiResponse<T>> {
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      // Nếu có token thì đính vào header (dùng cho các API cần xác thực)
      if (token) {
        headers['X-Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        if (response.status === 401) {
          if (token) {
            authManager.handleTokenExpired();
          }

          const errorData = await response.json().catch(() => ({}));
          return {
            error: errorData.message || 'Unauthorized',
          };
        }

        const errorData = await response.json().catch(() => ({}));
        return {
          error: errorData.message || `Lỗi HTTP: ${response.status}`,
        };
      }

      const data = await response.json();
      return { data };
    } catch (error) {
      // Lỗi mạng (không kết nối được)
      return {
        error: error instanceof Error ? error.message : 'Lỗi kết nối mạng',
      };
    }
  },

  async get<T>(
    endpoint: string,
    token?: string,
  ): Promise<ApiResponse<T>> {
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      if (token) {
        headers['X-Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'GET',
        headers,
      });

      if (!response.ok) {
        if (response.status === 401) {
          if (token) {
            authManager.handleTokenExpired();
          }

          const errorData = await response.json().catch(() => ({}));
          return {
            error: errorData.message || 'Unauthorized',
          };
        }

        const errorData = await response.json().catch(() => ({}));
        return {
          error: errorData.message || `Lỗi HTTP: ${response.status}`,
        };
      }

      const data = await response.json();
      return { data };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Lỗi kết nối mạng',
      };
    }
  },
};

export default api;