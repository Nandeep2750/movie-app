import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold text-dark-200">
        Welcome to Nativewind!
      </Text>
      <Link href="/movies/123">MovieDetails</Link>
    </View>
  );
}
