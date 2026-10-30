import { useCallback, useState } from 'react';
import { Alert, Image, Pressable, ScrollView, Text, View } from 'react-native';
import { useFocusEffect, useRouter, type Href } from 'expo-router';
import { Header } from '../components/Header';
import { deleteAnimal, getAnimalImageUrl, getMyAnimals, type Animal } from '../services/animalService';

export default function ManageAnimals() {
  const router = useRouter();
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [error, setError] = useState<string>();

  const load = useCallback(async () => {
    try { setAnimals(await getMyAnimals()); setError(undefined); }
    catch (err) { setError(err instanceof Error ? err.message : 'Não foi possível carregar seus animais.'); }
  }, []);
  useFocusEffect(useCallback(() => { void load(); }, [load]));

  const remove = (animal: Animal) => Alert.alert('Excluir animal', `Deseja excluir ${animal.nome}?`, [
    { text: 'Cancelar', style: 'cancel' },
    { text: 'Excluir', style: 'destructive', onPress: async () => {
      try { await deleteAnimal(animal._id); await load(); }
      catch (err) { Alert.alert('Erro', err instanceof Error ? err.message : 'Não foi possível excluir o animal.'); }
    }},
  ]);

  return <ScrollView className="flex-1 bg-gray-100"><Header /><View className="p-4 mb-24">
    <Text className="text-2xl font-bold text-gray-900 mb-4">Meus animais</Text>
    {error ? <Text className="bg-white p-4 rounded-2xl text-red-600">{error}</Text> : animals.length === 0 ? (
      <View className="bg-white p-5 rounded-2xl"><Text className="text-gray-700 mb-3">Você ainda não cadastrou animais.</Text>
        <Pressable onPress={() => router.push('/cadastrar-animal')} className="bg-[#FF7A00] p-4 rounded-full items-center"><Text className="text-white font-bold">Cadastrar animal</Text></Pressable>
      </View>
    ) : animals.map((animal) => <View key={animal._id} className="bg-white rounded-2xl p-4 mb-4">
      {getAnimalImageUrl(animal.imagem) ? <Image source={{ uri: getAnimalImageUrl(animal.imagem) }} className="h-40 rounded-xl mb-3" /> : null}
      <Text className="text-xl font-bold text-gray-900">{animal.nome}</Text>
      <Text className="text-gray-600">{animal.raca || animal.tipo || 'Sem raça informada'} · {animal.sexo}</Text>
      <View className="flex-row gap-2 mt-4">
        <Pressable onPress={() => router.push(`/editar-animal/${animal._id}` as Href)} className="flex-1 bg-[#0052CC] p-3 rounded-full items-center"><Text className="text-white font-bold">Editar</Text></Pressable>
        <Pressable onPress={() => remove(animal)} className="flex-1 border border-red-300 p-3 rounded-full items-center"><Text className="text-red-600 font-bold">Excluir</Text></Pressable>
      </View>
    </View>)}
  </View></ScrollView>;
}
