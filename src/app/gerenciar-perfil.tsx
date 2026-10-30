import { useEffect, useState } from 'react';
import { Alert, Pressable, ScrollView, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { getProfile, updateProfile, type ProfileData } from '../services/profileService';

export default function ManageProfile() {
  const router = useRouter();
  const [profile, setProfile] = useState<ProfileData>({ endereco: {} });
  const [loading, setLoading] = useState(true);
  useEffect(() => { getProfile().then(setProfile).catch((err) => Alert.alert('Erro', err instanceof Error ? err.message : 'Não foi possível carregar o perfil.')).finally(() => setLoading(false)); }, []);
  const set = (key: keyof ProfileData, value: string) => setProfile((current) => ({ ...current, [key]: value }));
  const setAddress = (key: keyof NonNullable<ProfileData['endereco']>, value: string) => setProfile((current) => ({ ...current, endereco: { ...current.endereco, [key]: value } }));
  const save = async () => { try { await updateProfile(profile); Alert.alert('Sucesso', 'Perfil atualizado.'); } catch (err) { Alert.alert('Erro', err instanceof Error ? err.message : 'Não foi possível atualizar o perfil.'); } };
  if (loading) return <View className="flex-1 justify-center items-center"><Text>Carregando...</Text></View>;
  return <ScrollView className="flex-1 bg-gray-100"><Header /><View className="p-5 mb-12"><Text className="text-2xl font-bold mb-4">Gerenciar perfil</Text><View className="bg-white p-4 rounded-2xl">
    <Input legend="Nome" value={profile.nome ?? ''} onChangeText={(value) => set('nome', value)} /><Input legend="Telefone" value={profile.telefone ?? ''} onChangeText={(value) => set('telefone', value)} /><Input legend="CNPJ" value={profile.cnpj ?? ''} onChangeText={(value) => set('cnpj', value)} /><Input legend="Login" value={profile.userLogin ?? ''} onChangeText={(value) => set('userLogin', value)} /><Input legend="E-mail" value={profile.email ?? ''} onChangeText={(value) => set('email', value)} /><Input legend="Nova senha" value={profile.senha ?? ''} secureTextEntry onChangeText={(value) => set('senha', value)} /><Input legend="CEP" value={profile.endereco?.cep ?? ''} onChangeText={(value) => setAddress('cep', value)} /><Input legend="Rua" value={profile.endereco?.rua ?? ''} onChangeText={(value) => setAddress('rua', value)} /><Input legend="Número" value={profile.endereco?.numero ?? ''} onChangeText={(value) => setAddress('numero', value)} /><Input legend="Cidade/UF" value={profile.endereco?.cidade ?? ''} onChangeText={(value) => setAddress('cidade', value)} /><Input legend="Site ou rede social" value={profile.linkUser ?? ''} onChangeText={(value) => set('linkUser', value)} />
    <Pressable onPress={save} className="bg-[#FF7A00] p-4 rounded-full items-center mt-3"><Text className="text-white font-bold">Salvar perfil</Text></Pressable><Pressable onPress={() => router.back()} className="p-4 items-center"><Text className="text-gray-600">Voltar</Text></Pressable>
  </View></View></ScrollView>;
}
