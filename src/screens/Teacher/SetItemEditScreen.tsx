import React, { useEffect, useCallback } from 'react';
import { SETS, STUDENT } from 'src/constants/routes';
import { View, Text } from 'react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue, useDerivedValue, useAnimatedRef, ZoomIn, Layout } from 'react-native-reanimated';
import AnimatedLottieView from 'lottie-react-native';
import { navigationRef } from 'src/refs';
import { playSound } from 'src/helpers';
import useDeviceInfo from 'src/hooks/useDeviceInfo';
import { Arrow, MicroPhoneRecorder, TickerView, SpeakerVolume, PageItem } from 'components/main/RecordingComponents';
import { Button } from 'components/base';
import { useTeacher } from 'src/hooks';
import { fonts, palette, StyleGuide } from 'src/config';
import { isPad } from 'src/functions';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { IHomeDrawerNavigatorParamsList, IHomeStackNavigatorParamsList, ISetStackNavigatorParamsList } from 'src/navigations/_types';
import { DrawerScreenProps } from '@react-navigation/drawer';

interface Props
  extends CompositeScreenProps<
    NativeStackScreenProps<ISetStackNavigatorParamsList, SETS.EDIT_DETAILS>,
    CompositeScreenProps<NativeStackScreenProps<IHomeStackNavigatorParamsList>, DrawerScreenProps<IHomeDrawerNavigatorParamsList>>
  > {}

const SetItemEditScreen = ({ route, navigation }: Props) => {
  const { subCategoryIndex, predefined } = route.params;

  const { width, isLandscape } = useDeviceInfo();

  const { state, recordMentorVoice } = useTeacher();

  const translateX = useSharedValue(subCategoryIndex * width);

  const scrollRef = useAnimatedRef<Animated.ScrollView>();

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

  const onSpeakerPressed = useCallback(() => {
    if (state.currentCategory[activeIndex.value].voiceURL == null) return;
    lottieRef.current.play();
    playSound(state.currentCategory[activeIndex.value].voiceURL, () => {
      if (navigationRef.current.getCurrentRoute().name === STUDENT.CLASS_SET) {
        lottieRef.current.reset();
      }
    });
  }, [state.currentCategory]);

  const onEndRecording = useCallback(uri => {
    let item = state.currentCategory[activeIndex.value];

    recordMentorVoice(item._id, uri, item.voiceURL, predefined);
  }, []);

  const onNextPressed = useCallback(() => {
    scrollRef.current?.scrollTo({ x: width * (activeIndex.value + 1) });
  }, []);

  const onPrevPressed = useCallback(() => {
    scrollRef.current?.scrollTo({ x: width * (activeIndex.value - 1) });
  }, []);

  const lottieRef = React.useRef<AnimatedLottieView>();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: palette.link_water,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Animated.ScrollView
        layout={Layout.delay(500)}
        entering={ZoomIn}
        ref={scrollRef}
        horizontal
        pagingEnabled
        removeClippedSubviews
        showsHorizontalScrollIndicator={false}
        alwaysBounceHorizontal={false}
        style={{ flex: 1 }}
        onScroll={onScrollHandler}
        scrollEventThrottle={16}>
        {state.currentCategory.map((category, index) => (
          <PageItem key={`std-cat-${index.toString()}`} category={category} translateX={translateX} index={index} />
        ))}
      </Animated.ScrollView>

      {/* <SpeakerVolume /> */}
      <Arrow direction="left" activeIndex={activeIndex} stopIndex={0} onArrowPressed={onPrevPressed} />

      <Arrow direction="right" activeIndex={activeIndex} stopIndex={state.currentCategory.length - 1} onArrowPressed={onNextPressed} />

      <View style={{ position: 'absolute', top: 120 }} pointerEvents="none">
        <TickerView translateX={translateX} tWidth={width} tHeight={50}>
          {state.currentCategory.map(({ name }, index) => {
            return (
              <View
                key={`names-container-${index}`}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 50,
                  width: '100%',
                  paddingHorizontal: 10,
                }}>
                <Text
                  style={{
                    fontSize: isPad() ? 18 : 15,
                    fontFamily: fonts.medium,
                    textTransform: 'uppercase',
                    letterSpacing: 2,
                    textAlign: 'center',
                  }}>
                  {name}
                </Text>
              </View>
            );
          })}
        </TickerView>
      </View>

      <SpeakerVolume data={state.currentCategory} activeIndex={activeIndex} attr={'voiceURL'} onPress={onSpeakerPressed} />

      <MicroPhoneRecorder onStart={() => lottieRef.current.play()} onEnd={() => lottieRef.current.reset()} onFinished={onEndRecording} />

      <View
        style={{
          position: 'absolute',
          bottom: StyleGuide.main.isSmallDevice ? '2%' : '7%',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        pointerEvents="none">
        <AnimatedLottieView
          ref={lottieRef}
          style={{
            width: 300,
            // backgroundColor: 'transparent',
          }}
          source={require('assets/lottie/lf30_editor_wfgykmvy.json')}
          loop={false}
          resizeMode="contain"
          progress={0.00000001}
        />
      </View>

      <View style={{ position: 'absolute', bottom: StyleGuide.main.isSmallDevice ? 20 : 50 }}>
        <Button size="md" variant="gradient" title={'Done'} onPress={() => navigation.navigate(SETS.DETAILS, { itemIndex: activeIndex.value })} />
      </View>
    </View>
  );
};

export default SetItemEditScreen;
