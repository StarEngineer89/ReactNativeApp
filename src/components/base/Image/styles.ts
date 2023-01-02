import { palette } from 'src/config';
import { isTablet } from 'src/functions';

// const OVERLAY_HEADER = Platform.OS === 'ios' && Platform.isPad ? 18 : 11;
// const OVERLAY_SUB_HEADER = Platform.OS === 'ios' && Platform.isPad ? 14 : 8;
export default {
  xxl: {
    height: isTablet() ? 240 : 200,
    width: isTablet() ? 240 : 200,
    borderRadius: isTablet() ? 35 : 25,
    borderWidth: 0.3,
    borderColor: palette.primary,
  },
  xl: {
    height: isTablet() ? 240 : 150,
    width: isTablet() ? 240 : 150,
    borderRadius: isTablet() ? 35 : 22,
    borderWidth: 0.3,
    borderColor: palette.primary,
  },
  lg: {
    width: isTablet() ? 240 : 150,
    height: isTablet() ? 240 : 150,
    borderRadius: isTablet() ? 35 : 20,
    borderWidth: 0.3,
    borderColor: palette.primary,
  },
  md: {
    width: isTablet() ? 160 : 90,
    height: isTablet() ? 160 : 90,
    borderRadius: isTablet() ? 25 : 10,
    borderWidth: 0.3,
    borderColor: palette.primary,
  },
  sm: {
    width: isTablet() ? 120 : 60,
    height: isTablet() ? 120 : 60,
    borderRadius: isTablet() ? 15 : 10,
    borderWidth: 0.3,
    borderColor: palette.primary,
  },
};
