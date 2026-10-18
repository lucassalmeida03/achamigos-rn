import React from 'react';
import { View, Text, ScrollView, Image, Linking, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '../../components/Header';
import { Button } from '../../components/Button';


const MOCK_PETS = [
  {
    id: '1',
    nome: 'Thor',
    racaOuMistura: 'Golden Retriever mestiço',
    sexo: 'Macho',
    fotoUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=800&auto=format&fit=crop',
    idade: '2 anos',
    porte: 'Grande',
    peso: '22 kg',
    observacoes: 'Muito dócil, enérgico e brincalhão. Adora passeios matinais, vacinas em dia',
    linkAnuncio: 'https://instagram.com/resgate_pet/thor',
  },
  {
    id: '2',
    nome: 'Mel',
    racaOuMistura: 'Vira-lata (SRD)',
    sexo: 'Fêmea',
    fotoUrl: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?q=80&w=800&auto=format&fit=crop',
    idade: '1 ano',
    porte: 'Médio',
    peso: '12 kg',
    observacoes: 'Resgatada das ruas, muito carinhosa e sociável com outros animais.',
    linkAnuncio: 'https://instagram.com/resgate_pet/mel',
  },
  {
    id: '3',
    nome: 'Mel',
    racaOuMistura: 'Vira-lata (SRD)',
    sexo: 'Fêmea',
    fotoUrl: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?q=80&w=800&auto=format&fit=crop',
    idade: '1 ano',
    porte: 'Médio',
    peso: '12 kg',
    observacoes: 'Resgatada das ruas, muito carinhosa e sociável com outros animais.',
    linkAnuncio: 'https://instagram.com/resgate_pet/mel',
  },
];

export default function Adotar() {
  const handleOpenLink = (link?: string) => {
    if (link) {
      Linking.openURL(link).catch(() => {
        Alert.alert('Erro', 'Não foi possível abrir o link.');
      });
    } else {
      Alert.alert('Aviso', 'Link não informado.');
    }
  };

  return (
    <ScrollView className="flex-1 bg-gray-100">
      <Header />

      <View className="p-4 mb-24">
        <View className="flex-row justify-between items-center mb-4">
          <View className="flex-row items-center">
            <Ionicons name="paw" size={22} color="#FF7A00" />
            <Text className="text-gray-900 font-bold text-xl ml-2">
              Amigos para Adotar
            </Text>
          </View>

          <View className="bg-[#FCE8E6] px-3 py-1.5 rounded-full">
            <Text className="text-[#C2410C] font-bold text-xs">
              {MOCK_PETS.length} encontrados
            </Text>
          </View>
        </View>

        {MOCK_PETS.map((pet) => (
          <View
            key={pet.id}
            className="bg-white rounded-[28px] p-4 mb-10 shadow-sm border border-gray-100"
          >

            <View className="relative w-full h-64 rounded-2xl overflow-hidden mb-3">
              <Image
                source={{ uri: pet.fotoUrl }}
                className="w-full h-full"
                resizeMode="cover"
              />

              <View className="absolute bottom-0 left-0 right-0 p-4 bg-black/40 flex-row justify-between items-end">
                <View className="flex-1 mr-2">
                  <Text className="text-white font-bold text-2xl leading-7">
                    {pet.nome}
                  </Text>
                  <Text className="text-white/90 text-xs font-medium">
                    {pet.racaOuMistura}
                  </Text>
                </View>

                <View className="bg-white px-3 py-1.5 rounded-full flex-row items-center">
                  <Ionicons
                    name={pet.sexo === 'Macho' ? 'male' : 'female'}
                    size={14}
                    color="#0052CC"
                  />
                  <Text className="text-[#0052CC] font-bold text-xs ml-1">
                    {pet.sexo}
                  </Text>
                </View>
              </View>
            </View>


            <View className="flex-row gap-2 mb-3">
              <View className="flex-1 bg-[#F0F3FF] p-2.5 rounded-2xl items-center justify-center">
                <Text className="text-gray-400 text-[10px] font-medium">Idade</Text>
                <Text className="text-gray-900 font-bold text-sm">{pet.idade}</Text>
              </View>

              <View className="flex-1 bg-[#F0F3FF] p-2.5 rounded-2xl items-center justify-center">
                <Text className="text-gray-400 text-[10px] font-medium">Porte</Text>
                <Text className="text-gray-900 font-bold text-sm">{pet.porte}</Text>
              </View>

              <View className="flex-1 bg-[#F0F3FF] p-2.5 rounded-2xl items-center justify-center">
                <Text className="text-gray-400 text-[10px] font-medium">Peso</Text>
                <Text className="text-gray-900 font-bold text-sm">{pet.peso}</Text>
              </View>
            </View>


            {pet.observacoes && (
              <View className="bg-[#F0F3FF]/70 p-3.5 rounded-2xl flex-row items-start mb-4">
                <Ionicons
                  name="heart-outline"
                  size={18}
                  color="#FF7A00"
                  style={{ marginTop: 2 }}
                />
                <Text className="text-gray-700 text-xs leading-5 ml-2.5 flex-1 font-medium">
                  {pet.observacoes}
                </Text>
              </View>
            )}


            <Button onPress={() => handleOpenLink(pet.linkAnuncio)}>
              Acesse o link do anúncio
            </Button>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}