import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withRepeat, SharedValue } from 'react-native-reanimated';
import Svg, { Path, G } from 'react-native-svg';
import { isPad } from 'src/functions';
import { palette } from '../../../config';
import useDeviceInfo from '../../../hooks/useDeviceInfo';

const SIZE_OUTER = isPad() ? 120 : 80;
const SIZE_INNER = isPad() ? 90 : 60;

const AnimatedGradient = Animated.createAnimatedComponent(LinearGradient);
const AnimatedGroup = Animated.createAnimatedComponent(G);

interface Props {
  data: any;
  attr: string;
  activeIndex: SharedValue<number>;
  onPress: () => void;
}

const SpeakerVolume = ({ data, attr, activeIndex, onPress }: Props) => {
  const progress = useSharedValue(0);

  React.useEffect(() => {
    progress.value = withRepeat(withTiming(1, { duration: 1000 }), -1, true);
  }, []);

  const rGradientStyle = useAnimatedStyle(() => {
    const isActive = data[activeIndex.value][attr] != null;

    return {
      opacity: withTiming(isActive ? 1 : 0, { duration: 300 }),
    };
  });

  const rGroupStyle = useAnimatedStyle(() => {
    const isActive = data[activeIndex.value][attr] != null;

    if (!isActive) return { opacity: withTiming(0, { duration: 300 }) };

    return {
      opacity: progress.value,
    };
  });

  const { width, height, isTablet, isLandscape } = useDeviceInfo();

  const landscape = (height - SIZE_OUTER + 60) / 2;
  const bottom = isTablet ? (isLandscape ? landscape : height / 2 - 260) : height / 2 - 220;

  const right = isTablet ? (isLandscape ? '20%' : (width - 300) / 2) : (width - 200) / 2;

  return (
    <TouchableOpacity style={{ position: 'absolute', bottom, right }} onPress={onPress} activeOpacity={0.5}>
      <View style={[styles.baseCircle, styles.outerCircle]}>
        <View style={[styles.baseCircle, styles.innerCircle, { backgroundColor: '#AAA' }]}>
          <AnimatedGradient
            style={[styles.baseCircle, styles.innerCircle, { position: 'absolute' }, rGradientStyle]}
            colors={[palette.gradient_1, palette.gradient_2]}
            start={[0, 0.5]}
            end={[1, 0.5]}
          />
          <Svg width="24" height="20" viewBox="0 0 24 20">
            <G transform="translate(-238.766 -546.538)">
              <Path
                d="M250.63,563.349a1.075,1.075,0,0,1-.62.974,1.052,1.052,0,0,1-.458.1,1.077,1.077,0,0,1-.687-.248l-5.886-4.877h-3.136a1.078,1.078,0,0,1-1.077-1.078v-4.29a1.078,1.078,0,0,1,1.077-1.078h3.136l5.886-4.878a1.078,1.078,0,0,1,1.765.83Z"
                transform="translate(0 -0.121)"
                fill="#fff"
              />
              <AnimatedGroup style={rGroupStyle}>
                <Path
                  d="M259.22,564.994a1.079,1.079,0,0,1-.777.381H258.4a1.08,1.08,0,0,1-.762-.315l-.141-.142a1.078,1.078,0,0,1-.063-1.454,11.476,11.476,0,0,0-.189-14.994,1.076,1.076,0,0,1,.042-1.473l.142-.142a1.05,1.05,0,0,1,.794-.317,1.078,1.078,0,0,1,.774.362,13.826,13.826,0,0,1,.226,18.093Zm0,0"
                  fill="#fff"
                />
                <Path
                  d="M254.768,561.666c-.026,0-.051,0-.078,0a1.076,1.076,0,0,1-.761-.315l-.144-.144a1.079,1.079,0,0,1-.1-1.4,6.259,6.259,0,0,0-.165-7.673,1.075,1.075,0,0,1,.073-1.439l.144-.145a1.054,1.054,0,0,1,.816-.313,1.08,1.08,0,0,1,.78.393,8.622,8.622,0,0,1,.224,10.608,1.075,1.075,0,0,1-.785.429Z"
                  transform="translate(0 0.006)"
                  fill="#fff"
                />
              </AnimatedGroup>
            </G>
          </Svg>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  baseCircle: {
    borderWidth: 1,
    borderColor: palette.primary,
  },
  outerCircle: {
    width: SIZE_OUTER,
    height: SIZE_OUTER,
    borderRadius: SIZE_OUTER / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    width: SIZE_INNER,
    height: SIZE_INNER,
    borderRadius: SIZE_INNER / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default React.memo(SpeakerVolume);
