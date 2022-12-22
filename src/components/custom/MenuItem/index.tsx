import GradientSVG from 'components/svgs/GradientSVG';
import React from 'react';
import { Pressable, Text } from 'react-native';
import { HStack, Spacer } from 'react-native-stacks';
import Svg, { Circle, SvgProps } from 'react-native-svg';
import { palette, StyleGuide } from 'src/config';

let size = StyleGuide.sizes.menuDotSize;

interface IDotProps extends SvgProps {
  fillColor: string;
}

const IndicatorDot = ({ fillColor, ...props }) => (
  <Svg width='12' height='12' viewBox={`0 0 12 12`} {...props}>
    <GradientSVG id='a' />
    <Circle cx={6} cy={6} r={6} fill={fillColor} />
  </Svg>
);

const MenuItem = ({ active = false, onPress, title, showIndicator = false }) => {
  return (
    <Pressable onPress={onPress} style={{ width: '100%', padding: 15 }}>
      <HStack>
        <Text style={StyleGuide.typography.menuItem}>{title}</Text>
        <Spacer />

        {showIndicator && showIndicator === true && (
          <IndicatorDot width={size} height={size} fillColor={active ? 'url(#a)' : palette.link_water} />
        )}
      </HStack>
    </Pressable>
  );
};

export default MenuItem;
