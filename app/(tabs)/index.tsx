import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  View
} from "react-native";

export default function Index() {
  const router = useRouter();
  const {
    data: movies,
    loading,
    error,
    refetch,
    reset,
  } = useFetch(() => fetchMovies({ query: "" }), true);

  const renderHeader = () => (
    <View className="px-5">
      <Image source={icons.logo} className="w-12 h-10 mt-5 mx-auto" />
      <View className="mt-5">
        <SearchBar
          placeholder="Search for a movie"
          onPress={() => router.push("/search")}
        />
      </View>
      <Text className="text-lg text-white font-bold mt-5 mb-3">
        Latest Movies
      </Text>
    </View>
  );

  const renderContent = () => {
    if (loading) {
      return (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
    if (error) {
      return (
        <View className="flex-1 justify-center items-center px-5">
          <Text className="text-white text-center">Error: {error.message}</Text>
        </View>
      );
    }
    return (
      <FlatList
        data={movies?.results || []}
        renderItem={({ item }) => <MovieCard movie={item} />}
        numColumns={3}
        keyExtractor={(item) => item.id.toString()}
        columnWrapperStyle={{
          gap: 20,
          justifyContent: "space-between",
          paddingHorizontal: 5,
          marginBottom: 20,
          marginHorizontal: 10,
        }}
        ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    );
  };

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="absolute w-full z-0"
        resizeMode="cover"
      />
      {renderContent()}
    </View>
  );
}
