import React from 'react';

import type { ButtonIcon, ButtonIconProps } from '../Button.types';

interface IconRendererProps {
  /** Icon element or component to render */
  icon: ButtonIcon;
  /** Resolved icon size in pixels */
  size: number;
  /** Icon color (from theme/variant) */
  color: string;
}

/**
 * Internal component for rendering icons in Button components.
 * Handles both ReactElement and ComponentType icon formats.
 *
 * @internal - Not intended for external use
 */

export const IconRenderer = React.memo<IconRendererProps>(
  ({ icon, size, color }) => {
    // Handle falsy values (null, false, undefined)
    if (!icon) {
      return null;
    }

    // Handle ReactElement icons (e.g., <Icon />)
    if (React.isValidElement<ButtonIconProps>(icon)) {
      return React.cloneElement(icon, { size, color });
    }

    // Handle Component icons (function, memo, forwardRef, etc.)
    // Note: React.memo and forwardRef return objects, not functions
    // So we just try to render it as a component
    const Component = icon as React.ComponentType<ButtonIconProps>;
    return <Component size={size} color={color} />;
  }
);

IconRenderer.displayName = 'IconRenderer';
