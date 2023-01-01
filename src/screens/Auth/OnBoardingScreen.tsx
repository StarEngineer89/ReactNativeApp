import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { HStack, VStack } from 'react-native-stacks';
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useDerivedValue,
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { Button, ContainerView } from 'components/base';
import { AnimatedDot } from 'components/svgs';
import { useAuth, useDeviceInfo } from 'src/hooks';
import { StyleGuide } from 'src/config';
import { isTablet } from 'src/functions';

const ON_BOARDING_1 = require('assets/images/on-boarding-1.png');
const ON_BOARDING_2 = require('assets/images/on-boarding-2.png');
const ON_BOARDING_3 = require('assets/images/on-boarding-3.png');

const onBoardings = [
  {
    img: ON_BOARDING_1,
    title: 'Pass Your Native Tongue Organically',
    body: 'Record, Send, & Monitor your Children’s progress as they listen & repeat after you.',
  },
  {
    img: ON_BOARDING_2,
    title: 'Track Your Children’s Progress',
    body: 'For every recording you send you’re able to monitor & send notes accordingly.',
  },
  {
    img: ON_BOARDING_3,
    title: 'Easy Learning Curve',
    body: 'Create, & Edit Categories as easy as one, two, & three.',
  },
];

const OnBoardingScreen = () => {
  const { completeOnBoarding } = useAuth();
  const { width, height, isLandscape } = useDeviceInfo();

  const translateX = useSharedValue(0);
  const [show, setshow] = useState(false);

  const scrollRef = useAnimatedRef<ScrollView>();

  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      translateX.value = event.contentOffset.x;
    },
  });

  const activeIndex = useDerivedValue(() => {
    return Math.round(translateX.value / width);
  });

  useEffect(() => {
    scrollRef.current?.scrollTo({ x: width * activeIndex.value });
  }, [isLandscape]);

  return (
    <ContainerView header={false}>
      <Animated.ScrollView
        style={{ flex: 1 }}
        ref={scrollRef as any}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScrollHandler}
        scrollEventThrottle={16}
        onMomentumScrollEnd={() => setshow(activeIndex.value === 2)}>
        {onBoardings.map((item, index) => {
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

          const rHeading = useAnimatedStyle(() => {
            const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
            const translateXHeading = interpolate(translateX.value, inputRange, [width * 0.2, 1, -(width * 0.2)], Extrapolate.CLAMP);

            const opacity = interpolate(translateX.value, inputRange, [0, 1, 0], Extrapolate.CLAMP);
            return {
              opacity,
              transform: [{ translateX: translateXHeading }],
            };
          });
          const rBody = useAnimatedStyle(() => {
            const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
            const translateXHeading = interpolate(translateX.value, inputRange, [width * 0.7, 1, -(width * 0.7)], Extrapolate.CLAMP);
            const opacity = interpolate(translateX.value, inputRange, [0, 1, 0], Extrapolate.CLAMP);
            return {
              opacity,
              transform: [{ translateX: translateXHeading }],
            };
          });
          return (
            <View key={`on-boarding-${index.toString()}`} style={[{ flex: 1, width, height }]}>
              <VStack style={{ paddingTop: 100 }} spacing={5}>
                <Animated.Image
                  source={item.img}
                  style={[
                    {
                      width: width,
                      height: isTablet() ? 320 : 200,
                    },
                    rImage,
                  ]}
                  resizeMode="contain"
                />

                <Animated.View style={rHeading}>
                  <Text style={StyleGuide.typography.onBoardingTitle}>{item.title}</Text>
                </Animated.View>
                <Animated.View style={rBody}>
                  <Text style={StyleGuide.typography.onBoardingBody}>{item.body}</Text>
                </Animated.View>
              </VStack>
            </View>
          );
        })}
      </Animated.ScrollView>
      <HStack style={{ position: 'absolute', bottom: 120, alignSelf: 'center' }} spacing={10}>
        {onBoardings.map((_, index) => (
          <AnimatedDot key={index.toString()} index={index} activeDotIndex={activeIndex} />
        ))}
      </HStack>
      <View style={{ position: 'absolute', bottom: 50, alignSelf: 'center' }}>
        {show && <Button variant="gradient" size="lg" title={'Get Started'} onPress={completeOnBoarding} />}
      </View>
    </ContainerView>
  );
};

export default OnBoardingScreen;
