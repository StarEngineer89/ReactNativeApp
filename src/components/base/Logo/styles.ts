import { StyleProp, ViewStyle } from 'react-native';
import { fonts, palette } from 'src/config';
import { isTablet as _isTablet } from 'src/functions';

const isTablet = _isTablet();

export default {
  size: {
    lg: {
      width: isTablet ? 297.21 : 251,
      height: isTablet ? 175.398 : 148.58,
    },
    sm: {
      width: isTablet ? 234.77 : 179,
      height: isTablet ? 138.55 : 105.5,
    },
    menu: {
      width: isTablet ? 380 : 179,
      height: isTablet ? 110 : 50,
    },
  },
};
