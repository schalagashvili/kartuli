import type { Theme } from '@/theme';

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
  theme: Theme
): TextFieldColors {
  const base: TextFieldColors = {
    containerBackground: theme.colors.background.tertiary,
    containerBorder: 'transparent',
    inputText: theme.colors.text.primary,
    placeholder: theme.colors.text.secondary,
    label: theme.colors.text.primary,
    hint: theme.colors.text.tertiary,
    characterCount: theme.colors.text.tertiary,
    enhancerIcon: theme.colors.text.primary,
    enhancerLabel: theme.colors.text.primary,
    actionIcon: theme.colors.text.primary,
  };

  switch (state) {
    case 'focused':
      return {
        ...base,
        containerBackground: theme.colors.background.primary,
        containerBorder: theme.colors.border.focus,
      };

    case 'error':
      return {
        ...base,
        containerBackground: theme.colors.background.primary,
        containerBorder: theme.colors.status.error,
        hint: theme.colors.status.error,
      };

    case 'success':
      return {
        ...base,
        containerBackground: theme.colors.background.primary,
        containerBorder: theme.colors.status.success,
        hint: theme.colors.status.success,
      };

    case 'disabled':
      return {
        ...base,
        containerBackground: theme.colors.interactive.secondary,
        containerBorder: 'transparent',
        inputText: theme.colors.text.disabled,
        placeholder: theme.colors.text.disabled,
        label: theme.colors.text.disabled,
        hint: theme.colors.text.disabled,
        characterCount: theme.colors.text.disabled,
        enhancerIcon: theme.colors.text.disabled,
        enhancerLabel: theme.colors.text.disabled,
        actionIcon: theme.colors.text.disabled,
      };

    case 'readOnly':
      return {
        ...base,
        containerBorder: theme.colors.border.default,
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
  theme: Theme
): string {
  return validationState === 'complete'
    ? theme.colors.status.success
    : theme.colors.status.error;
}

export function getCharacterCountColor(
  currentLength: number,
  maxLength: number,
  isDisabled: boolean,
  theme: Theme
): string {
  if (isDisabled) return theme.colors.text.disabled;
  if (currentLength > maxLength) return theme.colors.status.error;
  return theme.colors.text.tertiary;
}
