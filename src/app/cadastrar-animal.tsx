import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RegisterPetForm } from '../components/RegisterPetForm';

export default function CadastrarAnimal() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#F8F9FD]">
      <View className="flex-row items-center px-5 py-3">
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Voltar"
          className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-white"
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={22} color="#4A3728" />
        </Pressable>
        <View className="flex-1">
          <Text className="text-xl font-bold text-[#2C3A4E]">
            Cadastrar animal
          </Text>
          <Text className="text-sm text-gray-700">
            Preencha as informações para divulgar um pet.
          </Text>
        </View>
      </View>

      <RegisterPetForm />
    </SafeAreaView>
  );
}
