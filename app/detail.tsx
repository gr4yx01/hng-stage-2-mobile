import { View, Text, TouchableOpacity, Image, FlatList, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from '@expo/vector-icons/Ionicons';
import { router, Stack } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { useCountryStore } from '@/store/detail';
import useSWR from 'swr';
import { useColorScheme } from 'nativewind';

const detail = () => {
    const navigation = useNavigation();
    const selectedCountry = useCountryStore((state) => state.selectedCountry)
    const { data } = useSWR(`/countries/${selectedCountry?.name}/states`)
    const { colorScheme } = useColorScheme()

    useEffect(() => {
        navigation.setOptions({
          headerTitle: selectedCountry?.full_name, // Set dynamic header title
          headerTitleStyle: {
            color: colorScheme === 'dark' ? 'white' : '#1f2937', // Set the title text color
            textAlign: 'center', // Center align the title text
          },
        });
      }, [navigation]);

  return (
    <View className={`p-4 bg-white dark:bg-gray-800 h-screen gap-5`}>
     <Image source={{ uri: selectedCountry?.href?.flag }} className='w-full' style={{ aspectRatio: 3/2 }} />
            <View className='flex flex-col gap-3 '>
                <View className='flex flex-row items-center gap-3 justify-between'>
                    <Text className='text-black dark:text-white'>Name:</Text>
                    <Text className='font-semibold text-lg text-black dark:text-white'>{selectedCountry?.full_name}</Text>
                </View>
                <View className='flex flex-row items-center gap-3 justify-between'>
                    <Text className='text-black dark:text-white'>Population:</Text>
                    <Text className='font-semibold text-lg text-black dark:text-white'>{selectedCountry?.population}</Text>
                </View>
                <View className='flex flex-row items-center gap-3 justify-between'>
                    <Text className='text-black dark:text-white'>Capital city:</Text>
                    <Text className='font-semibold text-lg text-black dark:text-white'>{selectedCountry?.capital}</Text>
                </View>
                {
                    selectedCountry?.current_president && (
                        <View className='flex flex-row items-center gap-3 justify-between'>
                            <Text className='text-black dark:text-white'>Current President:</Text>
                            <Text className='font-semibold text-lg text-black dark:text-white'>{selectedCountry?.current_president?.name}</Text>
                        </View>
                    )
                }
                <View className='flex flex-row items-center gap-3 justify-between'>
                    <Text className='text-black dark:text-white'>Continent:</Text>
                    <Text className='font-semibold text-lg text-black dark:text-white'>{selectedCountry?.continent}</Text>
                </View>
                <View className='flex flex-row items-center gap-3 justify-between'>
                    <Text className='text-black dark:text-white'>Country code:</Text>
                    <Text className='font-semibold text-lg text-black dark:text-white'>+{selectedCountry?.phone_code}</Text>
                </View>
            </View>
            <Text className='mt-3 font-semibold text-xl text-black dark:text-white'>State/Provinces</Text>
    <FlatList
        contentContainerStyle={{ padding: 10, gap: 10  }}
        ListFooterComponent={() => <View style={{ height: 20 }} />}
        // horizontal
        data={data?.data}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
            <View className='border p-3 h-12 border-gray-400 rounded-lg'>
                <Text className=' text-black dark:text-white'>{item?.name}</Text>
            </View>
        )}
    />
    </View>
  )
}

export default detail