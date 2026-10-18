import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Linking,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Header } from "@/components/Header";
import { Button } from "@/components/Button";
import { StepCards } from "@/components/StepsCards";
import { useRouter } from "expo-router";


const ADOPTION_HOUSES = [
  {
    id: "1",
    name: "Patas Amigas",
    location: "São Paulo - SP",
    logo: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=150&auto=format&fit=crop&q=60",
  },
  {
    id: "2",
    name: "Abrigo Esperança",
    location: "Campinas - SP",
    logo: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=150&auto=format&fit=crop&q=60",
  },
  {
    id: "3",
    name: "SOS Focinhos",
    location: "Curitiba - PR",
    logo: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=150&auto=format&fit=crop&q=60",
  },
  {
    id: "4",
    name: "Lar São Francisco",
    location: "Belo Horizonte - MG",
    logo: "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=150&auto=format&fit=crop&q=60",
  },
];


export default function Home() {
  const handleOpenLink = (url: string) => {
    Linking.openURL(url).catch((err) =>
      console.error("Erro ao abrir link:", err),
    );
  };

  const router = useRouter();
  return (
    <View className="flex-1 bg-[#F8F9FD]">
  
      <Header />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 110 }}
      >
        <View className="px-5 pt-4 gap-y-6">
      
          <View className="bg-white rounded-3xl p-6 border border-gray-100/80 shadow-sm">
         
            <View className="self-start flex-row items-center bg-gray-100/70 px-3 py-1.5 rounded-full mb-4">
              <View className="w-2 h-2 rounded-full bg-[#10B981] mr-2" />
              <Text className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                Objetivo do Achamigos
              </Text>
            </View>

            <Text className="text-2xl font-bold text-[#2C3A4E] leading-tight mb-3">
              Encontre seu novo <Text className="text-orange-500">melhor amigo</Text> com carinho e agilidade
            </Text>

            <Text className="text-gray-500 text-lg leading-relaxed mb-6">
              Conectamos você diretamente a abrigos e casas de acolhimento
              parceiras com pets castrados, vacinados e prontos para encher sua
              casa de afeto.
            </Text>

            <Button onPress={() => router.push("/adotar")}>
              Explorar Pets Disponíveis
            </Button>
          </View>

          <View className="mt-6 flex items-center justify-center">
            <View className="flex-row items-center mb-1">
              <Ionicons name="git-network-outline" size={20} color="#FF7A00" />
              <Text className="text-lg font-bold text-[#FF7A00] uppercase tracking-wider ml-1.5">
                Passo a Passo
              </Text>
            </View>

            <Text className="text-xl font-bold text-[#1E293B] mb-1">
              Como encontrar seu pet no app?
            </Text>

            <Text className="text-lg text-center text-gray-500 leading-relaxed">
              Siga o processo guiado para uma adoção segura e consciente.
            </Text>
          </View>

          <StepCards />

          <View className="mt-2">
            <Text className="text-xl font-bold text-[#1E293B] mb-4">
              Casas de Adoção
            </Text>

            <View className="flex-row flex-wrap justify-between gap-y-4">
              {ADOPTION_HOUSES.map((house) => (
                <TouchableOpacity
                  key={house.id}
                  activeOpacity={0.8}
                  className="w-[48%] bg-white rounded-3xl p-4 items-center justify-center border border-gray-100/60 shadow-sm"
                >
                  <View className="relative mb-3">
                    <Image
                      source={{ uri: house.logo }}
                      className="w-16 h-16 rounded-full border border-gray-100"
                    />
                    <View className="absolute bottom-0 right-0 w-4 h-4 bg-[#10B981] rounded-full border-2 border-white" />
                  </View>

                  <Text className="text-base font-bold text-gray-800 text-center leading-tight">
                    {house.name}
                  </Text>
                  <Text className="text-xs text-gray-400 font-medium text-center mt-1">
                    {house.location}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

  
          <View className="bg-white rounded-3xl p-6 mb-10 items-center border border-gray-100/60 shadow-sm gap-y-4 mt-2">
            <View className="w-12 h-12 rounded-2xl bg-[#FFEAD8] justify-center items-center">
              <MaterialCommunityIcons
                name="message-text-outline"
                size={24}
                color="#C86218"
              />
            </View>

            <View className="items-center">
              <Text className="text-lg font-bold text-gray-900 text-center">
                Canais de Contato
              </Text>
              <Text className="text-xs text-gray-500 text-center mt-2 leading-relaxed px-2">
                Dúvidas sobre o processo de triagem ou como cadastrar seu abrigo
                parceiro? Fale com a nossa equipe.
              </Text>
            </View>

            <View className="w-full items-center gap-y-3 mt-1">
              <View className="flex-row justify-center gap-x-3 w-full">
        
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => handleOpenLink("https://wa.me/5500000000000")}
                  className="flex-1 flex-row items-center justify-center bg-[#D1F2E8] py-3 px-4 rounded-full"
                >
                  <Ionicons name="logo-whatsapp" size={18} color="#0E8360" />
                  <Text className="ml-2 font-bold text-[#0E8360] text-sm">
                    WhatsApp
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => handleOpenLink("https://instagram.com")}
                  className="flex-1 flex-row items-center justify-center bg-[#FDE2D2] py-3 px-4 rounded-full"
                >
                  <Ionicons name="camera-outline" size={18} color="#A34D1E" />
                  <Text className="ml-2 font-bold text-[#A34D1E] text-sm">
                    Instagram
                  </Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => handleOpenLink("tel:0800000000")}
                className="w-1/2 flex-row items-center justify-center bg-[#DCE4FF] py-3 px-4 rounded-full"
              >
                <Ionicons name="call-outline" size={18} color="#2554C7" />
                <Text className="ml-2 font-bold text-[#2554C7] text-sm">
                  Telefone
                </Text>
              </TouchableOpacity>
            </View>

            <Text className="text-[10px] text-gray-400  text-center mt-4">
              © 2026 Achamigos Adoção Consciente. Todos os direitos reservados.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
