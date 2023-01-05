import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Alert } from 'react-native';
import Svg, { Path, G } from 'react-native-svg';
import { Audio } from 'expo-av';
import { useDeviceInfo } from 'src/hooks';
import { palette } from 'src/config';
import { isTablet } from 'src/functions';
import { recordingSettings } from 'src/audioHelper';

const SIZE_OUTER = isTablet() ? 120 : 80;
const SIZE_INNER = isTablet() ? 90 : 60;
const MICRO_W = isTablet() ? 22 : 15;
const MICRO_H = isTablet() ? 37 : 25;

interface Props {
  onStart: () => void;
  onEnd: () => void;
  onFinished: (uri: string) => void;
}

const MicroPhoneRecorder = ({ onStart, onEnd, onFinished }: Props) => {
  const [isAllowedToRecord, setIsAllowedToRecord] = useState<boolean>(false);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const { width, height, isTablet, isLandscape } = useDeviceInfo();

  useEffect(() => {
    const init = async () => {
      const status = await Audio.getPermissionsAsync();
      if (status.granted) {
        setIsAllowedToRecord(true);
      }
    };

    init();
  }, []);

  const _startRecording = async () => {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(recordingSettings);
      setRecording(recording);
    } catch (err) {
      throw err;
    }
  };

  const _stopRecording = async () => {
    try {
      onEnd();
      if (recording) {
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();

        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          playsInSilentModeIOS: false,
        });

        onFinished(uri);
        setRecording(undefined);
      }
    } catch (error) {
      throw error;
    }
  };

  const _checkPermissionAndRecord = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();

      if (status === 'granted') {
        setIsAllowedToRecord(true);

        if (isAllowedToRecord) {
          onStart();
          _startRecording();
        }
      } else {
        Alert.alert('Go to settings and enable recording');
      }
    } catch (error) {
      console.log('Error occured while checking permission and recording: ', error);
    }
  };

  const landscape = (height - SIZE_OUTER + 60) / 2;
  const bottom = isTablet ? (isLandscape ? landscape : height / 2 - 260) : height / 2 - 220;

  const left = isTablet ? (isLandscape ? '20%' : (width - 300) / 2) : (width - 200) / 2;

  return (
    <TouchableOpacity
      style={{ position: 'absolute', bottom, left }}
      onLongPress={_checkPermissionAndRecord}
      onPressOut={_stopRecording}
      activeOpacity={0.5}>
      <View style={[styles.baseCircle, styles.outerCircle]}>
        <View style={[styles.baseCircle, styles.innerCircle]}>
          <Svg width={MICRO_W} height={MICRO_H} viewBox="0 0 15.104 25">
            <G transform="translate(-120.448 -543.457)">
              <Path
                d="M135.552,556.369a.834.834,0,1,0-1.666,0,5.9,5.9,0,1,1-11.772,0,.834.834,0,1,0-1.666,0,7.848,7.848,0,0,0,6.719,7.97v2.353h-3.026a.884.884,0,0,0,0,1.765h7.718a.884.884,0,0,0,0-1.765h-3.026v-2.353A7.848,7.848,0,0,0,135.552,556.369Z"
                fill={palette.link_water}
              />
              <Path
                d="M128,561.281a4.789,4.789,0,0,0,4.637-4.912v-8a4.645,4.645,0,1,0-9.274,0v7.97A4.816,4.816,0,0,0,128,561.281Z"
                fill={palette.link_water}
              />
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
    backgroundColor: palette.primary,
  },
});

export default React.memo(MicroPhoneRecorder);
