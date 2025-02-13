import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { router, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useMemo, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import "../global.css";
import axiosInstance from '@/utils/axiosInstance';
import { SWRConfig } from 'swr'
import { useCountryStore } from '@/store/detail';
import { darkTheme, lightTheme } from '@/theme'
import { useColorScheme } from 'nativewind';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet from '@gorhom/bottom-sheet';


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
        <GestureHandlerRootView>
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
        <Stack.Screen name='filter' options={{ headerShown: true, headerLeft: () => (
          <TouchableOpacity onPress={() => router.back()}>
            <MaterialIcons name="arrow-back" size={24} color={colorScheme === 'dark' ? 'white' : '#1f2937' } />
          </TouchableOpacity>
        ), headerTitleAlign: 'center', headerStyle: { backgroundColor: colorScheme === 'dark' ? '#1f2937' : 'white' } }} />
          </Stack>
        </GestureHandlerRootView>
      </SWRConfig>
  );
}

