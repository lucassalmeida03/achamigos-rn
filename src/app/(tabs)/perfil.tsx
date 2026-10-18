import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { View, Text, Pressable } from "react-native";

export default function Perfil() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center bg-slate-100 px-6">
      <Ionicons name="person-circle-outline" size={72} color="#FF7A00" />
      <Text className="mt-3 text-xl font-bold text-slate-800">Tela Perfil</Text>
      <Pressable
        className="mt-6 h-14 w-full items-center justify-center rounded-full bg-[#FF7A00]"
        onPress={() => router.push("/login")}
      >
        <Text className="text-base font-bold text-white">Entrar para cadastrar pet</Text>
      </Pressable>
    </View>
  );
}