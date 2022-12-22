import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import { isTablet } from 'src/functions';

const useDeviceInfo = () => {
  const [screenData, setScreenData] = useState(Dimensions.get('window'));

  useEffect(() => {
    const onChange = (result) => {
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
