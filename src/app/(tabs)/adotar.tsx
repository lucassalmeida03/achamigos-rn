import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  Linking,
  Alert,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from 'expo-router';
import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { getAnimalImageUrl, getAnimals, type Animal } from '../../services/animalService';

function formatValue(value?: string | number, suffix = '') {
  return value === undefined || value === null || value === ''
    ? 'Não informado'
    : `${value}${suffix}`;
}

export default function Adotar() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string>();

  const loadAnimals = useCallback(async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    try {
      setError(undefined);
      setAnimals(await getAnimals());
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : 'Não foi possível carregar os animais cadastrados.',
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      void loadAnimals();
    }, [loadAnimals]),
  );

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
    <ScrollView
      className="flex-1 bg-gray-100"
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => void loadAnimals(true)}
          tintColor="#FF7A00"
        />
      }
    >
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
              {animals.length} encontrados
            </Text>
          </View>
        </View>

        {loading ? (
          <ActivityIndicator color="#FF7A00" size="large" className="mt-10" />
        ) : error ? (
          <View className="bg-white rounded-2xl p-5 items-center">
            <Text className="text-gray-700 text-center mb-3">{error}</Text>
            <Button onPress={() => void loadAnimals()}>Tentar novamente</Button>
          </View>
        ) : animals.length === 0 ? (
          <View className="bg-white rounded-2xl p-5 items-center">
            <Text className="text-gray-700 text-center">
              Nenhum animal cadastrado no momento.
            </Text>
          </View>
        ) : animals.map((pet) => (
          <View
            key={pet._id}
            className="bg-white rounded-[28px] p-4 mb-10 shadow-sm border border-gray-100"
          >

            <View className="relative w-full h-64 rounded-2xl overflow-hidden mb-3">
              {getAnimalImageUrl(pet.imagem) ? (
                <Image
                  source={{ uri: getAnimalImageUrl(pet.imagem) }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              ) : (
                <View className="w-full h-full bg-[#F0F3FF] items-center justify-center">
                  <Ionicons name="paw" size={48} color="#FF7A00" />
                </View>
              )}

              <View className="absolute bottom-0 left-0 right-0 p-4 bg-black/40 flex-row justify-between items-end">
                <View className="flex-1 mr-2">
                  <Text className="text-white font-bold text-2xl leading-7">
                    {pet.nome}
                  </Text>
                  <Text className="text-white/90 text-xs font-medium">
                    {pet.raca || pet.tipo || 'Raça não informada'}
                  </Text>
                </View>

                <View className="bg-white px-3 py-1.5 rounded-full flex-row items-center">
                  <Ionicons
                    name={pet.sexo === 'macho' ? 'male' : 'female'}
                    size={14}
                    color="#0052CC"
                  />
                  <Text className="text-[#0052CC] font-bold text-xs ml-1">
                    {pet.sexo === 'macho' ? 'Macho' : 'Fêmea'}
                  </Text>
                </View>
              </View>
            </View>


            <View className="flex-row gap-2 mb-3">
              <View className="flex-1 bg-[#F0F3FF] p-2.5 rounded-2xl items-center justify-center">
                <Text className="text-gray-400 text-[10px] font-medium">Idade</Text>
                <Text className="text-gray-900 font-bold text-sm">
                  {formatValue(pet.idade, ' anos')}
                </Text>
              </View>

              <View className="flex-1 bg-[#F0F3FF] p-2.5 rounded-2xl items-center justify-center">
                <Text className="text-gray-400 text-[10px] font-medium">Porte</Text>
                <Text className="text-gray-900 font-bold text-sm">
                  {pet.porte || 'Não informado'}
                </Text>
              </View>

              <View className="flex-1 bg-[#F0F3FF] p-2.5 rounded-2xl items-center justify-center">
                <Text className="text-gray-400 text-[10px] font-medium">Peso</Text>
                <Text className="text-gray-900 font-bold text-sm">
                  {formatValue(pet.peso, ' kg')}
                </Text>
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


            <Button onPress={() => handleOpenLink(pet.linkAnimal)}>
              Acesse o link do anúncio
            </Button>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}