import "../global.css";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { AuthProvider, useAuth } from "../contexts/AuthContext";

export default function RootLayout() {
  return <AuthProvider><AuthGate /></AuthProvider>;
}

function AuthGate() {
  const { isLoading, session } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const firstSegment = segments[0];
  const isPrivateRoute =
    firstSegment === "cadastrar-animal" || firstSegment === "cadastrar-evento";

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (!session && isPrivateRoute) {
      router.replace("/login");
      return;
    }

    if (session && firstSegment === "login") {
      router.replace("/(tabs)");
    }
  }, [firstSegment, isPrivateRoute, isLoading, router, session]);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-[#F8F9FD]">
        <ActivityIndicator color="#FF7A00" size="large" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}