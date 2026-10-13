import React from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  children: React.ReactNode;
}

export function Button({ children, className = '', ...rest }: ButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className={`bg-[#FF7A00] h-14 rounded-full items-center justify-center px-6 shadow-md shadow-orange-500/30 ${className}`}
      {...rest}
    >
      {typeof children === 'string' ? (
        <Text className="text-white font-bold text-base text-center">
          {children}
        </Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
}