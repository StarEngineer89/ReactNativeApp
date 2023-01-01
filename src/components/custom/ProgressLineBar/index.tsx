import React from 'react';
import { ViewProps } from 'react-native';
import { View } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, G, Path, SvgProps } from 'react-native-svg';

interface IDashesProps extends SvgProps {
  width: number;
  height: number;
}

const Dashes = ({ width, height, ...props }: IDashesProps) => {
  let strokeDasharray = height * 0.4;
  let path = `M${height + 2} ${height / 2} L${width - height / 2} ${height / 2}`;

  return (
    <Svg width={width} height={height} {...props}>
      <Path d={path} stroke="#fff" opacity={0.22} strokeDasharray={strokeDasharray} transform="skewX(-25)" strokeWidth={height} />
    </Svg>
  );
};

interface IPLProps extends ViewProps {
  width: number;
  height: number;
  percentage: number;
}

const ProgressLineBar = ({ width = 295, height = 10, percentage, ...props }: IPLProps) => {
  let _dashArray = width - 10;
  let _dashOffset = _dashArray - percentage * _dashArray;
  let path = `M${height / 2} ${height / 2} L${width - height / 2} ${height / 2}`;

  return (
    <View {...props}>
      <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <Defs>
          <LinearGradient id="gradient-1" x1={145} y1={height} x2={145} y2={-1} gradientUnits="userSpaceOnUse">
            <Stop offset={0.161} stopColor="#dee1e2" />
            <Stop offset={0.884} stopColor="#d2d2d2" />
          </LinearGradient>
          <LinearGradient id="gradient-2" y1={height} x2={290} y2={height} gradientUnits="userSpaceOnUse">
            <Stop offset={0.001} stopColor="#ff974f" />
            <Stop offset={0.557} stopColor="#ff5652" />
          </LinearGradient>
        </Defs>
        <G>
          <Path d={path} stroke="url(#gradient-1)" strokeWidth={height} strokeLinecap="round" strokeDasharray={width} />
          <Path
            d={path}
            stroke="url(#gradient-2)"
            strokeLinecap="round"
            strokeDasharray={_dashArray}
            strokeDashoffset={_dashOffset}
            strokeWidth={height}
          />
          <Dashes width={_dashArray - _dashOffset} height={height} />
        </G>
        <G />
      </Svg>
    </View>
  );
};

export default ProgressLineBar;
