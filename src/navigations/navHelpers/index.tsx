import React from 'react';
import { StyleSheet, Pressable, Easing } from 'react-native';
import { Button } from 'react-native-elements';
import Svg, { Path } from 'react-native-svg';
import { DrawerActions } from '@react-navigation/native';
import { navigationRef } from 'src/refs';
import { palette } from 'src/config';
import { GearButton } from 'components/svgs';
import { isPad } from 'src/functions';

export const HeaderBackButton = () => (
  <Pressable onPress={() => navigationRef.current.goBack()} style={styles.backBtnContainer}>
    <Svg width={isPad() ? 21.32 : 10.658} height={isPad() ? 36.2 : 18.099} viewBox="0 0 10.658 18.099">
      <Path
        d="M1324.751 1285.188a1.6 1.6 0 01-1.137-.472l-7.441-7.44a1.609 1.609 0 010-2.275l7.441-7.441a1.609 1.609 0 012.275 2.275l-6.3 6.3 6.3 6.3a1.609 1.609 0 01-1.138 2.747z"
        fill="#141434"
        transform="translate(-1315.702 -1267.089)"
      />
    </Svg>
  </Pressable>
);

export const HomeHeaderRight = () => <GearButton onPress={() => navigationRef.current.dispatch(DrawerActions.toggleDrawer())} />;

export const goBack = () => {
  return (
    <Button
      type="clear"
      title="Close"
      titleStyle={{ color: palette.white }}
      style={{ paddingRight: 10 }}
      onPress={() => navigationRef.current.goBack()}
    />
  );
};

export const VScreenOptions: any = {
  headerTitleAlign: 'center',
  headerStyle: {
    shadowColor: 'transparent',
    elevation: 0,
    shadowOpacity: 0,
    backgroundColor: 'transparent',
  },
  headerTitleStyle: {
    fontFamily: 'Poppins-Bold',
    fontSize: isPad() ? 24 : 14,
  },

  headerLeftContainerStyle: {
    marginLeft: isPad() ? 32 : 18,
  },
  headerRightContainerStyle: {
    marginRight: 40,
  },
  headerLeft: () => <HeaderBackButton />,
  headerTransparent: true,
};

export const EasingCardTransition: any = {
  transitionSpec: {
    open: { animation: 'timing', config: { duration: 300, easing: Easing.inOut(Easing.ease) } },
    close: { animation: 'timing', config: { duration: 300, easing: Easing.inOut(Easing.ease) } },
  },
  cardStyleInterpolator: ({ current: { progress } }: { current: { progress: number } }) => {
    return {
      cardStyle: {
        opacity: progress,
      },
    };
  },
};

const styles = StyleSheet.create({
  backBtnContainer: {
    width: 50,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
