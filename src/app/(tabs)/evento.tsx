import React from 'react';
import { View, Text, ScrollView, Image, Pressable, Linking, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '../../components/Header';


const MOCK_EVENTS = [
  {
    id: '1',
    dataHora: '18 de Maio, 2025 • 09:00 às 15:00',
    titulo: 'Feira de Adoção de Domingo no Parque',
    local: 'Parque Ibirapuera - Portão 7, São Paulo',
    descricao:
      'Traga documento com foto e comprovante de residência. Mais de 40 pets resgatados (cães e gatinhos filhotes e adultos) vacinados,...',
    fotoUrl:
      'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?q=80&w=800&auto=format&fit=crop',
    linkMaisInfo: 'https://instagram.com/resgate_pet/evento-1',
  },
  {
    id: '2',
    dataHora: '25 de Maio, 2025 • 10:00 às 16:00',
    titulo: 'Encontro de Adoção e Arrecadação de Ração',
    local: 'Praça da Liberdade, São Paulo',
    descricao:
      'Venha conhecer nossos pets e traga 1kg de ração para ajudar os abrigos parceiros. Haverá orientação com veterinários no local.',
    fotoUrl:
      'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=800&auto=format&fit=crop',
    linkMaisInfo: 'https://instagram.com/resgate_pet/evento-2',
  },
];

export default function EventsScreen() {
  const handleOpenLink = (link?: string) => {
    if (link) {
      Linking.openURL(link).catch(() => {
        Alert.alert('Erro', 'Não foi possível abrir o link do evento.');
      });
    } else {
      Alert.alert('Aviso', 'Link não disponível para este evento.');
    }
  };

  return (
    <ScrollView className="flex-1 bg-gray-100">
  
      <Header />

      <View className="p-4 mb-24">
     
        <View className="bg-[#2072EF] p-6 rounded-[28px] mb-5 shadow-md">
       
          <View className="bg-white/20 self-start px-3 py-1 rounded-full mb-3">
            <Text className="text-white font-semibold text-[10px] uppercase tracking-wider">
              IMPACTO COLETIVO
            </Text>
          </View>

  
          <Text className="text-white font-bold text-2xl leading-8 mb-1.5">
            Adote um Aumigo!
          </Text>

      
          <Text className="text-white/90 text-sm leading-5">
            Encontre seu novo parceiro de vida nas feiras deste mês.
          </Text>
        </View>


        {MOCK_EVENTS.map((evento) => (
          <Pressable
            key={evento.id}
            onPress={() => handleOpenLink(evento.linkMaisInfo)}
            className="bg-white rounded-[28px] overflow-hidden mb-10 shadow-sm border border-gray-100"
          >
        
            <View className="w-full h-52 relative">
              <Image
                source={{ uri: evento.fotoUrl }}
                className="w-full h-full"
                resizeMode="cover"
              />
            </View>

          
            <View className="p-5">
        
              <View className="flex-row items-center mb-2">
                <Ionicons name="calendar-outline" size={18} color="#1F2937" />
                <Text className="text-gray-900 font-bold text-sm ml-2">
                  {evento.dataHora}
                </Text>
              </View>

              <Text className="text-gray-900 font-bold text-xl leading-7 mb-2">
                {evento.titulo}
              </Text>

              <View className="flex-row items-center mb-3">
                <Ionicons name="location-outline" size={18} color="#4B5563" />
                <Text className="text-gray-600 text-sm ml-1.5 flex-1">
                  {evento.local}
                </Text>
              </View>

              <Text className="text-gray-500 text-xs leading-5">
                {evento.descricao}
              </Text>
            </View>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}