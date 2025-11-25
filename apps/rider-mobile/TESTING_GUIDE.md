# Button Performance Testing Guide

## 🚀 How to Run the Tests

### Method 1: Dedicated Test Screen (Recommended)

Navigate to the test screen in your app:

```
/button-test
```

**In your app:**

1. Open your app
2. Navigate to `/button-test` route
3. Choose a test from the tabs
4. Follow on-screen instructions

### Method 2: Add to Existing Screen

```tsx
// In any screen (e.g., app/(tabs)/index.tsx)
import { QuickButtonTest } from '@kartuli/ui';

export default function YourScreen() {
  return <QuickButtonTest />;
}
```

---

## 📊 Available Tests

### 1. **Quick Test** ⚡ (2 minutes)

**What it does:**

- Shows render count metrics
- Tests if Button re-renders when parent re-renders
- Provides instant visual feedback

**How to interpret:**

- ✅ Good: Button renders = 1 (doesn't increase when parent re-renders)
- ⚠️ Bad: Button renders increase with every parent re-render

**Console output:**

```
[QuickButtonTest] Button render #1 - 12ms since last render
[QuickButtonTest] Button render #2 - 145ms since last render
```

---

### 2. **Render Counter Test** 📈 (5 minutes)

**What it does:**

- Multiple test scenarios
- Static props test
- Parent re-render test
- Toggle props test
- Same props / different references test

**Look for:**

- Static props button should render once
- Button shouldn't re-render when parent re-renders
- Button SHOULD re-render when props actually change

---

### 3. **useVariants Performance Test** 🔬 (10 minutes)

**Sub-tests:**

#### Test 1: Many Buttons (50 instances)

- Renders 50 buttons with different variants
- Check console for total render time
- Should be < 100ms on modern devices

#### Test 2: Variant Changes

- Change size/hierarchy/tone
- Each change should cause exactly ONE re-render
- Console logs show render count

#### Test 3: Stress Test (60fps)

- Updates button props 60 times per second
- Tests performance under load
- Should stay smooth, no jank

**How to run:**

1. Click tabs to switch between tests
2. Watch console for performance logs
3. Check for smooth animations

---

### 4. **Comparison Test** 🆚 (5 minutes)

**What it does:**

- Side-by-side comparison of current vs optimized Button
- Uses React Profiler for accurate measurements
- Shows average render times

**How to interpret:**

- If times are similar → No optimization needed
- If optimized is significantly faster → Apply optimization

**Look for:**

```
Current Button: 12.5ms avg render time
Optimized Button: 12.3ms avg render time
Improvement: ~0%

✅ No optimization needed!
```

---

### 5. **Simple Render Test** 🔍 (1 minute)

**What it does:**

- Console-based logging
- Two buttons: static vs dynamic
- Clear visual of render behavior

**Console output:**

```
[Static Button] Render #1
[Dynamic Button] Render #1
[Dynamic Button] Render #2
[Dynamic Button] Render #3

✅ Static button only rendered once
```

---

## 🎯 What to Look For

### ✅ **Good Performance (Current Implementation is Fine)**

1. **Render Count:**
   - Static button renders once
   - Parent re-renders don't trigger button re-renders
   - Button only re-renders when props change

2. **Timing:**
   - Single button: < 16ms (60fps)
   - 50 buttons: < 100ms
   - Stress test: Smooth, no stutter

3. **Console Logs:**
   ```
   [ButtonRenderCounter] Render #1
   // Parent re-renders 10 times
   // Button still at Render #1 ✅
   ```

---

### ⚠️ **Bad Performance (Optimization Needed)**

1. **Render Count:**
   - Button re-renders every time parent re-renders
   - Render count grows unnecessarily

2. **Timing:**
   - Single button: > 50ms
   - 50 buttons: > 500ms
   - Stress test: Stutters, drops frames

3. **Console Logs:**
   ```
   [ButtonRenderCounter] Render #1
   [ButtonRenderCounter] Render #2
   [ButtonRenderCounter] Render #3
   // Re-rendering on every parent update ❌
   ```

---

## 🛠️ If Optimization is Needed

### Apply the useMemo Fix

**File:** `packages/ui/src/components/Button/Button.tsx`

**Current (line 79-88):**

```typescript
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

**Optimized:**

```typescript
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

**Copy from:** `packages/ui/src/components/Button/Button.optimized.example.tsx`

---

## 📱 Running in Expo

### Start the app:

```bash
cd apps/rider-mobile
npx expo start
```

### Navigate to test screen:

- Press `i` for iOS simulator
- Press `a` for Android emulator
- Or scan QR code with Expo Go

### Open the test:

```
http://localhost:8081/button-test
```

---

## 🐛 Debugging Tips

### Enable React DevTools Profiler

1. Open React DevTools
2. Go to "Profiler" tab
3. Click record (⭕)
4. Force parent re-render in test
5. Stop recording
6. Check flame graph

**Good:** Button not in flame graph (didn't render)
**Bad:** Button in flame graph (rendered unnecessarily)

### Console Filtering

```bash
# Filter button-related logs
console.log('[Button]', ...)
console.log('[QuickButtonTest]', ...)

# In Chrome DevTools, filter by:
[Button]
```

---

## 📊 Record Your Results

| Device    | Test        | Result      | Notes         |
| --------- | ----------- | ----------- | ------------- |
| iPhone 12 | Quick Test  | ✅ 1 render | No re-renders |
| iPhone 12 | 50 Buttons  | ✅ 89ms     | Fast          |
| iPhone 12 | Stress Test | ✅ Smooth   | No jank       |
| iPhone 12 | Comparison  | ✅ Similar  | No opt needed |

---

## ✅ Success Criteria

**Ship current implementation if:**

- ✅ Button doesn't re-render when parent re-renders (props unchanged)
- ✅ Render times are good (< 16ms single, < 100ms batch)
- ✅ Stress test stays smooth
- ✅ Comparison shows no significant difference

**Apply optimization if:**

- ❌ Button re-renders on every parent re-render
- ❌ Render times are slow (> 50ms)
- ❌ Stress test stutters
- ❌ Optimized version is 20%+ faster

---

## 🎓 Understanding the Tests

### Why Test Re-renders?

React's `memo` should prevent re-renders when props don't change. But if we create new object references on every render (like `{ hierarchy, size, ... }`), React thinks props changed.

```typescript
// ❌ New object every render (even if values same)
styles.useVariants({ size: 'medium' });

// ✅ Memoized object (same reference if values unchanged)
const config = useMemo(() => ({ size: 'medium' }), [size]);
styles.useVariants(config);
```

### What We're Measuring

1. **Render frequency:** How often component re-renders
2. **Render duration:** How long each render takes
3. **User perception:** Is it smooth or janky?

All three matter for performance!

---

## 📞 Need Help?

If results are unclear or unexpected:

1. Share console output
2. Share device/OS info
3. Share recorded metrics
4. Open issue with test results

Happy testing! 🚀
