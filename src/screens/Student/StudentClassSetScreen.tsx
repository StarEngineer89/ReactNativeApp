import React, { useEffect, useCallback } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue, useDerivedValue, useAnimatedRef } from 'react-native-reanimated';
import AnimatedLottieView from 'lottie-react-native';
import { navigationRef } from 'src/refs';
import { playSound } from 'src/helpers';
import { Arrow, AvatarSpeakerVolume, MicroPhoneRecorder, TickerView, SpeakerVolume, PageItem } from 'components/main/RecordingComponents';
import { images } from 'src/constants';
import { ProgressComponent } from 'components/main';
import { DRAWER, STUDENT } from 'src/constants/routes';
import { useStudent, useDeviceInfo } from 'src/hooks';
import { palette } from 'src/config';
import { CompositeScreenProps } from '@react-navigation/native';
import { IHomeDrawerNavigatorParamsList, IStudentMainStackNavigatorParamsList } from 'src/navigations/_types';
import { NativeStackScreenProps } from '@react-navigation/native-stack/lib/typescript/src/types';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { isPad } from 'src/functions';

interface Props
  extends CompositeScreenProps<
    NativeStackScreenProps<IStudentMainStackNavigatorParamsList, STUDENT.CLASS_SET>,
    DrawerScreenProps<IHomeDrawerNavigatorParamsList, DRAWER.PUPIL>
  > {}

const StudentClassSetScreen = ({ route, navigation }: Props) => {
  const { cid, catId, predefined } = route.params;
  const { state, getCategory, clearCategory, recordVoice } = useStudent();

  const translateX = useSharedValue(0);

  const scrollRef = useAnimatedRef<Animated.ScrollView>();

  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      translateX.value = event.contentOffset.x;
    },
  });

  const { width, height, isTablet, isLandscape } = useDeviceInfo();

  const activeIndex = useDerivedValue(() => {
    return Math.round(translateX.value / width);
  });

  useEffect(() => {
    scrollRef.current?.scrollTo({ x: width * activeIndex.value });
  }, [isLandscape]);

  useEffect(() => {
    setTimeout(() => getCategory(state._id, cid, catId, predefined), 500);
  }, []);

  useEffect(() => {
    const unsubscribe1 = navigation.addListener('beforeRemove', () => {
      clearCategory();
    });

    return () => {
      unsubscribe1();
    };
  }, [route.params]);

  const onStudentSpeakerPressed = useCallback(() => {
    if (state.currentCategory.children[activeIndex.value].studentVoiceURL == null) return;
    lottieRef.current.play();
    playSound(state.currentCategory.children[activeIndex.value].studentVoiceURL, () => {
      if (navigationRef.current.getCurrentRoute().name === STUDENT.CLASS_SET) {
        lottieRef.current.reset();
      }
    });
  }, [state.currentCategory]);

  const onTeacherSpeakerPressed = useCallback(() => {
    if (state.currentCategory.children[activeIndex.value].voiceURL == null) return;
    lottieRef.current.play();
    playSound(state.currentCategory.children[activeIndex.value].voiceURL, () => lottieRef.current.reset());
  }, [state.currentCategory]);

  const onNextPressed = useCallback(() => {
    scrollRef.current?.scrollTo({ x: width * (activeIndex.value + 1) });
  }, []);

  const onPrevPressed = useCallback(() => {
    scrollRef.current?.scrollTo({ x: width * (activeIndex.value - 1) });
  }, []);

  const onEndRecording = useCallback(
    uri => {
      let item = state.currentCategory.children[activeIndex.value];
      // id, childId, classroom, category, predefined, uri, oldVoice
      recordVoice(state._id, item._id, cid, catId, predefined, uri);
    },
    [state.currentCategory],
  );

  const lottieRef = React.useRef<AnimatedLottieView>();

  const tickerBottom = isLandscape ? height / 2 - 160 : height / 2 - 120;

  return state.currentCategory == null ? (
    <ProgressComponent />
  ) : (
    <View
      style={{
        flex: 1,
        backgroundColor: palette.link_water,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Animated.ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        alwaysBounceHorizontal={false}
        style={{ flex: 1 }}
        onScroll={onScrollHandler}
        scrollEventThrottle={16}>
        {state.currentCategory.children.map((category, index) => (
          <PageItem key={`std-cat-${index.toString()}`} category={category} translateX={translateX} index={index} />
        ))}
      </Animated.ScrollView>

      <View style={[{ position: 'absolute', bottom: tickerBottom }]}>
        <TickerView translateX={translateX} tWidth={isPad() ? 280 : 200} tHeight={50}>
          {state.currentCategory.children.map(({ score }, index) => {
            return (
              <View
                key={`stars-container-${index}`}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  height: 50,
                  width: '100%',
                  paddingHorizontal: 10,
                }}>
                {[...Array(5).keys()].map(index => {
                  return (
                    <Image
                      key={`star-img-${index}`}
                      source={score && score > -1 && index < score ? images.FILLED_STAR : images.UNFILLED_STAR}
                      style={{
                        width: isPad() ? 28 : 20,
                        height: isPad() ? 26 : 19,
                      }}
                      defaultSource={images.UNFILLED_STAR}
                    />
                  );
                })}
              </View>
            );
          })}
        </TickerView>
      </View>

      {/* <SpeakerVolume /> */}
      <Arrow direction="left" activeIndex={activeIndex} stopIndex={0} onArrowPressed={onPrevPressed} />

      <Arrow direction="right" activeIndex={activeIndex} stopIndex={state.currentCategory.children.length - 1} onArrowPressed={onNextPressed} />

      <TouchableOpacity
        style={{ position: 'absolute', bottom: isLandscape ? 100 : height / 2 + (isTablet ? 240 : 200) * 0.8 }}
        onPress={onTeacherSpeakerPressed}>
        <AvatarSpeakerVolume uri={state.classroom.teacher.image} />
      </TouchableOpacity>

      <SpeakerVolume data={state.currentCategory.children} activeIndex={activeIndex} attr={'studentVoiceURL'} onPress={onStudentSpeakerPressed} />

      <MicroPhoneRecorder onStart={() => lottieRef.current.play()} onEnd={() => lottieRef.current.reset()} onFinished={onEndRecording} />

      <View
        style={{
          position: 'absolute',
          bottom: '2%',
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
    </View>
  );
};

export default StudentClassSetScreen;
