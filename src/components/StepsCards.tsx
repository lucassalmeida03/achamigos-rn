import { View, Text, ScrollView, TouchableOpacity } from "react-native";


export function StepCards() {
  return (
    <ScrollView 
      contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100, paddingTop: 20 }}
      showsVerticalScrollIndicator={false}
      className="space-y-4"
    >


      <View className="bg-blue-600 rounded-3xl p-5 mb-4 shadow-sm">
        <View className="flex-row justify-between items-center mb-4">
          <View className="w-12 h-12 rounded-2xl bg-white/20 items-center justify-center">
            <Text className="text-white text-2xl font-bold">1</Text>
          </View>
        </View>

        <Text className="text-white text-xl font-bold mb-2">
          Encontre seu amigo
        </Text>

        <Text className="text-white/90 text-sm leading-5 mb-4">
          O 1º passo é navegar pela aba "Adotar" na barra inferior para conferir todos os animais acolhidos pelas casas parceiras.
        </Text>
      </View>


      <View className="bg-orange-500 rounded-3xl p-5 mb-4 shadow-sm">
        <View className="flex-row justify-between items-center mb-4">
          <View className="w-12 h-12 rounded-2xl bg-white/20 items-center justify-center">
            <Text className="text-white text-2xl font-bold">2</Text>
          </View>
        </View>

        <Text className="text-white text-xl font-bold mb-2">
          Filtre por estilo e rotina
        </Text>

        <Text className="text-white/90 text-sm leading-5 mb-4">
          O 2º passo é filtrar os pets por <Text className="font-bold">cidade, porte, idade, espécie</Text> e nível de sociabilidade que melhor combinam com a sua casa.
        </Text>

        <View className="flex-row flex-wrap gap-2">
          <View className="bg-white/20 px-3 py-1 rounded-full">
            <Text className="text-white text-xs font-medium">Porte Pequeno</Text>
          </View>
         
          <View className="bg-white/20 px-3 py-1 rounded-full">
            <Text className="text-white text-xs font-medium">Castrado</Text>
          </View>
        </View>
      </View>


      <View className="bg-orange-500 rounded-3xl p-5 mb-4 shadow-sm">
        <View className="flex-row justify-between items-center mb-4">
          <View className="w-12 h-12 rounded-2xl bg-white/20 items-center justify-center">
            <Text className="text-white text-2xl font-bold">3</Text>
          </View>
        </View>

        <Text className="text-white text-xl font-bold mb-2">
          Conheça a história
        </Text>

        <Text className="text-white/90 text-sm leading-5 mb-4">
          O 3º passo é visualizar os animais recomendados para você, abrindo a ficha completa com histórico médico, temperamento e galeria de fotos.
        </Text>

        <View className="flex-row items-center gap-2">
          <Text className="text-white text-xs font-semibold">
            Histórico de saúde checado
          </Text>
        </View>
      </View>

      {/* CARD 4 */}
      <View className="bg-blue-600 rounded-3xl p-5 mb-4 shadow-sm">
        <View className="flex-row justify-between items-center mb-4">
          <View className="w-12 h-12 rounded-2xl bg-white/20 items-center justify-center">
            <Text className="text-white text-2xl font-bold">4</Text>
          </View>
        </View>

        <Text className="text-white text-xl font-bold mb-2">
          Solicite a adoção
        </Text>

        <Text className="text-white/90 text-sm leading-5 mb-4">
          Gostou do pet? Entre em contato direto com a casa de acolhimento responsável pelo animal para iniciar a conversa e as etapas de adoção responsável.
        </Text>

        <View className="flex-row items-center gap-2">
          <Text className="text-white text-xs font-semibold">
            Contato direto via chat e WhatsApp
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}