import React from "react";
import {
  Text,
  StyleSheet,
  ViewStyle,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./styles";
import { palette } from "src/config";

interface ButtonProps extends TouchableOpacityProps {
  size: "lg" | "md" | "sm" | "xs";
  variant:
    | "gradient"
    | "filled"
    | "outline"
    | "danger"
    | "ghost"
    | "dangerFilled";
  title?: string;
  children?: JSX.Element;
  buttonStyle?: ViewStyle;
}

const Button = ({
  variant = "gradient",
  size = "lg",
  ...props
}: ButtonProps) => {
  let containerStyles = [];
  let textStyle = [];

  containerStyles.push(styles.base.container);
  containerStyles.push(styles.sizes.container[size]);
  containerStyles.push(styles.variants.container[variant]);
  containerStyles.push(props.buttonStyle);

  textStyle.push(styles.base.typography);
  textStyle.push(styles.sizes.typography[size]);
  textStyle.push(styles.variants.typography[variant]);

  return (
    <TouchableOpacity
      {...props}
      style={[containerStyles, { overflow: "hidden" }, props.style]}
    >
      {variant === "gradient" && (
        <LinearGradient
          // Background Linear Gradient
          colors={[palette.gradient_1, palette.gradient_2]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={[
            StyleSheet.absoluteFillObject,
            { borderRadius: styles.sizes.container[size].borderRadius },
          ]}
        />
      )}
      {props.title ? (
        <Text style={textStyle}>{props.title}</Text>
      ) : (
        props.children
      )}
    </TouchableOpacity>
  );
};

export default Button;
