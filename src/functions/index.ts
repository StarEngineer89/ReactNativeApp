import { Dimensions, PixelRatio, Platform } from 'react-native';
const { width: screenWidth, height: screenHeight } = Dimensions.get('screen');

export const isTablet = () => {
  let pixelDensity = PixelRatio.get();
  const adjustedWidth = screenWidth * pixelDensity;
  const adjustedHeight = screenHeight * pixelDensity;
  if (pixelDensity < 2 && (adjustedWidth >= 1000 || adjustedHeight >= 1000)) {
    return true;
  } else return pixelDensity === 2 && (adjustedWidth >= 1920 || adjustedHeight >= 1920);
};

export const isPad = () => {
  return Platform.OS === 'ios' && Platform.isPad;
};
