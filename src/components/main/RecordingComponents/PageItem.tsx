import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { interpolate, useAnimatedStyle, Extrapolate, SharedValue } from 'react-native-reanimated';
import useDeviceInfo from '../../../hooks/useDeviceInfo';
import { palette } from '../../../config';
import { isPad } from 'src/functions';

const IMAGE_SIZE = isPad() ? 240 : 200;
const IMAGE_BORDER = isPad() ? 35 : 25;

interface Props {
  category: any; // TODO: type this
  translateX: SharedValue<number>;
  index: number;
}

const PageItem = ({ category, translateX, index }: Props) => {
  const { width, isLandscape } = useDeviceInfo();

  const rImage = useAnimatedStyle(() => {
    const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

    const scale = interpolate(translateX.value, inputRange, [0.4, 1, 0.4], Extrapolate.CLAMP);
    const opacity = interpolate(translateX.value, inputRange, [0.2, 1, 0.2], Extrapolate.CLAMP);
    const progress = interpolate(translateX.value, inputRange, [-1, 0, 1], Extrapolate.CLAMP);

    return {
      opacity,
      transform: [{ scale }, { rotate: `${progress * (Math.PI / 12)}rad` }],
    };
  });

  return (
    <View style={[styles.pageStyle, { width }]}>
      <Animated.Image source={{ uri: category.image }} style={[styles.imageStyle, { marginBottom: isLandscape ? 60 : IMAGE_SIZE * 0.3 }, rImage]} />
    </View>
  );
};

const styles = StyleSheet.create({
  pageStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: IMAGE_BORDER,
    backgroundColor: palette.primary,
  },
});

export default React.memo(PageItem);
