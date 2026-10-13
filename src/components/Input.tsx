import React, { useState } from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {
  legend?: string;
  selected?: boolean;
}

export function Input({
  legend,
  selected = false,
  className = '',
  onFocus,
  onBlur,
  ...rest
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const isSelected = selected || isFocused;

  return (
    <View className="w-full my-2">
      {legend && (
        <Text className="text-gray-700 font-medium text-sm mb-1.5 ml-3">
          {legend}
        </Text>
      )}

      <View
        className={`bg-[#F0F3FF] h-14 rounded-full px-5 justify-center border-2 ${
          isSelected ? 'border-[#FF7A00]' : 'border-transparent'
        }`}
      >
        <TextInput
          className={`text-gray-800 text-base h-full ${className}`}
          placeholderTextColor="#9CA3AF"
          onFocus={(e) => {
            setIsFocused(true);
            onFocus && onFocus(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur && onBlur(e);
          }}
          {...rest}
        />
      </View>
    </View>
  );
}