import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import { Header } from '../components/Header';
import { RegisterEventForm } from '../components/RegisterEventForm';

export default function RegisterEventPage() {
  const router = useRouter();

  return (
    <ScrollView className="flex-1 bg-gray-100">

      <Header isLoggedIn={true} />

      <View className="p-4">

        <View className="flex-row items-center mb-4 pt-1">
          <Pressable
            onPress={() => router.back()}
            className="bg-[#EBF3FF] w-12 h-12 rounded-full justify-center items-center mr-3"
          >
            <Ionicons name="arrow-back" size={22} color="#1F2937" />
          </Pressable>
          <Text className="text-gray-900 font-bold text-xl">Novo Evento</Text>
        </View>

      
        <View className="bg-[#F3F4F6]/80 p-5 rounded-3xl mb-5 flex-row items-start">
          <View className="bg-[#FF7A00] w-12 h-12 rounded-full justify-center items-center mr-3.5 shadow-sm">
            <Ionicons name="calendar-outline" size={22} color="#FFFFFF" />
          </View>
          <View className="flex-1">
            <Text className="text-gray-900 font-bold text-base mb-1">
              Conecte corações peludos!
            </Text>
            <Text className="text-gray-600 text-xs leading-5">
              Divulgue sua feira ou mutirão para milhares de tutores, protetores e voluntários da sua região.
            </Text>
          </View>
        </View>

        <RegisterEventForm />
      </View>
    </ScrollView>
  );
}