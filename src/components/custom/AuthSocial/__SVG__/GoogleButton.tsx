import { processFontFamily } from 'expo-font';
import React from 'react';
import Svg, { G, Path, Rect, TSpan, Text, SvgProps } from 'react-native-svg';

const GoogleButton = (props: SvgProps) => {
  return (
    <Svg width={75} height={30} viewBox='0 0 75 30' {...props}>
      <G transform='translate(-984.315 -1928.956)'>
        <Rect width={75} height={30} rx={5} transform='translate(984.315 1928.956)' fill='#fff' />
        <G>
          <Path
            d='M1000.573 1945.41l-.409 1.526-1.494.031a5.885 5.885 0 01-.043-5.482l1.33.244.583 1.322a3.51 3.51 0 00.033 2.359zm0 0'
            fill='#fbbb00'
          />
          <Path
            d='M1009.61 1943.088a5.871 5.871 0 01-2.093 5.676l-1.675-.085-.237-1.48a3.5 3.5 0 001.505-1.787h-3.139v-2.323zm0 0'
            fill='#518ef8'
          />
          <Path
            d='M1007.517 1948.763a5.874 5.874 0 01-8.847-1.8l1.9-1.557a3.493 3.493 0 005.032 1.788zm0 0'
            fill='#28b446'
          />
          <Path
            d='M1007.589 1939.666l-1.9 1.557a3.491 3.491 0 00-5.147 1.828l-1.913-1.566a5.872 5.872 0 018.962-1.819zm0 0'
            fill='#f14336'
          />
        </G>
        <Text
          transform='translate(1031.827 1946.673)'
          fill='#518ef8'
          fontSize={7.116}
          fontFamily={processFontFamily('Poppins-Medium')}
          fontWeight={500}
        >
          <TSpan x={-12.838} y={0}>
            {'Google'}
          </TSpan>
        </Text>
      </G>
    </Svg>
  );
};

export default GoogleButton;
