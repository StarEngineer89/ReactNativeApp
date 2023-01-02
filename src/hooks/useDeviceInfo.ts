import { useState, useEffect } from 'react';
import { Dimensions, ScaledSize } from 'react-native';
import { isTablet } from 'src/functions';

const useDeviceInfo = () => {
  const [screenData, setScreenData] = useState(Dimensions.get('window'));

  useEffect(() => {
    const onChange = (result: {
      window: ScaledSize;
      screen: ScaledSize;
    }) => {
      setScreenData(result.screen);
    };

    Dimensions.addEventListener('change', onChange);

    return () => Dimensions.removeEventListener('change', onChange);
  });

  return {
    ...screenData,
    isLandscape: isTablet() && screenData.width > screenData.height,
    isTablet: isTablet(),
  };
};

export default useDeviceInfo;
