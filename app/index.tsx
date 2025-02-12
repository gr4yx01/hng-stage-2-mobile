import { View, Text, TextInput, FlatList, Image } from 'react-native'
import React from 'react'
import useSWR from 'swr'

const index = () => {
    const { data } = useSWR('/countries')

  return (
    <View className='w-full p-4'>
      <View className=' border-gray-300 w-full p-3 rounded-md border'>
        <TextInput placeholder='Search Country' className=''/>
      </View>
      <FlatList 
        data={data?.data}
        ListEmptyComponent={() => (
            <View>
                <Text>No countries</Text>
            </View>
        )} 
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
            <View className='p-4 border-gray-300 border-b flex flex-row items-center gap-3'>
                <Image source={{ uri: item.href.flag }} className='w-16 h-16 rounded-full' />
                <View className='flex flex-col gap-3'>
                    <Text className='font-semibold'>{item.full_name}</Text>
                    <Text>Continent: {item?.continent}</Text>
                </View>
            </View>
        )}
      />
    </View>
  )
}

export default index