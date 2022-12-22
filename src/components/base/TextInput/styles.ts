import { StyleProp, TextStyle } from 'react-native';
import { fonts, palette } from 'src/config';
import { isTablet as _isTablet } from 'src/functions';

const isTablet = _isTablet();

export default {
  width: isTablet ? 240 : 175,
  height: isTablet ? 40 : 30,
  backgroundColor: palette.white,

  borderRadius: isTablet ? 9 : 7,
  borderColor: palette.primary,
  borderWidth: 1,
  paddingLeft: isTablet ? 23 : 16,
  fontSize: isTablet ? 14 : 10,
  fontFamily: fonts.light,
  color: palette.primary,
};
