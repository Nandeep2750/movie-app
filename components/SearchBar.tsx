import { Image, TextInput, TouchableOpacity, View } from "react-native";

import { icons } from "@/constants/icons";

interface Props {
  placeholder: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onClear?: () => void;
}

const SearchBar = ({ placeholder, value, onChangeText, onClear }: Props) => {
  const showClearIcon = value && value.length > 0;

  return (
    <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-4">
      <Image
        source={icons.search}
        className="w-5 h-5"
        resizeMode="contain"
        tintColor="#AB8BFF"
      />
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        className="flex-1 ml-2 text-white"
        placeholderTextColor="#A8B5DB"
      />
      {showClearIcon && (
        <TouchableOpacity 
          onPress={onClear} 
          className="ml-2 p-1"
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Image
            source={icons.close}
            className="size-3"
            resizeMode="contain"
            tintColor="#A8B5DB"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchBar;