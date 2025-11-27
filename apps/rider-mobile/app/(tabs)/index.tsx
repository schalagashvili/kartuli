import { ScrollView } from 'react-native';

import CheckboxGallery from '@/app/dev/CheckBoxGallery';

// import { ButtonRenderCounter } from '@kartuli/ui';

export default function HomeScreen() {
  return (
    <ScrollView style={{ padding: 20, marginTop: 50 }}>
      {/* <QuickButtonTest /> */}

      <CheckboxGallery />
      {/* <HelloWave /> */}

      {/* <ButtonRenderCounter /> */}
      {/* <ButtonListPerformanceTest /> */}
    </ScrollView>
  );
}
