import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { router, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import "../global.css";
import axiosInstance from '@/utils/axiosInstance';
import { SWRConfig } from 'swr'
import { useCountryStore } from '@/store/detail';
import { darkTheme, lightTheme } from '@/theme'
import { useColorScheme } from 'nativewind';
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();


export default function RootLayout() {
  const { colorScheme, toggleColorScheme } = useColorScheme()
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


  //  const selectedCountry = useCountryStore((state) => state.selectedCountry);

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
            <SafeAreaView className={`flex flex-row justify-between items-center p-4 bg-white dark:bg-gray-800`}>
              <Text className='font-semibold text-xl text-black dark:text-white'>Explore</Text>
              {
                colorScheme === 'dark' ? <MaterialIcons name="light-mode" size={24} color="white" onPress={toggleColorScheme}/> : <MaterialIcons name="dark-mode" size={24} color="black" onPress={toggleColorScheme}/>
              }
            </SafeAreaView>
          ) }} />
          <Stack.Screen name='detail' options={{ headerShown: true, headerLeft: () => (
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={24} color={colorScheme === 'dark' ? 'white' : '#1f2937' } />
        </TouchableOpacity>
      ), headerTitleAlign: 'center', headerStyle: { backgroundColor: colorScheme === 'dark' ? '#1f2937' : 'white' } }} />
        </Stack>
      </SWRConfig>
  );
}
