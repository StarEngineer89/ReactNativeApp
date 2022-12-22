import React from 'react';
import { StyleSheet, View, TouchableOpacity, Platform, Text } from 'react-native';
import { palette, fonts } from 'src/config';
import { LinearGradient } from 'expo-linear-gradient';
import { VStack, HStack } from 'react-native-stacks';

const SIZE = Platform.isPad ? 160 : 90;
const RADIUS = Platform.isPad ? 25 : 10;
const SPACING = Platform.isPad ? 18 : 10;
const paddingHorizontal = Platform.isPad ? 50 : 35;

const TutorialBox = ({ data: { message, buttonTitle, icon }, onPress, ...props }) => {
  return (
    <View style={{ paddingVertical: SPACING }}>
      <HStack spacing={SPACING} style={[styles.container]} alignment='leading'>
        <View style={styles.iconContainer}>{icon}</View>
        <VStack style={styles.messageContainer} alignment='leading' spacing={Platform.isPad ? 10 : 5}>
          <Text
            style={{
              fontSize: Platform.isPad ? 14 : 8,
              color: palette.white,
              fontFamily: fonts.bold,
              textAlign: 'center',
              paddingHorizontal: 14,
              width: '100%',
            }}
          >
            {message}
          </Text>

          <View style={{ width: '100%' }}>
            <LinearGradient
              colors={[palette.gradient_1, palette.gradient_2]}
              start={[0, 0.5]}
              end={[1, 0.5]}
              style={{ height: SIZE / 4, borderRadius: RADIUS / 2 }}
            >
              <TouchableOpacity style={styles.btn} onPress={onPress}>
                <Text
                  style={{
                    alignSelf: 'center',
                    color: palette.white,
                    fontSize: Platform.isPad ? 14 : 8,
                    fontFamily: fonts.bold,
                  }}
                >
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
    width: Platform.isPad ? '50%' : 320,
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
