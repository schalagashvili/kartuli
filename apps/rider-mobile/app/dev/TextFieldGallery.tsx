// apps/rider-mobile/app/dev/TextFieldGallery.tsx
import React, { useEffect, useRef, useState } from 'react';

import { Text, View } from 'react-native';

import { ScreenPerfMonitor } from '@/app/dev/components/ScreenPerfMonitor';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { StyleSheet } from 'react-native-unistyles';

import {
  AtSign,
  Button,
  Calendar,
  Camera,
  CreditCard,
  DollarSign,
  Eye,
  EyeOff,
  Globe,
  Hash,
  Lock,
  Mail,
  MapPin,
  Phone,
  Search,
  TextField,
  type TextFieldSize,
  User,
} from '@kartuli/ui';

export default function TextFieldGallery() {
  return (
    <ScreenPerfMonitor screenName="TextFieldGallery" enabled={__DEV__}>
      <KeyboardAwareScrollView
        bottomOffset={20}
        keyboardShouldPersistTaps="handled"
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        <Text style={styles.title}>TextField Gallery</Text>
        <Text style={styles.subtitle}>Uber Base Design System</Text>

        <PerformanceSection />
        <BasicSection />
        <SizesSection />
        <StatesSection />
        <ValidationSection />
        <CharacterCountSection />
        <EnhancersSection />
        <ClearableSection />
        <SecureEntrySection />
        <InputTypesSection />
        <RealWorldExamplesSection />
      </KeyboardAwareScrollView>
    </ScreenPerfMonitor>
  );
}

// =============================================================================
// SECTION COMPONENTS
// =============================================================================

function SectionHeader({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {description && (
        <Text style={styles.sectionDescription}>{description}</Text>
      )}
    </View>
  );
}

function ExampleRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.exampleRow}>
      <Text style={styles.exampleLabel}>{label}</Text>
      {children}
    </View>
  );
}

// =============================================================================
// BASIC SECTION
// =============================================================================

function BasicSection() {
  const [value, setValue] = useState('');
  const [valueWithHint, setValueWithHint] = useState('');

  return (
    <View style={styles.section}>
      <SectionHeader
        title="Basic Usage"
        description="Essential text field configurations"
      />

      <ExampleRow label="Minimal">
        <TextField
          value={value}
          onChangeText={setValue}
          placeholder="Enter text"
        />
      </ExampleRow>

      <ExampleRow label="With Label">
        <TextField
          label="Full name"
          value={value}
          onChangeText={setValue}
          placeholder="Enter your full name"
        />
      </ExampleRow>

      <ExampleRow label="With Hint">
        <TextField
          label="Email address"
          value={valueWithHint}
          onChangeText={setValueWithHint}
          placeholder="name@example.com"
          hint="We'll never share your email with anyone"
        />
      </ExampleRow>

      <ExampleRow label="With Value">
        <TextField
          label="Username"
          value="sandro_kartuli"
          onChangeText={() => {}}
          placeholder="Enter username"
        />
      </ExampleRow>
    </View>
  );
}

// =============================================================================
// SIZES SECTION
// =============================================================================

function SizesSection() {
  const [small, setSmall] = useState('');
  const [medium, setMedium] = useState('');
  const [large, setLarge] = useState('');

  const sizes: TextFieldSize[] = ['small', 'medium', 'large'];

  return (
    <View style={styles.section}>
      <SectionHeader
        title="Sizes"
        description="Small (36px), Medium (48px), Large (56px)"
      />

      <ExampleRow label="Small">
        <TextField
          size="small"
          label="Small"
          value={small}
          onChangeText={setSmall}
          placeholder="Small input"
        />
      </ExampleRow>

      <ExampleRow label="Medium (Default)">
        <TextField
          size="medium"
          label="Medium"
          value={medium}
          onChangeText={setMedium}
          placeholder="Medium input"
        />
      </ExampleRow>

      <ExampleRow label="Large">
        <TextField
          size="large"
          label="Large"
          value={large}
          onChangeText={setLarge}
          placeholder="Large input"
        />
      </ExampleRow>

      {/* Side by side comparison */}
      <ExampleRow label="Comparison">
        <View style={styles.row}>
          {sizes.map((size) => (
            <View key={size} style={styles.flex1}>
              <TextField
                size={size}
                value=""
                onChangeText={() => {}}
                placeholder={size}
              />
            </View>
          ))}
        </View>
      </ExampleRow>
    </View>
  );
}

// =============================================================================
// STATES SECTION
// =============================================================================

function StatesSection() {
  const [focused, setFocused] = useState('');
  const [error, setError] = useState('Invalid input');
  const [success, setSuccess] = useState('Valid input');

  return (
    <View style={styles.section}>
      <SectionHeader
        title="Visual States"
        description="13 states per Uber spec (showing key ones)"
      />

      <ExampleRow label="Enabled">
        <TextField
          label="Enabled"
          value=""
          onChangeText={() => {}}
          placeholder="Default state"
          hint="This is the default enabled state"
        />
      </ExampleRow>

      <ExampleRow label="Focused">
        <TextField
          label="Focused"
          value={focused}
          onChangeText={setFocused}
          placeholder="Tap to focus"
          hint="Blue border when focused"
        />
      </ExampleRow>

      <ExampleRow label="Error">
        <TextField
          label="Error"
          value={error}
          onChangeText={setError}
          placeholder="Enter value"
          error
          errorText="This field contains an error"
        />
      </ExampleRow>

      <ExampleRow label="Success">
        <TextField
          label="Success"
          value={success}
          onChangeText={setSuccess}
          placeholder="Enter value"
          success
          successText="Looks good!"
        />
      </ExampleRow>

      <ExampleRow label="Disabled">
        <TextField
          label="Disabled"
          value="Cannot edit this"
          onChangeText={() => {}}
          placeholder="Disabled input"
          disabled
          hint="This field is disabled"
        />
      </ExampleRow>

      <ExampleRow label="Read Only">
        <TextField
          label="Read Only"
          value="Read only value"
          onChangeText={() => {}}
          placeholder="Read only"
          readOnly
          hint="Value is passed on submit"
        />
      </ExampleRow>

      <ExampleRow label="Loading">
        <TextField
          label="Loading"
          value="Validating..."
          onChangeText={() => {}}
          placeholder="Loading"
          loading
          hint="Checking availability..."
        />
      </ExampleRow>
    </View>
  );
}

// =============================================================================
// VALIDATION SECTION (Complete/Incomplete)
// =============================================================================

function ValidationSection() {
  const [complete, setComplete] = useState('Saanvi Chavan');
  const [incomplete, setIncomplete] = useState('');
  const [mixed, setMixed] = useState('incomplete@');

  return (
    <View style={styles.section}>
      <SectionHeader
        title="Field Validation"
        description="Complete/Incomplete icons (different from Error/Success)"
      />
      <TextField
        label="Search"
        value={complete}
        onChangeText={setComplete}
        leadingEnhancer={{ type: 'artwork', icon: Search }}
      />
      <ExampleRow label="Complete">
        <TextField
          label="Full name"
          value={complete}
          onChangeText={setComplete}
          placeholder="First and last"
          validationState="complete"
          hint="Needs to match the name on your license"
        />
      </ExampleRow>

      <ExampleRow label="Incomplete">
        <TextField
          label="Full name"
          value={incomplete}
          onChangeText={setIncomplete}
          placeholder="First and last"
          leadingEnhancer={{ type: 'artwork', icon: DollarSign }}
          validationState="incomplete"
          hint="Needs to match the name on your license"
        />
      </ExampleRow>

      <ExampleRow label="Error + Incomplete">
        <TextField
          label="Email"
          value={mixed}
          onChangeText={setMixed}
          placeholder="name@email.com"
          error
          errorText="Please enter a valid email"
          validationState="incomplete"
        />
      </ExampleRow>
    </View>
  );
}

// =============================================================================
// CHARACTER COUNT SECTION
// =============================================================================

function CharacterCountSection() {
  const [bio, setBio] = useState('');
  const [name, setName] = useState('Carolina Macgillavrylaan 182');
  const [message, setMessage] = useState(
    'Hi! Thanks for supporting our business! We are delighted to hear about your positive experience.'
  );

  return (
    <View style={styles.section}>
      <SectionHeader
        title="Character Count"
        description="Shows current/max characters next to label"
      />

      <ExampleRow label="Basic">
        <TextField
          label="Program name"
          value={bio}
          onChangeText={setBio}
          placeholder="Travel program"
          maxLength={30}
          showCharacterCount
          hint="This program name will be visible to other admins"
        />
      </ExampleRow>

      <ExampleRow label="Near Limit">
        <TextField
          label="Street address"
          value={name}
          onChangeText={setName}
          placeholder="Enter address"
          maxLength={24}
          showCharacterCount
        />
      </ExampleRow>

      <ExampleRow label="Message (100 chars)">
        <TextField
          label="Message (required)"
          value={message}
          onChangeText={setMessage}
          placeholder="Enter your message"
          maxLength={100}
          showCharacterCount
          multiline
          numberOfLines={3}
        />
      </ExampleRow>
    </View>
  );
}

// =============================================================================
// ENHANCERS SECTION
// =============================================================================

function EnhancersSection() {
  const [currency, setCurrency] = useState('1,400.00');
  const [search, setSearch] = useState('');
  const [card, setCard] = useState('');

  return (
    <View style={styles.section}>
      <SectionHeader
        title="Enhancers"
        description="Leading/Trailing: Artwork, Label, or Both"
      />

      {/* Leading Enhancers */}
      <Text style={styles.subsectionTitle}>Leading Enhancer</Text>

      <ExampleRow label="Icon (Artwork)">
        <TextField
          label="Email"
          value=""
          onChangeText={() => {}}
          placeholder="name@email.com"
          leadingEnhancer={{ type: 'artwork', icon: Mail }}
        />
      </ExampleRow>

      <ExampleRow label="Label">
        <TextField
          label="Budget"
          value={currency}
          onChangeText={setCurrency}
          placeholder="0.00"
          leadingEnhancer={{ type: 'label', text: '$' }}
        />
      </ExampleRow>

      <ExampleRow label="Icon + Label">
        <TextField
          label="Amount"
          value=""
          onChangeText={() => {}}
          placeholder="0.00"
          leadingEnhancer={{
            type: 'artworkLabel',
            icon: DollarSign,
            text: 'USD',
          }}
        />
      </ExampleRow>

      {/* Trailing Enhancers */}
      <Text style={styles.subsectionTitle}>Trailing Enhancer</Text>

      <ExampleRow label="Icon (Artwork)">
        <TextField
          label="Search"
          value={search}
          onChangeText={setSearch}
          placeholder="Search restaurants"
          trailingEnhancer={{ type: 'artwork', icon: Search }}
        />
      </ExampleRow>

      <ExampleRow label="Label">
        <TextField
          label="Tip amount"
          value=""
          onChangeText={() => {}}
          placeholder="0"
          trailingEnhancer={{ type: 'label', text: 'GEL' }}
        />
      </ExampleRow>

      <ExampleRow label="Actionable">
        <TextField
          label="Flight number"
          value=""
          onChangeText={() => {}}
          placeholder="UA 1212"
          trailingEnhancer={{
            type: 'label',
            text: 'Paste',
            onPress: () => {},
          }}
        />
      </ExampleRow>

      {/* Both Enhancers */}
      <Text style={styles.subsectionTitle}>Leading + Trailing</Text>

      <ExampleRow label="Currency Field">
        <TextField
          label="Amount"
          value=""
          onChangeText={() => {}}
          placeholder="0.00"
          leadingEnhancer={{
            type: 'artworkLabel',
            icon: DollarSign,
            text: '$',
          }}
          trailingEnhancer={{ type: 'label', text: 'USD' }}
        />
      </ExampleRow>

      <ExampleRow label="Card Number">
        <TextField
          label="Debit card number"
          value={card}
          onChangeText={setCard}
          placeholder="1234 5678 1234 5678"
          leadingEnhancer={{ type: 'artwork', icon: CreditCard }}
          trailingEnhancer={{
            type: 'artwork',
            icon: Camera,
            onPress: () => {},
          }}
          keyboardType="number-pad"
        />
      </ExampleRow>
    </View>
  );
}

// =============================================================================
// CLEARABLE SECTION
// =============================================================================

function ClearableSection() {
  const [search, setSearch] = useState('San Francisco');
  const [email, setEmail] = useState('test@example.com');

  return (
    <View style={styles.section}>
      <SectionHeader
        title="Clearable"
        description="Shows X button when focused and has value"
      />

      <ExampleRow label="Basic Clearable">
        <TextField
          label="Search"
          value={search}
          size="large"
          onChangeText={setSearch}
          placeholder="Search location"
          clearable
          leadingEnhancer={{ type: 'artwork', icon: Search }}
        />
      </ExampleRow>
      <ExampleRow label="Basic Clearable">
        <TextField
          label="Search"
          value={search}
          size="small"
          onChangeText={setSearch}
          placeholder="Search location"
          clearable
          leadingEnhancer={{ type: 'artwork', icon: Search }}
        />
      </ExampleRow>

      <ExampleRow label="With Error">
        <TextField
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="name@email.com"
          clearable
          error
          errorText="Invalid email format"
        />
      </ExampleRow>

      <ExampleRow label="Custom onClear">
        <TextField
          label="Location"
          value={search}
          onChangeText={setSearch}
          placeholder="Enter location"
          clearable
          onClear={() => {}}
        />
      </ExampleRow>
    </View>
  );
}

// =============================================================================
// SECURE ENTRY SECTION
// =============================================================================

function SecureEntrySection() {
  const [password, setPassword] = useState('mypassword123');
  const [showPassword, setShowPassword] = useState(false);
  const [pin, setPin] = useState('');

  return (
    <View style={styles.section}>
      <SectionHeader
        title="Secure Entry"
        description="Password and PIN fields with visibility toggle"
      />

      <ExampleRow label="Password">
        <TextField
          label="Password"
          value={password}
          onChangeText={setPassword}
          placeholder="Enter password"
          secureTextEntry={!showPassword}
          leadingEnhancer={{ type: 'artwork', icon: Lock }}
          trailingEnhancer={{
            type: 'artwork',
            icon: showPassword ? EyeOff : Eye,
            onPress: () => setShowPassword(!showPassword),
          }}
        />
      </ExampleRow>

      <ExampleRow label="Create Password (with validation)">
        <TextField
          label="Create your password"
          value={password}
          onChangeText={setPassword}
          placeholder="At least 8 characters"
          secureTextEntry={!showPassword}
          success={password.length >= 8}
          successText={password.length >= 8 ? 'Strong password!' : undefined}
          error={password.length > 0 && password.length < 8}
          errorText={
            password.length > 0 && password.length < 8 ? 'Too short' : undefined
          }
          trailingEnhancer={{
            type: 'artwork',
            icon: showPassword ? EyeOff : Eye,
            onPress: () => setShowPassword(!showPassword),
          }}
          clearable
        />
      </ExampleRow>

      <ExampleRow label="PIN">
        <TextField
          label="PIN"
          value={pin}
          onChangeText={setPin}
          placeholder="••••"
          secureTextEntry
          maxLength={4}
          keyboardType="number-pad"
        />
      </ExampleRow>
    </View>
  );
}

// =============================================================================
// INPUT TYPES SECTION
// =============================================================================

function InputTypesSection() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [number, setNumber] = useState('');
  const [url, setUrl] = useState('');
  const [multiline, setMultiline] = useState('');

  return (
    <View style={styles.section}>
      <SectionHeader
        title="Input Types"
        description="Different keyboard types and input modes"
      />

      <ExampleRow label="Email">
        <TextField
          label="Email address"
          value={email}
          onChangeText={setEmail}
          placeholder="name@email.com"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          leadingEnhancer={{ type: 'artwork', icon: AtSign }}
        />
      </ExampleRow>

      <ExampleRow label="Phone">
        <TextField
          label="Phone number"
          value={phone}
          onChangeText={setPhone}
          placeholder="(999) 999-9999"
          keyboardType="phone-pad"
          leadingEnhancer={{ type: 'artwork', icon: Phone }}
        />
      </ExampleRow>

      <ExampleRow label="Number">
        <TextField
          label="Quantity"
          value={number}
          onChangeText={setNumber}
          placeholder="0"
          keyboardType="number-pad"
          leadingEnhancer={{ type: 'artwork', icon: Hash }}
        />
      </ExampleRow>

      <ExampleRow label="URL">
        <TextField
          label="Website"
          value={url}
          onChangeText={setUrl}
          placeholder="https://example.com"
          keyboardType="url"
          autoCapitalize="none"
          autoCorrect={false}
          leadingEnhancer={{ type: 'artwork', icon: Globe }}
        />
      </ExampleRow>

      <ExampleRow label="Multiline">
        <TextField
          label="Description"
          value={multiline}
          onChangeText={setMultiline}
          placeholder="Tell us more about yourself..."
          multiline
          numberOfLines={4}
          maxLength={200}
          showCharacterCount
        />
      </ExampleRow>
    </View>
  );
}

// =============================================================================
// REAL WORLD EXAMPLES
// =============================================================================

function RealWorldExamplesSection() {
  const [firstName, setFirstName] = useState('Roberto');
  const [lastName, setLastName] = useState('Gonzales');
  const [email, setEmail] = useState('r.gonzales@gmail.com');
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  return (
    <View style={styles.section}>
      <SectionHeader
        title="Real World Examples"
        description="Common form patterns from Uber apps"
      />

      {/* Personal Information Form */}
      <Text style={styles.subsectionTitle}>Personal Information</Text>

      <View style={styles.formRow}>
        <View style={styles.flex1}>
          <TextField
            label="First name"
            value={firstName}
            onChangeText={setFirstName}
            placeholder="First name"
            autoCapitalize="words"
          />
        </View>
        <View style={styles.flex1}>
          <TextField
            label="Last name"
            value={lastName}
            onChangeText={setLastName}
            placeholder="Last name"
            autoCapitalize="words"
          />
        </View>
      </View>

      <TextField
        label="Email address"
        value={email}
        onChangeText={setEmail}
        placeholder="name@email.com"
        keyboardType="email-address"
        hint="Add your email to aid in account recovery"
        leadingEnhancer={{ type: 'artwork', icon: Mail }}
      />

      {/* Ride Booking */}
      <Text style={styles.subsectionTitle}>Ride Booking</Text>

      <TextField
        label="Pickup"
        value={pickup}
        onChangeText={setPickup}
        placeholder="Enter pickup location"
        leadingEnhancer={{ type: 'artwork', icon: MapPin }}
        clearable
      />

      <View style={styles.spacerSmall} />

      <TextField
        label="Dropoff"
        value={dropoff}
        onChangeText={setDropoff}
        placeholder="Enter destination"
        leadingEnhancer={{ type: 'artwork', icon: MapPin }}
        clearable
      />

      {/* Payment Card */}
      <Text style={styles.subsectionTitle}>Add Payment Card</Text>

      <TextField
        label="Card number"
        value={cardNumber}
        onChangeText={setCardNumber}
        placeholder="1234 5678 1234 5678"
        keyboardType="number-pad"
        leadingEnhancer={{ type: 'artwork', icon: CreditCard }}
        clearable
      />

      <View style={styles.formRow}>
        <View style={styles.flex1}>
          <TextField
            label="Exp. date"
            value={expiry}
            onChangeText={setExpiry}
            placeholder="MM/YY"
            keyboardType="number-pad"
            leadingEnhancer={{ type: 'artwork', icon: Calendar }}
          />
        </View>
        <View style={styles.flex1}>
          <TextField
            label="CVV"
            value={cvv}
            onChangeText={setCvv}
            placeholder="123"
            keyboardType="number-pad"
            secureTextEntry
            maxLength={4}
          />
        </View>
      </View>

      {/* All Sizes with Enhancers */}
      <Text style={styles.subsectionTitle}>Size Comparison with Enhancers</Text>

      {(['small', 'medium', 'large'] as TextFieldSize[]).map((size) => (
        <View key={size} style={styles.spacerSmall}>
          <TextField
            size={size}
            label={`${size.charAt(0).toUpperCase() + size.slice(1)} with enhancers`}
            value=""
            onChangeText={() => {}}
            placeholder="Placeholder"
            leadingEnhancer={{ type: 'artwork', icon: User }}
            trailingEnhancer={{ type: 'label', text: 'GEL' }}
            clearable
          />
        </View>
      ))}
    </View>
  );
}

// =============================================================================
// PERFORMANCE TESTING COMPONENTS
// =============================================================================

interface MonitoredTextFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  size?: TextFieldSize;
  disabled?: boolean;
  onRenderCountChange: (count: number) => void;
}

const MonitoredTextField = React.memo<MonitoredTextFieldProps>(
  ({ onRenderCountChange, ...textFieldProps }) => {
    const renderCount = useRef(0);

    useEffect(() => {
      renderCount.current += 1;
      onRenderCountChange(renderCount.current);
    });

    return <TextField {...textFieldProps} />;
  }
);

MonitoredTextField.displayName = 'MonitoredTextField';

// =============================================================================
// TOGGLE PROPS TEST
// =============================================================================
function TogglePropsTest() {
  const [value, setValue] = useState('');
  const renderCount = useRef(0);
  const [displayCount, setDisplayCount] = useState(0);

  return (
    <View style={styles.testContainer}>
      <MonitoredTextField
        label="Toggle Value"
        value={value}
        onChangeText={setValue}
        placeholder="Type to test renders"
        onRenderCountChange={(count) => {
          renderCount.current = count;
          setDisplayCount(count);
        }}
      />
      <Text style={styles.renderInfo}>TextField renders: {displayCount}</Text>
      <Text style={styles.expectation}>
        Expected: Increments when you type (value changes)
      </Text>
    </View>
  );
}

// =============================================================================
// SAME PROPS TEST (Different Object References)
// =============================================================================
function SamePropsTest() {
  const [, forceUpdate] = useState(0);
  const [value, setValue] = useState('test value');
  const renderCount = useRef(0);
  const [displayCount, setDisplayCount] = useState(0);

  // ⚠️ Creating new function reference on every render
  const handleChange = (text: string) => {
    setValue(text);
  };

  return (
    <View style={styles.testContainer}>
      <MonitoredTextField
        label="Same Props TextField"
        size="medium"
        value={value}
        onChangeText={handleChange} // ⚠️ New reference every render
        onRenderCountChange={(count) => {
          renderCount.current = count;
          setDisplayCount(count);
        }}
      />
      <Text style={styles.renderInfo}>TextField renders: {displayCount}</Text>
      <Button
        label="Force Parent Re-render"
        size="small"
        onPress={() => forceUpdate((u) => u + 1)}
      />
      <Text style={styles.expectation}>
        Expected: Should NOT re-render when parent re-renders{'\n'}
        (TextField is memoized, onChangeText change should be ignored)
      </Text>
    </View>
  );
}

// =============================================================================
// MANY TEXTFIELDS TEST
// =============================================================================
function ManyTextFieldsTest() {
  const [parentRenderCount, setParentRenderCount] = useState(0);
  const startTime = useRef<number | null>(null);
  const [renderTime, setRenderTime] = useState(0);

  useEffect(() => {
    if (startTime.current !== null) {
      const time = Date.now() - startTime.current;
      setRenderTime(time);

      startTime.current = null;
    }
  }, [parentRenderCount]);

  const handleRerender = () => {
    startTime.current = Date.now();
    setParentRenderCount((c) => c + 1);
  };

  return (
    <View style={styles.testContainer}>
      <Text style={styles.testTitle}>15 TextFields Test</Text>
      <Text style={styles.renderInfo}>
        Last render time: {renderTime}ms (should be &lt;150ms)
      </Text>

      <Button
        label={`Force Re-render (${parentRenderCount})`}
        size="small"
        onPress={handleRerender}
      />

      <View style={styles.textFieldGrid}>
        {Array.from({ length: 15 }).map((_, i) => (
          <TextField
            key={i}
            label={`Field ${i + 1}`}
            size={i % 3 === 0 ? 'small' : i % 3 === 1 ? 'medium' : 'large'}
            value=""
            onChangeText={() => {}}
            placeholder={`Placeholder ${i + 1}`}
          />
        ))}
      </View>
    </View>
  );
}

// =============================================================================
// VARIANT CHANGES TEST
// =============================================================================
function VariantChangesTest() {
  const [size, setSize] = useState<TextFieldSize>('medium');
  const [value, setValue] = useState('');
  const [hasLeadingIcon, setHasLeadingIcon] = useState(false);
  const [hasTrailingIcon, setHasTrailingIcon] = useState(false);
  const [hasLeadingLabel, setHasLeadingLabel] = useState(false);
  const [hasTrailingLabel, setHasTrailingLabel] = useState(false);
  const [isClearable, setIsClearable] = useState(false);
  const renderCount = useRef(0);
  const [displayCount, setDisplayCount] = useState(0);

  useEffect(() => {
    renderCount.current += 1;
    setDisplayCount(renderCount.current);
  }, [
    size,
    value,
    hasLeadingIcon,
    hasTrailingIcon,
    hasLeadingLabel,
    hasTrailingLabel,
    isClearable,
  ]);

  // Build enhancers based on toggle state
  const leadingEnhancer =
    hasLeadingIcon && hasLeadingLabel
      ? { type: 'artworkLabel' as const, icon: Search, text: 'USD' }
      : hasLeadingIcon
        ? { type: 'artwork' as const, icon: Search }
        : hasLeadingLabel
          ? { type: 'label' as const, text: '$' }
          : undefined;

  const trailingEnhancer =
    hasTrailingIcon && hasTrailingLabel
      ? { type: 'artworkLabel' as const, icon: Eye, text: 'View' }
      : hasTrailingIcon
        ? { type: 'artwork' as const, icon: Eye }
        : hasTrailingLabel
          ? { type: 'label' as const, text: 'GEL' }
          : undefined;

  return (
    <View style={styles.testContainer}>
      <Text style={styles.testTitle}>Variant Changes Test</Text>
      <Text style={styles.expectation}>
        Toggling options should cause exactly ONE TextField re-render.
      </Text>

      <Text style={styles.renderInfo}>Parent renders: {displayCount}</Text>

      <TextField
        label="Test TextField"
        size={size}
        value={value}
        onChangeText={setValue}
        placeholder="Type or toggle options"
        leadingEnhancer={leadingEnhancer}
        trailingEnhancer={trailingEnhancer}
        clearable={isClearable}
      />

      <View style={styles.buttonRow}>
        <Text style={styles.buttonRowLabel}>Size:</Text>
        <Button
          label="S"
          size="small"
          hierarchy={size === 'small' ? 'secondary' : 'primary'}
          onPress={() => setSize('small')}
        />
        <Button
          label="M"
          size="small"
          hierarchy={size === 'medium' ? 'secondary' : 'primary'}
          onPress={() => setSize('medium')}
        />
        <Button
          label="L"
          size="small"
          hierarchy={size === 'large' ? 'secondary' : 'primary'}
          onPress={() => setSize('large')}
        />
      </View>

      <View style={styles.buttonRow}>
        <Text style={styles.buttonRowLabel}>Leading:</Text>
        <Button
          label="Icon"
          size="small"
          hierarchy={hasLeadingIcon ? 'secondary' : 'primary'}
          onPress={() => setHasLeadingIcon(!hasLeadingIcon)}
        />
        <Button
          label="Label"
          size="small"
          hierarchy={hasLeadingLabel ? 'secondary' : 'primary'}
          onPress={() => setHasLeadingLabel(!hasLeadingLabel)}
        />
      </View>

      <View style={styles.buttonRow}>
        <Text style={styles.buttonRowLabel}>Trailing:</Text>
        <Button
          label="Icon"
          size="small"
          hierarchy={hasTrailingIcon ? 'secondary' : 'primary'}
          onPress={() => setHasTrailingIcon(!hasTrailingIcon)}
        />
        <Button
          label="Label"
          size="small"
          hierarchy={hasTrailingLabel ? 'secondary' : 'primary'}
          onPress={() => setHasTrailingLabel(!hasTrailingLabel)}
        />
      </View>

      <View style={styles.buttonRow}>
        <Text style={styles.buttonRowLabel}>Options:</Text>
        <Button
          label="Clearable"
          size="small"
          hierarchy={isClearable ? 'secondary' : 'primary'}
          onPress={() => setIsClearable(!isClearable)}
        />
      </View>
    </View>
  );
}

// =============================================================================
// STRESS TEST
// =============================================================================
function StressTest() {
  const [counter, setCounter] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [includeEnhancers, setIncludeEnhancers] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | undefined>(
    undefined
  );

  const startStressTest = () => {
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setCounter((c) => c + 1);
    }, 16); // ~60fps
  };

  const stopStressTest = () => {
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Cycle through different enhancer combinations
  const enhancerCycle = counter % 4;
  const leadingEnhancer = includeEnhancers
    ? enhancerCycle === 0
      ? { type: 'artwork' as const, icon: Search }
      : enhancerCycle === 1
        ? { type: 'label' as const, text: '$' }
        : enhancerCycle === 2
          ? { type: 'artworkLabel' as const, icon: DollarSign, text: 'USD' }
          : undefined
    : undefined;

  const trailingEnhancer = includeEnhancers
    ? enhancerCycle === 1
      ? { type: 'artwork' as const, icon: Eye }
      : enhancerCycle === 2
        ? { type: 'label' as const, text: 'GEL' }
        : enhancerCycle === 3
          ? { type: 'artworkLabel' as const, icon: Mail, text: 'Send' }
          : undefined
    : undefined;

  return (
    <View style={styles.testContainer}>
      <Text style={styles.testTitle}>Stress Test (60fps prop changes)</Text>
      <Text style={styles.expectation}>
        Updates TextField props 60 times/sec. Should stay smooth.
      </Text>

      <Text style={styles.renderInfo}>Updates: {counter}</Text>

      <View style={styles.stressTestFieldContainer}>
        <TextField
          label={`Dynamic ${counter}`}
          size="medium"
          value={`Value ${counter}`}
          onChangeText={() => {}}
          placeholder="Stress testing..."
          disabled={counter % 15 === 0}
          leadingEnhancer={leadingEnhancer}
          trailingEnhancer={trailingEnhancer}
          clearable={counter % 5 === 0}
        />
      </View>

      <View style={styles.buttonRow}>
        <Button
          label={isRunning ? 'Running...' : 'Start Stress Test'}
          onPress={startStressTest}
          disabled={isRunning}
          size="small"
        />
        <Button
          label="Stop"
          hierarchy="secondary"
          onPress={stopStressTest}
          disabled={!isRunning}
          size="small"
        />
        <Button
          label={includeEnhancers ? 'Enhancers ON' : 'Enhancers OFF'}
          hierarchy={includeEnhancers ? 'secondary' : 'primary'}
          onPress={() => setIncludeEnhancers(!includeEnhancers)}
          size="small"
        />
      </View>
    </View>
  );
}

// =============================================================================
// PERFORMANCE TAB CONTENT
// =============================================================================
function PerformanceTests() {
  const [activeTest, setActiveTest] = useState<
    'toggle' | 'sameProps' | 'many' | 'variants' | 'stress'
  >('toggle');

  return (
    <View>
      <View style={styles.tabBar}>
        <Button
          label="Toggle"
          size="small"
          hierarchy={activeTest === 'toggle' ? 'secondary' : 'primary'}
          onPress={() => setActiveTest('toggle')}
        />
        <Button
          label="Refs"
          size="small"
          hierarchy={activeTest === 'sameProps' ? 'secondary' : 'primary'}
          onPress={() => setActiveTest('sameProps')}
        />
        <Button
          label="Many"
          size="small"
          hierarchy={activeTest === 'many' ? 'secondary' : 'primary'}
          onPress={() => setActiveTest('many')}
        />
        <Button
          label="Variants"
          size="small"
          hierarchy={activeTest === 'variants' ? 'secondary' : 'primary'}
          onPress={() => setActiveTest('variants')}
        />
        <Button
          label="Stress"
          size="small"
          hierarchy={activeTest === 'stress' ? 'secondary' : 'primary'}
          onPress={() => setActiveTest('stress')}
        />
      </View>

      {activeTest === 'toggle' && <TogglePropsTest />}
      {activeTest === 'sameProps' && <SamePropsTest />}
      {activeTest === 'many' && <ManyTextFieldsTest />}
      {activeTest === 'variants' && <VariantChangesTest />}
      {activeTest === 'stress' && <StressTest />}
    </View>
  );
}

// =============================================================================
// PERFORMANCE SECTION
// =============================================================================

function PerformanceSection() {
  return (
    <View style={styles.section}>
      <SectionHeader
        title="Performance Tests"
        description="Test render efficiency and detect unnecessary re-renders"
      />
      <PerformanceTests />
    </View>
  );
}

// =============================================================================
// STYLES
// =============================================================================

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    padding: 16,
    paddingBottom: 100,
  },
  title: {
    fontSize: 28,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.contentPrimary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: theme.colors.contentTertiary,
    marginBottom: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: theme.fontWeights.semibold,
    color: theme.colors.contentPrimary,
    marginBottom: 4,
  },
  sectionDescription: {
    fontSize: 14,
    color: theme.colors.contentSecondary,
  },
  subsectionTitle: {
    fontSize: 14,
    fontWeight: theme.fontWeights.medium,
    color: theme.colors.contentTertiary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: 16,
    marginBottom: 12,
  },
  exampleRow: {
    marginBottom: 16,
  },
  exampleLabel: {
    fontSize: 12,
    fontWeight: theme.fontWeights.medium,
    color: theme.colors.contentTertiary,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  formRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  flex1: {
    flex: 1,
  },
  spacerSmall: {
    height: 12,
  },
  // Performance Test Styles
  testContainer: {
    backgroundColor: theme.colors.background,
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  testTitle: {
    fontSize: 16,
    fontWeight: theme.fontWeights.semibold,
    marginBottom: 8,
    color: theme.colors.contentPrimary,
  },
  renderInfo: {
    fontSize: 14,
    color: theme.colors.contentSecondary,
    marginVertical: 8,
    fontFamily: 'monospace',
  },
  expectation: {
    fontSize: 12,
    color: theme.colors.contentTertiary,
    marginTop: 8,
    fontStyle: 'italic',
  },
  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
    alignItems: 'center',
  },
  buttonRowLabel: {
    fontSize: 14,
    fontWeight: theme.fontWeights.medium,
    color: theme.colors.contentPrimary,
    marginRight: 4,
  },
  textFieldGrid: {
    marginTop: 12,
    gap: 8,
  },
  tabBar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 16,
  },
  stressTestFieldContainer: {
    height: 80,
    justifyContent: 'center',
  },
}));
