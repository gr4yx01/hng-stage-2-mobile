import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Text, View } from 'react-native';
import 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import "../global.css";
import axiosInstance from '@/utils/axiosInstance';
import { SWRConfig } from 'swr'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const fetcher = (url: string) => axiosInstance.get(url).then((res) => res.data);  

  return (
    <SWRConfig
      value={{
        fetcher,
        onError: (err) => {
          console.error('SWR Global Error:', err);
        },
        refreshInterval: 100000,
      }}
    >
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: true, header: () => (
          <SafeAreaView className='flex flex-row justify-between items-center p-4'>
            <Text className='font-semibold text-xl'>Explore</Text>
            <MaterialIcons name="dark-mode" size={24} color="black" />
            <StatusBar style="auto" />
          </SafeAreaView>
        ) }} />
      </Stack>
    </SWRConfig>
  );
}
