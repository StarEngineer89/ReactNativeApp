import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import { isTablet } from 'src/functions';

const SIZE = isTablet() ? 80 : 50;
const FILL = '#fff';

const CategoriesTutorialIcon = (props) => {
  return (
    <Svg width={SIZE} height={SIZE} viewBox='0 0 50 50' {...props}>
      <G transform='translate(-3)'>
        <Path
          d='M34.86,0c.81.16,1.64.27,2.43.49a13.15,13.15,0,0,1-1.4,25.68c-1.15.18-2.33.16-3.57.23V13.49a4.4,4.4,0,0,0-4.7-4.7h-6.2c.13-.33.22-.6.34-.86A13,13,0,0,1,32.34.08,1.2,1.2,0,0,0,32.61,0Z'
          fill={FILL}
        />
        <Path
          d='M29.39,23.75a4.52,4.52,0,0,0-3.06,0,4.34,4.34,0,0,0-2.3,2q-3.39,5.93-6.77,11.86a.73.73,0,0,1-.76.43H4.78C3.57,38.08,3,37.54,3,36.33V13.48c0-1.21.54-1.76,1.75-1.76H27.63c1.21,0,1.76.55,1.76,1.75Z'
          fill={FILL}
        />
        <Path
          d='M27.88,50H16.46a1.5,1.5,0,0,1-1.4-2.42L26.52,27.34a1.51,1.51,0,0,1,1.19-.89,1.44,1.44,0,0,1,1.55.76l11.6,20.5A1.46,1.46,0,0,1,39.5,50Z'
          fill={FILL}
        />
      </G>
    </Svg>
  );
};
export default CategoriesTutorialIcon;
