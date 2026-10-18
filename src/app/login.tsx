import React, { useState } from 'react';
import { ActivityIndicator, View, Text, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { loginSchema } from '../schemas/loginSchema';
import { formatZodErrors } from '../utils/formatZodErrors';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [requestError, setRequestError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async () => {
    setErrors({});
    setRequestError('');

    const formData = { email, senha };
    const result = loginSchema.safeParse(formData);

    if (!result.success) {
      setErrors(formatZodErrors(result.error));
      return;
    }

    setIsSubmitting(true);

    try {
      await signIn(result.data.email, result.data.senha);
      router.replace('/(tabs)');
    } catch (error) {
      setRequestError(
        error instanceof Error
          ? error.message
          : 'Não foi possível realizar o login. Tente novamente.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView
      className="flex-1 bg-gray-100"
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <Header hideLoginAction />

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

          {requestError && (
            <Text className="mt-2 text-center text-sm font-medium text-red-500">
              {requestError}
            </Text>
          )}

          <View className="mt-2">
            <Button onPress={handleLogin} disabled={isSubmitting}>
              {isSubmitting ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                'Entrar no Achamigos'
              )}
            </Button>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
