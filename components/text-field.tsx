// components/text-field.tsx
import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  TextInputProps,
} from 'react-native';
import AppColors from '@/constants/app-colors';

interface TextFieldProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  error?: boolean;
  errorText?: string;
  secureTextEntry?: boolean;
  showPasswordToggle?: boolean;
  containerStyle?: ViewStyle;
}

const TextField: React.FC<TextFieldProps> = ({
  label,
  error = false,
  errorText,
  secureTextEntry = false,
  showPasswordToggle = false,
  containerStyle,
  onFocus,
  onBlur,
  value,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // Label nổi lên khi đang gõ hoặc đã có giá trị
  const isFloating = isFocused || (!!value && value.length > 0);

  const borderColor = error
    ? AppColors.error
    : isFocused
    ? AppColors.primary.main
    : AppColors.accent[400];

  const labelColor = error
    ? AppColors.error
    : isFocused
    ? AppColors.primary.main
    : AppColors.accent[500];

  return (
    <View style={[styles.wrapper, containerStyle]}>
      <View style={[styles.box, { borderColor }]}>

        {label && (
          <Text style={[
            styles.label,
            isFloating && styles.labelUp,
            { color: labelColor },
          ]}>
            {label}
          </Text>
        )}

        <TextInput
          style={[styles.input, isFloating && styles.inputShifted]}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          onFocus={e => { setIsFocused(true); onFocus?.(e); }}
          onBlur={e  => { setIsFocused(false); onBlur?.(e);  }}
          value={value}
          placeholderTextColor={AppColors.accent[300]}
          {...rest}
        />

        {/* Nút 👁 hiện/ẩn mật khẩu */}
        {showPasswordToggle && secureTextEntry && (
          <TouchableOpacity
            style={styles.eyeBtn}
            onPress={() => setIsPasswordVisible(v => !v)}>
            <Text style={styles.eyeIcon}>
              {isPasswordVisible ? '👁' : '👁‍🗨'}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Hiển thị lỗi phía dưới */}
      {error && errorText ? (
        <Text style={styles.errorMsg}>{errorText}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 8,
  },
  box: {
    borderWidth: 1,
    borderRadius: 4,
    minHeight: 56,
    backgroundColor: AppColors.background,
    justifyContent: 'center',
    position: 'relative',
  },
  // Label ở giữa (trạng thái ban đầu)
  label: {
    position: 'absolute',
    left: 12,
    top: 18,
    fontSize: 16,
  },
  // Label nổi lên trên
  labelUp: {
    top: 6,
    fontSize: 12,
    backgroundColor: AppColors.background,
    paddingHorizontal: 4,
  },
  input: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    color: AppColors.onSurface,
  },
  // Đẩy text xuống để không đè label khi label nổi lên
  inputShifted: {
    paddingTop: 24,
    paddingBottom: 8,
  },
  eyeBtn: {
    position: 'absolute',
    right: 12,
    padding: 4,
  },
  eyeIcon: {
    fontSize: 20,
  },
  errorMsg: {
    marginTop: 4,
    marginLeft: 12,
    fontSize: 12,
    color: AppColors.error,
  },
});

export default TextField;