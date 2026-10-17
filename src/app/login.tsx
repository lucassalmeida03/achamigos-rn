import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { login } from '../services/authService';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async () => {
    const normalizedEmail = email.trim();

    if (!normalizedEmail || !password) {
      Alert.alert('Dados incompletos', 'Informe seu e-mail e sua senha.');
      return;
    }

    setIsSubmitting(true);

    try {
      await login(normalizedEmail, password);
      Alert.alert('Login realizado', 'Agora você já pode cadastrar um animal.', [
        {
          text: 'Continuar',
          onPress: () => router.replace('/cadastrar-animal'),
        },
      ]);
    } catch (error) {
      Alert.alert(
        'Não foi possível entrar',
        error instanceof Error ? error.message : 'Tente novamente.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F8F9FD]">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View className="flex-row items-center px-5 py-3">
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Voltar"
            className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-white"
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={22} color="#4A3728" />
          </Pressable>
          <Text className="text-xl font-bold text-[#2C3A4E]">Entrar</Text>
        </View>

        <View className="flex-1 justify-center px-6">
          <View className="mb-8 items-center">
            <View className="mb-4 h-20 w-20 items-center justify-center rounded-full bg-[#FF7A00]">
              <Ionicons name="paw" size={40} color="#FFFFFF" />
            </View>
            <Text className="text-2xl font-bold text-[#2C3A4E]">
              Bem-vindo ao Achamigos
            </Text>
            <Text className="mt-2 text-center text-gray-600">
              Entre para publicar um pet para adoção.
            </Text>
          </View>

          <View className="rounded-3xl bg-white p-5 shadow-sm">
            <Input
              legend="E-mail"
              value={email}
              onChangeText={setEmail}
              placeholder="seu@email.com"
              autoCapitalize="none"
              autoComplete="email"
              keyboardType="email-address"
              icon={<Ionicons name="mail-outline" size={20} color="#4B5563" />}
            />
            <Input
              legend="Senha"
              value={password}
              onChangeText={setPassword}
              placeholder="Sua senha"
              secureTextEntry
              autoCapitalize="none"
              autoComplete="password"
              icon={<Ionicons name="lock-closed-outline" size={20} color="#4B5563" />}
            />

            <View className="mt-4">
              <Button onPress={handleLogin} disabled={isSubmitting}>
                {isSubmitting ? 'Entrando...' : 'Entrar'}
              </Button>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
