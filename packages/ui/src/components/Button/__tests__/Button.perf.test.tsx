/**
 * Reassure Performance Tests for Button Component
 * Measures render performance to detect regressions
 */
import { Home, Settings, User } from 'lucide-react-native';
import { measureRenders } from 'reassure';

import { Button } from '..';

describe('Button Performance Tests', () => {
  // Test 1: Static button with no props changes
  it('renders static button', async () => {
    await measureRenders(<Button label="Static Button" />);
  });

  // Test 2: Button with all common props
  it('renders button with common props', async () => {
    await measureRenders(
      <Button
        label="Common Button"
        size="medium"
        hierarchy="primary"
        shape="rect"
        tone="default"
      />
    );
  });

  // Test 3: Button with icon
  it('renders button with icon', async () => {
    await measureRenders(
      <Button label="Icon Button" size="medium" leadingIcon={Home} />
    );
  });

  // Test 4: Icon-only button
  it('renders icon-only button', async () => {
    await measureRenders(
      <Button
        label="Icon Only"
        size="medium"
        shape="circle"
        leadingIcon={Home}
      />
    );
  });

  // Test 5: Loading state
  it('renders loading button', async () => {
    await measureRenders(
      <Button label="Loading" size="medium" loading={true} />
    );
  });

  // Test 6: Disabled state
  it('renders disabled button', async () => {
    await measureRenders(
      <Button label="Disabled" size="medium" disabled={true} />
    );
  });

  // Test 7: Different sizes
  it('renders small button', async () => {
    await measureRenders(<Button label="Small" size="small" />);
  });

  it('renders medium button', async () => {
    await measureRenders(<Button label="Medium" size="medium" />);
  });

  it('renders large button', async () => {
    await measureRenders(<Button label="Large" size="large" />);
  });

  // Test 8: Different hierarchies
  it('renders primary button', async () => {
    await measureRenders(<Button label="Primary" hierarchy="primary" />);
  });

  it('renders secondary button', async () => {
    await measureRenders(<Button label="Secondary" hierarchy="secondary" />);
  });

  it('renders tertiary button', async () => {
    await measureRenders(<Button label="Tertiary" hierarchy="tertiary" />);
  });

  // Test 9: Different shapes
  it('renders rect button', async () => {
    await measureRenders(
      <Button label="Rectangle" size="medium" shape="rect" />
    );
  });

  it('renders pill button', async () => {
    await measureRenders(<Button label="Pill" size="medium" shape="pill" />);
  });

  it('renders circle button', async () => {
    await measureRenders(
      <Button
        label="Circle"
        size="medium"
        shape="circle"
        leadingIcon={Settings}
      />
    );
  });

  it('renders square button', async () => {
    await measureRenders(
      <Button label="Square" size="medium" shape="square" leadingIcon={User} />
    );
  });

  // Test 10: Negative tone
  it('renders negative tone button', async () => {
    await measureRenders(
      <Button label="Delete" hierarchy="primary" tone="negative" />
    );
  });

  // Test 11: Complex button with multiple props
  it('renders complex button', async () => {
    await measureRenders(
      <Button
        label="Complex Button"
        size="large"
        hierarchy="primary"
        shape="pill"
        tone="default"
        leadingIcon={User}
        trailingIcon={Settings}
        widthMode="intrinsic"
      />
    );
  });

  // Test 12: Button with width modes
  it('renders fixed-width button', async () => {
    await measureRenders(
      <Button label="Fixed Width" size="medium" widthMode="fixed" />
    );
  });

  it('renders intrinsic width button', async () => {
    await measureRenders(
      <Button label="Intrinsic Width" size="medium" widthMode="intrinsic" />
    );
  });

  // Test 13: Stress test with rapid prop changes
  it('handles rapid prop changes', async () => {
    await measureRenders(<Button label="Changing Button" size="medium" />, {
      scenario: async (screen) => {
        // Simulate rapid prop changes
        screen.rerender(
          <Button label="Changed 1" size="large" hierarchy="secondary" />
        );
        screen.rerender(
          <Button label="Changed 2" size="small" hierarchy="tertiary" />
        );
        screen.rerender(
          <Button label="Changed 3" size="medium" hierarchy="primary" loading />
        );
      },
    });
  });

  // Test 14: Button with onPress handler
  it('renders button with onPress', async () => {
    const handlePress = () => console.warn('Pressed');
    await measureRenders(
      <Button label="Press Me" size="medium" onPress={handlePress} />
    );
  });

  // Test 15: Multiple buttons (list scenario)
  it('renders multiple buttons efficiently', async () => {
    await measureRenders(
      <>
        <Button label="Button 1" size="medium" hierarchy="primary" />
        <Button label="Button 2" size="medium" hierarchy="secondary" />
        <Button label="Button 3" size="medium" hierarchy="tertiary" />
        <Button label="Button 4" size="small" hierarchy="primary" />
        <Button label="Button 5" size="large" hierarchy="secondary" />
      </>
    );
  });
});
