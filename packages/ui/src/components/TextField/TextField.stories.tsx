/* eslint-disable react-native/no-inline-styles */
import React, { forwardRef, useEffect, useRef, useState } from 'react';

import { Text, View } from 'react-native';

import type { Meta, StoryObj } from '@storybook/react';
import {
  CreditCard,
  Globe,
  Mail,
  MapPin,
  Phone,
  Search,
  User,
} from 'lucide-react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { TextField } from './TextField';
import type { TextFieldProps, TextFieldRef } from './TextField.types';
import { MIN_TOUCH_TARGET, TEXTFIELD_DIMENSIONS } from './styles/constants';

const decoratorStyles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    padding: theme.primitives.spacing.lg,
    backgroundColor: theme.colors.background.primary,
    alignItems: 'stretch',
    gap: theme.spacing.stack.md,
  },
  fullWidth: {
    // THIS IS THE CRUCIAL PART
    flex: 1,
    padding: theme.primitives.spacing.lg,
    // ... other styles
  },
  constrained: {
    padding: theme.primitives.spacing.md,
    width: 340,
    borderWidth: theme.primitives.borderWidths.thin,
    borderColor: theme.colors.border.default,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.background.secondary,
    alignItems: 'stretch',
    gap: theme.spacing.stack.md,
  },
  darkBackground: {
    flex: 1,
    padding: theme.primitives.spacing.lg,
    backgroundColor: theme.colors.background.inverse,
    alignItems: 'stretch',
    gap: theme.spacing.stack.md,
  },
  sectionLabel: {
    ...theme.typography.utility.overline,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.stack.xs,
  },
  helperText: {
    ...theme.typography.caption.small,
    color: theme.colors.text.tertiary,
  },
  inlineAction: {
    ...theme.typography.utility.mono,
    fontSize: theme.primitives.typography.fontSizes.sm,
    color: theme.colors.interactive.primary,
  },
  tokenText: {
    ...theme.typography.utility.mono,
    fontSize: theme.primitives.typography.fontSizes.sm,
    color: theme.colors.text.primary,
  },
}));

const styles = decoratorStyles;

const UnistylesWrapper = ({
  children,
}: {
  children: React.ReactNode;
  variant?: 'default' | 'fullWidth' | 'constrained' | 'dark';
}) => {
  return <View style={{ padding: 12 }}>{children}</View>;
};

const withPadding = (Story: React.ComponentType) => (
  <UnistylesWrapper>
    <Story />
  </UnistylesWrapper>
);

const withFullWidth = (Story: React.ComponentType) => (
  <UnistylesWrapper variant="fullWidth">
    <Story />
  </UnistylesWrapper>
);

const withConstrainedWidth = (Story: React.ComponentType) => (
  <UnistylesWrapper variant="constrained">
    <Story />
  </UnistylesWrapper>
);

const withDarkBackground = (Story: React.ComponentType) => (
  <UnistylesWrapper variant="dark">
    <Story />
  </UnistylesWrapper>
);

const withRTL = (Story: React.ComponentType) => (
  <View style={{ direction: 'rtl' }}>
    <UnistylesWrapper>
      <Story />
    </UnistylesWrapper>
  </View>
);

const SectionLabel = ({ children }: { children: string }) => (
  <Text style={styles.sectionLabel}>{children}</Text>
);

const HelperText = ({ children }: { children: string }) => (
  <Text style={styles.helperText}>{children}</Text>
);

const Row = ({
  children,
  gap = 'lg',
  align = 'flex-start',
}: {
  children: React.ReactNode;
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  align?: 'flex-start' | 'center';
}) => {
  const { theme } = useUnistyles();
  return (
    <View
      style={{
        flexDirection: 'row',
        gap: theme.spacing.gap[gap],
        alignItems: align,
        flexWrap: 'wrap',
      }}
    >
      {children}
    </View>
  );
};

const Column = ({
  children,
  gap = 'md',
}: {
  children: React.ReactNode;
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}) => {
  const { theme } = useUnistyles();
  return (
    <View style={{ gap: theme.spacing.stack[gap], width: '100%' }}>
      {children}
    </View>
  );
};

const InlineAction = ({
  onPress,
  children,
}: {
  onPress: () => void;
  children: React.ReactNode;
}) => (
  <Text style={styles.inlineAction} onPress={onPress}>
    {children}
  </Text>
);

type ControlledProps = Omit<TextFieldProps, 'value' | 'onChangeText'> & {
  value?: string;
  onChangeText?: (text: string) => void;
  initialValue?: string;
};

const ControlledTextField = forwardRef<TextFieldRef, ControlledProps>(
  (
    { value: controlledValue, initialValue = '', onChangeText, ...rest },
    ref
  ) => {
    const [value, setValue] = useState(controlledValue ?? initialValue);

    useEffect(() => {
      if (controlledValue !== undefined && controlledValue !== value) {
        setValue(controlledValue);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [controlledValue]);

    const handleChange = (text: string) => {
      setValue(text);
      onChangeText?.(text);
    };

    return (
      <TextField
        ref={ref}
        {...rest}
        value={value}
        onChangeText={handleChange}
      />
    );
  }
);

ControlledTextField.displayName = 'ControlledTextField';

const CharacterCountContent = () => (
  <Column gap="lg">
    <SectionLabel>Character Count (with maxLength)</SectionLabel>
    <ControlledTextField
      label="Username"
      placeholder="Up to 20 characters"
      maxLength={20}
      showCharacterCount
      clearable
      autoCapitalize="none"
      testID="textfield-username-count"
    />
    <ControlledTextField
      label="Promo code near limit"
      placeholder="MAX16"
      maxLength={16}
      showCharacterCount
      initialValue="TAKE-OFF-15"
      hint="Turns red over the limit"
      testID="textfield-promo-count"
    />
    <ControlledTextField
      label="Over limit (pre-populated)"
      maxLength={12}
      showCharacterCount
      initialValue="This is longer than twelve"
      hint="Pre-set value shows over-limit styling"
      testID="textfield-over-limit"
    />
  </Column>
);

const ValidationMatrixContent = () => (
  <Column gap="lg">
    <SectionLabel>Validation Trailing Icons</SectionLabel>
    <ControlledTextField
      label="Complete"
      placeholder="Looks good"
      validationState="complete"
      initialValue="Valid value"
      hint="Trailing check uses success color"
      testID="textfield-validation-complete"
    />
    <ControlledTextField
      label="Incomplete"
      placeholder="Missing something"
      validationState="incomplete"
      initialValue="Bad value"
      hint="Trailing icon uses error color"
      testID="textfield-validation-incomplete"
    />
    <ControlledTextField
      label="Loading overrides validation"
      placeholder="Spinner replaces icons"
      validationState="complete"
      loading
      initialValue="Waiting..."
      testID="textfield-validation-loading"
    />
  </Column>
);

const EnhancerGalleryContent = () => {
  const [tapCount, setTapCount] = useState(0);
  const [prefilled, setPrefilled] = useState('');

  return (
    <Column gap="lg">
      <SectionLabel>Enhancer Types</SectionLabel>
      <ControlledTextField
        label="Search with leading artwork"
        placeholder="Search destinations"
        leadingEnhancer={{ type: 'artwork', icon: Search }}
        clearable
        testID="textfield-enhancer-leading-icon"
      />
      <ControlledTextField
        label="Trailing artwork"
        placeholder="Card number"
        trailingEnhancer={{ type: 'artwork', icon: CreditCard }}
        keyboardType="number-pad"
        testID="textfield-enhancer-trailing-icon"
      />
      <ControlledTextField
        label="Prefix label"
        placeholder="mysite.com"
        autoCapitalize="none"
        leadingEnhancer={{ type: 'label', text: 'https://' }}
        testID="textfield-enhancer-prefix-label"
      />
      <ControlledTextField
        label="Suffix label"
        placeholder="Weight"
        keyboardType="numeric"
        trailingEnhancer={{ type: 'label', text: 'kg' }}
        testID="textfield-enhancer-suffix-label"
      />
      <ControlledTextField
        label="Artwork + Label"
        placeholder="(+995) 555 12 34 56"
        keyboardType="phone-pad"
        leadingEnhancer={{ type: 'artworkLabel', icon: Phone, text: '+995' }}
        testID="textfield-enhancer-artwork-label"
      />
      <ControlledTextField
        label="Pressable enhancer"
        placeholder="Tap Fill to set a sample"
        value={prefilled}
        onChangeText={setPrefilled}
        trailingEnhancer={{
          type: 'label',
          text: 'Fill',
          onPress: () => {
            setTapCount((c) => c + 1);
            setPrefilled('Filled from enhancer');
          },
        }}
        hint={`Tapped ${tapCount}x`}
        clearable
        testID="textfield-enhancer-pressable"
      />
    </Column>
  );
};

const StateMatrixContent = () => (
  <Column gap="lg">
    <SectionLabel>Visual States</SectionLabel>
    <ControlledTextField
      label="Default"
      placeholder="Tap to focus"
      clearable
      testID="textfield-state-default"
    />
    <ControlledTextField
      label="Error"
      placeholder="Invalid value"
      error
      errorText="This format is not valid"
      clearable
      testID="textfield-state-error"
    />
    <ControlledTextField
      label="Success"
      placeholder="Looks good"
      success
      successText="Great choice"
      testID="textfield-state-success"
    />
    <ControlledTextField
      label="Read only"
      initialValue="Can copy text but cannot edit"
      readOnly
      hint="Read only uses neutral border color"
      testID="textfield-state-readonly"
    />
    <ControlledTextField
      label="Disabled"
      initialValue="Disabled input"
      disabled
      hint="Text and icons use disabled colors"
      testID="textfield-state-disabled"
    />
    <ControlledTextField
      label="Loading"
      initialValue="Fetching data..."
      loading
      hint="Spinner replaces trailing content"
      testID="textfield-state-loading"
    />
  </Column>
);

const PasswordContent = () => (
  <Column gap="lg">
    <SectionLabel>Password & Secure Entry</SectionLabel>
    <ControlledTextField
      label="Password"
      placeholder="Enter password"
      passwordToggle
      clearable
      autoCapitalize="none"
      testID="textfield-password"
    />
    <ControlledTextField
      label="PIN"
      placeholder="4-6 digits"
      keyboardType="number-pad"
      passwordToggle
      validationState="incomplete"
      hint="Use at least 6 digits"
      maxLength={6}
      showCharacterCount
      clearable
      testID="textfield-pin"
    />
    <ControlledTextField
      label="Confirm password"
      placeholder="Matches password"
      passwordToggle
      validationState="complete"
      success
      successText="Passwords match"
      initialValue="StrongPassword123"
      testID="textfield-confirm-password"
    />
  </Column>
);

const AccessibilityContent = () => (
  <Column gap="lg">
    <SectionLabel>Accessibility Scenarios</SectionLabel>
    <ControlledTextField
      placeholder="No visible label"
      accessibilityLabel="Search for a city"
      accessibilityHint="Double tap to type a city name"
      leadingEnhancer={{ type: 'artwork', icon: Globe }}
      clearable
      testID="textfield-a11y-no-label"
    />
    <ControlledTextField
      label="Phone number"
      placeholder="+995 555 12 34 56"
      accessibilityHint="We use this to contact your driver"
      keyboardType="phone-pad"
      trailingEnhancer={{ type: 'artwork', icon: Phone }}
      testID="textfield-a11y-hint"
    />
    <ControlledTextField
      label="Error with hint"
      placeholder="Enter code"
      error
      errorText="Code expired"
      accessibilityLabel="Verification code error"
      accessibilityHint="Code expired, request a new one"
      testID="textfield-a11y-error"
    />
  </Column>
);

const RTLComparisonContent = () => (
  <Column gap="lg">
    <SectionLabel>RTL vs LTR</SectionLabel>
    <Column gap="md">
      <ControlledTextField
        label="LTR address"
        placeholder="Main street 10"
        leadingEnhancer={{ type: 'artwork', icon: MapPin }}
        trailingEnhancer={{ type: 'label', text: 'APT' }}
        testID="textfield-rtl-ltr"
      />
      <View style={{ direction: 'rtl', width: '100%' }}>
        <ControlledTextField
          label="RTL მისამართი"
          placeholder="თბილისი"
          leadingEnhancer={{ type: 'artwork', icon: MapPin }}
          trailingEnhancer={{ type: 'label', text: 'ბინა' }}
          testID="textfield-rtl"
        />
      </View>
    </Column>
  </Column>
);

const ImperativeHandleContent = () => {
  const inputRef = useRef<TextFieldRef>(null);
  const [value, setValue] = useState('Tap a control to interact');

  return (
    <Column gap="md">
      <SectionLabel>Imperative Handle</SectionLabel>
      <ControlledTextField
        ref={inputRef}
        label="Programmatic focus / blur / clear"
        value={value}
        onChangeText={setValue}
        placeholder="Controlled via buttons below"
        clearable
        testID="textfield-imperative"
      />
      <Row gap="md" align="center">
        <InlineAction onPress={() => inputRef.current?.focus()}>
          [Focus]
        </InlineAction>
        <InlineAction onPress={() => inputRef.current?.blur()}>
          [Blur]
        </InlineAction>
        <InlineAction
          onPress={() => {
            inputRef.current?.clear();
            setValue('');
          }}
        >
          [Clear]
        </InlineAction>
      </Row>
      <HelperText>
        Useful for form navigation or focusing after validation errors.
      </HelperText>
    </Column>
  );
};

const TouchTargetContent = () => (
  <Column gap="lg">
    <SectionLabel>Touch Target & Dimensions</SectionLabel>
    <Row gap="lg" align="center">
      <Text style={styles.tokenText}>
        min touch target: {MIN_TOUCH_TARGET}px
      </Text>
      <Text style={styles.tokenText}>
        small height: {TEXTFIELD_DIMENSIONS.small.height}px
      </Text>
      <Text style={styles.tokenText}>
        medium height: {TEXTFIELD_DIMENSIONS.medium.height}px
      </Text>
      <Text style={styles.tokenText}>
        large height: {TEXTFIELD_DIMENSIONS.large.height}px
      </Text>
    </Row>
    <ControlledTextField
      label="Small"
      size="small"
      placeholder="Minimum target check"
      leadingEnhancer={{ type: 'artwork', icon: Mail }}
      testID="textfield-touch-small"
    />
    <ControlledTextField
      label="Medium"
      size="medium"
      placeholder="Default control height"
      trailingEnhancer={{ type: 'label', text: '@mail.com' }}
      autoCapitalize="none"
      testID="textfield-touch-medium"
    />
    <ControlledTextField
      label="Large"
      size="large"
      placeholder="Most padding"
      leadingEnhancer={{ type: 'artwork', icon: User }}
      hint="Use for high-emphasis inputs"
      testID="textfield-touch-large"
    />
  </Column>
);

const FormExampleContent = () => (
  <Column gap="lg">
    <SectionLabel>Ride Booking Form</SectionLabel>
    <ControlledTextField
      label="Pickup"
      placeholder="Where should we pick you up?"
      leadingEnhancer={{ type: 'artwork', icon: MapPin }}
      clearable
      testID="textfield-form-pickup"
    />
    <ControlledTextField
      label="Drop-off"
      placeholder="Where are you going?"
      leadingEnhancer={{ type: 'artwork', icon: MapPin }}
      clearable
      testID="textfield-form-dropoff"
    />
    <ControlledTextField
      label="Contact phone"
      placeholder="+995 555 12 34 56"
      keyboardType="phone-pad"
      leadingEnhancer={{ type: 'artwork', icon: Phone }}
      trailingEnhancer={{ type: 'label', text: 'SMS' }}
      testID="textfield-form-phone"
    />
    <ControlledTextField
      label="Notes to driver"
      placeholder="Building entrance, gate code..."
      multiline
      numberOfLines={3}
      textAlignVertical="top"
      clearable
      testID="textfield-form-notes"
    />
  </Column>
);

const KitchenSinkContent = () => (
  <Column gap="xl">
    <Column gap="sm">
      <SectionLabel>1. Sizes</SectionLabel>
      <Column gap="md">
        <ControlledTextField label="Small" size="small" placeholder="sm" />
        <ControlledTextField label="Medium" size="medium" placeholder="md" />
        <ControlledTextField label="Large" size="large" placeholder="lg" />
      </Column>
    </Column>

    <Column gap="sm">
      <SectionLabel>2. States</SectionLabel>
      <Column gap="md">
        <ControlledTextField label="Default" placeholder="Type here" />
        <ControlledTextField
          label="Error"
          placeholder="Bad input"
          error
          errorText="Required"
        />
        <ControlledTextField
          label="Success"
          placeholder="Good input"
          success
          successText="Looks good"
        />
        <ControlledTextField
          label="Disabled"
          initialValue="Disabled"
          disabled
        />
      </Column>
    </Column>

    <Column gap="sm">
      <SectionLabel>3. Enhancers</SectionLabel>
      <Column gap="md">
        <ControlledTextField
          label="Leading icon"
          leadingEnhancer={{ type: 'artwork', icon: Search }}
          placeholder="Search"
        />
        <ControlledTextField
          label="Trailing label"
          trailingEnhancer={{ type: 'label', text: 'KG' }}
          keyboardType="numeric"
          placeholder="Weight"
        />
        <ControlledTextField
          label="Artwork + Label"
          leadingEnhancer={{ type: 'artworkLabel', icon: Phone, text: '+995' }}
          placeholder="Phone"
        />
      </Column>
    </Column>

    <Column gap="sm">
      <SectionLabel>4. Validation</SectionLabel>
      <Column gap="md">
        <ControlledTextField
          label="Complete"
          validationState="complete"
          initialValue="Valid value"
        />
        <ControlledTextField
          label="Incomplete"
          validationState="incomplete"
          initialValue="Needs work"
        />
      </Column>
    </Column>

    <Column gap="sm">
      <SectionLabel>5. Character count</SectionLabel>
      <Column gap="md">
        <ControlledTextField
          label="Limit 12"
          maxLength={12}
          showCharacterCount
          initialValue="12345678901"
        />
        <ControlledTextField
          label="Over limit"
          maxLength={10}
          showCharacterCount
          initialValue="This is too long"
        />
      </Column>
    </Column>

    <Column gap="sm">
      <SectionLabel>6. Secure</SectionLabel>
      <Column gap="md">
        <ControlledTextField
          label="Password"
          passwordToggle
          clearable
          autoCapitalize="none"
        />
        <ControlledTextField
          label="PIN"
          passwordToggle
          validationState="complete"
          initialValue="123456"
        />
      </Column>
    </Column>
  </Column>
);

const meta: Meta<typeof TextField> = {
  title: 'Components/TextField',
  component: TextField,
  args: {
    label: 'Label',
    placeholder: 'Enter text',
    hint: 'Helper or hint text',
    size: 'medium',
    value: '',
    disabled: false,
    readOnly: false,
    loading: false,
    error: false,
    success: false,
    validationState: 'none',
    clearable: false,
    passwordToggle: false,
    showCharacterCount: false,
    hapticFeedback: false,
  },
  argTypes: {
    onChangeText: { action: 'text-changed' },
    onFocus: { action: 'focused' },
    onBlur: { action: 'blurred' },
    onClear: { action: 'cleared' },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Control height, padding, and text sizing',
      table: {
        defaultValue: { summary: 'medium' },
        type: { summary: "'small' | 'medium' | 'large'" },
      },
    },
    validationState: {
      control: 'select',
      options: ['none', 'complete', 'incomplete'],
      description: 'Trailing validation icon (overrides trailingEnhancer)',
      table: {
        defaultValue: { summary: 'none' },
        type: { summary: "'none' | 'complete' | 'incomplete'" },
      },
    },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    loading: { control: 'boolean' },
    error: { control: 'boolean' },
    success: { control: 'boolean' },
    clearable: { control: 'boolean' },
    passwordToggle: { control: 'boolean' },
    showCharacterCount: { control: 'boolean' },
    hapticFeedback: { control: 'boolean' },
    maxLength: { control: { type: 'number', min: 1, max: 200 } },
    hint: { control: 'text' },
    errorText: { control: 'text' },
    successText: { control: 'text' },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    accessibilityLabel: { control: 'text' },
    accessibilityHint: { control: 'text' },
    testID: { control: 'text' },
  },
  decorators: [withPadding],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
          TextField component for controlled, high-density forms.

          ## Usage
          - Always pass \`value\` and \`onChangeText\` (controlled only).
          - Use \`hint\` for helper text. \`error\`/ \`errorText\` and \`success\`/ \`successText\` override hint.
          - \`validationState\` renders trailing status icons (complete / incomplete).
          - \`passwordToggle\` enables secure entry + eye icon; \`clearable\` adds trailing clear affordance.
          - Pair \`maxLength\` with \`showCharacterCount\` for inline counters.
          - Inputs without visible labels MUST provide \`accessibilityLabel\` and \`testID\` for automation.
        `,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof TextField>;

export const Playground: Story = {
  name: 'Playground (controlled)',
  render: () => (
    <TextField
      label="Program name"
      value={'bio'}
      onChangeText={() => {}}
      placeholder="Travel program"
      maxLength={30}
      showCharacterCount
      hint="Hint"
    />
  ),
};

export const WithoutLabel: Story = {
  args: {
    placeholder: 'Placeholder only',
    accessibilityLabel: 'Search locations',
    clearable: true,
    leadingEnhancer: { type: 'artwork', icon: Search },
    testID: 'textfield-without-label',
  },
  render: (args) => <ControlledTextField {...args} />,
};

export const PrefilledValue: Story = {
  render: (args) => (
    <ControlledTextField
      {...args}
      label="Prefilled"
      hint="Starts with a value but stays editable"
      initialValue="Prefilled text"
      clearable
      testID="textfield-prefilled"
    />
  ),
};

export const SizeSmall: Story = {
  args: {
    label: 'Small text field',
    size: 'small',
    placeholder: 'Height uses controlHeights.sm',
    leadingEnhancer: { type: 'artwork', icon: Mail },
    testID: 'textfield-size-small',
  },
  render: (args) => <ControlledTextField {...args} />,
};

export const SizeMedium: Story = {
  args: {
    label: 'Medium text field',
    size: 'medium',
    placeholder: 'Default size',
    trailingEnhancer: { type: 'label', text: '.com' },
    autoCapitalize: 'none',
    testID: 'textfield-size-medium',
  },
  render: (args) => <ControlledTextField {...args} />,
};

export const SizeLarge: Story = {
  args: {
    label: 'Large text field',
    size: 'large',
    placeholder: 'Generous padding',
    leadingEnhancer: { type: 'artwork', icon: User },
    testID: 'textfield-size-large',
  },
  render: (args) => <ControlledTextField {...args} />,
};

export const SizeComparison: Story = {
  render: () => (
    <Column gap="lg">
      <SectionLabel>Size Comparison</SectionLabel>
      <ControlledTextField
        label="Small"
        size="small"
        placeholder="36px height"
        leadingEnhancer={{ type: 'artwork', icon: Search }}
      />
      <ControlledTextField
        label="Medium"
        size="medium"
        placeholder="Default height"
        leadingEnhancer={{ type: 'artwork', icon: Search }}
      />
      <ControlledTextField
        label="Large"
        size="large"
        placeholder="56px height"
        leadingEnhancer={{ type: 'artwork', icon: Search }}
      />
    </Column>
  ),
};

export const ErrorState: Story = {
  args: {
    label: 'Email',
    placeholder: 'name@domain.com',
    error: true,
    errorText: 'Please enter a valid email',
    clearable: true,
    keyboardType: 'email-address',
    autoCapitalize: 'none',
    testID: 'textfield-error',
  },
  render: (args) => <ControlledTextField {...args} />,
};

export const SuccessState: Story = {
  args: {
    label: 'Promo code',
    placeholder: 'SUMMER-2024',
    success: true,
    successText: 'Applied',
    validationState: 'complete',
    clearable: true,
    autoCapitalize: 'characters',
    testID: 'textfield-success',
  },
  render: (args) => <ControlledTextField {...args} />,
};

export const ReadOnlyState: Story = {
  args: {
    label: 'Read only',
    readOnly: true,
    value: 'System-provided value',
    hint: 'Read only keeps neutral border + disabled text color',
    testID: 'textfield-readonly',
  },
  render: (args) => <ControlledTextField {...args} />,
};

export const DisabledState: Story = {
  args: {
    label: 'Disabled',
    value: 'Disabled value',
    disabled: true,
    hint: 'Cannot focus or edit',
    testID: 'textfield-disabled',
  },
  render: (args) => <ControlledTextField {...args} />,
};

export const LoadingState: Story = {
  args: {
    label: 'Loading',
    value: 'Fetching suggestion...',
    loading: true,
    hint: 'Spinner replaces trailing actions',
    testID: 'textfield-loading',
  },
  render: (args) => <ControlledTextField {...args} />,
};

export const StateMatrix: Story = {
  render: () => <StateMatrixContent />,
};

export const Clearable: Story = {
  args: {
    label: 'Clearable input',
    placeholder: 'Type then tap clear icon',
    clearable: true,
    testID: 'textfield-clearable',
  },
  render: (args) => <ControlledTextField {...args} />,
};

export const PasswordToggle: Story = {
  args: {
    label: 'Password',
    placeholder: 'Secure entry with eye toggle',
    passwordToggle: true,
    clearable: true,
    autoCapitalize: 'none',
    testID: 'textfield-password-toggle',
  },
  render: (args) => <ControlledTextField {...args} />,
};

export const PasswordVariants: Story = {
  render: () => <PasswordContent />,
};

export const ValidationComplete: Story = {
  args: {
    label: 'Phone',
    placeholder: 'Phone number',
    validationState: 'complete',
    success: true,
    successText: 'Validated',
    leadingEnhancer: { type: 'artworkLabel', icon: Phone, text: '+995' },
    keyboardType: 'phone-pad',
    testID: 'textfield-validation-complete-single',
  },
  render: (args) => <ControlledTextField {...args} />,
};

export const ValidationIncomplete: Story = {
  args: {
    label: 'Card number',
    placeholder: '1234 5678 9012 3456',
    validationState: 'incomplete',
    errorText: 'Card failed Luhn check',
    trailingEnhancer: { type: 'artwork', icon: CreditCard },
    keyboardType: 'number-pad',
    testID: 'textfield-validation-incomplete-single',
  },
  render: (args) => <ControlledTextField {...args} />,
};

export const ValidationMatrix: Story = {
  render: () => <ValidationMatrixContent />,
};

export const CharacterCount: Story = {
  args: {
    label: 'Username',
    placeholder: 'Up to 16 characters',
    maxLength: 16,
    showCharacterCount: true,
    clearable: true,
    autoCapitalize: 'none',
    testID: 'textfield-character-count',
  },
  render: (args) => <ControlledTextField {...args} />,
};

export const CharacterCountMatrix: Story = {
  render: () => <CharacterCountContent />,
  decorators: [withConstrainedWidth],
};

export const EnhancerGallery: Story = {
  render: () => <EnhancerGalleryContent />,
};

export const TrailingValidationOverridesEnhancer: Story = {
  render: () => (
    <Column gap="md">
      <SectionLabel>Validation Overrides Trailing Enhancer</SectionLabel>
      <HelperText>
        validationState takes precedence over trailingEnhancer content.
      </HelperText>
      <ControlledTextField
        label="Trailing enhancer ignored"
        placeholder="Trailing label hidden when validationState set"
        trailingEnhancer={{ type: 'label', text: 'kg' }}
        validationState="complete"
        initialValue="42"
        testID="textfield-validation-override"
      />
    </Column>
  ),
};

export const HapticFeedback: Story = {
  args: {
    label: 'Haptics on focus/clear/toggle',
    placeholder: 'Tap to feel feedback on device',
    hapticFeedback: true,
    clearable: true,
    passwordToggle: true,
    testID: 'textfield-haptics',
  },
  render: (args) => <ControlledTextField {...args} />,
};

export const Accessibility: Story = {
  render: () => <AccessibilityContent />,
};

export const RTLLayout: Story = {
  render: () => <RTLComparisonContent />,
  decorators: [withRTL],
};

export const OnDarkBackground: Story = {
  args: {
    label: 'Text field on dark surface',
    placeholder: 'Ensure contrast',
    leadingEnhancer: { type: 'artwork', icon: Search },
    clearable: true,
    testID: 'textfield-dark-bg',
  },
  decorators: [withDarkBackground],
  render: (args) => <ControlledTextField {...args} />,
};

export const ImperativeRef: Story = {
  render: () => <ImperativeHandleContent />,
};

export const TouchTargetDebug: Story = {
  render: () => <TouchTargetContent />,
};

export const FormExample: Story = {
  render: () => <FormExampleContent />,
  decorators: [withFullWidth],
};

export const KitchenSink: Story = {
  render: () => <KitchenSinkContent />,
  decorators: [withFullWidth],
};
