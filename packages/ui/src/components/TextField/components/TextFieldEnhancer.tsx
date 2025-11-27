import React, { memo } from 'react';

import { Pressable, Text, View } from 'react-native';

import type { TextFieldEnhancer as EnhancerType } from '../TextField.types';
import { styles } from '../styles/stylesheet';

export function isIconComponent(
  icon: unknown
): icon is React.ComponentType<{ size: number; color: string }> {
  return (
    typeof icon === 'function' ||
    (typeof icon === 'object' && icon !== null && 'render' in icon)
  );
}

interface Props {
  enhancer: EnhancerType;
  iconSize: number;
  iconColor: string;
}

export const TextFieldEnhancer = memo(
  ({ enhancer, iconSize, iconColor }: Props) => {
    const renderContent = () => {
      if (enhancer.type === 'artwork') {
        const Icon = enhancer.icon;
        if (isIconComponent(Icon))
          return <Icon size={iconSize} color={iconColor} />;
        return Icon as React.ReactNode;
      }

      if (enhancer.type === 'label') {
        return (
          <Text style={[styles.enhancerLabel, { color: iconColor }]}>
            {enhancer.text}
          </Text>
        );
      }

      if (enhancer.type === 'artworkLabel') {
        const Icon = enhancer.icon;
        return (
          <View style={styles.artworkLabelRow}>
            {isIconComponent(Icon) ? (
              <Icon size={iconSize} color={iconColor} />
            ) : (
              (Icon as React.ReactNode)
            )}
            <Text style={[styles.enhancerLabel, { color: iconColor }]}>
              {enhancer.text}
            </Text>
          </View>
        );
      }
      return null;
    };

    const content = renderContent();
    if (!content) return null;

    if (enhancer.onPress) {
      return (
        <Pressable onPress={enhancer.onPress} hitSlop={8}>
          {content}
        </Pressable>
      );
    }

    return <>{content}</>;
  }
);

TextFieldEnhancer.displayName = 'TextFieldEnhancer';
