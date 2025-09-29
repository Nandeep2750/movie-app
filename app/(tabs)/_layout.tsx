import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Tabs } from "expo-router";
import React, { memo } from "react";
import { Image, ImageBackground, Text, View } from "react-native";

interface TabIconProps {
  focused: boolean;
  icon: any;
  title: string;
}

const TabIcon = memo(({ focused, icon, title }: TabIconProps) => {
  if (focused) {
    return (
      <ImageBackground
        source={images.highlight}
        className="flex flex-row w-full flex-1 min-w-[112px] min-h-14 mt-4 justify-center items-center rounded-full overflow-hidden"
      >
        <Image source={icon} tintColor="#151312" className="size-5" />
        <Text className="text-secondary text-base font-semibold ml-2">
          {title}
        </Text>
      </ImageBackground>
    );
  }

  return (
    <View className="size-full justify-center items-center mt-4 rounded-full">
      <Image source={icon} tintColor="#A8B5DB" className="size-5" />
    </View>
  );
});

TabIcon.displayName = 'TabIcon';

// Tab configuration
const TAB_CONFIG = [
  { name: "index", title: "Home", icon: icons.home },
  { name: "saved", title: "Saved", icon: icons.save },
  { name: "search", title: "Search", icon: icons.search },
  { name: "profile", title: "Profile", icon: icons.person },
] as const;

// Screen options configuration
const SCREEN_OPTIONS = {
  tabBarShowLabel: false,
  tabBarItemStyle: {
    width: "100%",
    height: "100%",
    justifyContent: "center" as const,
    alignItems: "center" as const,
  },
  tabBarStyle: {
    backgroundColor: "#0F0D23",
    borderRadius: 50,
    marginHorizontal: 20,
    marginBottom: 36,
    height: 52,
    position: "absolute" as const,
    overflow: "hidden" as const,
    borderWidth: 1,
    borderColor: "#0F0D23",
  },
} as const;

const _layout = () => {
  return (
    <Tabs screenOptions={SCREEN_OPTIONS}>
      {TAB_CONFIG.map(({ name, title, icon }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            headerShown: false,
            title,
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} icon={icon} title={title} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
};

export default _layout;
