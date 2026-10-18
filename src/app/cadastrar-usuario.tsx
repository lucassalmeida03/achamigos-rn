import React from 'react';
import { View, Text, ScrollView } from 'react-native';

import { Header } from '../components/Header';
import  RegisterPartnerForm  from '../components/RegisterPartnerForm';

export default function RegisterPartnerPage() {
  return (
    <ScrollView className="flex-1 bg-gray-100">
  
      <Header hideRegisterAction />

      <View className="p-4">
    
        <View className="bg-[#2072EF] p-6 rounded-[28px] mb-4 shadow-md">
          <View className="bg-white/20 self-start px-3.5 py-1.5 rounded-full mb-3">
            <Text className="text-white font-semibold text-xs">
              Parceiro Oficial Achamigos
            </Text>
          </View>

          <Text className="text-white font-bold text-2xl leading-8 mb-2">
            Seja uma Casa de Adoção Parceira
          </Text>

          <Text className="text-white/90 text-sm leading-5">
            Junte-se à rede Achamigos e ajude centenas de animais a encontrarem um lar com amor e responsabilidade.
          </Text>
        </View>

        <RegisterPartnerForm />
      </View>
    </ScrollView>
  );
}