import { Home, Settings, User } from 'lucide-react-native';
import { measureRenders } from 'reassure';

import { Button } from '..';

describe('Button Performance Tests', () => {
  it('renders static button', async () => {
    await measureRenders(<Button label="Static Button" />);
  });

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

  it('renders button with icon', async () => {
    await measureRenders(
      <Button label="Icon Button" size="medium" leadingIcon={Home} />
    );
  });

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

  it('renders loading button', async () => {
    await measureRenders(
      <Button label="Loading" size="medium" loading={true} />
    );
  });

  it('renders disabled button', async () => {
    await measureRenders(
      <Button label="Disabled" size="medium" disabled={true} />
    );
  });

  it('renders small button', async () => {
    await measureRenders(<Button label="Small" size="small" />);
  });

  it('renders medium button', async () => {
    await measureRenders(<Button label="Medium" size="medium" />);
  });

  it('renders large button', async () => {
    await measureRenders(<Button label="Large" size="large" />);
  });

  it('renders primary button', async () => {
    await measureRenders(<Button label="Primary" hierarchy="primary" />);
  });

  it('renders secondary button', async () => {
    await measureRenders(<Button label="Secondary" hierarchy="secondary" />);
  });

  it('renders tertiary button', async () => {
    await measureRenders(<Button label="Tertiary" hierarchy="tertiary" />);
  });

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

  it('renders negative tone button', async () => {
    await measureRenders(
      <Button label="Delete" hierarchy="primary" tone="negative" />
    );
  });

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

  it('handles rapid prop changes', async () => {
    await measureRenders(<Button label="Changing Button" size="medium" />, {
      scenario: async (screen) => {
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

  it('renders button with onPress', async () => {
    const handlePress = () => console.warn('Pressed');
    await measureRenders(
      <Button label="Press Me" size="medium" onPress={handlePress} />
    );
  });

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
