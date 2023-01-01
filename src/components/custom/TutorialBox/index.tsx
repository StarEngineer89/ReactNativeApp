import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, GestureResponderEvent } from 'react-native';
import { palette, fonts } from 'src/config';
import { LinearGradient } from 'expo-linear-gradient';
import { VStack, HStack } from 'react-native-stacks';
import { isPad } from 'src/functions';

const SIZE = isPad() ? 160 : 90;
const RADIUS = isPad() ? 25 : 10;
const SPACING = isPad() ? 18 : 10;
const paddingHorizontal = isPad() ? 50 : 35;

interface Props {
  data: {
    message: string;
    buttonTitle: string;
    icon: React.ReactElement;
  };
  onPress: (e: GestureResponderEvent) => void;
}

const TutorialBox = ({ data: { message, buttonTitle, icon }, onPress }: Props) => {
  return (
    <View style={{ paddingVertical: SPACING }}>
      <HStack spacing={SPACING} style={[styles.container]} alignment="leading">
        <View style={styles.iconContainer}>{icon}</View>
        <VStack style={styles.messageContainer} alignment="leading" spacing={isPad() ? 10 : 5}>
          <Text
            style={{
              fontSize: isPad() ? 14 : 8,
              color: palette.white,
              fontFamily: fonts.bold,
              textAlign: 'center',
              paddingHorizontal: 14,
              width: '100%',
            }}>
            {message}
          </Text>

          <View style={{ width: '100%' }}>
            <LinearGradient
              colors={[palette.gradient_1, palette.gradient_2]}
              start={[0, 0.5]}
              end={[1, 0.5]}
              style={{ height: SIZE / 4, borderRadius: RADIUS / 2 }}>
              <TouchableOpacity style={styles.btn} onPress={onPress}>
                <Text
                  style={{
                    alignSelf: 'center',
                    color: palette.white,
                    fontSize: isPad() ? 14 : 8,
                    fontFamily: fonts.bold,
                  }}>
                  {buttonTitle}
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </VStack>
      </HStack>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: SIZE,
    width: isPad() ? '50%' : 320,
    marginHorizontal: paddingHorizontal,
    backgroundColor: palette.primary,
    borderRadius: RADIUS,
  },
  iconContainer: {
    flex: 1,
    width: SIZE,
    height: SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageContainer: {
    flex: 2.5,
    width: '100%',
    height: '100%',
    paddingVertical: SPACING,
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default TutorialBox;
