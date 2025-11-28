import React from 'react';

import type { ButtonIcon, ButtonIconProps } from '../Button.types';

interface IconRendererProps {
  icon: ButtonIcon;
  size: number;
  color: string;
}

export const IconRenderer = React.memo<IconRendererProps>(
  ({ icon, size, color }) => {
    if (!icon) {
      return null;
    }

    if (React.isValidElement<ButtonIconProps>(icon)) {
      return React.cloneElement(icon, { size, color });
    }

    const Component = icon as React.ComponentType<ButtonIconProps>;
    return <Component size={size} color={color} />;
  }
);

IconRenderer.displayName = 'IconRenderer';
