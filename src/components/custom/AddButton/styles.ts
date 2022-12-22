import { isTablet } from "src/functions";

export default {
  md: {
    width: isTablet() ? 160 : 90,
    height: isTablet() ? 160 : 90,
    borderRadius: isTablet() ? 25 : 10,
  },
  sm: {
    width: isTablet() ? 120 : 60,
    height: isTablet() ? 120 : 60,
    borderRadius: isTablet() ? 15 : 10,
  },
  xs: {
    width: isTablet() ? 100 : 40,
    height: isTablet() ? 100 : 40,
    borderRadius: isTablet() ? 10 : 5,
  },
  xxs: {
    width: isTablet() ? 80 : 32,
    height: isTablet() ? 80 : 32,
    borderRadius: isTablet() ? 8 : 4,
  },
};
