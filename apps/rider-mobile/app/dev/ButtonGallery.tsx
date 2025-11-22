/**
 * ButtonGallery - Development Only
 *
 * A comprehensive, interactive gallery for testing all Button variants.
 * Features global state toggles to test Loading/Disabled/Active across all buttons.
 *
 * Setup:
 * 1. Place at: apps/rider/src/screens/dev/ButtonGallery.tsx
 * 2. In App.tsx or _layout.tsx, add the dev mode switch (see bottom of file)
 *
 * Features:
 * - Global toggles for Loading/Disabled/Active states
 * - MockIcon for layout testing without icon dependencies
 * - Real icon examples (optional)
 * - All hierarchy, size, shape, tone, width mode variants
 * - Long text truncation tests
 * - Real-world usage examples
 */
import React, { useState } from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';

import { Button, Heart, Star } from '@kartuli/ui';

// Optional: Import real icons for some examples
// import { Trash2, MapPin, ChevronDown, Heart, Link2 } from 'lucide-react-native';

// =============================================================================
// MOCK ICON
// Simple shape to test layout without SVG dependencies
// =============================================================================

const MockIcon = Heart;

const MockIconRound = Star;

// =============================================================================
// SECTION COMPONENT
// =============================================================================

const Section = ({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {description && (
      <Text style={styles.sectionDescription}>{description}</Text>
    )}
    <View style={styles.sectionContent}>{children}</View>
  </View>
);

// =============================================================================
// ROW COMPONENT
// =============================================================================

const Row = ({ children }: { children: React.ReactNode }) => (
  <View style={styles.row}>{children}</View>
);

// =============================================================================
// CONTROL ROW (Toggle Switch)
// =============================================================================

const ControlRow = ({
  label,
  value,
  onValueChange,
}: {
  label: string;
  value: boolean;
  onValueChange: (val: boolean) => void;
}) => (
  <View style={styles.controlRow}>
    <Text style={styles.controlLabel}>{label}</Text>
    <Switch value={value} onValueChange={onValueChange} />
  </View>
);

// =============================================================================
// MAIN GALLERY COMPONENT
// =============================================================================

export const ButtonGallery = () => {
  // Global state toggles - affects ALL buttons
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [active, setActive] = useState(false);

  const handlePress = () => {};

  const globalProps = { loading, disabled, active };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      {/* ================================================================== */}
      {/* CONTROLS HEADER */}
      {/* ================================================================== */}
      <View style={styles.controls}>
        <Text style={styles.headerTitle}>Button Gallery</Text>
        <Text style={styles.headerSubtitle}>
          Toggle states to test all variants instantly
        </Text>
        <View style={styles.controlsGrid}>
          <ControlRow
            label="Loading"
            value={loading}
            onValueChange={setLoading}
          />
          <ControlRow
            label="Disabled"
            value={disabled}
            onValueChange={setDisabled}
          />
          <ControlRow label="Active" value={active} onValueChange={setActive} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* ================================================================ */}
        {/* 1. HIERARCHY */}
        {/* ================================================================ */}
        <Section
          title="1. Hierarchy"
          description="Primary for main CTAs, Secondary for alternatives, Tertiary for less emphasis"
        >
          <Button
            label="Primary Button"
            hierarchy="primary"
            {...globalProps}
            onPress={handlePress}
          />
          <Button
            label="Secondary Button"
            hierarchy="secondary"
            {...globalProps}
            onPress={handlePress}
          />
          <Button
            label="Tertiary Button"
            hierarchy="tertiary"
            {...globalProps}
            onPress={handlePress}
          />
        </Section>

        {/* ================================================================ */}
        {/* 2. SIZES */}
        {/* ================================================================ */}
        <Section
          title="2. Sizes"
          description="Small (32px), Medium (48px), Large (56px)"
        >
          <Row>
            <Button
              label="Small"
              size="small"
              {...globalProps}
              onPress={handlePress}
            />
            <Button
              label="Medium"
              size="medium"
              {...globalProps}
              onPress={handlePress}
            />
            <Button
              label="Large"
              size="large"
              {...globalProps}
              onPress={handlePress}
            />
          </Row>
        </Section>

        {/* ================================================================ */}
        {/* 3. WIDTH MODES */}
        {/* ================================================================ */}
        <Section title="3. Width Modes">
          <Text style={styles.note}>Intrinsic (default) — fits content:</Text>
          <Row>
            <Button
              label="Short"
              widthMode="intrinsic"
              hierarchy="secondary"
              {...globalProps}
              onPress={handlePress}
            />
            <Button
              label="Longer Label"
              widthMode="intrinsic"
              hierarchy="secondary"
              {...globalProps}
              onPress={handlePress}
            />
          </Row>

          <Text style={[styles.note]}>Fixed — 100% width:</Text>
          <Button
            label="Fixed Width Button"
            widthMode="fixed"
            hierarchy="primary"
            {...globalProps}
            onPress={handlePress}
          />
        </Section>

        {/* ================================================================ */}
        {/* 4. SHAPES */}
        {/* ================================================================ */}
        <Section title="4. Shapes">
          <Button
            label="Rect (default)"
            shape="rect"
            {...globalProps}
            onPress={handlePress}
          />
          <Button
            label="Pill"
            shape="pill"
            {...globalProps}
            onPress={handlePress}
          />
          <Row>
            <Button
              leadingIcon={MockIconRound}
              shape="circle"
              hierarchy="secondary"
              accessibilityLabel="Circle button"
              {...globalProps}
              onPress={handlePress}
            />
            <Button
              leadingIcon={MockIcon}
              shape="square"
              hierarchy="secondary"
              accessibilityLabel="Square button"
              {...globalProps}
              onPress={handlePress}
            />
            <Text style={styles.noteInline}>← Circle & Square (icon-only)</Text>
          </Row>
        </Section>

        {/* ================================================================ */}
        {/* 5. ICONS */}
        {/* ================================================================ */}
        <Section title="5. Icons">
          <Button
            label="Leading Icon"
            leadingIcon={MockIcon}
            {...globalProps}
            onPress={handlePress}
          />
          <Button
            label="Trailing Icon"
            trailingIcon={MockIcon}
            {...globalProps}
            onPress={handlePress}
          />
          <Button
            label="Both Icons"
            leadingIcon={MockIcon}
            trailingIcon={MockIcon}
            {...globalProps}
            onPress={handlePress}
          />
        </Section>

        {/* ================================================================ */}
        {/* 6. COMPLEX LAYOUTS */}
        {/* ================================================================ */}
        <Section
          title="6. Complex Layouts"
          description="Fixed width + icons with text truncation"
        >
          <Button
            label="Manage Account Settings"
            widthMode="fixed"
            hierarchy="secondary"
            leadingIcon={MockIcon}
            trailingIcon={MockIcon}
            {...globalProps}
            onPress={handlePress}
          />
          <Button
            label="This is a very long label that should truncate properly"
            widthMode="fixed"
            hierarchy="secondary"
            leadingIcon={MockIcon}
            trailingIcon={MockIcon}
            {...globalProps}
            onPress={handlePress}
          />
        </Section>

        {/* ================================================================ */}
        {/* 7. TONES */}
        {/* ================================================================ */}
        <Section
          title="7. Negative Tone"
          description="For destructive actions (delete, cancel, remove)"
        >
          <Button
            label="Delete Account"
            hierarchy="primary"
            tone="negative"
            {...globalProps}
            onPress={handlePress}
          />
          <Button
            label="Remove Item"
            hierarchy="secondary"
            tone="negative"
            {...globalProps}
            onPress={handlePress}
          />
          <Button
            label="Cancel"
            hierarchy="tertiary"
            tone="negative"
            {...globalProps}
            onPress={handlePress}
          />
        </Section>

        {/* ================================================================ */}
        {/* 8. ICON BUTTONS - ALL SIZES */}
        {/* ================================================================ */}
        <Section title="8. Icon Buttons — All Sizes">
          <Row>
            <Button
              leadingIcon={MockIconRound}
              shape="circle"
              size="small"
              hierarchy="secondary"
              accessibilityLabel="Small"
              {...globalProps}
              onPress={handlePress}
            />
            <Button
              leadingIcon={MockIconRound}
              shape="circle"
              size="medium"
              hierarchy="secondary"
              accessibilityLabel="Medium"
              {...globalProps}
              onPress={handlePress}
            />
            <Button
              leadingIcon={MockIconRound}
              shape="circle"
              size="large"
              hierarchy="secondary"
              accessibilityLabel="Large"
              {...globalProps}
              onPress={handlePress}
            />
          </Row>
          <Row>
            <Button
              leadingIcon={MockIcon}
              shape="square"
              size="small"
              hierarchy="secondary"
              accessibilityLabel="Small"
              {...globalProps}
              onPress={handlePress}
            />
            <Button
              leadingIcon={MockIcon}
              shape="square"
              size="medium"
              hierarchy="secondary"
              accessibilityLabel="Medium"
              {...globalProps}
              onPress={handlePress}
            />
            <Button
              leadingIcon={MockIcon}
              shape="square"
              size="large"
              hierarchy="secondary"
              accessibilityLabel="Large"
              {...globalProps}
              onPress={handlePress}
            />
          </Row>
        </Section>

        {/* ================================================================ */}
        {/* 9. PILL VARIANTS */}
        {/* ================================================================ */}
        <Section title="9. Pill Variants">
          <Row>
            <Button
              label="Small Pill"
              shape="pill"
              size="small"
              hierarchy="secondary"
              {...globalProps}
              onPress={handlePress}
            />
            <Button
              label="Medium Pill"
              shape="pill"
              size="medium"
              hierarchy="secondary"
              {...globalProps}
              onPress={handlePress}
            />
          </Row>
          <Button
            label="Large Pill"
            shape="pill"
            size="large"
            hierarchy="primary"
            {...globalProps}
            onPress={handlePress}
          />
        </Section>

        {/* ================================================================ */}
        {/* 10. REAL-WORLD EXAMPLES */}
        {/* ================================================================ */}
        <Section
          title="10. Real-World Examples"
          description="Common patterns in the Kartuli app"
        >
          <Button
            label="Confirm ride"
            hierarchy="primary"
            size="large"
            widthMode="fixed"
            {...globalProps}
            onPress={handlePress}
          />
          <Button
            label="Change"
            hierarchy="tertiary"
            {...globalProps}
            onPress={handlePress}
          />
          <Button
            label="Delete"
            hierarchy="secondary"
            tone="negative"
            {...globalProps}
            onPress={handlePress}
          />
          <Button
            label="Delete my account"
            hierarchy="primary"
            tone="negative"
            {...globalProps}
            onPress={handlePress}
          />
          <Row>
            <Button
              leadingIcon={MockIconRound}
              shape="circle"
              hierarchy="secondary"
              accessibilityLabel="Favorite"
              {...globalProps}
              onPress={handlePress}
            />
            <Button
              label="Favorites"
              hierarchy="secondary"
              leadingIcon={MockIconRound}
              trailingIcon={MockIcon}
              {...globalProps}
              onPress={handlePress}
            />
          </Row>
        </Section>

        {/* ================================================================ */}
        {/* 11. STATES WITHOUT GLOBAL TOGGLE */}
        {/* ================================================================ */}
        <Section
          title="11. Static State Examples"
          description="These ignore global toggles for comparison"
        >
          <Row>
            <Button label="Normal" hierarchy="primary" onPress={handlePress} />
            <Button
              label="Disabled"
              hierarchy="primary"
              disabled
              onPress={handlePress}
            />
          </Row>
          <Row>
            <Button
              label="Loading"
              hierarchy="primary"
              loading
              onPress={handlePress}
            />
            <Button
              label="Active"
              hierarchy="secondary"
              active
              onPress={handlePress}
            />
          </Row>
        </Section>

        <View style={styles.footer} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  controls: {
    backgroundColor: '#FFF',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000',
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#666',
    marginBottom: 12,
  },
  controlsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },
  controlRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  controlLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
    color: '#666',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  sectionDescription: {
    fontSize: 12,
    color: '#888',
    marginBottom: 12,
  },
  sectionContent: {
    gap: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flexWrap: 'wrap',
  },
  note: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 8,
  },
  noteInline: {
    fontSize: 11,
    color: '#888',
    fontStyle: 'italic',
  },
  footer: {
    height: 48,
  },
});

export default ButtonGallery;

// =============================================================================
// HOW TO USE — DEV MODE SWITCH
// =============================================================================
//
// Option A: Simple toggle in App.tsx
// -----------------------------------
// import ButtonGallery from './src/screens/dev/ButtonGallery';
// import MainApp from './src/App';
//
// const SHOW_GALLERY = __DEV__ && true; // ← Flip to 'true' to show gallery
//
// export default function App() {
//   if (SHOW_GALLERY) {
//     return <ButtonGallery />;
//   }
//   return <MainApp />;
// }
//
//
// Option B: Expo Router (add as dev route)
// ----------------------------------------
// 1. Create file: apps/rider/src/app/dev/button-gallery.tsx
//
//    export { ButtonGallery as default } from '@/screens/dev/ButtonGallery';
//
// 2. In _layout.tsx:
//
//    {__DEV__ && (
//      <Stack.Screen
//        name="dev/button-gallery"
//        options={{ title: 'Button Gallery' }}
//      />
//    )}
//
// 3. Add a hidden trigger somewhere (e.g., triple-tap version number):
//
//    import { router } from 'expo-router';
//    router.push('/dev/button-gallery');
//
