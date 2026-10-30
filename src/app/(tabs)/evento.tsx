import React, { useCallback, useState } from 'react';
import { View, Text, ScrollView, Image, Pressable, Linking, Alert, ActivityIndicator, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from 'expo-router';
import { Header } from '../../components/Header';
import { getEvents, getImageUrl, type EventItem } from '../../services/eventService';

export default function EventsScreen() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string>();
  const loadEvents = useCallback(async (refresh = false) => {
    if (refresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    try { setEvents(await getEvents()); setError(undefined); }
    catch (err) { setError(err instanceof Error ? err.message : 'Não foi possível carregar os eventos.'); }
    finally { setLoading(false); setRefreshing(false); }
  }, []);
  useFocusEffect(useCallback(() => { void loadEvents(); }, [loadEvents]));
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
    <ScrollView className="flex-1 bg-gray-100" refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => void loadEvents(true)} />}>
  
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


        {loading ? <ActivityIndicator color="#FF7A00" size="large" /> : error ? (
          <View className="bg-white p-5 rounded-2xl"><Text>{error}</Text></View>
        ) : events.length === 0 ? <Text className="text-gray-600">Nenhum evento disponível no momento.</Text> : events.map((evento) => (
          <Pressable
            key={evento._id}
            onPress={() => handleOpenLink(evento.linkEvento)}
            className="bg-white rounded-[28px] overflow-hidden mb-10 shadow-sm border border-gray-100"
          >
        
            <View className="w-full h-52 relative">
              <Image
                source={getImageUrl(evento.imagem) ? { uri: getImageUrl(evento.imagem) } : undefined}
                className="w-full h-full"
                resizeMode="cover"
              />
            </View>

          
            <View className="p-5">
        
              <View className="flex-row items-center mb-2">
                <Ionicons name="calendar-outline" size={18} color="#1F2937" />
                <Text className="text-gray-900 font-bold text-sm ml-2">
                  {new Date(evento.data).toLocaleDateString('pt-BR')}
                </Text>
              </View>

              <Text className="text-gray-900 font-bold text-xl leading-7 mb-2">
                {evento.tipo_Evento}
              </Text>

              <View className="flex-row items-center mb-3">
                <Ionicons name="location-outline" size={18} color="#4B5563" />
                <Text className="text-gray-600 text-sm ml-1.5 flex-1">
                  {evento.texto}
                </Text>
              </View>

              <Text className="text-gray-500 text-xs leading-5">
                {evento.texto}
              </Text>
            </View>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}