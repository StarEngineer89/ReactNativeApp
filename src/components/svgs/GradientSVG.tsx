import React from 'react';
import { LinearGradient, Stop } from 'react-native-svg';
import { palette } from 'src/config';

const GradientSVG = ({ id, ...props }) => {
  return (
    <LinearGradient id={id} y1={0.5} x2={1} y2={0.5} gradientUnits='objectBoundingBox' {...props}>
      <Stop offset={0.001} stopColor={palette.gradient_1} />
      <Stop offset={0.557} stopColor={palette.gradient_2} />
    </LinearGradient>
  );
};

export default GradientSVG;
