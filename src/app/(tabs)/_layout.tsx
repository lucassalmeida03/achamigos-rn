import { Tabs } from "expo-router";
import { Image, Platform } from "react-native";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#f97316",
        tabBarInactiveTintColor: "#000",
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          left: 20,
          right: 20,
          backgroundColor: "#FFFFFF",
          height: 120,
          paddingBottom: Platform.OS === "ios" ? 10 : 8,
          paddingTop: 8,
          borderTopWidth: 0,
        },
      }}
      >
    
      <Tabs.Screen
        name="index"
        options={{
          title: "Início",
          tabBarIcon: ({ color }) => (
            <Image
              source={require("../../../assets/icons/casa.png")}
              style={{ width: 18, height: 18, tintColor: color }}
              resizeMode="contain"
            />
          ),
        }}
      />

      <Tabs.Screen
        name="adotar"
        options={{
          title: "Adotar",
          tabBarIcon: ({ color }) => (
            <Image
              source={require("../../../assets/icons/patinhas.png")}
              style={{ width: 18, height: 18, tintColor: color }}
              resizeMode="contain"
            />
          ),
        }}
      />

        <Tabs.Screen
        name="evento"
        options={{
          title: "Evento",
          tabBarIcon: ({ color }) => (
            <Image
              source={require("../../../assets/icons/Evento.png")}
              style={{ width: 18, height: 18, tintColor: color }}
              resizeMode="contain"
            />
          ),
        }}
      />
    </Tabs>

    
  );
}