# Button Component - Uber Base Design System Implementation

## Migration Guide: Your Current → Uber Spec

### Breaking Changes

| Before              | After                  | Notes                         |
| ------------------- | ---------------------- | ----------------------------- |
| `kind`              | `hierarchy`            | Semantic rename               |
| `kind="minimal"`    | `hierarchy="tertiary"` | Use tertiary for low-emphasis |
| `kind="danger"`     | `tone="negative"`      | Destructive is now a modifier |
| `size="compact"`    | `size="small"`         | Aligned with Uber naming      |
| `size="default"`    | `size="medium"`        | Aligned with Uber naming      |
| `shape="default"`   | `shape="rect"`         | Explicit shape name           |
| `shape="round"`     | `shape="pill"`         | + added `circle`, `square`    |
| `startEnhancer`     | `leadingIcon`          | Semantic rename               |
| `endEnhancer`       | `trailingIcon`         | Semantic rename               |
| `isLoading`         | `loading`              | Simplified prop name          |
| `fullWidth`         | `widthMode="fixed"`    | More explicit control         |
| `children` (string) | `label`                | Required prop                 |

### New Props

| Prop        | Type                      | Description                   |
| ----------- | ------------------------- | ----------------------------- |
| `widthMode` | `'fixed' \| 'intrinsic'`  | Controls width behavior       |
| `tone`      | `'default' \| 'negative'` | Destructive styling           |
| `active`    | `boolean`                 | Toggle state (secondary only) |

---

## What Changed (Uber Spec Compliance)

### 1. Corner Radius

```diff
- compact:  8px
- default: 12px  // WRONG
- large:   16px  // WRONG

+ ALL rect buttons: 8px (Uber spec page 34)
+ pill: height / 2
+ circle: height / 2
+ square: 8px
```

### 2. Pressed State (MAJOR)

```diff
- opacity: theme.opacity.pressed
- transform: [{ scale: 0.98 }]

+ Primary:   rgba(255, 255, 255, 0.20) overlay
+ Secondary: rgba(0, 0, 0, 0.08) overlay
+ Tertiary:  rgba(0, 0, 0, 0.08) overlay
+ NO scale transform
```

### 3. Disabled State

```diff
- opacity: theme.opacity.disabled

+ backgroundColor: theme.colors.backgroundStateDisabled
+ color: theme.colors.contentStateDisabled
```

### 4. Touch Target (48px minimum)

```diff
- No hitSlop

+ Small (36px): hitSlop={{ top: 6, bottom: 6 }}
+ Medium (48px): hitSlop={{ top: 0, bottom: 0 }}
+ Large (56px): hitSlop={{ top: 0, bottom: 0 }}
```

### 5. Icon Gaps

```diff
- compact: 4px
- default: 8px
- large:  12px

+ ALL sizes: 8px (Uber spec consistent)
```

### 6. Pill Min-Width

```diff
- No minimum width

+ minWidth = height + 24
+ Small pill:  60px
+ Medium pill: 72px
+ Large pill:  80px
```

### 7. Loading Spinner Size

```diff
- ActivityIndicator size="small" (always)

+ Small:  16px (matches icon)
+ Medium: 20px (matches icon)
+ Large:  24px (matches icon)
```

### 8. Fixed Width Layout

```diff
- All content centered

+ Leading icon + label: CENTER together
+ Trailing icon: PINS to right edge
```

### 9. Shapes Added

```diff
- Only: default, round

+ rect:   8px radius, standard CTA
+ pill:   height/2 radius, inline controls
+ circle: Icon-only, full circle
+ square: Icon-only, square with 8px radius
```

### 10. Semantic Tokens

```diff
- theme.colors.primary
- theme.colors.primaryForeground

+ theme.colors.backgroundInversePrimary
+ theme.colors.contentInversePrimary
+ theme.colors.backgroundSecondary
+ theme.colors.contentPrimary
+ theme.colors.backgroundStateDisabled
+ theme.colors.contentStateDisabled
+ theme.colors.backgroundNegative
+ theme.colors.contentNegative
```

---

## Uber Spec Quick Reference

### Hierarchy Usage

| Hierarchy | Count             | Purpose                   |
| --------- | ----------------- | ------------------------- |
| Primary   | **1 per context** | Main forward action       |
| Secondary | Many              | Most inline actions       |
| Tertiary  | A few             | Dismissive (cancel, skip) |

### Size Dimensions

| Size   | Height | Icon | Font  | Padding |
| ------ | ------ | ---- | ----- | ------- |
| Small  | 36px   | 16px | 14/20 | 12px    |
| Medium | 48px   | 20px | 16/20 | 16px    |
| Large  | 56px   | 24px | 18/24 | 16/20px |

### Destructive Pattern

1. Initial: `hierarchy="secondary" tone="negative"` (gray bg, red text)
2. Confirmation: `hierarchy="primary" tone="negative"` (red bg, white text)

### Label Guidelines

- ✅ 1-3 words
- ✅ Sentence case
- ✅ Action verbs: "Save", "Request", "Confirm"
- ❌ UPPERCASE
- ❌ Symbols (+)
- ❌ "Yes" / "No" (use specific verbs)

### Icon Semantics

- **Leading**: Reinforces meaning (❤️ Favorites)
- **Trailing**: Indicates affordance (▼ dropdown)

---

## Usage Examples

```tsx
// Primary CTA (1 per context)
<Button
  label="Confirm ride"
  hierarchy="primary"
  widthMode="fixed"
  onPress={handleConfirm}
/>

// Secondary action
<Button
  label="Change"
  hierarchy="secondary"
  size="small"
  onPress={handleChange}
/>

// Tertiary dismiss
<Button
  label="Not now"
  hierarchy="tertiary"
  onPress={handleDismiss}
/>

// Destructive (secondary)
<Button
  label="Delete"
  hierarchy="secondary"
  tone="negative"
  onPress={handleDelete}
/>

// Destructive confirmation (primary)
<Button
  label="Delete my account"
  hierarchy="primary"
  tone="negative"
  onPress={handleConfirmDelete}
/>

// Icon-only circle button
<Button
  label="" // Still needed for types but not displayed
  hierarchy="secondary"
  shape="circle"
  leadingIcon={HeartIcon}
  accessibilityLabel="Add to favorites"
  onPress={handleFavorite}
/>

// Pill with icons
<Button
  label="Favorites"
  hierarchy="secondary"
  shape="pill"
  leadingIcon={HeartIcon}
  trailingIcon={ChevronDownIcon}
  onPress={handleOpen}
/>

// Loading state
<Button
  label="Saving..."
  loading
  onPress={handleSave}
/>

// Toggle (active state)
<Button
  label="Filter"
  hierarchy="secondary"
  active={isFilterActive}
  onPress={toggleFilter}
/>
```

---

## Accessibility Checklist

- [ ] Icon-only buttons have `accessibilityLabel`
- [ ] External links use `accessibilityHint="Opens in X app"`
- [ ] Avoid disabled state - show errors on press instead
- [ ] One primary button per screen/context
- [ ] Touch targets are 48px minimum
