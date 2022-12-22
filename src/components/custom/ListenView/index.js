import React from 'react';
import { Pressable } from 'react-native';
import { Audio } from 'expo-av';
import { Listen } from 'components/svgs';
import { StyleGuide } from 'src/config';

let size = StyleGuide.sizes.listenIcon;

async function playSound(sound) {
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

const ListenButton = ({ voice, style, icon }) => {
  const _play = async (file) => {
    playSound(file);
  };

  return (
    <Pressable
      onPress={() => (voice === null ? _play(voice) : console.log('No voice'))}
      disabled={voice === null}
      style={[
        { opacity: voice === null ? 0.5 : 1 },
        {
          width: size,
          height: size,
          padding: 20,
          justifyContent: 'center',
          alignItems: 'center',
        },
      ]}
      pointerEvents='none'
    >
      {icon ? icon : <Listen width={size} height={size} />}
    </Pressable>
  );
};

export default ListenButton;
