import { Dimensions, PixelRatio } from 'react-native';
const { width: screenWidth, height: screenHeight } = Dimensions.get('screen');

export const isTablet = () => {
  let pixelDensity = PixelRatio.get();
  const adjustedWidth = screenWidth * pixelDensity;
  const adjustedHeight = screenHeight * pixelDensity;
  if (pixelDensity < 2 && (adjustedWidth >= 1000 || adjustedHeight >= 1000)) {
    return true;
  } else return pixelDensity === 2 && (adjustedWidth >= 1920 || adjustedHeight >= 1920);
};

import { Audio } from 'expo-av';

export async function playSound(sound) {
  await Audio.setAudioModeAsync({
    allowsRecordingIOS: false,
    playsInSilentModeIOS: true,
    interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
    shouldDuckAndroid: true,
    interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
    playThroughEarpieceAndroid: false,
  });

  Audio.Sound.createAsync(sound, { shouldPlay: true })
    .then((res) => {
      res.sound.setOnPlaybackStatusUpdate((status) => {
        if (!status.didJustFinish) return;

        res.sound.unloadAsync().catch((error) => console.log('unloading error', error));
      });
    })
    .catch((error) => console.log('create async error', error));
}
