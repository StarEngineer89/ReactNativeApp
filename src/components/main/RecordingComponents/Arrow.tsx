import React, { memo } from 'react';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';
import { palette } from '../../../config';
import useDeviceInfo from '../../../hooks/useDeviceInfo';

const ARROW_PATH =
  'M20 0a20 20 0 1 0 20 20A20 20 0 0 0 20 0zm6.094 21.354a1.9 1.9 0 0 1-.315.252l-7.506 7.506a1.868 1.868 0 0 1-2.641-2.642l6.468-6.468-6.435-6.435a1.868 1.868 0 0 1 2.641-2.642l7.473 7.472a1.939 1.939 0 0 1 .315 2.957zm0 0';

interface ArrowProps {
  direction: 'left' | 'right';
  stopIndex: number;
  activeIndex: Animated.SharedValue<number>;
  onArrowPressed: Function;
}

const Arrow: React.FC<ArrowProps> = ({ direction, stopIndex, activeIndex, onArrowPressed }) => {
  const { height, isTablet, isLandscape } = useDeviceInfo();

  const IMAGE_SIZE = isTablet ? 240 : 200;
  const ARROW_SIZE = isTablet ? 40 : 25;
  const ARROW_PADDING = isTablet ? 20 : 10;

  const bottom = (height - ARROW_SIZE - 2 * ARROW_PADDING + (isLandscape ? 60 : IMAGE_SIZE * 0.3)) / 2;

  const containerStyle: StyleProp<ViewStyle> = [{ position: 'absolute', bottom }];
  containerStyle.push(direction === 'left' ? { left: '5%' } : { right: '5%' });

  const rArrowStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(activeIndex.value === stopIndex ? 0 : 1, { duration: 500 }),
    };
  });

  const _onPress = () => {
    if (activeIndex.value === stopIndex) {
      return;
    }
    onArrowPressed();
  };

  return (
    <Animated.View style={[containerStyle, rArrowStyle]}>
      <TouchableOpacity style={[{ padding: ARROW_PADDING }]} onPress={_onPress}>
        <Svg
          width={ARROW_SIZE}
          height={ARROW_SIZE}
          viewBox='0 0 40 40'
          style={direction === 'left' && { transform: [{ rotateY: '180deg' }] }}
        >
          <Path d={ARROW_PATH} fill={palette.primary} />
        </Svg>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default memo(Arrow);
