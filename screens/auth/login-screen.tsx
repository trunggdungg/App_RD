import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as SecureStore from 'expo-secure-store';

import TextField from '@/components/text-field';
import AppButton  from '@/components/button';
import AppColors  from '@/constants/app-colors';

interface Props {
  onLoginSuccess?: () => void;
}

export default function LoginScreen({ onLoginSuccess }: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading,  setLoading]  = useState(false);
  const [errors,   setErrors]   = useState<{
    username?: string;
    password?: string;
  }>({});

  // Load credentials đã lưu từ lần đăng nhập trước
  useEffect(() => {
    (async () => {
      const u = await SecureStore.getItemAsync('saved_username');
      const p = await SecureStore.getItemAsync('saved_password');
      if (u) setUsername(u);
      if (p) setPassword(p);
    })();
  }, []);

  // Validate form
  const validate = (): boolean => {
    const e: typeof errors = {};
    if (!username.trim())     e.username = 'Vui lòng nhập email';
    if (!password)            e.password = 'Vui lòng nhập mật khẩu';
    else if (password.length < 6) e.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      // ── Tạm thời giả lập gọi API ──────────────────────
      // Sau này thay bằng: const result = await authService.login(...)
      await new Promise(r => setTimeout(r, 1000));
      const loginSuccess = true; // giả sử luôn thành công
      // ────────────────────────────────────────────────────

      if (loginSuccess) {
        // Lưu credentials (thay thế keychainService của repo gốc)
        await SecureStore.setItemAsync('saved_username', username.trim());
        await SecureStore.setItemAsync('saved_password', password);

        if (onLoginSuccess) {
            onLoginSuccess();
        }
      } else {
        Alert.alert('Lỗi', 'Đăng nhập thất bại');
      }
    } catch {
      Alert.alert('Lỗi', 'Đã xảy ra lỗi. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/*
        KeyboardAvoidingView đẩy UI lên khi bàn phím xuất hiện
        - iOS: dùng 'padding'
        - Android: dùng 'height'
      */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}>

        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled">

          {/* ── HEADER ── */}
          <View style={styles.header}>
            {/* Logo placeholder — thay bằng <Image> khi có file logo */}
            <View style={styles.logo}>
              <Text style={styles.logoText}>DA</Text>
            </View>
            <Text style={styles.title}>Đăng nhập</Text>
            <Text style={styles.subtitle}>Đông Á Platform</Text>
          </View>

          {/* ── FORM ── */}
          <View style={styles.form}>
            <TextField
              label="Email"
              value={username}
              onChangeText={setUsername}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              error={!!errors.username}
              errorText={errors.username}
            />

            <TextField
              label="Mật khẩu"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              showPasswordToggle      // bật nút 👁
              autoCapitalize="none"
              error={!!errors.password}
              errorText={errors.password}
            />

            <AppButton
              title="Đăng nhập"
              onPress={handleLogin}
              loading={loading}
              style={styles.loginBtn}
            />

            <AppButton
              title="Quên mật khẩu?"
              variant="text"
              color="primary"
              onPress={() => Alert.alert('Thông báo', 'Tính năng đang phát triển')}
            />
          </View>

          {/* ── FOOTER ── */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>© 2026 Đông Á Platform</Text>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background,
  },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: 24,
  },

  // Header
  header: {
    alignItems: 'center',
    marginTop: 48,
    marginBottom: 40,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: AppColors.primary.main,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: AppColors.white,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: AppColors.onSurface,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    color: AppColors.accent[400],
  },

  // Form
  form: {
    flex: 1,
  },
  loginBtn: {
    marginTop: 24,
    height: 48,
  },

  // Footer
  footer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  footerText: {
    fontSize: 12,
    color: AppColors.accent[400],
  },
});