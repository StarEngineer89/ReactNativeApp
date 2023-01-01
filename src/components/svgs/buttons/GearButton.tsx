import React from 'react';
import { Pressable, TouchableOpacityProps } from 'react-native';
import Svg, { Path, SvgProps, G } from 'react-native-svg';
import { palette, StyleGuide } from 'src/config';

let size = StyleGuide.sizes.gearIcon;

interface GearProps extends SvgProps {
  fillColor: string;
}

const Gear = ({ fillColor }: GearProps) => (
  <Svg width="25" height="25" viewBox="0 0 25 25">
    <G transform="translate(-2869.5 -2147)">
      <Path
        fill={fillColor}
        d="M2893.129,2156.785l-1.958-.249a9.941,9.941,0,0,0-.593-1.431l1.209-1.557a1.548,1.548,0,0,0-.127-2.062l-1.64-1.64a1.552,1.552,0,0,0-2.068-.132l-1.555,1.209a9.919,9.919,0,0,0-1.433-.593l-.249-1.955a1.559,1.559,0,0,0-1.548-1.375h-2.333a1.559,1.559,0,0,0-1.548,1.372l-.249,1.958a9.746,9.746,0,0,0-1.432.593l-1.557-1.209a1.548,1.548,0,0,0-2.061.127l-1.641,1.639a1.553,1.553,0,0,0-.132,2.069l1.209,1.556a9.832,9.832,0,0,0-.593,1.431l-1.955.249a1.561,1.561,0,0,0-1.375,1.548v2.334a1.561,1.561,0,0,0,1.372,1.548l1.958.249a9.941,9.941,0,0,0,.593,1.431l-1.209,1.557a1.548,1.548,0,0,0,.127,2.062l1.64,1.64a1.553,1.553,0,0,0,2.068.131l1.557-1.209a9.672,9.672,0,0,0,1.431.593l.249,1.954a1.559,1.559,0,0,0,1.548,1.377h2.333a1.559,1.559,0,0,0,1.548-1.372l.249-1.958a9.9,9.9,0,0,0,1.431-.593l1.558,1.209a1.548,1.548,0,0,0,2.062-.127l1.64-1.64a1.551,1.551,0,0,0,.132-2.068l-1.209-1.556a9.724,9.724,0,0,0,.593-1.431l1.954-.249a1.561,1.561,0,0,0,1.375-1.548v-2.334a1.559,1.559,0,0,0-1.371-1.548ZM2882,2164.708c-4.091,0-7.1-4.74-3.809-9.016,4.277-3.287,9.017-.283,9.017,3.808a5.213,5.213,0,0,1-5.208,5.208Zm0,0"
      />
    </G>
  </Svg>
);

interface GearButtonProps extends TouchableOpacityProps {
  mode?: 'dark' | 'light';
}

const GearButton = ({ mode = 'dark', ...props }: GearButtonProps) => {
  const fillColor = mode === 'dark' ? palette.ebony : palette.link_water;

  return (
    <Pressable {...props} style={[{ padding: 10 }, props.style]}>
      <Gear width={size} height={size} fillColor={fillColor} />
    </Pressable>
  );
};

export default GearButton;
