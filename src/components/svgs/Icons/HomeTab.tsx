import * as React from 'react';
import Svg, { Defs, G, Path, SvgProps } from 'react-native-svg';
import { isTablet } from 'src/functions';
import GradientSVG from '../GradientSVG';

const MARGIN = isTablet() ? 30 : 20;
const WIDTH = 50;

interface TabProps extends SvgProps {
  selected?: Boolean;
}

const HomeTab = ({ selected = false, ...props }: TabProps) => {
  let fill = selected ? 'url(#a)' : '#AAA';
  return (
    <Svg width='50' height='50' viewBox='0 0 50 50' {...props}>
      <Defs>
        <GradientSVG id='a' />
      </Defs>
      <Path
        d='M48.66,21.75h0L28.26,1.35a4.61,4.61,0,0,0-6.52,0L1.36,21.73h0a4.6,4.6,0,0,0,0,6.5A4.54,4.54,0,0,0,4.4,29.6h1v15A5.38,5.38,0,0,0,10.74,50h8a1.46,1.46,0,0,0,1.47-1.46V36.77a2.46,2.46,0,0,1,2.46-2.46h4.7a2.46,2.46,0,0,1,2.46,2.46V48.54A1.46,1.46,0,0,0,31.28,50h8a5.39,5.39,0,0,0,5.39-5.38v-15h.75a4.55,4.55,0,0,0,3.25-1.34,4.61,4.61,0,0,0,0-6.51Zm0,0'
        transform='translate(-0.015 0)'
        fill={fill}
      />
    </Svg>
  );
};

export default HomeTab;
