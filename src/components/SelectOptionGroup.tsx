import React from 'react';
import { View, Text, Pressable } from 'react-native';

interface Option {
  label: string;
  sublabel?: string;
  value: string;
  icon?: React.ReactNode;
}

interface SelectOptionGroupProps {
  legend?: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
  activeColor?: string;
}

export function SelectOptionGroup({
  legend,
  options,
  value,
  onChange,
  error,
  activeColor = '#FF7A00',
}: SelectOptionGroupProps) {
  return (
    <View className="w-full my-2">
      {legend && (
        <Text className="text-gray-700 font-bold text-sm mb-2 ml-1">
          {legend} <Text className="text-orange-500">*</Text>
        </Text>
      )}

      <View className="flex-row gap-2.5">
        {options.map((opt) => {
          const isSelected = value === opt.value;
          return (
            <Pressable
              key={opt.value}
              onPress={() => onChange(opt.value)}
              style={{
                backgroundColor: isSelected ? activeColor : '#F0F3FF',
              }}
              className="flex-1 h-14 rounded-full justify-center items-center flex-row px-2"
            >
              {opt.icon && <View className="mr-1.5">{opt.icon}</View>}
              <View className="items-center">
                <Text
                  className={`font-bold text-sm ${
                    isSelected ? 'text-white' : 'text-gray-800'
                  }`}
                >
                  {opt.label}
                </Text>
                {opt.sublabel && (
                  <Text
                    className={`text-[10px] ${
                      isSelected ? 'text-white/80' : 'text-gray-500'
                    }`}
                  >
                    {opt.sublabel}
                  </Text>
                )}
              </View>
            </Pressable>
          );
        })}
      </View>

      {error && (
        <Text className="text-red-500 text-xs mt-1 ml-3 font-medium">
          {error}
        </Text>
      )}
    </View>
  );
}