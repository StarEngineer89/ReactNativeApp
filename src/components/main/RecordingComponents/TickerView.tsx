import React, { memo, PropsWithChildren } from 'react';
import { View } from 'react-native';
import Animated, { useAnimatedStyle, interpolate, SharedValue } from 'react-native-reanimated';
import useDeviceInfo from '../../../hooks/useDeviceInfo';

interface Props {
  tWidth: number;
  tHeight: number;
  translateX: SharedValue<number>;
}

const TickerView = ({ tWidth, tHeight, translateX, children }: PropsWithChildren<Props>) => {
  const { width } = useDeviceInfo();
  const rTickerStyle = useAnimatedStyle(() => {
    const inputRange = [-width, 0, width];

    const translateY = interpolate(translateX.value, inputRange, [tHeight, 0, -tHeight]);

    return {
      transform: [{ translateY }],
    };
  });
  return (
    <View style={[{ width: tWidth, height: tHeight, overflow: 'hidden' }]}>
      <Animated.View style={[rTickerStyle]}>{children}</Animated.View>
    </View>
  );
};

export default memo(TickerView);
