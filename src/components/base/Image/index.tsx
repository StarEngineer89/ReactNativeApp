import { ImageURISource, ImageSourcePropType, StyleProp, ViewStyle, ImageStyle, Image as RNImage, StyleSheet } from 'react-native';
import React from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import preloaded from 'src/constants/preloaded';
import { BlurView } from 'expo-blur';
import { palette, StyleGuide } from 'src/config';
import { ActivityIndicator } from 'react-native-paper';
import { Spacer, VStack } from 'react-native-stacks';
import TextTicker from 'react-native-text-ticker';
import { isTablet } from 'src/functions';

let styles = StyleGuide.sizes.thumb;
interface IIProps {
  size?: 'xxl' | 'xl' | 'lg' | 'md' | 'sm';
  defaultSource?: ImageURISource | number | string;
  preview?: ImageSourcePropType;
  uri: string;
  imgStyle?: StyleProp<ImageStyle>;
  style?: StyleProp<ViewStyle>;
  uploading?: Boolean;
  header?: string;
}

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);
const Image = ({ size = 'md', uploading = false, ...props }: IIProps) => {
  const isLoaded = useSharedValue(0);

  const aImageStyle = useAnimatedStyle(() => {
    return {
      opacity: withSpring(isLoaded.value),
    };
  });

  const aBlurStyle = useAnimatedStyle(() => {
    return {
      opacity: withSpring(1 - isLoaded.value),
    };
  });

  const aOverlayStyle = useAnimatedStyle(() => {
    return {
      opacity: withSpring(isLoaded.value),
      transform: [{ scale: withSpring(isLoaded.value) }],
    };
  });

  return (
    <VStack style={[styles[size], { overflow: 'hidden' }, props.style]}>
      <Animated.Image
        source={{ uri: props.uri }}
        onLoad={() => {
          isLoaded.value = 1;
        }}
        style={[StyleSheet.absoluteFillObject, styles[size], aImageStyle, { backgroundColor: '#8b6ff7' }, props.imgStyle]}
      />

      <AnimatedBlurView
        intensity={90}
        style={[StyleSheet.absoluteFillObject, styles[size], { backgroundColor: palette.primary }, aBlurStyle, props.imgStyle]}
      />

      {props.defaultSource && (
        <RNImage
          style={[StyleSheet.absoluteFillObject, styles[size], { opacity: 0.5 }, props.imgStyle]}
          source={preloaded[props.defaultSource as number] as ImageSourcePropType}
        />
      )}

      {uploading && uploading === true && (
        <BlurView
          intensity={50}
          style={[StyleSheet.absoluteFillObject, styles[size], { backgroundColor: palette.primary, justifyContent: 'center', alignItems: 'center' }]}>
          <ActivityIndicator size={'small'} color={palette.link_water} />
        </BlurView>
      )}

      {props.header && (
        <>
          <Spacer />

          <Animated.View
            style={[
              {
                width: '100%',
                backgroundColor: palette.primary,
                paddingVertical: isTablet() ? 8 : 6,
                paddingHorizontal: isTablet() ? 20 : 10,
                justifyContent: 'center',
                alignItems: 'center',
              },
              aOverlayStyle,
            ]}>
            <TextTicker style={StyleGuide.typography.thumbHeader} duration={3000} loop bounce repeatSpacer={50} marqueeDelay={5000}>
              {props.header}
            </TextTicker>
          </Animated.View>
        </>
      )}
    </VStack>
  );
};

export default Image;
