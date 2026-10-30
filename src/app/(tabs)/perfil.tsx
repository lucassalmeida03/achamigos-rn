import { Ionicons } from "@expo/vector-icons";
import { useRouter, type Href } from "expo-router";
import { View, Text, Pressable } from "react-native";
import { useAuth } from "../../contexts/AuthContext";

export default function Perfil() {
  const router = useRouter();
  const { session, signOut } = useAuth();
  const isLoggedIn = Boolean(session);

  return (
    <View className="flex-1 items-center justify-center bg-slate-100 px-6">
      <Ionicons name="person-circle-outline" size={72} color="#FF7A00" />
      <Text className="mt-3 text-xl font-bold text-slate-800">{isLoggedIn ? "Perfil conectado" : "Tela Perfil"}</Text>
      <Pressable
        className="mt-6 h-14 w-full items-center justify-center rounded-full bg-[#FF7A00]"
        onPress={() => {
          if (isLoggedIn) {
            router.push("/cadastrar-animal");
          } else {
            router.push("/login");
          }
        }}
      >
        <Text className="text-base font-bold text-white">
          {isLoggedIn ? "Cadastrar pet" : "Entrar para cadastrar pet"}
        </Text>
      </Pressable>
      {isLoggedIn && (
        <>
        <Pressable className="mt-3 h-14 w-full items-center justify-center rounded-full bg-white border border-orange-200" onPress={() => router.push("/gerenciar-perfil" as Href)}>
          <Text className="text-base font-bold text-[#C86218]">Gerenciar perfil</Text>
        </Pressable>
        <Pressable className="mt-3 h-14 w-full items-center justify-center rounded-full bg-white border border-blue-200" onPress={() => router.push("/gerenciar-animais" as Href)}>
          <Text className="text-base font-bold text-[#0052CC]">Gerenciar animais</Text>
        </Pressable>
        <Pressable className="mt-3 h-14 w-full items-center justify-center rounded-full bg-white border border-green-200" onPress={() => router.push("/cadastrar-evento")}>
          <Text className="text-base font-bold text-green-700">Cadastrar evento</Text>
        </Pressable>
        <Pressable
          className="mt-3 h-14 w-full items-center justify-center rounded-full border border-red-200 bg-white"
          onPress={() => void signOut().then(() => router.replace("/login"))}
        >
          <Text className="text-base font-bold text-red-600">Sair</Text>
        </Pressable>
        </>
      )}
    </View>
  );
}