import React, { useState } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { loginSchema } from '../schemas/loginSchema';
import { formatZodErrors } from '../utils/formatZodErrors';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleLogin = () => {
    setErrors({});

    const formData = { email, senha };
    const result = loginSchema.safeParse(formData);

    if (!result.success) {
      setErrors(formatZodErrors(result.error));
      return;
    }

    console.log('Login efetuado com sucesso:', result.data);
    Alert.alert('Sucesso', 'Login realizado!');
  };

  return (
    <ScrollView
      className="flex-1 bg-gray-100"
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <Header isLoggedIn={false} hideLoginAction />

      <View className="flex-1 px-5 py-2">
        <View className="bg-[#F2F2F2] p-4 rounded-3xl mb-3 flex-row items-start">
          <View className="flex-1 items-center">
            <Text className="text-gray-900 font-bold text-[20px] mb-1">
              Bem-vindo de volta!
            </Text>
            <Text className="text-gray-600 text-[14px] leading-5 text-center">
              Entre para gerenciar seus focinhos carinhosos.
            </Text>
          </View>
        </View>

        <View className="bg-white p-5 rounded-3xl w-full shadow-sm">
          <Input
            legend="E-mail"
            placeholder="usuario@outlook.com"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            error={errors.email}
            icon={<Ionicons name="mail-outline" size={20} color="#4B5563" />}
          />

          <Input
            legend="Senha de acesso"
            placeholder="Digite sua senha cadastrada"
            value={senha}
            onChangeText={setSenha}
            error={errors.senha}
            icon={<Ionicons name="lock-closed-outline" size={20} color="#4B5563" />}
          />

          <View className="mt-2">
            <Button onPress={handleLogin}>
              Entrar no Achamigos
            </Button>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
