# Button Performance Testing Guide

## 🎯 Quick Start (5 minutes)

### 1. Add to Your App

```tsx
// In App.tsx or any screen
import { QuickButtonTest } from '@kartuli/ui/components/Button/__tests__/QuickTest';

export default function App() {
  return <QuickButtonTest />;
}
```

### 2. Run and Observe

1. Open React Native DevTools console
2. Click "Force Parent Re-render" button several times
3. Watch the metrics and console logs

### 3. Interpret Results

**✅ GOOD (No optimization needed):**

```
Parent renders: 5
Button renders: 1
✅ Good: Button only re-renders when props change
```

**⚠️ BAD (Optimization needed):**

```
Parent renders: 5
Button renders: 6
⚠️ Warning: Button re-rendering too often!
```

---

## 🔬 The Problem

`styles.useVariants()` is called on every render:

```typescript
// Current implementation (Button.tsx:79-88)
styles.useVariants({
  hierarchy, // ← New object created every render
  size,
  shape,
  widthMode: effectiveWidthMode,
  tone: tone === 'default' ? undefined : tone,
  disabled,
  active,
  loading,
});
```

**Potential Issue:**

- Creating new object `{ hierarchy, size, ... }` on every render
- If Unistyles doesn't memoize internally, it recalculates styles unnecessarily
- Could cause child components to re-render

---

## 🧪 Testing Approach

### Test 1: Quick Test ⚡

**Time:** 2 minutes
**File:** `QuickTest.tsx`

```tsx
import { QuickButtonTest } from '@kartuli/ui/components/Button/__tests__/QuickTest';

<QuickButtonTest />;
```

**What it tests:**

- Does button re-render when parent re-renders?
- Are renders efficient?

---

### Test 2: Comprehensive Tests 📊

**Time:** 10 minutes
**File:** `Button.perf.test.tsx`

```tsx
import {
  ButtonRenderCounter,
  UseVariantsPerformanceTest
} from '@kartuli/ui/components/Button/__tests__/Button.perf.test';

// Test render counting
<ButtonRenderCounter />

// Test with many buttons
<UseVariantsPerformanceTest />
```

**What it tests:**

- Render counts across various scenarios
- Performance with 50+ buttons
- Stress test (60fps prop changes)

---

### Test 3: Direct Comparison 🆚

**Time:** 5 minutes
**File:** `comparison.test.tsx`

```tsx
import { ButtonComparisonTest } from '@kartuli/ui/components/Button/__tests__/comparison.test';

<ButtonComparisonTest />;
```

**What it tests:**

- Side-by-side: Current vs Optimized
- React Profiler measurements
- Actual timing differences

---

## 🛠️ The Fix (If Needed)

### Before (Current)

```typescript
// Button.tsx:79-88
styles.useVariants({
  hierarchy,
  size,
  shape,
  widthMode: effectiveWidthMode,
  tone: tone === 'default' ? undefined : tone,
  disabled,
  active,
  loading,
});
```

### After (Optimized)

```typescript
// Memoize variant config
const variantConfig = useMemo(
  () => ({
    hierarchy,
    size,
    shape,
    widthMode: effectiveWidthMode,
    tone: tone === 'default' ? undefined : tone,
    disabled,
    active,
    loading,
  }),
  [hierarchy, size, shape, effectiveWidthMode, tone, disabled, active, loading]
);

styles.useVariants(variantConfig);
```

**Copy from:** `Button.optimized.example.tsx`

---

## 📈 Expected Results

### Scenario 1: Unistyles is Smart ✅

**Results:**

- Current and optimized perform identically
- Button doesn't re-render when parent re-renders
- No performance issues

**Action:** Keep current implementation (simpler code)

---

### Scenario 2: Unistyles is Naive ⚠️

**Results:**

- Optimized version is 20-50% faster
- Current version re-renders unnecessarily
- Performance issues with many buttons

**Action:** Apply optimization from `Button.optimized.example.tsx`

---

## 🎓 What We're Testing

### React Re-render Basics

```tsx
// Parent component
const Parent = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <button onClick={() => setCount((c) => c + 1)}>Re-render parent</button>

      {/* Child with SAME props */}
      <Button label="Static" size="medium" />
    </>
  );
};
```

**Question:** Does `Button` re-render when `Parent` re-renders?

**Should be:** NO (thanks to `React.memo`)
**If yes:** `styles.useVariants` is breaking memoization

---

### Why Object Recreation Matters

```typescript
// ❌ BAD: New object every render
styles.useVariants({ size, color }); // { size: 'medium', color: 'red' }

// Even if size and color don't change, the object reference is NEW
// React sees it as a different value
```

```typescript
// ✅ GOOD: Same object reference if deps unchanged
const config = useMemo(() => ({ size, color }), [size, color]);
styles.useVariants(config);

// useMemo returns the SAME object if size/color unchanged
// React knows nothing changed
```

---

## 🔍 Debugging Tips

### Console Logs

```typescript
// Add to Button.tsx (inside component)
useEffect(() => {
  console.log('[Button] Rendered', { hierarchy, size, shape });
});
```

### React DevTools Profiler

1. Open React DevTools
2. Go to "Profiler" tab
3. Click record
4. Force parent re-render
5. Stop recording
6. Check Button component flame graph

**Good:** Button not in flame graph (didn't render)
**Bad:** Button in flame graph (rendered unnecessarily)

---

## 📊 Benchmark Template

| Test             | Device    | Current   | Optimized | Improvement |
| ---------------- | --------- | --------- | --------- | ----------- |
| Single render    | iPhone 12 | \_\_\_ms  | \_\_\_ms  | \_\_\_%     |
| Parent re-render | iPhone 12 | \_\_\_ms  | \_\_\_ms  | \_\_\_%     |
| 50 buttons       | iPhone 12 | \_\_\_ms  | \_\_\_ms  | \_\_\_%     |
| Stress test      | iPhone 12 | \_\_\_fps | \_\_\_fps | \_\_\_%     |

---

## 🎯 Success Criteria

**Ship current implementation if:**

- ✅ Button doesn't re-render when parent re-renders (props unchanged)
- ✅ Single button renders in < 16ms (60fps)
- ✅ 50 buttons render in < 100ms
- ✅ Stress test stays smooth

**Apply optimization if:**

- ❌ Button re-renders every time parent re-renders
- ❌ Single button renders in > 50ms
- ❌ 50 buttons render in > 500ms
- ❌ Stress test stutters/janks

---

## 📚 Further Reading

- [React Profiler API](https://react.dev/reference/react/Profiler)
- [When to useMemo](https://react.dev/reference/react/useMemo#should-you-add-usememo-everywhere)
- [React.memo deep dive](https://react.dev/reference/react/memo)
- [Unistyles Performance](https://reactnativeunistyles.vercel.app/start/performance/)

---

## 🤝 Contributing Results

If you run these tests, please share results:

```bash
# Create issue with results
Device: iPhone 12
OS: iOS 17.1
Test: QuickTest
Result: ✅ No re-renders when parent changes
Metrics: 1 render for 10 parent re-renders

Current implementation is optimal!
```

This helps us know if optimization is needed for production! 🚀
