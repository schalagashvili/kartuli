/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { Text, View } from 'react-native';

import { FlashList } from '@shopify/flash-list';
import type { Meta, StoryObj } from '@storybook/react';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { Checkbox } from './Checkbox';
import { CHECKBOX_DIMENSIONS } from './Checkbox.types';

const decoratorStyles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.background,
    alignItems: 'flex-start',
  },
  fullWidth: {
    flex: 1,
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.background,
    width: '100%',
  },
  constrained: {
    padding: theme.spacing.md,
    width: 280,
    borderWidth: theme.borderWidths.thin,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.backgroundSecondary,
  },
  darkBackground: {
    flex: 1,
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.backgroundInverse,
    alignItems: 'flex-start',
  },
  sectionLabel: {
    fontSize: theme.fontSizes.xs,
    fontWeight: theme.fontWeights.semibold,
    color: theme.colors.contentSecondary,
    textTransform: 'uppercase',
    letterSpacing: theme.letterSpacing.wide,
    marginBottom: theme.spacing.sm,
  },
  constraintLabel: {
    fontSize: theme.fontSizes.xs,
    color: theme.colors.contentTertiary,
    marginBottom: theme.spacing.sm,
  },
  debugBorder: {
    borderWidth: 1,
    borderColor: theme.colors.danger,
    alignSelf: 'flex-start',
  },
  debugText: {
    fontSize: theme.fontSizes.xs,
    color: theme.colors.contentTertiary,
    marginTop: theme.spacing.xs,
  },
  tokenText: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.contentPrimary,
    fontFamily: theme.fontFamilies.mono,
  },
  tokenSwatch: {
    width: 40,
    height: 40,
    borderRadius: theme.radius.sm,
  },
}));

const styles = decoratorStyles;

const UnistylesWrapper = ({
  children,
  variant = 'default',
}: {
  children: React.ReactNode;
  variant?: 'default' | 'fullWidth' | 'constrained' | 'dark';
}) => {
  const containerStyle = {
    default: styles.container,
    fullWidth: styles.fullWidth,
    constrained: styles.constrained,
    dark: styles.darkBackground,
  }[variant];

  return (
    <View style={containerStyle}>
      {variant === 'constrained' && (
        <Text style={styles.constraintLabel}>Container: 280px</Text>
      )}
      {children}
    </View>
  );
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

const SectionLabel = ({ children }: { children: string }) => {
  return <Text style={styles.sectionLabel}>{children}</Text>;
};

const Spacer = ({
  size = 'md',
}: {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}) => {
  const { theme } = useUnistyles();
  return <View style={{ height: theme.spacing[size] }} />;
};

const Row = ({
  children,
  gap = 'lg',
}: {
  children: React.ReactNode;
  gap?: 'sm' | 'md' | 'lg' | 'xl';
}) => {
  const { theme } = useUnistyles();
  return (
    <View
      style={{
        flexDirection: 'row',
        gap: theme.spacing[gap],
        alignItems: 'flex-start',
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
    <View style={{ gap: theme.spacing[gap], alignItems: 'flex-start' }}>
      {children}
    </View>
  );
};

const InteractiveCheckbox = (
  props: Omit<React.ComponentProps<typeof Checkbox>, 'checked' | 'onChange'> & {
    defaultChecked?: boolean;
  }
) => {
  const { defaultChecked = false, ...rest } = props;
  const [checked, setChecked] = useState(defaultChecked);
  return <Checkbox {...rest} checked={checked} onChange={setChecked} />;
};

const ParentChildDemo = () => {
  const [items, setItems] = useState([true, false, false]);

  const allChecked = items.every(Boolean);
  const someChecked = items.some(Boolean);
  const isIndeterminate = someChecked && !allChecked;

  const toggleAll = () => {
    setItems(items.map(() => !allChecked));
  };

  const toggleItem = (index: number) => {
    const newItems = [...items];
    newItems[index] = !newItems[index];
    setItems(newItems);
  };

  const { theme } = useUnistyles();

  return (
    <Column gap="sm">
      <Checkbox
        label="Select all items"
        checked={allChecked}
        indeterminate={isIndeterminate}
        onChange={toggleAll}
        testID="checkbox-parent"
      />
      <View style={{ marginLeft: theme.spacing['2xl'], gap: theme.spacing.sm }}>
        {['Option 1', 'Option 2', 'Option 3'].map((label, i) => (
          <Checkbox
            key={label}
            label={label}
            size="small"
            checked={items[i]}
            onChange={() => toggleItem(i)}
            testID={`checkbox-child-${i}`}
          />
        ))}
      </View>
    </Column>
  );
};

const AlignmentComparisonContent = () => (
  <Column gap="xl">
    <View style={{ width: 280 }}>
      <Column gap="lg">
        <Column gap="sm">
          <SectionLabel>Center Aligned (Short Label)</SectionLabel>
          <InteractiveCheckbox label="Short label" align="center" />
        </Column>

        <Column gap="sm">
          <SectionLabel>Center Aligned (Long Label)</SectionLabel>
          <InteractiveCheckbox
            label="This is a longer label that will wrap to multiple lines when constrained"
            align="center"
          />
        </Column>

        <Column gap="sm">
          <SectionLabel>Top Aligned (Long Label)</SectionLabel>
          <InteractiveCheckbox
            label="This is a longer label that will wrap to multiple lines when constrained"
            align="top"
          />
        </Column>

        <Column gap="sm">
          <SectionLabel>Top Aligned with Description</SectionLabel>
          <InteractiveCheckbox
            label="Multi-line label with description that provides additional context"
            description="This description adds even more content to demonstrate proper alignment"
            align="top"
          />
        </Column>
      </Column>
    </View>
  </Column>
);

const StateCombinationMatrixContent = () => {
  return (
    <Column gap="xl">
      <Column gap="sm">
        <SectionLabel>Visual State Priority</SectionLabel>
        <Text style={styles.debugText}>
          Priority: Indeterminate {'>'} Checked {'>'} Preselected {'>'}{' '}
          Unchecked
        </Text>
        <Spacer size="sm" />
        <Column gap="md">
          <Checkbox
            label="Indeterminate (ignores checked=true)"
            indeterminate
            checked={true}
            onChange={() => {}}
          />
          <Checkbox
            label="Checked (ignores preselected)"
            preselected
            checked={true}
            onChange={() => {}}
          />
          <Checkbox
            label="Preselected (when unchecked)"
            preselected
            checked={false}
            onChange={() => {}}
          />
        </Column>
      </Column>

      <Column gap="sm">
        <SectionLabel>Disabled × States</SectionLabel>
        <Row gap="xl">
          <Column gap="sm">
            <Checkbox
              label="Disabled unchecked"
              disabled
              checked={false}
              onChange={() => {}}
            />
            <Checkbox
              label="Disabled checked"
              disabled
              checked={true}
              onChange={() => {}}
            />
          </Column>
          <Column gap="sm">
            <Checkbox
              label="Disabled indeterminate"
              disabled
              indeterminate
              checked={false}
              onChange={() => {}}
            />
            <Checkbox
              label="Disabled preselected"
              disabled
              preselected
              checked={false}
              onChange={() => {}}
            />
          </Column>
        </Row>
      </Column>

      <Column gap="sm">
        <SectionLabel>Negative Tone × States</SectionLabel>
        <Row gap="xl">
          <Column gap="sm">
            <Checkbox
              label="Negative unchecked"
              tone="negative"
              checked={false}
              onChange={() => {}}
            />
            <Checkbox
              label="Negative checked"
              tone="negative"
              checked={true}
              onChange={() => {}}
            />
          </Column>
          <Column gap="sm">
            <Checkbox
              label="Negative indeterminate"
              tone="negative"
              indeterminate
              checked={false}
              onChange={() => {}}
            />
            <Checkbox
              label="Negative disabled"
              tone="negative"
              disabled
              checked={true}
              onChange={() => {}}
            />
          </Column>
        </Row>
      </Column>
    </Column>
  );
};

const IndeterminateUseCasesContent = () => {
  const { theme } = useUnistyles();
  return (
    <Column gap="xl">
      <Column gap="sm">
        <SectionLabel>Select All Pattern</SectionLabel>
        <ParentChildDemo />
      </Column>

      <Column gap="sm">
        <SectionLabel>Nested Groups</SectionLabel>
        <Column gap="sm">
          <Checkbox
            label="All permissions"
            checked={false}
            indeterminate
            onChange={() => {}}
            testID="nested-root"
          />
          <View
            style={{ marginLeft: theme.spacing['2xl'], gap: theme.spacing.sm }}
          >
            <Checkbox
              label="Read access"
              size="small"
              checked={true}
              onChange={() => {}}
              testID="nested-read"
            />
            <Checkbox
              label="Write access"
              size="small"
              checked={false}
              indeterminate
              onChange={() => {}}
              testID="nested-write"
            />
            <View
              style={{
                marginLeft: theme.spacing['2xl'],
                gap: theme.spacing.sm,
              }}
            >
              <Checkbox
                label="Create"
                size="small"
                checked={true}
                onChange={() => {}}
                testID="nested-create"
              />
              <Checkbox
                label="Edit"
                size="small"
                checked={false}
                onChange={() => {}}
                testID="nested-edit"
              />
              <Checkbox
                label="Delete"
                size="small"
                checked={false}
                onChange={() => {}}
                testID="nested-delete"
              />
            </View>
          </View>
        </Column>
      </Column>
    </Column>
  );
};

const RapidToggleDemo = () => {
  const [checked, setChecked] = useState(false);
  const [toggleCount, setToggleCount] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [isAutoToggling, setIsAutoToggling] = useState(false);

  const startAutoToggle = () => {
    if (intervalRef.current) return;
    setIsAutoToggling(true);
    intervalRef.current = setInterval(() => {
      setChecked((prev) => !prev);
      setToggleCount((prev) => prev + 1);
    }, 100);
  };

  const stopAutoToggle = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsAutoToggling(false);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <Column gap="md">
      <Checkbox
        label={`Toggle count: ${toggleCount}`}
        description={
          isAutoToggling ? 'Auto-toggling at 10Hz' : 'Tap Start to begin'
        }
        checked={checked}
        onChange={(val) => {
          setChecked(val);
          setToggleCount((prev) => prev + 1);
        }}
        testID="auto-toggle-checkbox"
      />
      <Row gap="md">
        <Text
          style={[
            styles.tokenText,
            { color: isAutoToggling ? 'gray' : 'blue' },
          ]}
          onPress={startAutoToggle}
        >
          {isAutoToggling ? 'Running...' : 'Start Auto-Toggle'}
        </Text>
        <Text
          style={[
            styles.tokenText,
            { color: isAutoToggling ? 'blue' : 'gray' },
          ]}
          onPress={stopAutoToggle}
        >
          Stop
        </Text>
      </Row>
    </Column>
  );
};

const RapidToggleContent = () => (
  <Column gap="lg">
    <SectionLabel>Rapid Toggle (Animation Stress Test)</SectionLabel>
    <InteractiveCheckbox
      label="Tap me repeatedly"
      description="Verify Reanimated spring physics don't glitch"
      hapticFeedback
      testID="rapid-toggle"
    />
    <Spacer size="md" />
    <Column gap="sm">
      <SectionLabel>Controlled Rapid Toggle</SectionLabel>
      <RapidToggleDemo />
    </Column>
  </Column>
);

const HitSlopContent = () => {
  const dimensions = CHECKBOX_DIMENSIONS;

  return (
    <Column gap="xl">
      <SectionLabel>
        Hit Slop Visualization (Red Box = Layout Boundary)
      </SectionLabel>
      <Text style={styles.debugText}>
        *Touch should work slightly outside the red border (hitSlop area)
      </Text>
      <Spacer size="md" />

      <Column gap="lg">
        {(['small', 'medium', 'large'] as const).map((size) => (
          <Column gap="xs" key={size}>
            <Text style={styles.debugText}>
              {size}: {dimensions[size].boxSize}px box, hitSlop:{' '}
              {dimensions[size].hitSlop}px
            </Text>
            <View style={styles.debugBorder}>
              <InteractiveCheckbox
                label={`${size} checkbox`}
                size={size}
                testID={`hit-slop-${size}`}
              />
            </View>
          </Column>
        ))}
      </Column>

      <Spacer size="lg" />
      <Column gap="sm">
        <SectionLabel>44pt Minimum Touch Target Check</SectionLabel>
        <Text style={styles.debugText}>
          Row min-height: small={dimensions.small.rowMinHeight}px, medium=
          {dimensions.medium.rowMinHeight}px, large=
          {dimensions.large.rowMinHeight}px
        </Text>
        <Text style={styles.debugText}>
          iOS HIG / Material recommend 44pt minimum touch targets
        </Text>
      </Column>
    </Column>
  );
};

const FlashListContent = () => {
  const [checkedItems, setCheckedItems] = useState<Set<number>>(
    new Set([0, 5, 10])
  );

  const toggleItem = useCallback((id: number) => {
    setCheckedItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const data = React.useMemo(
    () =>
      Array.from({ length: 1000 }, (_, i) => ({ id: i, label: `Option ${i}` })),
    []
  );

  const { theme } = useUnistyles();

  return (
    <View style={{ height: 600, width: '100%' }}>
      <SectionLabel>Rendering 1,000 items (Scroll to test FPS)</SectionLabel>
      <Text style={styles.debugText}>
        Critical for low-end Android. Watch for frame drops during fast scroll.
      </Text>
      <FlashList
        data={data}
        renderItem={({ item }) => (
          <View style={{ paddingVertical: theme.spacing.xs }}>
            <Checkbox
              label={item.label}
              checked={checkedItems.has(item.id)}
              onChange={() => toggleItem(item.id)}
              testID={`flash-list-item-${item.id}`}
            />
          </View>
        )}
      />
    </View>
  );
};

const SystemTokensContent = () => {
  const { theme } = useUnistyles();

  return (
    <Column gap="xl">
      <SectionLabel>Active Theme Tokens (Live Values)</SectionLabel>

      <Column gap="md">
        <Text style={styles.tokenText}>
          colors.primary: {theme.colors.primary}
        </Text>
        <Text style={styles.tokenText}>
          colors.danger: {theme.colors.danger}
        </Text>
        <Text style={styles.tokenText}>
          colors.contentPrimary: {theme.colors.contentPrimary}
        </Text>
        <Text style={styles.tokenText}>
          colors.contentSecondary: {theme.colors.contentSecondary}
        </Text>
        <Text style={styles.tokenText}>
          colors.disabled: {theme.colors.disabled}
        </Text>
      </Column>

      <Column gap="sm">
        <SectionLabel>Visual Swatch</SectionLabel>
        <Row gap="sm">
          <View
            style={[
              styles.tokenSwatch,
              { backgroundColor: theme.colors.primary },
            ]}
          />
          <View
            style={[
              styles.tokenSwatch,
              { backgroundColor: theme.colors.danger },
            ]}
          />
          <View
            style={[
              styles.tokenSwatch,
              { backgroundColor: theme.colors.disabled },
            ]}
          />
          <View
            style={[
              styles.tokenSwatch,
              {
                backgroundColor: theme.colors.background,
                borderWidth: 1,
                borderColor: theme.colors.border,
              },
            ]}
          />
        </Row>
      </Column>

      <Column gap="md">
        <SectionLabel>Spacing Tokens</SectionLabel>
        <Text style={styles.tokenText}>spacing.sm: {theme.spacing.sm}px</Text>
        <Text style={styles.tokenText}>spacing.md: {theme.spacing.md}px</Text>
        <Text style={styles.tokenText}>spacing.lg: {theme.spacing.lg}px</Text>
      </Column>

      <Column gap="md">
        <SectionLabel>Radius Tokens</SectionLabel>
        <Text style={styles.tokenText}>radius.sm: {theme.radius.sm}px</Text>
        <Text style={styles.tokenText}>radius.md: {theme.radius.md}px</Text>
        <Text style={styles.tokenText}>radius.lg: {theme.radius.lg}px</Text>
      </Column>

      <Column gap="md">
        <SectionLabel>Checkbox Dimensions (From Component)</SectionLabel>
        <Text style={styles.tokenText}>
          small.boxSize: {CHECKBOX_DIMENSIONS.small.boxSize}px
        </Text>
        <Text style={styles.tokenText}>
          medium.boxSize: {CHECKBOX_DIMENSIONS.medium.boxSize}px
        </Text>
        <Text style={styles.tokenText}>
          large.boxSize: {CHECKBOX_DIMENSIONS.large.boxSize}px
        </Text>
      </Column>
    </Column>
  );
};

const MaestroTestIDsContent = () => {
  return (
    <Column gap="xl">
      <Column gap="sm">
        <SectionLabel>TestID Convention for Maestro</SectionLabel>
        <Text style={styles.debugText}>
          Pattern: checkbox-[context]-[identifier]
        </Text>
        <Text style={styles.debugText}>Examples:</Text>
        <Text style={styles.tokenText}>• checkbox-terms-accept</Text>
        <Text style={styles.tokenText}>• checkbox-notification-email</Text>
        <Text style={styles.tokenText}>• checkbox-filter-active</Text>
      </Column>

      <Column gap="md">
        <SectionLabel>Checkboxes with TestIDs</SectionLabel>
        <InteractiveCheckbox
          label="Accept Terms"
          testID="checkbox-terms-accept"
          description="testID: checkbox-terms-accept"
        />
        <InteractiveCheckbox
          label="Email Notifications"
          testID="checkbox-notification-email"
          description="testID: checkbox-notification-email"
        />
        <InteractiveCheckbox
          label="Show Active Only"
          testID="checkbox-filter-active"
          description="testID: checkbox-filter-active"
        />
      </Column>

      <Column gap="sm">
        <SectionLabel>Maestro YAML Example</SectionLabel>
        <Text style={styles.tokenText}>{'- tapOn:'}</Text>
        <Text style={styles.tokenText}>
          {'    id: "checkbox-terms-accept"'}
        </Text>
        <Text style={styles.tokenText}>{'- assertVisible:'}</Text>
        <Text style={styles.tokenText}>
          {'    id: "checkbox-terms-accept"'}
        </Text>
      </Column>
    </Column>
  );
};

const ControlledStateContent = () => {
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);

  return (
    <Column gap="xl">
      <SectionLabel>Explicit Controlled State</SectionLabel>
      <Text style={styles.debugText}>
        For forms requiring external state management (React Hook Form, Zustand,
        etc.)
      </Text>

      <Column gap="md">
        <Checkbox
          label="Controlled Checkbox"
          description={`checked: ${checked}, indeterminate: ${indeterminate}`}
          checked={checked}
          indeterminate={indeterminate}
          onChange={setChecked}
          testID="controlled-checkbox"
        />

        <Row gap="md">
          <Text style={styles.tokenText} onPress={() => setChecked(true)}>
            [Set Checked]
          </Text>
          <Text style={styles.tokenText} onPress={() => setChecked(false)}>
            [Set Unchecked]
          </Text>
          <Text
            style={styles.tokenText}
            onPress={() => setIndeterminate(!indeterminate)}
          >
            [Toggle Indeterminate]
          </Text>
        </Row>
      </Column>

      <Column gap="sm">
        <SectionLabel>Usage Pattern</SectionLabel>
        <Text style={styles.tokenText}>
          {'const [checked, setChecked] = useState(false);'}
        </Text>
        <Text style={styles.tokenText}>{'<Checkbox'}</Text>
        <Text style={styles.tokenText}>{'  checked={checked}'}</Text>
        <Text style={styles.tokenText}>{'  onChange={setChecked}'}</Text>
        <Text style={styles.tokenText}>{'  testID="my-checkbox"'}</Text>
        <Text style={styles.tokenText}>{'/>'}</Text>
      </Column>
    </Column>
  );
};

const ThemeComparisonContent = () => {
  const { theme } = useUnistyles();

  return (
    <Column gap="xs">
      <View
        style={{
          padding: theme.spacing.lg,
          backgroundColor: theme.colors.background,
        }}
      >
        <Column gap="sm">
          <SectionLabel>Light Background</SectionLabel>
          <Column gap="md">
            <Checkbox label="Unchecked" checked={false} onChange={() => {}} />
            <Checkbox label="Checked" checked={true} onChange={() => {}} />
            <Checkbox
              label="Indeterminate"
              indeterminate
              checked={false}
              onChange={() => {}}
            />
            <Checkbox
              label="Disabled"
              disabled
              checked={true}
              onChange={() => {}}
            />
          </Column>
        </Column>
      </View>

      <View
        style={{
          padding: theme.spacing.lg,
          backgroundColor: theme.colors.backgroundInverse,
        }}
      >
        <Column gap="sm">
          <Text
            style={{
              fontSize: theme.fontSizes.xs,
              fontWeight: theme.fontWeights.semibold,
              color: theme.colors.contentInversePrimary,
              textTransform: 'uppercase',
              letterSpacing: theme.letterSpacing.wide,
              marginBottom: theme.spacing.sm,
            }}
          >
            Dark Background
          </Text>
          <Column gap="md">
            <Checkbox label="Unchecked" checked={false} onChange={() => {}} />
            <Checkbox label="Checked" checked={true} onChange={() => {}} />
            <Checkbox
              label="Indeterminate"
              indeterminate
              checked={false}
              onChange={() => {}}
            />
            <Checkbox
              label="Disabled"
              disabled
              checked={true}
              onChange={() => {}}
            />
          </Column>
        </Column>
      </View>
    </Column>
  );
};

const RequiredFieldContent = () => {
  const [accepted, setAccepted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const showError = submitted && !accepted;

  return (
    <Column gap="lg">
      <SectionLabel>Required Checkbox Validation</SectionLabel>
      <Checkbox
        label="I accept the terms and conditions"
        description="You must accept to continue"
        checked={accepted}
        onChange={(val) => {
          setAccepted(val);
          if (val) setSubmitted(false);
        }}
        errorText={
          showError ? 'You must accept the terms to continue' : undefined
        }
        testID="required-terms"
      />
      <Text style={styles.debugText}>
        Click Submit without checking to see error
      </Text>
      <Text
        style={[styles.tokenText, { color: 'blue' }]}
        onPress={() => setSubmitted(true)}
      >
        Submit →
      </Text>
    </Column>
  );
};

const KitchenSinkContent = () => (
  <Column gap="xl">
    <Column gap="sm">
      <SectionLabel>1. Visual States</SectionLabel>
      <Row gap="xl">
        <Column gap="sm">
          <InteractiveCheckbox label="Unchecked" />
          <InteractiveCheckbox label="Checked" defaultChecked />
        </Column>
        <Column gap="sm">
          <Checkbox
            label="Indeterminate"
            indeterminate
            checked={false}
            onChange={() => {}}
          />
          <Checkbox
            label="Preselected"
            preselected
            checked={false}
            onChange={() => {}}
          />
        </Column>
      </Row>
    </Column>

    <Column gap="sm">
      <SectionLabel>2. Sizes</SectionLabel>
      <Column gap="md">
        <InteractiveCheckbox label="Small" size="small" />
        <InteractiveCheckbox label="Medium" size="medium" />
        <InteractiveCheckbox label="Large" size="large" />
      </Column>
    </Column>

    <Column gap="sm">
      <SectionLabel>3. Tones</SectionLabel>
      <Column gap="md">
        <InteractiveCheckbox label="Default tone" tone="default" />
        <InteractiveCheckbox label="Negative tone" tone="negative" />
      </Column>
    </Column>

    <Column gap="sm">
      <SectionLabel>4. Content Variants</SectionLabel>
      <Column gap="md">
        <InteractiveCheckbox label="Label only" />
        <InteractiveCheckbox
          label="With description"
          description="Helper text below"
        />
        <InteractiveCheckbox label="With error" errorText="Validation error" />
        <Row gap="md">
          <InteractiveCheckbox accessibilityLabel="No label A" />
          <InteractiveCheckbox accessibilityLabel="No label B" />
          <InteractiveCheckbox accessibilityLabel="No label C" />
        </Row>
      </Column>
    </Column>

    <Column gap="sm">
      <SectionLabel>5. States</SectionLabel>
      <Column gap="md">
        <InteractiveCheckbox label="Normal" />
        <Checkbox
          label="Disabled"
          disabled
          checked={false}
          onChange={() => {}}
        />
        <Checkbox
          label="Disabled checked"
          disabled
          checked={true}
          onChange={() => {}}
        />
      </Column>
    </Column>

    <Column gap="sm">
      <SectionLabel>6. Alignment</SectionLabel>
      <View style={{ width: 280 }}>
        <Column gap="md">
          <InteractiveCheckbox
            label="Center aligned with long text that wraps"
            align="center"
          />
          <InteractiveCheckbox
            label="Top aligned with long text that wraps"
            align="top"
          />
        </Column>
      </View>
    </Column>

    <Column gap="sm">
      <SectionLabel>7. Parent-Child Pattern</SectionLabel>
      <ParentChildDemo />
    </Column>
  </Column>
);

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  args: {
    checked: false,
    label: 'Checkbox label',
    size: 'medium',
    tone: 'default',
    align: 'center',
    disabled: false,
    indeterminate: false,
    preselected: false,
    hapticFeedback: false,
  },
  argTypes: {
    onChange: { action: 'changed' },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Checkbox size variant',
      table: {
        defaultValue: { summary: 'medium' },
        type: { summary: "'small' | 'medium' | 'large'" },
      },
    },
    tone: {
      control: 'select',
      options: ['default', 'negative'],
      description: 'Color tone for destructive actions',
      table: {
        defaultValue: { summary: 'default' },
        type: { summary: "'default' | 'negative'" },
      },
    },
    align: {
      control: 'select',
      options: ['top', 'center'],
      description: 'Vertical alignment of checkbox relative to text',
      table: {
        defaultValue: { summary: 'center' },
        type: { summary: "'top' | 'center'" },
      },
    },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    preselected: { control: 'boolean' },
    hapticFeedback: { control: 'boolean' },
    label: { control: 'text' },
    description: { control: 'text' },
    errorText: { control: 'text' },
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
Checkbox component for binary and mixed-state selections.

## Visual States
- **Unchecked**: Empty box with border
- **Checked**: Filled box with checkmark
- **Indeterminate**: Filled box with minus icon (mixed/partial selection)
- **Preselected**: Outlined box with small checkmark (suggested default)

## Usage Guidelines
- Use for binary yes/no choices
- Use indeterminate for parent checkboxes with partially selected children
- Keep labels concise but descriptive
- Checkboxes without labels MUST have accessibilityLabel
- Always provide testID for Maestro automation
        `,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Unchecked: Story = {
  args: {
    checked: false,
    label: 'Unchecked',
    testID: 'checkbox-unchecked',
  },
};

export const Checked: Story = {
  args: {
    checked: true,
    label: 'Checked',
    testID: 'checkbox-checked',
  },
};

export const Indeterminate: Story = {
  args: {
    checked: false,
    indeterminate: true,
    label: 'Indeterminate',
    testID: 'checkbox-indeterminate',
  },
};

export const Preselected: Story = {
  args: {
    checked: false,
    preselected: true,
    label: 'Preselected',
    testID: 'checkbox-preselected',
  },
};

export const VisualStateComparison: Story = {
  render: () => (
    <Column gap="lg">
      <SectionLabel>All Visual States</SectionLabel>
      <Row gap="xl">
        <Column gap="sm">
          <InteractiveCheckbox label="Unchecked" testID="vs-unchecked" />
          <InteractiveCheckbox
            label="Checked"
            defaultChecked
            testID="vs-checked"
          />
        </Column>
        <Column gap="sm">
          <Checkbox
            label="Indeterminate"
            checked={false}
            indeterminate
            onChange={() => {}}
            testID="vs-indeterminate"
          />
          <Checkbox
            label="Preselected"
            checked={false}
            preselected
            onChange={() => {}}
            testID="vs-preselected"
          />
        </Column>
      </Row>
    </Column>
  ),
};

export const SizeSmall: Story = {
  args: {
    label: 'Small checkbox',
    size: 'small',
    testID: 'checkbox-small',
  },
};

export const SizeMedium: Story = {
  args: {
    label: 'Medium checkbox',
    size: 'medium',
    testID: 'checkbox-medium',
  },
};

export const SizeLarge: Story = {
  args: {
    label: 'Large checkbox',
    size: 'large',
    testID: 'checkbox-large',
  },
};

export const SizeComparison: Story = {
  render: () => (
    <Column gap="xl">
      <Column gap="sm">
        <SectionLabel>Size Scale (16px / 20px / 24px)</SectionLabel>
        <Column gap="md">
          <InteractiveCheckbox label="Small (16px)" size="small" />
          <InteractiveCheckbox label="Medium (20px)" size="medium" />
          <InteractiveCheckbox label="Large (24px)" size="large" />
        </Column>
      </Column>

      <Column gap="sm">
        <SectionLabel>Checked State × Sizes</SectionLabel>
        <Column gap="md">
          <InteractiveCheckbox
            label="Small checked"
            size="small"
            defaultChecked
          />
          <InteractiveCheckbox
            label="Medium checked"
            size="medium"
            defaultChecked
          />
          <InteractiveCheckbox
            label="Large checked"
            size="large"
            defaultChecked
          />
        </Column>
      </Column>

      <Column gap="sm">
        <SectionLabel>With Description × Sizes</SectionLabel>
        <Column gap="md">
          <InteractiveCheckbox
            label="Small"
            description="Helper text for small"
            size="small"
          />
          <InteractiveCheckbox
            label="Medium"
            description="Helper text for medium"
            size="medium"
          />
          <InteractiveCheckbox
            label="Large"
            description="Helper text for large"
            size="large"
          />
        </Column>
      </Column>
    </Column>
  ),
};

export const ToneDefault: Story = {
  args: {
    label: 'Default tone',
    tone: 'default',
    checked: true,
    testID: 'checkbox-tone-default',
  },
};

export const ToneNegative: Story = {
  args: {
    label: 'Delete this item',
    tone: 'negative',
    description: 'This action cannot be undone',
    testID: 'checkbox-tone-negative',
  },
};

export const ToneMatrix: Story = {
  render: () => (
    <Column gap="xl">
      <Column gap="sm">
        <SectionLabel>Default Tone</SectionLabel>
        <Row gap="xl">
          <InteractiveCheckbox label="Unchecked" tone="default" />
          <InteractiveCheckbox label="Checked" tone="default" defaultChecked />
        </Row>
      </Column>

      <Column gap="sm">
        <SectionLabel>Negative Tone</SectionLabel>
        <Row gap="xl">
          <InteractiveCheckbox label="Delete files" tone="negative" />
          <InteractiveCheckbox
            label="Confirm deletion"
            tone="negative"
            defaultChecked
          />
        </Row>
      </Column>

      <Column gap="sm">
        <SectionLabel>Negative × Visual States</SectionLabel>
        <Column gap="md">
          <Checkbox
            label="Unchecked negative"
            tone="negative"
            checked={false}
            onChange={() => {}}
          />
          <Checkbox
            label="Checked negative"
            tone="negative"
            checked={true}
            onChange={() => {}}
          />
          <Checkbox
            label="Indeterminate negative"
            tone="negative"
            checked={false}
            indeterminate
            onChange={() => {}}
          />
        </Column>
      </Column>
    </Column>
  ),
};

export const LabelOnly: Story = {
  args: {
    label: 'Accept terms and conditions',
    testID: 'checkbox-label-only',
  },
};

export const WithDescription: Story = {
  args: {
    label: 'Enable notifications',
    description: 'Get real-time updates about your rides',
    testID: 'checkbox-with-description',
  },
};

export const WithErrorText: Story = {
  args: {
    label: 'Accept terms',
    errorText: 'You must accept the terms to continue',
    testID: 'checkbox-with-error',
  },
};

export const NoLabel: Story = {
  args: {
    accessibilityLabel: 'Select item',
    testID: 'checkbox-no-label',
  },
};

export const LongContent: Story = {
  args: {
    label:
      'I agree to receive marketing emails and promotional offers from the company and its partners',
    description:
      'You can unsubscribe at any time from your account settings. We respect your privacy.',
    testID: 'checkbox-long-content',
  },
  decorators: [withConstrainedWidth],
};

export const ContentVariantsMatrix: Story = {
  render: () => (
    <Column gap="xl">
      <Column gap="sm">
        <SectionLabel>Label Only</SectionLabel>
        <InteractiveCheckbox label="Simple label" />
      </Column>

      <Column gap="sm">
        <SectionLabel>Label + Description</SectionLabel>
        <InteractiveCheckbox
          label="Enable feature"
          description="Additional context about this option"
        />
      </Column>

      <Column gap="sm">
        <SectionLabel>Label + Error</SectionLabel>
        <InteractiveCheckbox
          label="Required field"
          errorText="This field is required"
        />
      </Column>

      <Column gap="sm">
        <SectionLabel>Error Overrides Description</SectionLabel>
        <InteractiveCheckbox
          label="Accept terms"
          description="This description is hidden"
          errorText="You must accept the terms"
        />
      </Column>

      <Column gap="sm">
        <SectionLabel>No Label (Icon Only)</SectionLabel>
        <Row gap="md">
          <InteractiveCheckbox
            accessibilityLabel="Option A"
            testID="no-label-a"
          />
          <InteractiveCheckbox
            accessibilityLabel="Option B"
            defaultChecked
            testID="no-label-b"
          />
          <InteractiveCheckbox
            accessibilityLabel="Option C"
            testID="no-label-c"
          />
        </Row>
      </Column>
    </Column>
  ),
  decorators: [withFullWidth],
};

export const AlignCenter: Story = {
  args: {
    label: 'Center aligned',
    align: 'center',
    testID: 'checkbox-align-center',
  },
};

export const AlignTop: Story = {
  args: {
    label:
      'Top aligned checkbox with a very long label that wraps to multiple lines and needs proper alignment',
    description: 'Helper text also wraps nicely with top alignment',
    align: 'top',
    testID: 'checkbox-align-top',
  },
  decorators: [withConstrainedWidth],
};

export const AlignmentComparison: Story = {
  render: () => <AlignmentComparisonContent />,
};

export const DisabledUnchecked: Story = {
  args: {
    label: 'Disabled unchecked',
    disabled: true,
    checked: false,
    testID: 'checkbox-disabled-unchecked',
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'Disabled checked',
    disabled: true,
    checked: true,
    testID: 'checkbox-disabled-checked',
  },
};

export const DisabledIndeterminate: Story = {
  args: {
    label: 'Disabled indeterminate',
    disabled: true,
    indeterminate: true,
    testID: 'checkbox-disabled-indeterminate',
  },
};

export const DisabledMatrix: Story = {
  render: () => (
    <Column gap="xl">
      <Column gap="sm">
        <SectionLabel>Disabled Visual States</SectionLabel>
        <Column gap="md">
          <Checkbox
            label="Disabled unchecked"
            disabled
            checked={false}
            onChange={() => {}}
          />
          <Checkbox
            label="Disabled checked"
            disabled
            checked={true}
            onChange={() => {}}
          />
          <Checkbox
            label="Disabled indeterminate"
            disabled
            checked={false}
            indeterminate
            onChange={() => {}}
          />
          <Checkbox
            label="Disabled preselected"
            disabled
            checked={false}
            preselected
            onChange={() => {}}
          />
        </Column>
      </Column>

      <Column gap="sm">
        <SectionLabel>Disabled × Sizes</SectionLabel>
        <Column gap="md">
          <Checkbox
            label="Small disabled"
            size="small"
            disabled
            checked={true}
            onChange={() => {}}
          />
          <Checkbox
            label="Medium disabled"
            size="medium"
            disabled
            checked={true}
            onChange={() => {}}
          />
          <Checkbox
            label="Large disabled"
            size="large"
            disabled
            checked={true}
            onChange={() => {}}
          />
        </Column>
      </Column>

      <Column gap="sm">
        <SectionLabel>Disabled with Content</SectionLabel>
        <Column gap="md">
          <Checkbox
            label="Disabled with description"
            description="This option is currently unavailable"
            disabled
            checked={false}
            onChange={() => {}}
          />
          <Checkbox
            label="Disabled with error"
            errorText="Cannot modify this field"
            disabled
            checked={false}
            onChange={() => {}}
          />
        </Column>
      </Column>
    </Column>
  ),
};

export const ErrorUnchecked: Story = {
  args: {
    label: 'Required checkbox',
    errorText: 'This field is required',
    checked: false,
    testID: 'checkbox-error-unchecked',
  },
};

export const ErrorChecked: Story = {
  args: {
    label: 'Invalid selection',
    errorText: 'This option is not available in your region',
    checked: true,
    testID: 'checkbox-error-checked',
  },
};

export const ErrorMatrix: Story = {
  render: () => (
    <Column gap="xl">
      <Column gap="sm">
        <SectionLabel>Error × Visual States</SectionLabel>
        <Column gap="md">
          <Checkbox
            label="Error unchecked"
            errorText="Required field"
            checked={false}
            onChange={() => {}}
          />
          <Checkbox
            label="Error checked"
            errorText="Invalid selection"
            checked={true}
            onChange={() => {}}
          />
          <Checkbox
            label="Error indeterminate"
            errorText="Incomplete selection"
            checked={false}
            indeterminate
            onChange={() => {}}
          />
        </Column>
      </Column>

      <Column gap="sm">
        <SectionLabel>Error × Sizes</SectionLabel>
        <Column gap="md">
          <Checkbox
            label="Small error"
            size="small"
            errorText="Error message"
            checked={false}
            onChange={() => {}}
          />
          <Checkbox
            label="Medium error"
            size="medium"
            errorText="Error message"
            checked={false}
            onChange={() => {}}
          />
          <Checkbox
            label="Large error"
            size="large"
            errorText="Error message"
            checked={false}
            onChange={() => {}}
          />
        </Column>
      </Column>

      <Column gap="sm">
        <SectionLabel>Error + Disabled</SectionLabel>
        <Checkbox
          label="Disabled with error"
          errorText="Cannot modify"
          disabled
          checked={false}
          onChange={() => {}}
        />
      </Column>
    </Column>
  ),
};

export const IndeterminateChecked: Story = {
  args: {
    label: 'Indeterminate + Checked',
    indeterminate: true,
    checked: true,
    description: 'Indeterminate takes visual priority over checked',
    testID: 'checkbox-indeterminate-checked',
  },
};

export const StateCombinationMatrix: Story = {
  render: () => <StateCombinationMatrixContent />,
};

export const ParentChildPattern: Story = {
  render: () => <ParentChildDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Real-world example: Parent checkbox shows indeterminate when children are partially selected. Uses testID for Maestro automation.',
      },
    },
  },
};

export const IndeterminateUseCases: Story = {
  render: () => <IndeterminateUseCasesContent />,
  decorators: [withFullWidth],
};

export const WithHaptics: Story = {
  args: {
    label: 'Tap for haptic feedback',
    hapticFeedback: true,
    testID: 'checkbox-haptic',
  },
};

export const Interaction_RapidToggle: Story = {
  name: 'Interaction: Rapid Toggle',
  render: () => <RapidToggleContent />,
  parameters: {
    docs: {
      description: {
        story:
          'Tests Reanimated animation under rapid user input. Critical for ride checklist flows.',
      },
    },
  },
};

export const Interactive: Story = {
  render: () => (
    <Column gap="lg">
      <SectionLabel>Interactive Checkboxes (Click to Toggle)</SectionLabel>
      <Column gap="md">
        <InteractiveCheckbox label="Toggle me" testID="interactive-1" />
        <InteractiveCheckbox
          label="Toggle with description"
          description="Click to see the animation"
          testID="interactive-2"
        />
        <InteractiveCheckbox
          label="Start checked"
          defaultChecked
          description="Will toggle to unchecked"
          testID="interactive-3"
        />
        <InteractiveCheckbox
          label="With haptic feedback"
          hapticFeedback
          description="Feel the feedback on device"
          testID="interactive-4"
        />
      </Column>
    </Column>
  ),
};

export const Debug_HitSlop: Story = {
  name: 'Debug: Hit Slop Visualization',
  render: () => <HitSlopContent />,
  parameters: {
    docs: {
      description: {
        story:
          'Visualizes the touchable area vs visible icon. Verify 44pt minimum touch target compliance.',
      },
    },
  },
};

export const Performance_FlashList_1k: Story = {
  name: 'Performance: FlashList 1k Items',
  render: () => <FlashListContent />,
  decorators: [withFullWidth],
  parameters: {
    docs: {
      description: {
        story:
          'FlashList stress test with 1,000 items. Verifies no frame drops or layout thrashing during recycling.',
      },
    },
  },
};

export const System_Tokens: Story = {
  name: 'System: Theme Tokens',
  render: () => <SystemTokensContent />,
  parameters: {
    docs: {
      description: {
        story:
          'Prints theme token values programmatically. Prevents documentation rot.',
      },
    },
  },
};

export const Maestro_TestIDs: Story = {
  name: 'Maestro: TestID Convention',
  render: () => <MaestroTestIDsContent />,
  parameters: {
    docs: {
      description: {
        story:
          'Documents testID convention for Maestro E2E testing. All checkboxes should use consistent testID patterns.',
      },
    },
  },
};

export const Controlled_ExplicitState: Story = {
  name: 'Controlled: Explicit State Management',
  render: () => <ControlledStateContent />,
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates explicit controlled state management for integration with form libraries.',
      },
    },
  },
};

export const AccessibilityNoLabel: Story = {
  args: {
    accessibilityLabel: 'Select this item',
    accessibilityHint: 'Double tap to toggle selection',
    testID: 'checkbox-a11y-no-label',
  },
};

export const AccessibilityWithHint: Story = {
  args: {
    label: 'Enable feature',
    accessibilityHint: 'Enables the experimental feature for your account',
    testID: 'checkbox-a11y-hint',
  },
};

export const AccessibilityMatrix: Story = {
  render: () => (
    <Column gap="xl">
      <Column gap="sm">
        <SectionLabel>Accessibility Scenarios</SectionLabel>
        <Column gap="md">
          <Checkbox
            accessibilityLabel="Item 1"
            checked={false}
            onChange={() => {}}
            testID="a11y-no-visible-label"
          />
          <Checkbox
            label="Visible label (auto-used for a11y)"
            checked={false}
            onChange={() => {}}
            testID="a11y-visible-label"
          />
          <Checkbox
            label="Custom a11y label"
            accessibilityLabel="Override label for screen readers"
            checked={false}
            onChange={() => {}}
            testID="a11y-custom-label"
          />
          <Checkbox
            label="With hint"
            accessibilityHint="Additional context for what this does"
            checked={false}
            onChange={() => {}}
            testID="a11y-with-hint"
          />
          <Checkbox
            label="Indeterminate state"
            indeterminate
            checked={false}
            onChange={() => {}}
            accessibilityHint="Partially selected"
            testID="a11y-indeterminate"
          />
        </Column>
      </Column>
    </Column>
  ),
};

export const OnDarkBackground: Story = {
  args: {
    label: 'Checkbox on dark',
    checked: true,
    testID: 'checkbox-dark-bg',
  },
  decorators: [withDarkBackground],
};

export const ThemeComparison: Story = {
  render: () => <ThemeComparisonContent />,
  decorators: [],
};

export const FormFieldGroup: Story = {
  render: () => (
    <Column gap="xl">
      <Column gap="sm">
        <SectionLabel>Notification Preferences</SectionLabel>
        <Column gap="sm">
          <InteractiveCheckbox
            label="Email notifications"
            description="Receive updates via email"
            defaultChecked
            testID="form-email"
          />
          <InteractiveCheckbox
            label="Push notifications"
            description="Receive updates on your device"
            defaultChecked
            testID="form-push"
          />
          <InteractiveCheckbox
            label="SMS notifications"
            description="Receive updates via text message"
            testID="form-sms"
          />
        </Column>
      </Column>

      <Spacer size="sm" />

      <Column gap="sm">
        <SectionLabel>Privacy Settings</SectionLabel>
        <Column gap="sm">
          <InteractiveCheckbox
            label="Share usage data"
            description="Help us improve by sharing anonymous usage statistics"
            testID="form-usage"
          />
          <InteractiveCheckbox
            label="Marketing emails"
            description="Receive promotional content and offers"
            testID="form-marketing"
          />
        </Column>
      </Column>
    </Column>
  ),
  decorators: [withFullWidth],
};

export const RequiredField: Story = {
  render: () => <RequiredFieldContent />,
};

export const KitchenSink: Story = {
  render: () => <KitchenSinkContent />,
  decorators: [withFullWidth],
};
