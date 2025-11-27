import type { AppTheme } from '@/theme';

import type { TextFieldVisualState } from '../TextField.types';

export type TextFieldColors = {
  containerBackground: string;
  containerBorder: string;
  inputText: string;
  placeholder: string;
  label: string;
  hint: string;
  characterCount: string;
  enhancerIcon: string;
  enhancerLabel: string;
  actionIcon: string;
};

export function getTextFieldColors(
  state: TextFieldVisualState,
  hasError: boolean,
  hasSuccess: boolean,
  theme: AppTheme
): TextFieldColors {
  const base: TextFieldColors = {
    containerBackground: theme.colors.backgroundTertiary,
    containerBorder: 'transparent',
    inputText: theme.colors.contentPrimary,
    placeholder: theme.colors.contentSecondary,
    label: theme.colors.contentPrimary,
    hint: theme.colors.contentTertiary,
    characterCount: theme.colors.contentTertiary,
    enhancerIcon: theme.colors.contentPrimary,
    enhancerLabel: theme.colors.contentPrimary,
    actionIcon: theme.colors.contentPrimary,
  };

  switch (state) {
    case 'focused':
      return {
        ...base,
        containerBackground: theme.colors.background,
        containerBorder: theme.colors.borderFocus,
      };

    case 'error':
      return {
        ...base,
        containerBackground: theme.colors.background,
        containerBorder: theme.colors.borderError,
        hint: theme.colors.danger,
      };

    case 'success':
      return {
        ...base,
        containerBackground: theme.colors.background,
        containerBorder: theme.colors.success,
        hint: theme.colors.success,
      };

    case 'disabled':
      return {
        ...base,
        containerBackground: theme.colors.disabled,
        inputText: theme.colors.contentDisabled,
        placeholder: theme.colors.contentDisabled,
        label: theme.colors.contentDisabled,
        hint: theme.colors.contentDisabled,
        characterCount: theme.colors.contentDisabled,
        enhancerIcon: theme.colors.contentDisabled,
        enhancerLabel: theme.colors.contentDisabled,
        actionIcon: theme.colors.contentDisabled,
      };

    case 'readOnly':
      return {
        ...base,
        containerBorder: theme.colors.border,
      };

    case 'loading':
      return {
        ...base,
      };

    case 'enabled':
    default:
      return base;
  }
}

export function getValidationIconColor(
  validationState: 'complete' | 'incomplete',
  theme: AppTheme
): string {
  return validationState === 'complete'
    ? theme.colors.success
    : theme.colors.danger;
}

export function getCharacterCountColor(
  currentLength: number,
  maxLength: number,
  isDisabled: boolean,
  theme: AppTheme
): string {
  if (isDisabled) return theme.colors.contentDisabled;
  if (currentLength > maxLength) return theme.colors.danger;
  return theme.colors.contentTertiary;
}
