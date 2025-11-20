import Animated from 'react-native-reanimated';

const HelloWave = () => {
  return (
    <Animated.Text
      style={{
        fontSize: 28,
        lineHeight: 32,
        marginTop: -6,
        animationName: {
          '50%': { transform: [{ rotate: '25deg' }] },
        },
        animationIterationCount: 4,
        animationDuration: '300ms',
      }}
    >
      👋
    </Animated.Text>
  );
};

export { HelloWave };

HelloWave.whyDidYouRender = true;
