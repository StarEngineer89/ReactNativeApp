import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import React from "react";
import styles from "./styles";
import { isTablet } from "src/functions";
import Svg, { G, Rect } from "react-native-svg";
import { palette } from "src/config";

let icon = isTablet() ? 45 : 25;

interface Props extends TouchableOpacityProps {
  size?: "md" | "sm" | "xs" | "xxs";
}

const AddButton = ({ size = "md", ...props }: Props) => {
  return (
    <TouchableOpacity
      {...props}
      style={[
        styles[size],
        {
          backgroundColor: palette.primary,
          justifyContent: "center",
          alignItems: "center",
        },
        props.style,
      ]}
    >
      <Svg width={icon} height={icon} viewBox="0 0 25 25">
        <G transform="translate(-3519.917 -2347.888)" fill="#fff">
          <Rect
            width={3.814}
            height={25}
            rx={1.798}
            transform="translate(3530.51 2347.888)"
          />
          <Rect
            width={3.814}
            height={25}
            rx={1.848}
            transform="rotate(90 593.218 2951.699)"
          />
        </G>
      </Svg>
    </TouchableOpacity>
  );
};

export default AddButton;
