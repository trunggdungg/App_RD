// components/button.tsx
import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import AppColors from '@/constants/app-colors';

type Variant = 'contained' | 'outlined' | 'text';
type Color   = 'primary' | 'error' | 'default';

interface ButtonProps {
  title: string;
  onPress?: () => void;
  variant?: Variant;
  color?: Color;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const AppButton: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant  = 'contained',
  color    = 'primary',
  disabled = false,
  loading  = false,
  style,
  textStyle,
}) => {
  // Màu nền
  const bgColor = () => {
    if (disabled)              return AppColors.accent[100];
    if (variant !== 'contained') return 'transparent';
    if (color === 'primary')   return AppColors.primary.main;
    if (color === 'error')     return AppColors.error;
    return '#101010';
  };

  // Màu chữ
  const txtColor = () => {
    if (disabled)              return AppColors.accent[300];
    if (variant === 'contained') return AppColors.white;
    if (color === 'primary')   return AppColors.primary.main;
    if (color === 'error')     return AppColors.error;
    return '#101010';
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      style={[
        styles.btn,
        { backgroundColor: bgColor() },
        variant === 'outlined' && { borderWidth: 1, borderColor: AppColors.primary.main },
        style,
      ]}>
      {loading
        ? <ActivityIndicator size="small" color={txtColor()} />
        : <Text style={[styles.label, { color: txtColor() }, textStyle]}>
            {title}
          </Text>
      }
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    minHeight: 44,
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});

export default AppButton;