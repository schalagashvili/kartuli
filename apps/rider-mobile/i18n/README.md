# Rider App Translations

This directory contains the i18n setup for the Rider mobile app.

## Structure

```
i18n/
├── locales/           # Translation files
│   ├── en/
│   │   └── rider.json # English translations for rider namespace
│   └── ka/
│       └── rider.json # Georgian translations for rider namespace
├── namespaces.ts      # Namespace registry (central place for all namespaces)
├── index.ts           # i18n setup and initialization
├── useRiderTranslation.ts # Rider-specific translation hook
└── README.md          # This file
```

## Adding a New Namespace

When your app grows and you need to add a new translation domain (e.g., `orders`, `settings`, `profile`), follow these steps:

### 1. Create Translation Files

Create the translation files for your new namespace:

```bash
# Create English translations
touch locales/en/orders.json

# Create Georgian translations
touch locales/ka/orders.json
```

Add your translations:

```json
// locales/en/orders.json
{
  "title": "Orders",
  "emptyState": "No orders yet",
  "viewDetails": "View Details"
}
```

```json
// locales/ka/orders.json
{
  "title": "შეკვეთები",
  "emptyState": "შეკვეთები არ არის",
  "viewDetails": "დეტალების ნახვა"
}
```

### 2. Register in Namespaces Registry

Add your namespace to `namespaces.ts`:

```typescript
import enOrders from './locales/en/orders.json';
import enRider from './locales/en/rider.json';
// ✅ Import new namespace
import kaOrders from './locales/ka/orders.json';
import kaRider from './locales/ka/rider.json';

// ✅ Import new namespace

export const namespaces = {
  rider: {
    en: enRider,
    ka: kaRider,
  },
  orders: {
    // ✅ Add new namespace
    en: enOrders,
    ka: kaOrders,
  },
} as const;

export type RiderKey = keyof typeof enRider;
export type OrdersKey = keyof typeof enOrders; // ✅ Export type
```

That's it! The namespace will be automatically registered when the app starts.

### 3. (Optional) Create a Custom Hook

For convenience, create a hook for your namespace:

```typescript
// useOrdersTranslation.ts
import { useTranslation } from '@kartuli/state';

import type { OrdersKey } from './namespaces';

export function useOrdersTranslation() {
  const { locale, setLocale, t, tc } = useTranslation();

  return {
    locale,
    setLocale,
    tc,
    to: (key: OrdersKey): string => t(`orders.${key}`),
  };
}
```

## Usage

### Using the General Hook

```typescript
import { useTranslation } from '@kartuli/state';

function MyComponent() {
  const { t } = useTranslation();

  return <Text>{t('rider.goOnline')}</Text>;
}
```

### Using the Namespace-Specific Hook

```typescript
import { useRiderTranslation } from '@/i18n/useRiderTranslation';

function MyComponent() {
  const { tr, locale, setLocale } = useRiderTranslation();

  return <Text>{tr('goOnline')}</Text>;  // Auto-prefixes with 'rider.'
}
```

### Using the Helper Function

```typescript
import { tr } from '@/i18n';

const title = tr('goOnline'); // Returns translated string
```

## Best Practices

1. **One namespace per domain** - Don't mix unrelated translations in the same namespace
2. **Descriptive keys** - Use clear, hierarchical keys: `orders.details.title` instead of `ordersTitle`
3. **Keep it DRY** - Use the `common` namespace (from `@kartuli/core`) for shared strings
4. **Type-safe** - Always export types for your namespace keys
5. **Co-locate** - Keep translation files close to where they're used

## Naming Conventions

- **Files**: `lowercase.json` (e.g., `rider.json`, `orders.json`)
- **Namespaces**: `lowercase` (e.g., `rider`, `orders`)
- **Keys**: `camelCase` (e.g., `goOnline`, `viewDetails`)
- **Hooks**: `use[Namespace]Translation` (e.g., `useRiderTranslation`)
- **Helpers**: `t[namespace-initial]` (e.g., `tr` for rider, `to` for orders)
