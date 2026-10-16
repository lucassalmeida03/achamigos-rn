import React, { useState } from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {
  legend?: string;
  selected?: boolean;
  error?: string;
  icon?: React.ReactNode;
}

export function Input({
  legend,
  selected = false,
  error,
  icon,
  className = '',
  onFocus,
  onBlur,
  multiline,
  ...rest
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const isSelected = selected || isFocused;
  const hasValue =
    typeof rest.value === 'string'
      ? rest.value.trim().length > 0
      : typeof rest.defaultValue === 'string' &&
        rest.defaultValue.trim().length > 0;
  const showError = Boolean(error) && !isSelected && !hasValue;

  return (
    <View className="w-full my-2">
      {legend && (
        <Text className="text-gray-700 font-medium text-sm mb-1.5 ml-3">
          {legend}
        </Text>
      )}

      <View
        className={`bg-[#F0F3FF] ${
          multiline ? 'h-32 py-3 items-start' : 'h-14 items-center'
        } rounded-3xl px-5 flex-row border-2 ${
          showError
            ? 'border-red-500'
            : isSelected
            ? 'border-[#FF7A00]'
            : 'border-transparent'
        }`}
      >
        {icon && <View className={`mr-3 ${multiline ? 'mt-1' : ''}`}>{icon}</View>}

        <TextInput
          className={`text-gray-800 text-base flex-1 ${
            multiline ? 'text-top h-full' : 'h-full'
          } ${className}`}
          placeholderTextColor="#9CA3AF"
          multiline={multiline}
          textAlignVertical={multiline ? 'top' : 'center'}
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

      {showError && (
        <Text className="text-red-500 text-xs mt-1 ml-3 font-medium">
          {error}
        </Text>
      )}
    </View>
  );
}