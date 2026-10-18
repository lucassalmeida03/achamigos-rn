import React, { useState } from 'react';
import { View, Text, Pressable, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

import { Input } from './Input';
import { Button } from './Button';
import { eventSchema } from '../schemas/eventSchema';
import { formatZodErrors } from '../utils/formatZodErrors';

export function RegisterEventForm() {

  const [bannerUrl, setBannerUrl] = useState<string>('');
  const [nomeEvento, setNomeEvento] = useState('');
  const [tipoEvento, setTipoEvento] = useState('');
  const [dataRealizacao, setDataRealizacao] = useState('05/05/2026');
  const [horario, setHorario] = useState('09:00 AM');
  const [local, setLocal] = useState('');
  const [orientacoes, setOrientacoes] = useState('');
  const [linkExterno, setLinkExterno] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const handlePickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('Permissão necessária', 'Precisamos de acesso às fotos para selecionar o banner.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0].uri) {
      setBannerUrl(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    setErrors({});

    const formData = {
      bannerUrl,
      nomeEvento,
      tipoEvento,
      dataRealizacao,
      horario,
      local,
      orientacoes,
      linkExterno,
    };

    const result = eventSchema.safeParse(formData);

    if (!result.success) {
      setErrors(formatZodErrors(result.error));
      return;
    }

    console.log('Dados do Evento validados:', result.data);
    Alert.alert('Sucesso', 'Evento publicado com sucesso!');
  };

  return (
    <View className="w-full">
    
      <View className="mb-4">
        <View className="flex-row items-center mb-2 ml-1">
          <Ionicons name="image-outline" size={18} color="#FF7A00" />
          <Text className="text-gray-900 font-bold text-base ml-2">
            Banner de Divulgação
          </Text>
        </View>

        <View className="bg-white p-5 rounded-3xl shadow-sm">
          <Pressable
            onPress={handlePickImage}
            className="bg-[#F0F3FF]/60 border-2 border-dashed border-gray-200 rounded-3xl p-6 items-center justify-center min-h-[140px]"
          >
            {bannerUrl ? (
              <View className="w-full items-center">
                <Image
                  source={{ uri: bannerUrl }}
                  className="w-full h-36 rounded-2xl mb-2"
                  resizeMode="cover"
                />
                <Text className="text-orange-500 font-bold text-xs">
                  Toque para alterar o banner
                </Text>
              </View>
            ) : (
              <View className="items-center">
                <View className="bg-[#DCE7FE] w-14 h-14 rounded-full justify-center items-center mb-2">
                  <Ionicons name="image-outline" size={26} color="#0052CC" />
                </View>
                <Text className="text-gray-900 font-bold text-sm mb-1">
                  Toque para adicionar foto
                </Text>
                <Text className="text-gray-400 text-xs font-medium">
                  PNG, JPG até 5MB
                </Text>
              </View>
            )}
          </Pressable>
        </View>
      </View>


      <View className="bg-white p-5 rounded-3xl mb-4 shadow-sm">
        <View className="flex-row items-center mb-2">
          <View className="bg-[#FDE8E8] p-2.5 rounded-xl mr-3">
            <Ionicons name="megaphone-outline" size={20} color="#D97706" />
          </View>
          <Text className="text-gray-900 font-bold text-base">
            Dados do Evento
          </Text>
        </View>

        <Input
          legend="Nome do Evento *"
          placeholder="Ex: 5ª Feira de Adoção no Parque"
          value={nomeEvento}
          onChangeText={setNomeEvento}
          error={errors.nomeEvento}
          icon={<Ionicons name="create-outline" size={20} color="#4B5563" />}
        />

        <Input
          legend="Tipo de Evento *"
          placeholder="Ex: Feira de Adoção"
          value={tipoEvento}
          onChangeText={setTipoEvento}
          error={errors.tipoEvento}
          icon={<Ionicons name="create-outline" size={20} color="#4B5563" />}
        />
      </View>


      <View className="bg-white p-5 rounded-3xl mb-4 shadow-sm">
        <View className="flex-row items-center mb-2">
          <View className="bg-[#DBEAFE] p-2.5 rounded-xl mr-3">
            <Ionicons name="time-outline" size={20} color="#0052CC" />
          </View>
          <Text className="text-gray-900 font-bold text-base">
            Data, Horário e Local
          </Text>
        </View>

        <Input
          legend="Data de Realização *"
          placeholder="05/05/2026"
          value={dataRealizacao}
          onChangeText={setDataRealizacao}
          error={errors.dataRealizacao}
          icon={<Ionicons name="calendar-outline" size={20} color="#4B5563" />}
        />

        <Input
          legend="Horário *"
          placeholder="09:00 AM"
          value={horario}
          onChangeText={setHorario}
          error={errors.horario}
          icon={<Ionicons name="time-outline" size={20} color="#4B5563" />}
        />

        <Input
          legend="Local / Ponto de Encontro *"
          placeholder="Ex: Parque Ibirapuera - Portão 7"
          value={local}
          onChangeText={setLocal}
          error={errors.local}
          icon={<Ionicons name="location-outline" size={20} color="#4B5563" />}
        />
      </View>


      <View className="bg-white p-5 rounded-3xl mb-6 shadow-sm">
        <View className="flex-row items-center mb-2">
          <View className="bg-[#D1FAE5] p-2.5 rounded-xl mr-3">
            <Ionicons name="book-outline" size={20} color="#059669" />
          </View>
          <Text className="text-gray-900 font-bold text-base">
            Orientações & Detalhes
          </Text>
        </View>

        <Input
          legend="Orientações e Requisitos *"
          placeholder="Descreva a dinâmica da feira, documentação necessária para adotar (RG, comp. residência), caixas de transporte seguras para gatos, coleiras obrigatórias..."
          value={orientacoes}
          onChangeText={setOrientacoes}
          multiline
          numberOfLines={5}
          error={errors.orientacoes}
        />

        <View className="mt-2">
          <View className="flex-row justify-between items-center mb-1 pr-1">
            <Text className="text-gray-700 font-medium text-sm ml-3">
              Link Externo ou Formulário
            </Text>
            <Text className="text-gray-400 text-xs">Opcional</Text>
          </View>

          <Input
            placeholder="https://forms.gle/evento-voluntarios"
            value={linkExterno}
            onChangeText={setLinkExterno}
            autoCapitalize="none"
            keyboardType="url"
            error={errors.linkExterno}
            icon={<Ionicons name="link-outline" size={20} color="#4B5563" />}
          />
        </View>
      </View>


      <View className="mb-12">
        <Button onPress={handleSubmit}>
          Publicar Evento
        </Button>
      </View>
    </View>
  );
}