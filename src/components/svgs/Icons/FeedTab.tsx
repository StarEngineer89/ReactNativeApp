import * as React from 'react';
import Svg, { Defs, G, Path, SvgProps } from 'react-native-svg';
import { isTablet } from 'src/functions';
import GradientSVG from '../GradientSVG';

const MARGIN = isTablet() ? 30 : 20;
const WIDTH = 50;

interface TabProps extends SvgProps {
  selected?: Boolean;
}

const FeedTab = ({ selected = false, ...props }: TabProps) => {
  let fill = selected ? 'url(#a)' : '#AAA';
  return (
    <Svg width='50.005' height='50.006' viewBox='0 0 50.005 50.006' {...props}>
      <Defs>
        <GradientSVG id='a' />
      </Defs>
      <G>
        <Path
          d='M50 6.64a1.93 1.93 0 0 1-2 1.19H23.79a3.07 3.07 0 0 1-.68 0 1.56 1.56 0 0 1 .29-3.08H48a1.91 1.91 0 0 1 2 1.18Z'
          fill={fill}
          transform='translate(.005 .003)'
        />
        <Path
          d='M50 39.06a1.93 1.93 0 0 1-2 1.19H23.79a3.07 3.07 0 0 1-.68 0 1.56 1.56 0 0 1 .29-3.08H48a1.91 1.91 0 0 1 2 1.18Z'
          fill={fill}
          transform='translate(.005 .003)'
        />
        <Path
          d='M0 8.57v-5A3.39 3.39 0 0 1 3.53 0h10.15a3.4 3.4 0 0 1 3.51 3.52v10.15a3.39 3.39 0 0 1-3.5 3.52H3.49A3.39 3.39 0 0 1 0 13.7V8.57Z'
          fill={fill}
          transform='translate(.005 .003)'
        />
        <Path
          d='M8.62 50H3.54A3.39 3.39 0 0 1 0 46.47V36.36a3.39 3.39 0 0 1 3.56-3.55h10.07a3.4 3.4 0 0 1 3.56 3.56v10.1A3.4 3.4 0 0 1 13.65 50Z'
          fill={fill}
          transform='translate(.005 .003)'
        />
        <Path
          d='M31.66 10.55h8.11a1.55 1.55 0 0 1 1.57 1.14 1.49 1.49 0 0 1-.63 1.7 1.89 1.89 0 0 1-.92.27h-16.3a1.56 1.56 0 0 1 0-3.12c2.74 0 5.51.01 8.17.01Z'
          fill={fill}
          transform='translate(.005 .003)'
        />
        <Path
          d='M31.69 43.36h8.05a1.561 1.561 0 1 1 .08 3.12H23.56a1.56 1.56 0 0 1 0-3.12Z'
          fill={fill}
          transform='translate(.005 .003)'
        />
      </G>
    </Svg>
  );
};

export default FeedTab;
