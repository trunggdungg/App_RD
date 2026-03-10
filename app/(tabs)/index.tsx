import { SafeAreaProvider } from 'react-native-safe-area-context';
import LoginScreen from '@/screens/auth/login-screen';
import { Tabs } from 'expo-router';
 function Index() {
  return (
    <SafeAreaProvider>
      {/* bỏ tab này để hiện tab  */}
    <Tabs.Screen options={{ tabBarStyle: { display: 'none' }, headerShown: false }} />
      
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