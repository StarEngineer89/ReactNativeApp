import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';
import { palette } from 'src/config';

interface DotProps {
  index: number;
  activeDotIndex: Animated.SharedValue<number>;
}

const AnimatedDot = ({ activeDotIndex, index }: DotProps) => {
  const rDotStyle = useAnimatedStyle(() => {
    const isActive = activeDotIndex.value === index;

    return {
      backgroundColor: isActive ? palette.gradient_2 : palette.white,
      borderColor: isActive ? palette.gradient_2 : palette.ebony,
    };
  });

  return <Animated.View style={[styles.dot, rDotStyle]} />;
};

const styles = StyleSheet.create({
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 1,
  },
});

export default AnimatedDot;
