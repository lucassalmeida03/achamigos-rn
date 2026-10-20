import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Input } from './Input';
import { Button } from './Button';
import { partnerSchema } from '@/schemas/partnerSchema';
import { formatZodErrors } from '@/utils/formatZodErrors';
import { useRouter } from 'expo-router';
import { createUser } from '../services/userService';

export default function RegisterPartnerForm() {
  const [nomeOng, setNomeOng] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [siteRedeSocial, setSiteRedeSocial] = useState('');
  const [cep, setCep] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [cidadeUf, setCidadeUf] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleBuscarCep = async () => {
    const cleanCep = cep.replace(/\D/g, '');
    if (cleanCep.length !== 8) {
      setErrors((prev) => ({ ...prev, cep: 'Digite um CEP válido com 8 dígitos' }));
      return;
    }

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
      const data = await response.json();

      if (data.erro) {
        setErrors((prev) => ({ ...prev, cep: 'CEP não encontrado' }));
        return;
      }

      setRua(data.logradouro || '');
      setCidadeUf(`${data.localidade} - ${data.uf}`);
      setErrors((prev) => ({ ...prev, cep: '' }));
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível buscar o CEP');
    }
  };

  const handleSubmit = async () => {
    setErrors({});

    const formData = {
      nomeOng,
      cnpj,
      telefone,
      email,
      senha,
      siteRedeSocial,
      cep,
      rua,
      numero,
      cidadeUf,
    };

    const result = partnerSchema.safeParse(formData);

    if (!result.success) {
      setErrors(formatZodErrors(result.error));
      return;
    }

    setIsSubmitting(true);

    try {
      await createUser({
        nome: result.data.nomeOng,
        cnpj: result.data.cnpj,
        telefone: result.data.telefone,
        userLogin: result.data.email,
        senha: result.data.senha,
        email: result.data.email,
        endereco: {
          cep: result.data.cep,
          rua: result.data.rua,
          cidade: result.data.cidadeUf,
          numero: result.data.numero,
        },
        linkUser: result.data.siteRedeSocial || undefined,
      });

      Alert.alert('Sucesso', 'Cadastro de parceiro realizado com sucesso!', [
        { text: 'OK', onPress: () => router.push('/login') },
      ]);
    } catch (error) {
      Alert.alert(
        'Erro',
        error instanceof Error
          ? error.message
          : 'Não foi possível cadastrar o usuário. Tente novamente.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-gray-100 p-4">
     
      <View className="bg-white p-5 rounded-3xl mb-4 shadow-sm">
        <View className="flex-row items-center mb-1">
          <View className="bg-[#FCE8E6] p-2.5 rounded-xl mr-3">
            <Ionicons name="business-outline" size={22} color="#D97706" />
          </View>
          <View>
            <Text className="text-gray-900 font-bold text-base">
              Dados da Instituição
            </Text>
            <Text className="text-gray-400 text-xs">
              Informações públicas e para validação
            </Text>
          </View>
        </View>


        <Input
          legend="Nome da Casa de Adoção / ONG *"
          placeholder="Ex: Abrigo Esperança"
          value={nomeOng}
          onChangeText={setNomeOng}
          error={errors.nomeOng}
          icon={<Ionicons name="home-outline" size={20} color="#4B5563" />}
        />


        <Input
          legend="CNPJ *"
          placeholder="00.000.000/0000-00"
          value={cnpj}
          onChangeText={setCnpj}
          keyboardType="numeric"
          error={errors.cnpj}
          icon={<Ionicons name="card-outline" size={20} color="#4B5563" />}
        />

  
        <Input
          legend="Telefone / WhatsApp de Contato *"
          placeholder="(11) 98765-4321"
          value={telefone}
          onChangeText={setTelefone}
          keyboardType="phone-pad"
          error={errors.telefone}
          icon={<Ionicons name="call-outline" size={20} color="#4B5563" />}
        />

    
        <Input
          legend="E-mail Institucional *"
          placeholder="contato@abrigoesperanca.org"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          error={errors.email}
          icon={<Ionicons name="mail-outline" size={20} color="#4B5563" />}
        />

        <Input
          legend="Senha *"
          placeholder="Digite sua senha"
          value={senha}
          onChangeText={setSenha}
          autoCapitalize="none"
          secureTextEntry
          error={errors.senha}
          icon={<Ionicons name="lock-closed-outline" size={20} color="#4B5563" />}
        />

    
        <View className="mt-2">
          <View className="flex-row justify-between items-center mb-1 pr-1">
            <Text className="text-gray-700 font-medium text-sm ml-3">
              Site ou Rede Social
            </Text>
            <Text className="text-gray-400 text-xs">Opcional</Text>
          </View>

          <Input
            placeholder="https://instagram.com"
            value={siteRedeSocial}
            onChangeText={setSiteRedeSocial}
            autoCapitalize="none"
            keyboardType="url"
            error={errors.siteRedeSocial}
            icon={<Ionicons name="globe-outline" size={20} color="#4B5563" />}
          />
        </View>
      </View>


      <View className="bg-white p-5 rounded-3xl mb-6 shadow-sm">
        <View className="flex-row items-center mb-3">
          <View className="bg-[#DBEAFE] p-2.5 rounded-xl mr-3">
            <Ionicons name="location-outline" size={22} color="#0052CC" />
          </View>
          <View>
            <Text className="text-gray-900 font-bold text-base">
              Endereço da Casa de Adoção
            </Text>
            <Text className="text-gray-400 text-xs">
              Para calcular proximidade com adotantes
            </Text>
          </View>
        </View>

  
        <View className="flex-row items-end gap-2.5">
          <View className="flex-1">
            <Input
              legend="CEP *"
              placeholder="01310-100"
              value={cep}
              onChangeText={setCep}
              keyboardType="numeric"
              error={errors.cep}
              icon={<Ionicons name="map-outline" size={20} color="#4B5563" />}
            />
          </View>

          <Pressable
            onPress={handleBuscarCep}
            className="bg-[#0052CC] h-14 rounded-full px-5 flex-row items-center justify-center my-2 mb-[18px]"
          >
            <Ionicons name="search-outline" size={18} color="#FFFFFF" className="mr-1.5" />
            <Text className="text-white font-bold text-sm">Buscar CEP</Text>
          </Pressable>
        </View>

   
        <Input
          legend="Rua / Avenida *"
          placeholder="Av. Paulista"
          value={rua}
          onChangeText={setRua}
          error={errors.rua}
          icon={<Ionicons name="navigate-outline" size={20} color="#4B5563" />}
        />


        <View className="flex-row gap-2.5">
          <View className="w-1/3">
            <Input
              legend="Número *"
              placeholder="1578"
              value={numero}
              onChangeText={setNumero}
              keyboardType="numeric"
              error={errors.numero}
            />
          </View>

          <View className="flex-1">
            <Input
              legend="Cidade / UF *"
              placeholder="São Paulo - SP"
              value={cidadeUf}
              onChangeText={setCidadeUf}
              error={errors.cidadeUf}
            />
          </View>
        </View>
      </View>


      <Button onPress={handleSubmit} disabled={isSubmitting}>
        {isSubmitting ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          'Finalizar Cadastro de Parceiro'
        )}
      </Button>

      <View className="flex-row justify-center items-center my-6 pb-4">
        <Text className="text-gray-600 text-sm">Já possui cadastro? </Text>
        <Pressable onPress={() => {router.push('/login')}}>
          <Text className="text-[#0052CC] font-bold text-sm">
            Entrar como parceiro
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}