import { fonts, palette } from 'src/config';
import { isTablet as _isTablet } from 'src/functions';

const isTablet = _isTablet();

export default {
  base: {
    container: {
      borderWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: palette.gradient_1,
      overflow: 'hidden',
    },
    typography: {
      position: 'absolute',
      fontFamily: fonts.medium,
      color: palette.white,
    },
  },
  sizes: {
    container: {
      lg: {
        width: isTablet ? 240 : 175,
        height: isTablet ? 40 : 30,
        borderRadius: isTablet ? 8 : 6,
      },
      md: {
        width: isTablet ? 160 : 105,
        height: isTablet ? 40 : 30,
        borderRadius: isTablet ? 14 : 10,
      },
      sm: {
        width: isTablet ? 160 : 70,
        height: isTablet ? 40 : 20,
        borderRadius: isTablet ? 10 : 5,
      },
      xs: {
        width: isTablet ? 120 : 50,
        height: isTablet ? 32 : 16,
        borderRadius: isTablet ? 8 : 4,
      },
    },
    typography: {
      lg: {
        fontSize: isTablet ? 18 : 12,
      },
      md: {
        fontSize: isTablet ? 15 : 10,
      },
      sm: {
        fontSize: isTablet ? 12 : 8,
      },
      xs: {
        fontSize: isTablet ? 12 : 8,
      },
    },
  },
  variants: {
    container: {
      filled: {
        backgroundColor: palette.primary,
        borderColor: palette.primary,
      },
      gradient: {},
      outline: {
        backgroundColor: palette.white,
        borderColor: palette.primary,
      },
      danger: {
        backgroundColor: palette.white,
        borderColor: palette.danger,
      },
      dangerFilled: {
        backgroundColor: palette.danger,
        borderColor: palette.danger,
      },
      ghost: {
        backgroundColor: palette.transparent,
        borderColor: palette.transparent,
      },
    },
    typography: {
      filled: {
        color: palette.white,
      },
      gradient: {},
      outline: {
        color: palette.primary,
      },
      danger: {
        color: palette.danger,
      },
      ghost: {
        color: palette.primary,
      },
      dangerFilled: {
        color: palette.white,
      },
    },
  },
};
