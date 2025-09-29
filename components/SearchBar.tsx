import { icons } from '@/constants/icons';
import React from 'react';
import { Image, TextInput, View } from 'react-native';

interface SearchBarProps {
  placeholder: string;
  onPress: () => void;
}

const SearchBar = ({ placeholder, onPress }: SearchBarProps) => {
  return (
    <View className='flex-row items-center bg-dark-200 rounded-full px-5 py-4'>
      <Image source={icons.search} className='w-5 h-5 mr-2' />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor='#a8b5db'
        className='flex-1 text-white text-sm ml-2'
        onPress={onPress}
      />
    </View>
  )
}

export default SearchBar