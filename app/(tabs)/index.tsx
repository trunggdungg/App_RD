import { SafeAreaProvider } from 'react-native-safe-area-context';
import LoginScreen from '@/screens/auth/login-screen';

 function Index() {
  return (
    <SafeAreaProvider>
      <LoginScreen
        onLoginSuccess={() => {
          // TODO: điều hướng sang màn hình tiếp theo
          console.log('Đăng nhập thành công!');
        }}
      />
    </SafeAreaProvider>
  );
}

export default Index;