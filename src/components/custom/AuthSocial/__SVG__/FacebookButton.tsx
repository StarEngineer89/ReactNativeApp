import { processFontFamily } from 'expo-font';
import React from 'react';
import Svg, { G, Path, Rect, TSpan, Text, SvgProps } from 'react-native-svg';

const FacebookButton = (props: SvgProps) => {
  return (
    <Svg width={75} height={30} viewBox='0 0 75 30' {...props}>
      <G transform='translate(-906.011 -1928.956)'>
        <Rect width={75} height={30} rx={5} transform='translate(906.011 1928.956)' fill='#3a559f' />
        <G>
          <Path
            d='M925.607 1940.539h1.043v-1.816a13.351 13.351 0 00-1.519-.081 2.412 2.412 0 00-2.533 2.684v1.6h-1.659v2.03h1.661v5.108h2.034v-5.108h1.592l.252-2.03h-1.845v-1.4c0-.586.159-.988.976-.988zm0 0'
            fill='#fff'
          />
        </G>
        <Text
          transform='translate(951.899 1946.673)'
          fill='#fff'
          fontSize={7.116}
          fontFamily={processFontFamily('Poppins-Medium')}
          fontWeight={500}
        >
          <TSpan x={-17.499} y={0}>
            {'Facebook'}
          </TSpan>
        </Text>
      </G>
    </Svg>
  );
};

export default FacebookButton;
