import React, { useState } from 'react';
import { View, Text, ScrollView, Image, Switch, Alert, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Input } from './Input';
import { Button } from './Button';
import { SelectOptionGroup } from './SelectOptionGroup';
import { petSchema } from '../schemas/petSchema';
import { formatZodErrors } from '../utils/formatZodErrors';
import { createAnimal } from '../services/animalService';

export function RegisterPetForm() {

  const [fotoUri, setFotoUri] = useState<string>('');
  const [nome, setNome] = useState('');
  const [especie, setEspecie] = useState('');
  const [sexo, setSexo] = useState<'macho' | 'femea' | ''>('macho');
  const [raca, setRaca] = useState('');
  const [porte, setPorte] = useState<'pequeno' | 'medio' | 'grande' | ''>('medio');
  const [idade, setIdade] = useState(0);
  const [peso, setPeso] = useState('');
  const [castrado, setCastrado] = useState(true);
  const [observacoes, setObservacoes] = useState(
    ''
  );
  const [linkExterno, setLinkExterno] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitMessageType, setSubmitMessageType] = useState<'error' | 'success' | null>(null);

  const handlePickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('Permissão necessária', 'Precisamos de acesso às fotos para selecionar a imagem do pet.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0].uri) {
      setFotoUri(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    setErrors({});
    setSubmitMessage('');
    setSubmitMessageType(null);

    const formData = {
      fotoUri,
      nome,
      especie,
      sexo,
      raca,
      porte,
      idade,
      peso,
      castrado,
      observacoes,
      linkExterno,
    };

    const result = petSchema.safeParse(formData);

    if (!result.success) {
      const validationErrors = formatZodErrors(result.error);
      setErrors(validationErrors);
      setSubmitMessage(
        Object.values(validationErrors)[0] ?? 'Preencha os campos obrigatórios.',
      );
      setSubmitMessageType('error');
      Alert.alert(
        'Revise os dados',
        Object.values(validationErrors)[0] ?? 'Preencha os campos obrigatórios.',
      );
      return;
    }

    setIsSubmitting(true);

    try {
      await createAnimal(result.data);
      setSubmitMessage('Pet publicado para adoção!');
      setSubmitMessageType('success');
      Alert.alert('Sucesso', 'Pet publicado para adoção!');

      setFotoUri('');
      setNome('');
      setEspecie('');
      setSexo('macho');
      setRaca('');
      setPorte('medio');
      setIdade(0);
      setPeso('');
      setCastrado(true);
      setObservacoes('');
      setLinkExterno('');
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Não foi possível cadastrar o animal.';
      setSubmitMessage(message);
      setSubmitMessageType('error');
      console.error('Erro ao cadastrar animal:', error);
      Alert.alert('Erro ao cadastrar', message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-[#F8F9FD] p-4">

      <View className="bg-[#F2F2F2] p-5 rounded-3xl mb-4 flex-row items-start">
        <View className="bg-[#FF7A00] w-12 h-12 rounded-full justify-center items-center mr-3.5">
          <Ionicons name="paw" size={24} color="#FFFFFF" />
        </View>
        <View className="flex-1">
          <Text className="text-gray-900 font-bold text-base mb-1">
            Encontre um lar de amor
          </Text>
          <Text className="text-gray-800 text-xs leading-5">
            Cadastre este amigo com carinho. Perfis detalhados e fotos nítidas encontram famílias 3× mais rápido!
          </Text>
        </View>
      </View>


      <View className="bg-white p-5 rounded-3xl mb-4 shadow-sm">
        <View className="flex-row justify-between items-center mb-4">
          <View className="flex-row items-center">
            <Ionicons name="camera-outline" size={22} color="#FF7A00" />
            <Text className="text-gray-900 font-bold text-lg ml-2">
              Foto Principal
            </Text>
          </View>
          <Text className="text-gray-400 text-xs font-medium">Opcional</Text>
        </View>

        <Pressable
          onPress={handlePickImage}
          className="bg-[#F0F3FF]/60 border-2 border-dashed border-gray-200 rounded-3xl p-6 items-center justify-center min-h-[160px]"
        >
          {fotoUri ? (
            <View className="w-full items-center">
              <Image
                source={{ uri: fotoUri }}
                className="w-full h-40 rounded-2xl mb-2"
                resizeMode="cover"
              />
              <Text className="text-orange-500 font-bold text-xs">
                Toque para alterar a foto
              </Text>
            </View>
          ) : (
            <View className="items-center">
              <View className="bg-[#DCE7FE] w-16 h-16 rounded-full justify-center items-center mb-3">
                <Ionicons name="image-outline" size={30} color="#0052CC" />
              </View>
              <Text className="text-gray-900 font-bold text-base mb-1">
                Toque para adicionar foto
              </Text>
            </View>
          )}
        </Pressable>
      </View>


      <View className="bg-white p-5 rounded-3xl mb-4 shadow-sm">
        <View className="flex-row items-center mb-2">
          <Ionicons name="card-outline" size={22} color="#0052CC" />
          <Text className="text-gray-900 font-bold text-lg ml-2">
            Informações Básicas
          </Text>
        </View>

        <Input
          legend="Nome do Pet *"
          value={nome}
          onChangeText={setNome}
          placeholder="Ex: Thor"
          error={errors.nome}
          icon={<Ionicons name="happy-outline" size={20} color="#4B5563" />}
        />

        <Input
          legend="Espécie / Tipo *"
          value={especie}
          onChangeText={setEspecie}
          placeholder="Ex: Cachorro"
          error={errors.especie}
        />

        <SelectOptionGroup
          legend="Sexo"
          activeColor="#0052CC"
          value={sexo}
          onChange={(val) => setSexo(val as 'macho' | 'femea')}
          error={errors.sexo}
          options={[
            {
              label: 'Macho',
              value: 'macho',
              icon: <Ionicons name="male" size={18} color={sexo === 'macho' ? '#FFF' : '#0052CC'} />,
            },
            {
              label: 'Fêmea',
              value: 'femea',
              icon: <Ionicons name="female" size={18} color={sexo === 'femea' ? '#FFF' : '#0052CC'} />,
            },
          ]}
        />

        <Input
          legend="Raça ou Mistura"
          value={raca}
          onChangeText={setRaca}
          placeholder="Ex: Vira-lata (SRD)"
          error={errors.raca}
          icon={<Ionicons name="shapes-outline" size={20} color="#4B5563" />}
        />
      </View>


      <View className="bg-white p-5 rounded-3xl mb-4 shadow-sm">
        <View className="flex-row items-center mb-2">
          <Ionicons name="options-outline" size={22} color="#FF7A00" />
          <Text className="text-gray-900 font-bold text-lg ml-2">
            Porte e Dimensões
          </Text>
        </View>

        <SelectOptionGroup
          legend="Porte Estimado"
          activeColor="#FF7A00"
          value={porte}
          onChange={(val) => setPorte(val as 'pequeno' | 'medio' | 'grande')}
          error={errors.porte}
          options={[
            { label: 'Pequeno', sublabel: '< 10kg', value: 'pequeno' },
            { label: 'Médio', sublabel: '10–25kg', value: 'medio' },
            { label: 'Grande', sublabel: '> 25kg', value: 'grande' },
          ]}
        />

        <View className="flex-row gap-3 items-start mt-2">
          <View className="flex-1 my-2">
            <View className="flex-row items-center mb-1.5 ml-3">
              <Ionicons name="gift-outline" size={16} color="#4B5563" />
              <Text className="text-gray-700 font-medium text-sm ml-1">
                Idade (anos)
              </Text>
            </View>
            <View className="bg-[#F0F3FF] h-14 rounded-full flex-row items-center justify-between px-3">
              <Pressable
                onPress={() => setIdade(Math.max(0, idade - 1))}
                className="w-8 h-8 rounded-full justify-center items-center"
              >
                <Text className="text-gray-800 text-xl font-bold">-</Text>
              </Pressable>
              <Text className="text-gray-800 font-bold text-base">{idade}</Text>
              <Pressable
                onPress={() => setIdade(idade + 1)}
                className="w-8 h-8 rounded-full justify-center items-center"
              >
                <Text className="text-gray-800 text-xl font-bold">+</Text>
              </Pressable>
            </View>
          </View>

          <View className="flex-1">
            <Input
              legend="Peso (kg)"
              value={peso}
              onChangeText={setPeso}
              keyboardType="numeric"
              placeholder="14"
              error={errors.peso}
              icon={<Ionicons name="fitness-outline" size={18} color="#4B5563" />}
            />
          </View>
        </View>
      </View>


      <View className="bg-white p-5 rounded-3xl mb-4 shadow-sm">
        <View className="flex-row items-center mb-4">
          <Ionicons name="medical-outline" size={22} color="#009966" />
          <Text className="text-gray-900 font-bold text-lg ml-2">
            Saúde & Cuidados
          </Text>
        </View>

        <View className="bg-[#F0F3FF] p-3.5 rounded-2xl flex-row items-center justify-between">
          <View className="flex-row items-center flex-1 mr-2">
            <View className="bg-[#6EE7B7] p-2.5 rounded-full mr-3">
              <Ionicons name="shield-checkmark" size={20} color="#047857" />
            </View>
            <View className="flex-1">
              <Text className="text-gray-900 font-bold text-sm">
                Animal já castrado?
              </Text>
              <Text className="text-gray-500 text-xs">
                Essencial para controle e bem-estar
              </Text>
            </View>
          </View>

          <Switch
            value={castrado}
            onValueChange={setCastrado}
            trackColor={{ false: '#D1D5DB', true: '#047857' }}
            thumbColor="#FFFFFF"
          />
        </View>
      </View>


      <View className="bg-white p-5 rounded-3xl mb-8 shadow-sm">
        <View className="flex-row items-center mb-2">
          <Ionicons name="heart-outline" size={22} color="#FF7A00" />
          <Text className="text-gray-900 font-bold text-lg ml-2">
            Observações gerais
          </Text>
        </View>


        <Input
          legend="Conte sobre o temperamento, histórico de saúde."
          value={observacoes}
          onChangeText={setObservacoes}
          multiline
          numberOfLines={5}
          placeholder="Descreva o pet..."
          error={errors.observacoes}
        />

        <View className="mt-2">
          <View className="flex-row justify-between items-center mb-1 pr-1">
            <Text className="text-gray-700 font-medium text-sm ml-3">
              Link Externo / ONG
            </Text>
            <Text className="text-gray-400 text-xs">Opcional</Text>
          </View>

          <Input
            value={linkExterno}
            onChangeText={setLinkExterno}
            placeholder="https://instagram.com/resgate_pet/thor"
            autoCapitalize="none"
            keyboardType="url"
            error={errors.linkExterno}
            icon={<Ionicons name="link-outline" size={20} color="#4B5563" />}
          />
        </View>
      </View>

      <View className="mb-12">
        {submitMessage ? (
          <View
            className={`mb-3 rounded-2xl p-4 ${
              submitMessageType === 'success' ? 'bg-green-100' : 'bg-red-100'
            }`}
          >
            <Text
              className={
                submitMessageType === 'success'
                  ? 'font-medium text-green-800'
                  : 'font-medium text-red-800'
              }
            >
              {submitMessage}
            </Text>
          </View>
        ) : null}
        <Button onPress={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? 'Publicando...' : 'Publicar Pet para Adoção'}
        </Button>
      </View>
    </ScrollView>
  );
}