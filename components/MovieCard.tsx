import { icons } from "@/constants/icons";
import { Movie } from "@/interfaces/interfaces";
import { Link } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const MovieCard = ({ movie }: { movie: Movie }) => {
  const baseUrl = "https://image.tmdb.org/t/p/w500";
  const placeholder = "https://placeholder.co/400X600";
  const { id, title, poster_path, vote_average, release_date } = movie;
  return (
    <Link href={`/movies/${id}`} asChild>
      <TouchableOpacity className="w-[30%]">
        <Image
          source={{
            uri: poster_path ? `${baseUrl}${poster_path}` : placeholder,
          }}
          resizeMode="cover"
          className="w-full h-52"
        />
        <Text className="text-white text-sm font-bold" numberOfLines={1}>{title}</Text>
        <View className="flex-row items-center justify-start gap-x-1">
          <Image source={icons.star} className="size-4" />
          <Text className="text-xs text-white font-bold uppercase">
            {Math.round(vote_average / 2)}
          </Text>
        </View>
        <View className="flex-row items-center justify-between">
          <Text className="text-xs text-light-300 font-medium mt-1">
            {release_date?.split("-")[0]}
          </Text>
          <Text className="text-xs font-medium text-light-300 uppercase">
            Movie
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
