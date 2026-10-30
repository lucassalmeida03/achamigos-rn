import { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, Linking, Pressable, RefreshControl, ScrollView, Text, View } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '../components/Header';
import { Button } from '../components/Button';
import { getPartners, type Partner } from '../services/partnerService';

export default function Partners() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string>();

  const loadPartners = useCallback(async (refresh = false) => {
    if (refresh) setRefreshing(true);
    else setLoading(true);
    try {
      setPartners(await getPartners());
      setError(undefined);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Não foi possível carregar os parceiros.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useFocusEffect(useCallback(() => {
    void loadPartners();
  }, [loadPartners]));

  const openLink = (link?: string) => {
    if (!link) {
      Alert.alert('Aviso', 'Este parceiro não informou um site ou rede social.');
      return;
    }
    const url = /^https?:\/\//i.test(link) ? link : `https://${link}`;
    Linking.openURL(url).catch(() => Alert.alert('Erro', 'Não foi possível abrir o link.'));
  };

  return (
    <ScrollView
      className="flex-1 bg-gray-100"
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => void loadPartners(true)} />}
    >
      <Header />
      <View className="p-4 mb-24">
        <View className="flex-row items-center mb-4">
          <Ionicons name="people" size={24} color="#FF7A00" />
          <Text className="text-gray-900 font-bold text-2xl ml-2">Parceiros do Achamigos</Text>
        </View>

        {loading ? <ActivityIndicator color="#FF7A00" size="large" className="mt-10" /> : error ? (
          <View className="bg-white rounded-2xl p-5 items-center">
            <Text className="text-gray-700 text-center mb-3">{error}</Text>
            <Button onPress={() => void loadPartners()}>Tentar novamente</Button>
          </View>
        ) : partners.length === 0 ? (
          <View className="bg-white rounded-2xl p-5">
            <Text className="text-gray-700">Nenhum parceiro cadastrado no momento.</Text>
          </View>
        ) : partners.map((partner) => (
          <View key={partner._id} className="bg-white rounded-3xl p-5 mb-4 border border-gray-100 shadow-sm">
            <View className="flex-row items-center mb-3">
              <View className="w-12 h-12 rounded-full bg-[#FDE8D8] items-center justify-center">
                <Ionicons name="business" size={24} color="#C86218" />
              </View>
              <Text className="text-gray-900 text-lg font-bold ml-3 flex-1">
                {partner.nome || 'Parceiro Achamigos'}
              </Text>
            </View>
            {partner.telefone ? <Text className="text-gray-600 mb-1">Telefone: {partner.telefone}</Text> : null}
            {partner.email ? <Text className="text-gray-600 mb-3">E-mail: {partner.email}</Text> : null}
            <Pressable onPress={() => openLink(partner.linkUser)} className="flex-row items-center">
              <Ionicons name="link-outline" size={18} color="#0052CC" />
              <Text className="text-[#0052CC] font-semibold underline ml-2">Conheça nosso parceiro</Text>
            </Pressable>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
