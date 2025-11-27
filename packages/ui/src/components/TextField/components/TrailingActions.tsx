import React, { memo } from 'react';

import { ActivityIndicator, Pressable, View } from 'react-native';

import {
  CheckCircle2,
  Eye,
  EyeOff,
  XCircle as IncompleteIcon,
  XCircle,
} from 'lucide-react-native';
import { useUnistyles } from 'react-native-unistyles';

import type {
  TextFieldEnhancer as EnhancerType,
  TextFieldValidationState,
} from '../TextField.types';
import { styles } from '../styles/stylesheet';
import { TextFieldEnhancer } from './TextFieldEnhancer';

interface Props {
  loading: boolean;
  showClear: boolean;
  onClear: () => void;
  passwordToggle: boolean;
  isPasswordVisible: boolean;
  onTogglePassword: () => void;
  validationState: TextFieldValidationState;
  trailingEnhancer?: EnhancerType; // ✅ Strict typing
  iconSize: number;
  iconColor: string;
}

export const TrailingActions = memo(
  ({
    loading,
    showClear,
    onClear,
    passwordToggle,
    isPasswordVisible,
    onTogglePassword,
    validationState,
    trailingEnhancer,
    iconSize,
    iconColor,
  }: Props) => {
    const { theme } = useUnistyles();

    if (loading) {
      return <ActivityIndicator size="small" color={iconColor} />;
    }

    const showValidation = validationState !== 'none';

    const renderTrailingContent = () => {
      if (showValidation) {
        const isComplete = validationState === 'complete';
        const Icon = isComplete ? CheckCircle2 : IncompleteIcon;
        const color = isComplete ? theme.colors.success : theme.colors.danger;

        return <Icon size={iconSize} color={color} />;
      }

      if (trailingEnhancer) {
        return (
          <View style={styles.enhancer}>
            <TextFieldEnhancer
              enhancer={trailingEnhancer}
              iconSize={iconSize}
              iconColor={iconColor}
            />
          </View>
        );
      }

      return null;
    };

    return (
      <View style={styles.trailingActions}>
        {showClear && (
          <Pressable onPress={onClear} hitSlop={8} accessibilityRole="button">
            <XCircle size={iconSize} color={iconColor} />
          </Pressable>
        )}

        {passwordToggle && (
          <Pressable
            onPress={onTogglePassword}
            hitSlop={8}
            accessibilityRole="button"
          >
            {isPasswordVisible ? (
              <EyeOff size={iconSize} color={iconColor} />
            ) : (
              <Eye size={iconSize} color={iconColor} />
            )}
          </Pressable>
        )}

        {renderTrailingContent()}
      </View>
    );
  }
);

TrailingActions.displayName = 'TrailingActions';
