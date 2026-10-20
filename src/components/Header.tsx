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
import { useAuth } from '../contexts/AuthContext';

interface HeaderProps {
  hideLoginAction?: boolean;
  hideRegisterAction?: boolean;
}

export function Header({
  hideLoginAction = false,
  hideRegisterAction = false,
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const { session, signOut } = useAuth();
  const isLoggedIn = Boolean(session);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <View className="relative z-50 w-full bg-[#F8F9FD] pt-12 pb-4 px-6 border-b border-gray-100">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center">
          <Image
            source={require('../../assets/images/logocerto.png')}
            className="h-10 w-44"
            resizeMode="contain"
          />
        </View>

        {isLoggedIn ? (
          <TouchableOpacity
            onPress={toggleMenu}
            activeOpacity={0.8}
            className="rounded-full border-2 border-white shadow-md shadow-black/10"
          >
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=256&h=256&q=85',
              }}
              className="w-12 h-12 rounded-full"
            />
          </TouchableOpacity>

        ) : (
          <TouchableOpacity
            onPress={toggleMenu}
            activeOpacity={0.7}
            className="p-2 rounded-full bg-white shadow-sm border border-gray-100 justify-center items-center"
          >
            <Ionicons name="menu" size={26} color="#4A3728" />
          </TouchableOpacity>
        )}
      </View>

      <Modal
        visible={isMenuOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsMenuOpen(false)}
      >
        <TouchableWithoutFeedback onPress={() => setIsMenuOpen(false)}>
          <View className="flex-1 bg-black/10">
            <View className="absolute top-20 right-6 w-56 bg-white rounded-2xl p-3 shadow-xl border border-gray-100">
              {isLoggedIn ? (
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
                    onPress={() => {
                      setIsMenuOpen(false),
                      router.push('/cadastrar-evento');
                    }}
                  >
                    <Ionicons name="megaphone-outline" size={20} color="#FF7A00" />
                    <Text className="ml-3 font-semibold text-gray-800 text-sm">
                      Anunciar Evento
                    </Text>
                  </TouchableOpacity>

                  <View className="h-[1px] bg-gray-100 my-1" />

                    <TouchableOpacity
                    className="flex-row items-center p-3 rounded-xl active:bg-gray-50"
                    onPress={() => {
                      setIsMenuOpen(false);
                      router.push('/adotar');
                    }}
                  >
                    <Ionicons name="paw-outline" size={20} color="#4A3728" />
                    <Text className="ml-3 font-medium text-gray-800 text-sm">
                      Animais
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    className="flex-row items-center p-3 rounded-xl active:bg-gray-50"
                    onPress={() => {
                      setIsMenuOpen(false);
                      router.push('/evento');
                    }}
                  >
                    <Ionicons name="calendar-outline" size={20} color="#6B7280" />
                    <Text className="ml-3 font-medium text-gray-700 text-sm">
                      Eventos
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    className="flex-row items-center p-3 rounded-xl active:bg-red-50"
                    onPress={() => {
                      setIsMenuOpen(false);
                      void signOut().then(() => router.replace('/login'));
                    }}
                  >
                    <Ionicons name="log-out-outline" size={20} color="#DC2626" />
                    <Text className="ml-3 font-medium text-red-600 text-sm">
                      Sair
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View className="gap-y-1">
                  {!hideLoginAction && (
                    <TouchableOpacity
                      className="flex-row items-center p-3 rounded-xl active:bg-gray-50"
                      onPress={() => {
                        setIsMenuOpen(false);
                        router.push('/login');
                      }}
                    >
                      <Ionicons name="log-in-outline" size={20} color="#4A3728" />
                      <Text className="ml-3 font-medium text-gray-800 text-sm">
                        Fazer Login
                      </Text>
                    </TouchableOpacity>
                    
                  )}

                  {!hideRegisterAction && (
                    <TouchableOpacity
                      className="flex-row items-center p-3 rounded-xl active:bg-gray-50"
                      onPress={() => {
                        setIsMenuOpen(false);
                        router.push('/cadastrar-usuario');
                      }}
                    >
                      <Ionicons name="person-add-outline" size={20} color="#4A3728" />
                      <Text className="ml-3 font-medium text-gray-800 text-sm">
                        Fazer cadastro
                      </Text>
                    </TouchableOpacity>
                  )}

                  <TouchableOpacity
                    className="flex-row items-center p-3 rounded-xl active:bg-gray-50"
                    onPress={() => {
                      setIsMenuOpen(false);
                      router.push('/adotar');
                    }}
                  >
                    <Ionicons name="paw-outline" size={20} color="#4A3728" />
                    <Text className="ml-3 font-medium text-gray-800 text-sm">
                      Animais
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    className="flex-row items-center p-3 rounded-xl active:bg-gray-50"
                    onPress={() => {
                      setIsMenuOpen(false);
                      router.push('/evento');
                    }}
                  >
                    <Ionicons name="calendar-outline" size={20} color="#6B7280" />
                    <Text className="ml-3 font-medium text-gray-700 text-sm">
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