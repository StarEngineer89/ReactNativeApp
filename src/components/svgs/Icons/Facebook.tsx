import React from 'react';
import Svg, { Circle, Path, SvgProps } from 'react-native-svg';

const Facebook = (props: SvgProps) => (
  <Svg width='32' height='32' viewBox='0 0 32 32' {...props}>
    <Circle cx='16' cy='16' r='16' fill='#fff' />
    <Path
      d='M14.2,24.54V16.75H11.57v-3h2.62V11.12a3.81,3.81,0,0,1,1-2.55,3.62,3.62,0,0,1,1.88-1,7.57,7.57,0,0,1,1.78-.09c.48,0,1,.06,1.45.1h.12V10.3H18.46a1.07,1.07,0,0,0-1.13,1.13c0,.73,0,1.47,0,2.2v.05h3l-.39,3h-2.6a1,1,0,0,0,0,.16v7.64Z'
      fill='#6a4ce2'
    />
  </Svg>
);

export default Facebook;
