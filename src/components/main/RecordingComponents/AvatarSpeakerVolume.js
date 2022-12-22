import { MotiView } from 'moti';
import React from 'react';
import { StyleSheet, View, Platform, Image } from 'react-native';
import { Easing } from 'react-native-reanimated';
import { palette } from '../../../config';

const SIZE_OUTER = Platform.isPad ? 120 : 80;
const SIZE_INNER = Platform.isPad ? 90 : 60;

const AvatarSpeakerVolume = ({ uri }) => {
  return (
    <View style={[styles.baseCircle, styles.outerCircle]}>
      {[...Array(3).keys()].map((index) => (
        <MotiView
          from={{ opacity: 0.7, scale: 1 }}
          animate={{ opacity: 0, scale: 1.5 }}
          transition={{
            type: 'timing',
            duration: 2000,
            easing: Easing.out(Easing.ease),
            delay: index * 400,
            repeatReverse: false,
            loop: true,
          }}
          key={index}
          style={[styles.baseCircle, styles.outerCircle, { position: 'absolute' }]}
        />
      ))}
      <Image source={{ uri: uri }} style={[styles.baseCircle, styles.innerCircle]} />
    </View>
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

export default React.memo(AvatarSpeakerVolume);
