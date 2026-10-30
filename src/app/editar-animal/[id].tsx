import { useEffect, useState } from 'react';
import { Alert, Pressable, ScrollView, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter, type Href } from 'expo-router';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { getAnimal, updateAnimal, type UpdateAnimalData } from '../../services/animalService';

export default function EditAnimal() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [form, setForm] = useState<UpdateAnimalData>({ nome: '', idade: 0, raca: '', sexo: 'macho', porte: 'medio', peso: '', castracao: false, observacoes: '', linkAnimal: '', tipo: '' });
  const [loading, setLoading] = useState(true);
  const set = (key: keyof UpdateAnimalData, value: string) => setForm((current) => ({ ...current, [key]: key === 'idade' ? Number(value) || 0 : value }));

  useEffect(() => { if (!id) return; getAnimal(id).then((animal) => setForm({ nome: animal.nome, idade: animal.idade ?? 0, raca: animal.raca ?? '', sexo: animal.sexo, porte: animal.porte ?? 'medio', peso: animal.peso ?? '', castracao: animal.castracao ?? false, observacoes: animal.observacoes ?? '', linkAnimal: animal.linkAnimal ?? '', tipo: animal.tipo ?? '' })).catch((err) => Alert.alert('Erro', err instanceof Error ? err.message : 'Erro ao carregar animal.')).finally(() => setLoading(false)); }, [id]);

  const save = async () => { if (!id) return; try { await updateAnimal(id, form); Alert.alert('Sucesso', 'Animal atualizado.', [{ text: 'OK', onPress: () => router.replace('/gerenciar-animais' as Href) }]); } catch (err) { Alert.alert('Erro', err instanceof Error ? err.message : 'Não foi possível atualizar o animal.'); } };
  if (loading) return <View className="flex-1 justify-center items-center"><Text>Carregando...</Text></View>;
  return <ScrollView className="flex-1 bg-gray-100"><Header /><View className="p-5 mb-12"><Text className="text-2xl font-bold mb-4">Editar animal</Text><View className="bg-white p-4 rounded-2xl">
    <Input legend="Nome" value={form.nome} onChangeText={(value) => set('nome', value)} />
    <Input legend="Espécie" value={form.tipo} onChangeText={(value) => set('tipo', value)} />
    <Input legend="Raça" value={form.raca} onChangeText={(value) => set('raca', value)} />
    <Input legend="Sexo" value={form.sexo} onChangeText={(value) => set('sexo', value)} />
    <Input legend="Porte" value={form.porte} onChangeText={(value) => set('porte', value)} />
    <Input legend="Idade" value={String(form.idade)} keyboardType="numeric" onChangeText={(value) => set('idade', value)} />
    <Input legend="Peso" value={String(form.peso)} keyboardType="numeric" onChangeText={(value) => set('peso', value)} />
    <Input legend="Observações" value={form.observacoes} multiline onChangeText={(value) => set('observacoes', value)} />
    <Input legend="Link do anúncio" value={form.linkAnimal} onChangeText={(value) => set('linkAnimal', value)} />
    <Pressable onPress={save} className="bg-[#FF7A00] p-4 rounded-full items-center mt-3"><Text className="text-white font-bold">Salvar alterações</Text></Pressable>
  </View></View></ScrollView>;
}
