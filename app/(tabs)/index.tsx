import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";

import { fetchMovies } from "@/services/api";
import useFetch from "@/services/usefetch";

import { icons } from "@/constants/icons";
import { images } from "@/constants/images";

import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { Movie } from "@/interfaces/interfaces";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: movies,
    loading,
    error,
    refetch: loadMovies,
    reset,
  } = useFetch(() => fetchMovies({ query: searchQuery }), true);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  const handleClear = () => {
    setSearchQuery("");
  };

  // Debounced search effect
  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      await loadMovies();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const renderStaticHeader = () => (
    <>
      <View className="w-full flex-row justify-center mt-20 items-center">
        <Image source={icons.logo} className="w-12 h-10" />
      </View>

      <View className="my-5">
        <SearchBar
          placeholder="Search for a movie"
          value={searchQuery}
          onChangeText={handleSearch}
          onClear={handleClear}
        />
      </View>
    </>
  );

  const renderDynamicContent = () => (
    <>
      {loading && (
        <ActivityIndicator size="large" color="#0000ff" className="my-3" />
      )}

      {error && (
        <Text className="text-red-500 px-5 my-3">Error: {error.message}</Text>
      )}

      {!loading &&
        !error &&
        (() => {
          if (searchQuery.trim() && movies?.results?.length! > 0) {
            return (
              <Text className="text-xl text-white font-bold mb-2">
                Search Results for{" "}
                <Text className="text-accent">{searchQuery}</Text>
              </Text>
            );
          } else if (!searchQuery.trim()) {
            return (
              <Text className="text-xl text-white font-bold mb-2">
                Latest Movies
              </Text>
            );
          }
          return null;
        })()}
    </>
  );

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="flex-1 absolute w-full z-0"
        resizeMode="cover"
      />

      <View className="px-5">
        {renderStaticHeader()}
        {renderDynamicContent()}
      </View>

      <FlatList
        className="px-5"
        data={(movies?.results as Movie[]) || []}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MovieCard movie={item} />}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListEmptyComponent={
          !loading && !error ? (
            <View className="mt-10 px-5">
              <Text className="text-center text-gray-500">
                {searchQuery.trim()
                  ? "No movies found"
                  : "Start typing to search for movies"}
              </Text>
            </View>
          ) : null
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Index;
