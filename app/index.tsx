import { View, Text, TextInput, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import { router } from 'expo-router'
import { useCountryStore } from '@/store/detail'
import Feather from '@expo/vector-icons/Feather';
import { useColorScheme } from 'nativewind'

const index = () => {
    const { data } = useSWR('/countries')
    const setSelectedCountry = useCountryStore((state) => state.setSelectedCountry)
    const [countries, setCountries] = useState<any>([])
    const [searchTerm, setSearchTerm] = useState('')
    const { colorScheme } = useColorScheme()

    useEffect(() => {
        if (data?.data) {
            if(searchTerm) {
                const filter = data?.data?.filter((country: any) => country?.full_name?.toLowerCase()?.includes(searchTerm.toLowerCase()))
                setCountries(filter)
            } else {
              setCountries(data?.data)
            }
        }
    }, [data?.data, searchTerm])

    const handleSelect = (item: any) => {
        setSelectedCountry(item)
        router.push('/detail')
    }

  return (
    <View className={`w-full h-screen p-4 bg-white dark:bg-gray-800`}>
      <View className='flex flex-col gap-3 items-end'>
        <View className='border border-black dark:border-white w-full p-3 rounded-md'>
          <TextInput placeholder='Search Country' className='text-black dark:text-white' placeholderTextColor={colorScheme === 'dark' ? 'white' : 'black'} onChangeText={(value) => setSearchTerm(value)}/>
        </View>
        <View className='border border-black dark:border-white p-3 flex flex-row items-center gap-3 rounded-md'>
          <Feather name="filter" size={20} color={colorScheme === 'dark' ? 'white' : "#1f2937"} />
          <Text className='text-black dark:text-white'>Filter</Text>
        </View>
      </View>
      <FlatList 
        data={countries}
        ListFooterComponent={() => <View style={{ marginBottom: 180 }} />}
        ListEmptyComponent={() => (
            <View>
                <Text>No countries</Text>
            </View>
        )} 
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSelect(item)} className='p-4 border-gray-300 border-b flex flex-row items-center gap-3'>
                <Image source={{ uri: item?.href.flag }} className='w-16 h-16 rounded-full' />
                <View className='flex flex-col gap-3'>
                    <Text className='font-semibold text-black dark:text-white'>{item?.full_name}</Text>
                    <Text className='text-black dark:text-white'>Continent: {item?.continent}</Text>
                </View>
            </TouchableOpacity>
        )}
      />
    </View>
  )
}

export default index