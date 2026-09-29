import { Tabs } from "expo-router";
import { Image, Platform } from "react-native";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#4A3728",
        tabBarInactiveTintColor: "#8C7A6B",
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          marginTop: -4,
          marginBottom: 4,
        },
        tabBarStyle: {
          position: "absolute",
          bottom: 40,
          left: 20,
          right: 20,
          backgroundColor: "#FFFFFF",
          borderRadius: 40,
          height: 70,
          paddingBottom: Platform.OS === "ios" ? 10 : 8,
          paddingTop: 8,
          borderTopWidth: 0,
          elevation: 8,
          shadowColor: "#000000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 12,
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
        name="perfil"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color }) => (
            <Image
              source={require("../../../assets/icons/perfil.png")}
              style={{ width: 18, height: 18, tintColor: color }}
              resizeMode="contain"
            />
          ),
        }}
      />
    </Tabs>
  );
}