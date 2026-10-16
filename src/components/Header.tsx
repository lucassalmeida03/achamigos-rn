import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface HeaderProps {
  /** Substitua ou altere para gerenciar via seu contexto de Auth no futuro */
  isLoggedIn?: boolean;
}

export function Header({ isLoggedIn = true }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <View className="relative z-50 w-full bg-[#F8F9FD] pt-12 pb-4 px-6 border-b border-gray-100">
      <View className="flex-row items-center justify-between">
        {/* LOGO ACHAMIGOS */}
        <View className="flex-row items-center">
          <Image
            source={require('../../assets/images/logocerto.png')} // Altere para o caminho da sua logo
            className="h-10 w-44"
            resizeMode="contain"
          />
        </View>

        {/* BOTAO DE PERFIL OU MENU HAMBÚRGUER */}
        {isLoggedIn ? (
          /* Usuário Logado: Avatar Arredondado */
          <TouchableOpacity
            onPress={toggleMenu}
            activeOpacity={0.8}
            className="rounded-full border-2 border-white shadow-md shadow-black/10"
          >
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
              }}
              className="w-12 h-12 rounded-full"
            />
          </TouchableOpacity>
        ) : (
          /* Usuário Não Logado: Ícone de Menu Hambúrguer */
          <TouchableOpacity
            onPress={toggleMenu}
            activeOpacity={0.7}
            className="p-2 rounded-full bg-white shadow-sm border border-gray-100 justify-center items-center"
          >
            <Ionicons name="menu" size={26} color="#4A3728" />
          </TouchableOpacity>
        )}
      </View>

      {/* DROPDOWN CARD (MODAL SOBREPOSTO) */}
      <Modal
        visible={isMenuOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsMenuOpen(false)}
      >
        <TouchableWithoutFeedback onPress={() => setIsMenuOpen(false)}>
          {/* Backdroop transparente para fechar ao clicar fora */}
          <View className="flex-1 bg-black/10">
            {/* Posicionamento do Card no Canto Superior Direito */}
            <View className="absolute top-20 right-6 w-56 bg-white rounded-2xl p-3 shadow-xl border border-gray-100">
              {isLoggedIn ? (
                /* OPÇÕES PARA USUÁRIO LOGADO */
                <View className="gap-y-1">
                  <TouchableOpacity
                    className="flex-row items-center p-3 rounded-xl active:bg-orange-50"
                    onPress={() => {
                      setIsMenuOpen(false);
                      router.push('/cadastrar-animal');
                    }}
                  >
                    <Ionicons name="add-circle-outline" size={20} color="#FF7A00" />
                    <Text className="ml-3 font-semibold text-gray-800 text-sm">
                      Postar Animal
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    className="flex-row items-center p-3 rounded-xl active:bg-orange-50"
                    onPress={() => setIsMenuOpen(false)}
                  >
                    <Ionicons name="megaphone-outline" size={20} color="#FF7A00" />
                    <Text className="ml-3 font-semibold text-gray-800 text-sm">
                      Anunciar Evento
                    </Text>
                  </TouchableOpacity>

                  <View className="h-[1px] bg-gray-100 my-1" />

                  <TouchableOpacity
                    className="flex-row items-center p-3 rounded-xl active:bg-gray-50"
                    onPress={() => setIsMenuOpen(false)}
                  >
                    <Ionicons name="paw-outline" size={20} color="#6B7280" />
                    <Text className="ml-3 font-medium text-gray-700 text-sm">
                      Animais
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    className="flex-row items-center p-3 rounded-xl active:bg-gray-50"
                    onPress={() => setIsMenuOpen(false)}
                  >
                    <Ionicons name="calendar-outline" size={20} color="#6B7280" />
                    <Text className="ml-3 font-medium text-gray-700 text-sm">
                      Eventos
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                /* OPÇÕES PARA USUÁRIO NÃO LOGADO */
                <View className="gap-y-1">
                   <TouchableOpacity
                    className="flex-row items-center p-3 rounded-xl active:bg-gray-50"
                    onPress={() => setIsMenuOpen(false)}
                  >
                    <Ionicons name="log-in-outline" size={20} color="#4A3728" />
                    <Text className="ml-3 font-medium text-gray-800 text-sm">
                      Fazer Login
                    </Text>
                  </TouchableOpacity>


                  <TouchableOpacity
                    className="flex-row items-center p-3 rounded-xl active:bg-gray-50"
                    onPress={() => setIsMenuOpen(false)}
                  >
                    <Ionicons name="paw-outline" size={20} color="#4A3728" />
                    <Text className="ml-3 font-medium text-gray-800 text-sm">
                      Animais
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    className="flex-row items-center p-3 rounded-xl active:bg-gray-50"
                    onPress={() => setIsMenuOpen(false)}
                  >
                    <Ionicons name="calendar-outline" size={20} color="#4A3728" />
                    <Text className="ml-3 font-medium text-gray-800 text-sm">
                      Eventos
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}