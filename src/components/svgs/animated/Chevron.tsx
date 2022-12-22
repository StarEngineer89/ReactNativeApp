import React from 'react';
import { StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Animated, { useAnimatedStyle, useDerivedValue, withSpring } from 'react-native-reanimated';
import { StyleGuide } from 'src/config';

let size = StyleGuide.sizes.menuDotSize;

const styles = StyleSheet.create({
  container: {
    height: size,
    width: size,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

interface ChevronProps {
  open: Boolean;
}

const Chevron = ({ open }: ChevronProps) => {
  const rotateZ = useDerivedValue(() => {
    return withSpring(open ? 0 : -Math.PI / 2);
  });

  const style = useAnimatedStyle(() => {
    return {
      transform: [{ rotateZ: `${rotateZ.value}rad` }],
    };
  });
  return (
    <Animated.View style={[styles.container, style]}>
      <Svg
        width={24}
        height={24}
        viewBox='0 0 24 24'
        fill='none'
        stroke='white'
        strokeWidth={2}
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <Path d='M6 9l6 6 6-6' />
      </Svg>
    </Animated.View>
  );
};

export default Chevron;
