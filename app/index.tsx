import { View, Text, TextInput, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Checkbox } from 'expo-checkbox';
import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react'
import useSWR from 'swr'
import { router } from 'expo-router'
import { useCountryStore } from '@/store/detail'
import Feather from '@expo/vector-icons/Feather';
import { useColorScheme } from 'nativewind'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import Ionicons from '@expo/vector-icons/Ionicons'
import { useFilterStore } from '@/store/filter';

const index = () => {
    const { isLoading, data } = useSWR('/countries')
    const setSelectedCountry = useCountryStore((state) => state.setSelectedCountry)
    const [countries, setCountries] = useState<any>([])
    const [searchTerm, setSearchTerm] = useState('')
    const { colorScheme } = useColorScheme()
    const setFilterCountries = useFilterStore((state) => state.setFilterCountries)

    const bottomSheetRef = useRef<BottomSheet>(null);

    const snapPoints = useMemo(() => ['75%'], [])

    const [continents, setContinent] = useState([
      {
        'name': 'Africa',
        'selected': false
      },
      {
        'name': 'Asia',
        'selected': false
      },
      {
        'name': 'Europe',
        'selected': false
      },
      {
        'name': 'North America',
        'selected': false
      },
      {
        'name': 'South America',
        'selected': false
      },
      {
        'name': 'Australia',
        'selected': false
      }
    ])

    const [openContinent, setOpenContinent] = useState(false)

    const handleClose = () => {
      setOpenContinent(false)
      bottomSheetRef.current?.close()
    }

    const handleOpen = () => {
      bottomSheetRef.current?.expand();
  };

    useEffect(() => {
        if (data?.data) {
            if(searchTerm) {
                const filter = data?.data?.filter((country: any) => country?.full_name?.toLowerCase()?.includes(searchTerm.toLowerCase()))
                setCountries(filter)
            }else {
              setCountries(data?.data)
            }
        }
    }, [data?.data, searchTerm])

    const handleSelect = (item: any) => {
        setSelectedCountry(item)
        router.push('/detail')
    }

    const resetFilter = () => {
      setContinent((prev) => prev.map((prevItem) => ({ ...prevItem, selected: false })))
    }

    const filter = () => {
      const filter = data?.data?.filter((country: any) => continents?.some((continent) => continent?.selected === true && continent?.name === country?.continent))
      setFilterCountries(filter)
      handleClose()
      resetFilter()
      router.push('/filter')
    }

  return (
      <View className={`w-full h-screen p-4 bg-white dark:bg-gray-800`}>
        <View className='flex flex-col gap-3 items-end'>
          <View className='border border-black dark:border-white w-full p-3 rounded-md'>
            <TextInput placeholder='Search Country' className='text-black dark:text-white' placeholderTextColor={colorScheme === 'dark' ? 'white' : 'black'} onChangeText={(value) => setSearchTerm(value)}/>
          </View>
          <TouchableOpacity onPress={handleOpen} className='border border-black dark:border-white p-3 flex flex-row items-center gap-3 rounded-md'>
            <Feather name="filter" size={20} color={colorScheme === 'dark' ? 'white' : "#1f2937"} />
            <Text className='text-black dark:text-white'>Filter</Text>
          </TouchableOpacity>                                                                         
          
        </View>
        
        <FlatList 
          data={countries}
          ListFooterComponent={() => <View style={{ marginBottom: 180 }} />}
          ListEmptyComponent={() => (
            <View className='flex h-[50vh] w-full justify-center items-center'>
            {
              isLoading ? <ActivityIndicator size={20}/> : (
                    <Text>No countries</Text>
                  )
                }
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
        <BottomSheet ref={bottomSheetRef} snapPoints={snapPoints} index={0} enablePanDownToClose>
          <BottomSheetView style={{ backgroundColor: 'white', width: '100%',padding: 20, gap: 30  }}>
            <View className='w-full flex justify-between items-center flex-row'>
              <Text className='font-semibold text-lg'>Filter</Text>
              <TouchableOpacity onPress={() => {
                setOpenContinent(false)
                handleClose()
              }} className='bg-gray-200 p-1 rounded-md'>
                <Ionicons name='close' size={25} onPress={handleClose} />
              </TouchableOpacity>
            </View>
            <View className='flex flex-row items-center justify-between '>
              <Text className='font-semibold text-xl'>Continents</Text>
              <TouchableOpacity onPress={() => setOpenContinent((prev) => !prev)}>
                {
                  openContinent ? <Feather name="chevron-up" size={24} color="black" /> : <Feather name="chevron-down" size={24} color="black" />
                }
              </TouchableOpacity>
            </View>
            {
              openContinent && (
                <FlatList
                  data={continents}
                  contentContainerStyle={{ gap: 20 }}
                  renderItem={({ item }) => (
                    <View className='flex flex-row items-center justify-between'>
                      <Text>{item?.name}</Text>
                      <Checkbox
                        color="black"
                        value={item?.selected}
                        onValueChange={() => setContinent((prev) => prev.map((prevItem) => prevItem?.name === item?.name ? { ...prevItem, selected: !prevItem?.selected } : prevItem))}
                        className='rounded-full'
                      />
                    </View>
                  )}
                />
              )
            }
            {
              continents?.some((continent) => continent?.selected === true) && (
                <View className='flex flex-row gap-3 w-full'>
                  <TouchableOpacity onPress={resetFilter} className='border p-3 rounded-md w-1/2'>
                    <Text className='font-bold text-lg text-center'>Reset</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={filter} className='bg-black flex-1 p-3'>
                    <Text className='text-white text-lg font-semibold text-center'>Show results</Text>
                  </TouchableOpacity>
                </View>
              )
            }
          </BottomSheetView>
        </BottomSheet>
      </View>
  )
}

export default index