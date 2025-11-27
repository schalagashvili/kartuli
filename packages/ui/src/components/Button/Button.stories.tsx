/* eslint-disable react-native/no-inline-styles */
import { Text, View } from 'react-native';

import type { Meta, StoryObj } from '@storybook/react';

// =============================================================================
// ICONS
// =============================================================================
// Import your real icons for accurate rendering tests
import { ArrowRight, Check, ChevronDown, Heart, Trash2, X } from '../../icons';
import { Button } from './Button';
import type { ButtonIconProps } from './Button.types';

// Fallback icon for environments where real icons aren't available
// Respects size prop to accurately test size variants
const FallbackIcon = ({ color, size }: ButtonIconProps) => (
  <View
    style={{
      width: size,
      height: size,
      backgroundColor: color,
      borderRadius: size * 0.15,
    }}
  />
);

// Use real icons with fallback safety
const Icons = {
  Heart: Heart ?? FallbackIcon,
  ArrowRight: ArrowRight ?? FallbackIcon,
  Trash: Trash2 ?? FallbackIcon,
  Close: X ?? FallbackIcon,
  Check: Check ?? FallbackIcon,
  ChevronDown: ChevronDown ?? FallbackIcon,
};

// =============================================================================
// CONSTANTS
// =============================================================================
// Named constants for test dimensions (no magic numbers)
const TRUNCATION_TEST_WIDTH = 200; // Width where 4+ word labels truncate
const CONTAINER_FULL_WIDTH = '100%';

// =============================================================================
// DECORATORS
// =============================================================================
const withPadding = (Story: React.ComponentType) => (
  <View style={{ padding: 24, alignItems: 'flex-start' }}>
    <Story />
  </View>
);

const withFullWidth = (Story: React.ComponentType) => (
  <View style={{ padding: 24, width: CONTAINER_FULL_WIDTH }}>
    <Story />
  </View>
);

const withConstrainedWidth = (Story: React.ComponentType) => (
  <View
    style={{
      padding: 16,
      width: TRUNCATION_TEST_WIDTH,
      borderWidth: 1,
      borderColor: '#E5E5E5',
      borderRadius: 8,
      backgroundColor: '#FAFAFA',
    }}
  >
    <Text style={{ fontSize: 10, color: '#666', marginBottom: 8 }}>
      Container: {TRUNCATION_TEST_WIDTH}px
    </Text>
    <Story />
  </View>
);

const withRTL = (Story: React.ComponentType) => (
  <View style={{ padding: 24, alignItems: 'flex-start', direction: 'rtl' }}>
    <Story />
  </View>
);

const withDarkBackground = (Story: React.ComponentType) => (
  <View
    style={{
      padding: 24,
      alignItems: 'flex-start',
      backgroundColor: '#1A1A1A',
    }}
  >
    <Story />
  </View>
);

// =============================================================================
// HELPER COMPONENTS
// =============================================================================
const SectionLabel = ({ children }: { children: string }) => (
  <Text
    style={{
      fontSize: 11,
      fontWeight: '600',
      color: '#666',
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      marginBottom: 8,
    }}
  >
    {children}
  </Text>
);

const Spacer = ({ size = 12 }: { size?: number }) => (
  <View style={{ height: size }} />
);

const Row = ({
  children,
  gap = 12,
}: {
  children: React.ReactNode;
  gap?: number;
}) => (
  <View
    style={{
      flexDirection: 'row',
      gap,
      alignItems: 'center',
      flexWrap: 'wrap',
    }}
  >
    {children}
  </View>
);

const Column = ({
  children,
  gap = 12,
}: {
  children: React.ReactNode;
  gap?: number;
}) => <View style={{ gap, alignItems: 'flex-start' }}>{children}</View>;

const iconOptions = {
  None: undefined,
  Heart: Icons.Heart,
  ArrowRight: Icons.ArrowRight,
  Trash: Icons.Trash,
  Check: Icons.Check,
};

// =============================================================================
// META CONFIGURATION
// =============================================================================
const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  args: {
    label: 'Button',
    hierarchy: 'primary',
    size: 'medium',
    shape: 'rect',
    widthMode: 'intrinsic',
    tone: 'default',
    disabled: false,
    loading: false,
    active: false,
    hapticFeedback: false,
  },
  argTypes: {
    // Event handlers -> Actions panel
    onPress: { action: 'pressed' },
    onLongPress: { action: 'long-pressed' },

    // Enum controls
    hierarchy: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
      description: 'Visual hierarchy level',
      table: {
        defaultValue: { summary: 'primary' },
        type: { summary: 'ButtonHierarchy' },
      },
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Button size',
      table: {
        defaultValue: { summary: 'medium' },
        type: { summary: 'ButtonSize' },
      },
    },
    shape: {
      control: 'select',
      options: ['rect', 'pill', 'circle', 'square'],
      description: 'Button shape',
      table: {
        defaultValue: { summary: 'rect' },
        type: { summary: 'ButtonShape' },
      },
    },
    widthMode: {
      control: 'select',
      options: ['intrinsic', 'fixed'],
      description: 'Width behavior',
      table: {
        defaultValue: { summary: 'intrinsic' },
        type: { summary: 'ButtonWidthMode' },
      },
    },
    tone: {
      control: 'select',
      options: ['default', 'negative'],
      description: 'Color tone for destructive actions',
      table: {
        defaultValue: { summary: 'default' },
        type: { summary: 'ButtonTone' },
      },
    },
    leadingIcon: {
      control: 'select',
      options: Object.keys(iconOptions),
      mapping: iconOptions,
      description: 'Icon displayed before the label.',
    },
    trailingIcon: {
      control: 'select',
      options: Object.keys(iconOptions),
      mapping: iconOptions,
      description: 'Icon displayed after the label.',
    },
    // Boolean controls
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    active: { control: 'boolean' },
    hapticFeedback: { control: 'boolean' },

    // Number controls
    delayLongPress: {
      control: { type: 'number', min: 100, max: 2000, step: 100 },
      description: 'Long press delay in ms',
      table: { defaultValue: { summary: '500' } },
    },
  },
  decorators: [withPadding],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
Button component following Uber's Base Design System specifications.

## Hierarchy
- **Primary**: Main action, ONE per context
- **Secondary**: Alternative actions  
- **Tertiary**: Dismissive actions (cancel, skip)

## Usage Guidelines
- Keep labels to 1-3 words
- Use sentence case
- Use action verbs (Save, Request, Confirm)
- Icon-only buttons MUST have accessibilityLabel
        `,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

// =============================================================================
// SECTION 1: HIERARCHY VARIANTS
// =============================================================================

export const Primary: Story = {
  args: {
    label: 'Primary Action',
    hierarchy: 'primary',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Highest emphasis. Use ONE primary button per context for the main forward action.',
      },
    },
  },
};

export const Secondary: Story = {
  args: {
    label: 'Secondary Action',
    hierarchy: 'secondary',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Medium emphasis. Most actions live here. Can have multiple per context.',
      },
    },
  },
};

export const Tertiary: Story = {
  args: {
    label: 'Tertiary Action',
    hierarchy: 'tertiary',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Low emphasis, transparent background. Use for dismissive actions like Cancel or Skip.',
      },
    },
  },
};

export const HierarchyComparison: Story = {
  render: () => (
    <Column gap={16}>
      <SectionLabel>Hierarchy Comparison</SectionLabel>
      <Row gap={16}>
        <Button label="Primary" hierarchy="primary" />
        <Button label="Secondary" hierarchy="secondary" />
        <Button label="Tertiary" hierarchy="tertiary" />
      </Row>
    </Column>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Side-by-side comparison of all hierarchy levels.',
      },
    },
  },
};

// =============================================================================
// SECTION 2: TONE VARIANTS
// =============================================================================

export const NegativePrimary: Story = {
  args: {
    label: 'Delete Account',
    hierarchy: 'primary',
    tone: 'negative',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Destructive primary action. Use sparingly for irreversible operations.',
      },
    },
  },
};

export const NegativeSecondary: Story = {
  args: {
    label: 'Remove Item',
    hierarchy: 'secondary',
    tone: 'negative',
  },
};

export const NegativeTertiary: Story = {
  args: {
    label: 'Cancel Deletion',
    hierarchy: 'tertiary',
    tone: 'negative',
  },
};

export const ToneMatrix: Story = {
  render: () => (
    <Column gap={20}>
      <Column gap={8}>
        <SectionLabel>Default Tone</SectionLabel>
        <Row gap={12}>
          <Button label="Primary" hierarchy="primary" tone="default" />
          <Button label="Secondary" hierarchy="secondary" tone="default" />
          <Button label="Tertiary" hierarchy="tertiary" tone="default" />
        </Row>
      </Column>

      <Column gap={8}>
        <SectionLabel>Negative Tone</SectionLabel>
        <Row gap={12}>
          <Button
            label="Delete"
            hierarchy="primary"
            tone="negative"
            leadingIcon={Icons.Trash}
          />
          <Button
            label="Remove"
            hierarchy="secondary"
            tone="negative"
            leadingIcon={Icons.Trash}
          />
          <Button
            label="Cancel"
            hierarchy="tertiary"
            tone="negative"
            leadingIcon={Icons.Close}
          />
        </Row>
      </Column>
    </Column>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complete matrix showing all hierarchy × tone combinations.',
      },
    },
  },
};

// =============================================================================
// SECTION 3: SIZE VARIANTS
// =============================================================================

export const SizeSmall: Story = {
  args: {
    label: 'Small',
    size: 'small',
  },
};

export const SizeMedium: Story = {
  args: {
    label: 'Medium',
    size: 'medium',
  },
};

export const SizeLarge: Story = {
  args: {
    label: 'Large',
    size: 'large',
  },
};

export const SizeComparison: Story = {
  render: () => (
    <Column gap={20}>
      <Column gap={8}>
        <SectionLabel>Size Scale (36px / 48px / 56px)</SectionLabel>
        <Row gap={12}>
          <Button label="Small" size="small" />
          <Button label="Medium" size="medium" />
          <Button label="Large" size="large" />
        </Row>
      </Column>

      <Column gap={8}>
        <SectionLabel>With Icons</SectionLabel>
        <Row gap={12}>
          <Button label="Small" size="small" leadingIcon={Icons.Heart} />
          <Button label="Medium" size="medium" leadingIcon={Icons.Heart} />
          <Button label="Large" size="large" leadingIcon={Icons.Heart} />
        </Row>
      </Column>

      <Column gap={8}>
        <SectionLabel>Secondary Hierarchy</SectionLabel>
        <Row gap={12}>
          <Button label="Small" size="small" hierarchy="secondary" />
          <Button label="Medium" size="medium" hierarchy="secondary" />
          <Button label="Large" size="large" hierarchy="secondary" />
        </Row>
      </Column>
    </Column>
  ),
};

// =============================================================================
// SECTION 4: SHAPE VARIANTS
// =============================================================================

export const ShapeRect: Story = {
  args: {
    label: 'Rectangle',
    shape: 'rect',
  },
};

export const ShapePill: Story = {
  args: {
    label: 'Pill Shape',
    shape: 'pill',
  },
};

export const ShapeCircle: Story = {
  args: {
    shape: 'circle',
    leadingIcon: Icons.Heart,
    accessibilityLabel: 'Add to favorites',
  },
};

export const ShapeSquare: Story = {
  args: {
    shape: 'square',
    leadingIcon: Icons.Close,
    accessibilityLabel: 'Close',
  },
};

export const ShapeComparison: Story = {
  render: () => (
    <Column gap={20}>
      <Column gap={8}>
        <SectionLabel>Text Buttons</SectionLabel>
        <Row gap={12}>
          <Button label="Rect (8px radius)" shape="rect" />
          <Button label="Pill (height/2)" shape="pill" />
        </Row>
      </Column>

      <Column gap={8}>
        <SectionLabel>Icon-Only Buttons</SectionLabel>
        <Row gap={12}>
          <Button
            shape="circle"
            leadingIcon={Icons.Heart}
            accessibilityLabel="Favorite"
          />
          <Button
            shape="square"
            leadingIcon={Icons.Close}
            accessibilityLabel="Close"
          />
          <Button
            shape="circle"
            hierarchy="secondary"
            leadingIcon={Icons.Check}
            accessibilityLabel="Confirm"
          />
          <Button
            shape="square"
            hierarchy="tertiary"
            leadingIcon={Icons.ChevronDown}
            accessibilityLabel="Expand"
          />
        </Row>
      </Column>
    </Column>
  ),
};

export const PillSizeMatrix: Story = {
  render: () => (
    <Column gap={8}>
      <SectionLabel>Pill Shape × All Sizes</SectionLabel>
      <Row gap={12}>
        <Button
          label="Small"
          shape="pill"
          size="small"
          leadingIcon={Icons.Heart}
        />
        <Button
          label="Medium"
          shape="pill"
          size="medium"
          leadingIcon={Icons.Heart}
        />
        <Button
          label="Large"
          shape="pill"
          size="large"
          leadingIcon={Icons.Heart}
        />
      </Row>
    </Column>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Verifies pill minWidth calculation: height + 24px per Uber spec.',
      },
    },
  },
};

export const IconOnlySizeMatrix: Story = {
  render: () => (
    <Column gap={16}>
      <Column gap={8}>
        <SectionLabel>Circle × All Sizes</SectionLabel>
        <Row gap={12}>
          <Button
            shape="circle"
            size="small"
            leadingIcon={Icons.Heart}
            accessibilityLabel="Favorite"
          />
          <Button
            shape="circle"
            size="medium"
            leadingIcon={Icons.Heart}
            accessibilityLabel="Favorite"
          />
          <Button
            shape="circle"
            size="large"
            leadingIcon={Icons.Heart}
            accessibilityLabel="Favorite"
          />
        </Row>
      </Column>

      <Column gap={8}>
        <SectionLabel>Square × All Sizes</SectionLabel>
        <Row gap={12}>
          <Button
            shape="square"
            size="small"
            leadingIcon={Icons.Close}
            accessibilityLabel="Close"
          />
          <Button
            shape="square"
            size="medium"
            leadingIcon={Icons.Close}
            accessibilityLabel="Close"
          />
          <Button
            shape="square"
            size="large"
            leadingIcon={Icons.Close}
            accessibilityLabel="Close"
          />
        </Row>
      </Column>

      <Column gap={8}>
        <SectionLabel>Negative Tone × Circle</SectionLabel>
        <Row gap={12}>
          <Button
            shape="circle"
            size="small"
            tone="negative"
            leadingIcon={Icons.Trash}
            accessibilityLabel="Delete"
          />
          <Button
            shape="circle"
            size="medium"
            tone="negative"
            leadingIcon={Icons.Trash}
            accessibilityLabel="Delete"
          />
          <Button
            shape="circle"
            size="large"
            tone="negative"
            leadingIcon={Icons.Trash}
            accessibilityLabel="Delete"
          />
        </Row>
      </Column>
    </Column>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Critical test: verifies icon scaling at all sizes. Icons should not clip or overflow.',
      },
    },
  },
};

// =============================================================================
// SECTION 5: STATE VARIANTS
// =============================================================================

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    label: 'Loading',
    loading: true,
  },
};

export const Active: Story = {
  args: {
    label: 'Active Toggle',
    hierarchy: 'secondary',
    active: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Active state only applies to Secondary hierarchy (toggle buttons).',
      },
    },
  },
};

export const StateMatrix: Story = {
  render: () => (
    <Column gap={20}>
      <Column gap={8}>
        <SectionLabel>Disabled States</SectionLabel>
        <Row gap={12}>
          <Button label="Primary" hierarchy="primary" disabled />
          <Button label="Secondary" hierarchy="secondary" disabled />
          <Button label="Tertiary" hierarchy="tertiary" disabled />
        </Row>
      </Column>

      <Column gap={8}>
        <SectionLabel>Loading States</SectionLabel>
        <Row gap={12}>
          <Button label="Primary" hierarchy="primary" loading />
          <Button label="Secondary" hierarchy="secondary" loading />
          <Button label="Tertiary" hierarchy="tertiary" loading />
        </Row>
      </Column>

      <Column gap={8}>
        <SectionLabel>Active State (Secondary Only)</SectionLabel>
        <Row gap={12}>
          <Button label="Inactive" hierarchy="secondary" active={false} />
          <Button label="Active" hierarchy="secondary" active />
        </Row>
      </Column>
    </Column>
  ),
};

// =============================================================================
// SECTION 6: STATE COMBINATIONS (Edge Cases)
// =============================================================================

export const LoadingDisabled: Story = {
  args: {
    label: 'Processing...',
    loading: true,
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Tests loading + disabled combination. Spinner should use correct disabled color.',
      },
    },
  },
};

export const LoadingNegative: Story = {
  args: {
    label: 'Deleting...',
    loading: true,
    tone: 'negative',
  },
  parameters: {
    docs: {
      description: {
        story: 'Critical: spinner color must match negative tone, not default.',
      },
    },
  },
};

export const ActiveLoading: Story = {
  args: {
    label: 'Syncing',
    hierarchy: 'secondary',
    active: true,
    loading: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Toggle in active state while loading (e.g., network request pending).',
      },
    },
  },
};

export const DisabledNegative: Story = {
  args: {
    label: 'Delete',
    disabled: true,
    tone: 'negative',
  },
};

export const StateCombinationMatrix: Story = {
  render: () => (
    <Column gap={20}>
      <Column gap={8}>
        <SectionLabel>Loading + Tone</SectionLabel>
        <Row gap={12}>
          <Button label="Default" loading tone="default" />
          <Button label="Negative" loading tone="negative" />
        </Row>
      </Column>

      <Column gap={8}>
        <SectionLabel>Disabled + Tone</SectionLabel>
        <Row gap={12}>
          <Button label="Default" disabled tone="default" />
          <Button label="Negative" disabled tone="negative" />
        </Row>
      </Column>

      <Column gap={8}>
        <SectionLabel>Loading + Disabled</SectionLabel>
        <Row gap={12}>
          <Button label="Primary" hierarchy="primary" loading disabled />
          <Button label="Secondary" hierarchy="secondary" loading disabled />
        </Row>
      </Column>

      <Column gap={8}>
        <SectionLabel>Active + Loading (Secondary)</SectionLabel>
        <Row gap={12}>
          <Button
            label="Not Active"
            hierarchy="secondary"
            loading
            active={false}
          />
          <Button label="Active" hierarchy="secondary" loading active />
        </Row>
      </Column>

      <Column gap={8}>
        <SectionLabel>Icon-Only Loading</SectionLabel>
        <Row gap={12}>
          <Button
            shape="circle"
            loading
            leadingIcon={Icons.Heart}
            accessibilityLabel="Loading"
          />
          <Button
            shape="circle"
            loading
            tone="negative"
            leadingIcon={Icons.Trash}
            accessibilityLabel="Loading"
          />
        </Row>
      </Column>
    </Column>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Comprehensive state combination matrix. These are the #1 source of UI bugs.',
      },
    },
  },
};

// =============================================================================
// SECTION 7: ICON VARIANTS
// =============================================================================

export const LeadingIcon: Story = {
  args: {
    label: 'Favorites',
    leadingIcon: Icons.Heart,
  },
  parameters: {
    docs: {
      description: {
        story: 'Leading icon reinforces the meaning of the label.',
      },
    },
  },
};

export const TrailingIcon: Story = {
  args: {
    label: 'Select',
    trailingIcon: Icons.ChevronDown,
  },
  parameters: {
    docs: {
      description: {
        story: 'Trailing icon hints what happens next (dropdown, navigation).',
      },
    },
  },
};

export const BothIcons: Story = {
  args: {
    label: 'Continue',
    leadingIcon: Icons.Check,
    trailingIcon: Icons.ArrowRight,
  },
};

export const IconMatrix: Story = {
  render: () => (
    <Column gap={20}>
      <Column gap={8}>
        <SectionLabel>Icon Positions</SectionLabel>
        <Row gap={12}>
          <Button label="Leading" leadingIcon={Icons.Heart} />
          <Button label="Trailing" trailingIcon={Icons.ArrowRight} />
          <Button
            label="Both"
            leadingIcon={Icons.Heart}
            trailingIcon={Icons.ArrowRight}
          />
        </Row>
      </Column>

      <Column gap={8}>
        <SectionLabel>Icons × Hierarchy</SectionLabel>
        <Row gap={12}>
          <Button
            label="Primary"
            hierarchy="primary"
            leadingIcon={Icons.Heart}
          />
          <Button
            label="Secondary"
            hierarchy="secondary"
            leadingIcon={Icons.Heart}
          />
          <Button
            label="Tertiary"
            hierarchy="tertiary"
            leadingIcon={Icons.Heart}
          />
        </Row>
      </Column>

      <Column gap={8}>
        <SectionLabel>Icons × Size</SectionLabel>
        <Row gap={12}>
          <Button
            label="Small"
            size="small"
            leadingIcon={Icons.Heart}
            trailingIcon={Icons.ArrowRight}
          />
          <Button
            label="Medium"
            size="medium"
            leadingIcon={Icons.Heart}
            trailingIcon={Icons.ArrowRight}
          />
          <Button
            label="Large"
            size="large"
            leadingIcon={Icons.Heart}
            trailingIcon={Icons.ArrowRight}
          />
        </Row>
      </Column>

      <Column gap={8}>
        <SectionLabel>Icons × Negative Tone</SectionLabel>
        <Row gap={12}>
          <Button label="Delete" tone="negative" leadingIcon={Icons.Trash} />
          <Button
            label="Remove"
            tone="negative"
            hierarchy="secondary"
            leadingIcon={Icons.Trash}
          />
        </Row>
      </Column>
    </Column>
  ),
};

// =============================================================================
// SECTION 8: WIDTH MODE VARIANTS
// =============================================================================

export const IntrinsicWidth: Story = {
  args: {
    label: 'Hugs Content',
    widthMode: 'intrinsic',
  },
};

export const FixedWidth: Story = {
  args: {
    label: 'Fills Container',
    widthMode: 'fixed',
  },
  decorators: [withFullWidth],
};

export const FixedWidthShortLabel: Story = {
  args: {
    label: 'OK',
    widthMode: 'fixed',
  },
  decorators: [withFullWidth],
  parameters: {
    docs: {
      description: {
        story: 'Verifies centering with short labels in fixed width mode.',
      },
    },
  },
};

export const FixedWidthTruncated: Story = {
  args: {
    label: 'This is a very long button label that should truncate properly',
    widthMode: 'fixed',
    leadingIcon: Icons.Heart,
    trailingIcon: Icons.ArrowRight,
  },
  decorators: [withConstrainedWidth],
  parameters: {
    docs: {
      description: {
        story: `Tests truncation in constrained container (${TRUNCATION_TEST_WIDTH}px). Icons should not be crushed.`,
      },
    },
  },
};

export const WidthModeComparison: Story = {
  render: () => (
    <Column gap={20}>
      <Column gap={8}>
        <SectionLabel>Intrinsic (Hug Contents)</SectionLabel>
        <Button
          label="Request Ride"
          widthMode="intrinsic"
          leadingIcon={Icons.ArrowRight}
        />
      </Column>

      <Column gap={8}>
        <SectionLabel>Fixed (Fill Container)</SectionLabel>
        <View style={{ width: '100%' }}>
          <Button
            label="Request Ride"
            widthMode="fixed"
            leadingIcon={Icons.ArrowRight}
          />
        </View>
      </Column>

      <Column gap={8}>
        <SectionLabel>Fixed in Constrained Container</SectionLabel>
        <View style={{ width: TRUNCATION_TEST_WIDTH }}>
          <Button
            label="Very Long Label That Truncates"
            widthMode="fixed"
            leadingIcon={Icons.Heart}
            trailingIcon={Icons.ArrowRight}
          />
        </View>
      </Column>
    </Column>
  ),
  decorators: [withFullWidth],
};

// =============================================================================
// SECTION 9: INTERACTION VARIANTS
// =============================================================================

export const WithHaptics: Story = {
  args: {
    label: 'Tap for Haptics',
    hapticFeedback: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Test on physical device. Triggers light haptic on press, medium on long press.',
      },
    },
  },
};

export const LongPress: Story = {
  args: {
    label: 'Hold Me (500ms)',
    delayLongPress: 500,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Check Actions panel for "long-pressed" event after holding 500ms.',
      },
    },
  },
};

export const LongPressCustomDelay: Story = {
  args: {
    label: 'Hold Me (1000ms)',
    delayLongPress: 1000,
    hapticFeedback: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Longer delay (1 second) with haptic feedback on trigger.',
      },
    },
  },
};

// =============================================================================
// SECTION 10: ACCESSIBILITY
// =============================================================================

export const AccessibilityIconOnly: Story = {
  args: {
    shape: 'circle',
    leadingIcon: Icons.Heart,
    accessibilityLabel: 'Add to favorites',
    accessibilityHint: 'Double tap to add this ride to your favorites',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Icon-only buttons MUST have accessibilityLabel. Test with VoiceOver/TalkBack.',
      },
    },
  },
};

export const AccessibilityLoading: Story = {
  args: {
    label: 'Confirm Ride',
    loading: true,
    accessibilityLabel: 'Confirm ride',
    accessibilityHint: 'Processing your request, please wait',
  },
  parameters: {
    docs: {
      description: {
        story: 'Loading state should announce "busy" to screen readers.',
      },
    },
  },
};

export const AccessibilityDisabled: Story = {
  args: {
    label: 'Continue',
    disabled: true,
    accessibilityHint: 'Select a pickup location first',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Disabled buttons should explain WHY they are disabled via hint.',
      },
    },
  },
};

// =============================================================================
// SECTION 11: RTL SUPPORT
// =============================================================================

export const RTLLayout: Story = {
  args: {
    label: 'გაგრძელება', // "Continue" in Georgian
    leadingIcon: Icons.ArrowRight,
    trailingIcon: Icons.Heart,
  },
  decorators: [withRTL],
  parameters: {
    docs: {
      description: {
        story: 'Georgian text with RTL-aware icon positioning.',
      },
    },
  },
};

export const RTLComparison: Story = {
  render: () => (
    <Column gap={20}>
      <Column gap={8}>
        <SectionLabel>LTR (Default)</SectionLabel>
        <Button
          label="Continue"
          leadingIcon={Icons.ArrowRight}
          trailingIcon={Icons.Heart}
        />
      </Column>

      <View style={{ direction: 'rtl' }}>
        <Column gap={8}>
          <SectionLabel>RTL Layout</SectionLabel>
          <Button
            label="გაგრძელება"
            leadingIcon={Icons.ArrowRight}
            trailingIcon={Icons.Heart}
          />
        </Column>
      </View>
    </Column>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Side-by-side LTR vs RTL. Icons should flip positions appropriately.',
      },
    },
  },
};

// =============================================================================
// SECTION 12: THEME VARIANTS
// =============================================================================

export const OnDarkBackground: Story = {
  args: {
    label: 'Continue',
    hierarchy: 'secondary',
  },
  decorators: [withDarkBackground],
  parameters: {
    docs: {
      description: {
        story: 'Verifies contrast and visibility on dark backgrounds.',
      },
    },
  },
};

export const ThemeComparison: Story = {
  render: () => (
    <Column gap={0}>
      <View style={{ padding: 24, backgroundColor: '#FFFFFF' }}>
        <Column gap={8}>
          <SectionLabel>Light Background</SectionLabel>
          <Row gap={12}>
            <Button label="Primary" hierarchy="primary" />
            <Button label="Secondary" hierarchy="secondary" />
            <Button label="Tertiary" hierarchy="tertiary" />
          </Row>
        </Column>
      </View>

      <View style={{ padding: 24, backgroundColor: '#1A1A1A' }}>
        <Column gap={8}>
          <Text
            style={{
              fontSize: 11,
              fontWeight: '600',
              color: '#999',
              textTransform: 'uppercase',
              letterSpacing: 0.5,
              marginBottom: 8,
            }}
          >
            Dark Background
          </Text>
          <Row gap={12}>
            <Button label="Primary" hierarchy="primary" />
            <Button label="Secondary" hierarchy="secondary" />
            <Button label="Tertiary" hierarchy="tertiary" />
          </Row>
        </Column>
      </View>
    </Column>
  ),
  decorators: [], // Remove default padding
  parameters: {
    docs: {
      description: {
        story: 'Contrast test across light and dark surfaces.',
      },
    },
  },
};

// =============================================================================
// SECTION 13: COMPREHENSIVE GALLERY
// =============================================================================

export const KitchenSink: Story = {
  render: () => (
    <Column gap={32}>
      {/* Hierarchy */}
      <Column gap={8}>
        <SectionLabel>1. Hierarchy</SectionLabel>
        <Row gap={12}>
          <Button label="Primary" hierarchy="primary" />
          <Button label="Secondary" hierarchy="secondary" />
          <Button label="Tertiary" hierarchy="tertiary" />
        </Row>
      </Column>

      {/* Sizes */}
      <Column gap={8}>
        <SectionLabel>2. Sizes</SectionLabel>
        <Row gap={12}>
          <Button label="Small" size="small" />
          <Button label="Medium" size="medium" />
          <Button label="Large" size="large" />
        </Row>
      </Column>

      {/* Shapes */}
      <Column gap={8}>
        <SectionLabel>3. Shapes</SectionLabel>
        <Row gap={12}>
          <Button label="Rect" shape="rect" />
          <Button label="Pill" shape="pill" />
          <Button
            shape="circle"
            leadingIcon={Icons.Heart}
            accessibilityLabel="Fav"
          />
          <Button
            shape="square"
            leadingIcon={Icons.Close}
            accessibilityLabel="Close"
          />
        </Row>
      </Column>

      {/* Tones */}
      <Column gap={8}>
        <SectionLabel>4. Tones</SectionLabel>
        <Row gap={12}>
          <Button label="Default" tone="default" />
          <Button label="Negative" tone="negative" leadingIcon={Icons.Trash} />
        </Row>
      </Column>

      {/* States */}
      <Column gap={8}>
        <SectionLabel>5. States</SectionLabel>
        <Row gap={12}>
          <Button label="Normal" />
          <Button label="Disabled" disabled />
          <Button label="Loading" loading />
          <Button label="Active" hierarchy="secondary" active />
        </Row>
      </Column>

      {/* Icons */}
      <Column gap={8}>
        <SectionLabel>6. Icons</SectionLabel>
        <Row gap={12}>
          <Button label="Leading" leadingIcon={Icons.Heart} />
          <Button label="Trailing" trailingIcon={Icons.ArrowRight} />
          <Button
            label="Both"
            leadingIcon={Icons.Heart}
            trailingIcon={Icons.ArrowRight}
          />
        </Row>
      </Column>

      {/* Width Modes */}
      <Column gap={8}>
        <SectionLabel>7. Width Modes</SectionLabel>
        <Button label="Intrinsic" widthMode="intrinsic" />
        <Spacer size={8} />
        <Button label="Fixed (Full Width)" widthMode="fixed" />
      </Column>
    </Column>
  ),
  decorators: [withFullWidth],
  parameters: {
    docs: {
      description: {
        story: 'Complete gallery showing all Button variants in one view.',
      },
    },
  },
};

export const Small: Story = { args: { label: 'Small Button', size: 'small' } };
export const Medium: Story = {
  args: { label: 'Medium Button', size: 'medium' },
};
