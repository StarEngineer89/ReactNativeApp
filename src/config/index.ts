import {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID,
} from '@env';

import { Platform } from 'react-native';
import { isTablet as _isTablet } from 'src/functions';
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

const isTablet = _isTablet();

export const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
};

export const customFonts = {
  'Poppins-Bold': require('assets/fonts/Poppins/Poppins-Bold.ttf'),
  'Poppins-Light': require('assets/fonts/Poppins/Poppins-Light.ttf'),
  'Poppins-Medium': require('assets/fonts/Poppins/Poppins-Medium.ttf'),
  'Poppins-Regular': require('assets/fonts/Poppins/Poppins-Regular.ttf'),
};

export const palette = {
  primary: '#6A4CE2',
  danger: '#ED1C24',
  link_water: '#F2F5FC',
  white: '#FFFFFF',
  black: '#000000',
  gradient_1: '#FF974F',
  gradient_2: '#FF5652',
  gradient_animation: '#FF6E51',
  ebony: '#141434',
  lightgray: '#D0D0D0',
  facebookBlue: '#3A559F',
  transparent: 'transparent',
};

export const fonts = {
  bold: 'Poppins-Bold',
  light: 'Poppins-Light',
  medium: 'Poppins-Medium',
  regular: 'Poppins-Regular',
};

export const StyleGuide: { [key: string]: any } = {
  main: {
    width,
    height,
    spacing: isTablet ? 10 : 5,
    isSmallDevice: width < 375,
  },
  typography: {
    onBoardingTitle: {
      height: isTablet ? 138 : 80,
      width: isTablet ? 504 : 254,
      fontSize: isTablet ? 30 : 20,
      fontFamily: fonts.bold,
      color: palette.ebony,
      textAlign: 'center',
    },
    onBoardingBody: {
      height: isTablet ? 138 : 100,
      width: isTablet ? 504 : 254,
      fontSize: isTablet ? 18 : 12,
      fontFamily: fonts.light,
      color: palette.primary,
      textAlign: 'center',
    },
    switchError: {
      fontSize: isTablet ? 18 : 14,
      fontFamily: fonts.bold,
      color: palette.primary,
      textAlign: 'center',
      marginHorizontal: 30,
    },
    switchUser: {
      fontSize: isTablet ? 18 : 12,
      fontFamily: fonts.light,
      color: palette.primary,
    },
    customHeader: {
      fontSize: isTablet ? 24 : 14,
      fontFamily: fonts.bold,
      color: palette.ebony,
    },
    menuHeader: {
      fontSize: isTablet ? 18 : 16,
      fontFamily: fonts.bold,
      color: palette.link_water,
    },
    menuItem: {
      fontSize: isTablet ? 21 : 12,
      fontFamily: fonts.regular,
      color: palette.link_water,
    },
    menuSubItem: {
      fontSize: isTablet ? 18 : 10,
      fontFamily: fonts.regular,
      color: palette.link_water,
    },
    homeHeaderName: {
      fontSize: isTablet ? 18 : 12,
      fontFamily: fonts.bold,
      color: palette.primary,
    },
    inputLabel: {
      fontSize: isTablet ? 18 : 14,
      color: palette.primary,
      fontFamily: fonts.bold,
    },
    gridItemHeader: {
      fontSize: isTablet ? 16 : 12,
      fontFamily: fonts.medium,
      color: palette.primary,
      width: isTablet ? '85%' : '75%',
      textAlign: 'left',
    },
    gridItemSubHeader: {
      fontSize: isTablet ? 14 : 10,
      fontFamily: fonts.medium,
      color: palette.primary,
    },
    dashboardHeader: {
      fontSize: isTablet ? 25 : 14,
      color: palette.ebony,
      fontFamily: fonts.bold,
    },
    dashboardHeaderEdit: {
      fontSize: isTablet ? 22 : 12,
      color: palette.ebony,
      fontFamily: fonts.regular,
      padding: 5,
    },
    thumbHeader: {
      fontSize: isTablet ? 18 : 11,
      color: palette.link_water,
      fontFamily: fonts.regular,
    },
    thumbDetail: {
      fontSize: isTablet ? 14 : 8,
      color: palette.link_water,
      fontFamily: fonts.regular,
    },
  },
  sizes: {
    headerHeight: Platform.OS === 'ios' ? 44 : 56,
    menuIcons: isTablet ? 50 : 32,
    menuDotSize: isTablet ? 16 : 12,
    listenIcon: isTablet ? 40 : 25,
    gearIcon: isTablet ? 60 : 25,
    padding: isTablet ? 50 : 35,
    navButton: isTablet ? 80 : 32,
    switchUser: {
      height: isTablet ? 240 : 150,
      width: isTablet ? 240 : 150,
      borderRadius: isTablet ? 35 : 22,
    },
    inputLabel: {
      height: isTablet ? 40 : 30,
      fontSize: isTablet ? 16 : 12,
      width: isTablet ? 295 : width - 70,
      fontFamily: fonts.light,
      color: palette.primary,
      borderRadius: 0,
      borderWidth: 0,
      borderBottomWidth: 1,
      borderColor: palette.primary,
    },
    input: {
      width: isTablet ? 240 : 175,
      height: isTablet ? 40 : 30,
      backgroundColor: palette.white,
      fontSize: isTablet ? 14 : 10,
      fontFamily: fonts.light,
      color: palette.primary,
      borderRadius: isTablet ? 9 : 7,
      borderColor: palette.primary,
      borderWidth: 1,
      paddingLeft: isTablet ? 23 : 16,
    },
    thumb: {
      xxl: {
        height: isTablet ? 240 : 200,
        width: isTablet ? 240 : 200,
        borderRadius: isTablet ? 35 : 25,
        borderWidth: 0.3,
        borderColor: palette.primary,
      },
      xl: {
        height: isTablet ? 240 : 150,
        width: isTablet ? 240 : 150,
        borderRadius: isTablet ? 35 : 22,
        borderWidth: 0.3,
        borderColor: palette.primary,
      },
      lg: {
        width: isTablet ? 240 : 150,
        height: isTablet ? 240 : 150,
        borderRadius: isTablet ? 35 : 20,
        borderWidth: 0.3,
        borderColor: palette.primary,
      },
      md: {
        width: isTablet ? 160 : 90,
        height: isTablet ? 160 : 90,
        borderRadius: isTablet ? 25 : 10,
        borderWidth: 0.3,
        borderColor: palette.primary,
      },
      sm: {
        width: isTablet ? 120 : 60,
        height: isTablet ? 120 : 60,
        borderRadius: isTablet ? 15 : 10,
        borderWidth: 0.3,
        borderColor: palette.primary,
      },
    },
  },
};
// descContainer: {
//   width: 254,
//   height: 100,
//   justifyContent: 'space-between',
//   marginTop: 40,
//   alignSelf: 'center',
// },
// descContainerTablet: {
//   width: 504,
//   height: 138,
//   justifyContent: 'space-between',
//   marginTop: 40,
//   alignSelf: 'center',
// },
