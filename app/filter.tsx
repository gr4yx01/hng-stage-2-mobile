import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { router, useNavigation, useRouter } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { useFilterStore } from '@/store/filter';
import { useCountryStore } from '@/store/detail';

const filter = () => {
    const navigation = useNavigation();
    const { colorScheme } = useColorScheme()
    const filterCountries: any = useFilterStore((state) => state.filterCountries)
    const setSelectedCountry = useCountryStore((state) => state.setSelectedCountry)

     useEffect(() => {
        navigation.setOptions({
          headerTitle: 'Filter Result', // Set dynamic header title
          headerTitleStyle: {
            color: colorScheme === 'dark' ? 'white' : '#1f2937', // Set the title text color
            textAlign: 'center', // Center align the title text
          },
        });
    }, [navigation]);

     const handleSelect = (item: any) => {
            setSelectedCountry(item)
            router.push('/detail')
        }

  return (
    <View className='bg-white dark:bg-gray-800'>
      <FlatList
                data={filterCountries}
                ListFooterComponent={() => <View style={{ marginBottom: 180 }} />}
                ListEmptyComponent={() => (
                  <View className='flex h-[50vh] w-full justify-center items-center'>
                  {/* {
                    isLoading ? <ActivityIndicator size={20}/> : (
                          <Text>No countries</Text>
                        )
                      } */}
                </View>
                )} 
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleSelect(item)} className='p-4 border-gray-300 border-b flex flex-row items-center gap-3'>
                        <Image source={{ uri: item?.href.flag }} className='w-16 h-16 rounded-full' />
                        <View className='flex flex-col gap-3'>
                            <Text className='font-semibold text-black dark:text-white'>{item?.full_name}</Text>
                            <Text className='text-black dark:text-white'>Currency: {item?.currency}</Text>
                        </View>
                    </TouchableOpacity>
                )}
              />
    </View>
  )
}

export default filter