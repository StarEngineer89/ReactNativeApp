import { Image } from "components/base";
import React from "react";
import {
  StyleSheet,
  ImageURISource,
  ViewStyle,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { HStack } from "react-native-stacks";
import { palette } from "src/config";
import { useDeviceInfo } from "src/hooks";

interface GridItemProps {
  onPress?: () => void;
  activeOpacity?: number;
  defaultSource?: ImageURISource | number;
  uploading?: boolean;
  uri: string;
  children?: JSX.Element | JSX.Element[];
  style?: ViewStyle;
}

const GridListItem = ({ uploading = false, ...props }: GridItemProps) => {
  const { isTablet, isLandscape } = useDeviceInfo();
  const HEIGHT = isTablet ? (isLandscape ? 145 : 160) : 100;
  const WIDTH = isTablet ? (isLandscape ? 312 : 340) : 300;
  const LEFT_VIEW_WIDTH = isTablet ? (isLandscape ? 132 : 155) : 150;
  const RIGHT_VIEW_WIDTH = isTablet ? (isLandscape ? 180 : 185) : 150;
  const ITEM_RADIUS = isTablet ? (isLandscape ? 20 : 22) : 14;
  const styles = StyleSheet.create({
    item: {
      width: WIDTH,
      height: HEIGHT,
      borderRadius: ITEM_RADIUS,
      overflow: "hidden",
      borderWidth: 0.1,
      borderColor: palette.ebony,
      // marginBottom: 10,
    },
    leftView: {
      width: WIDTH - RIGHT_VIEW_WIDTH,
      height: HEIGHT,
      borderRadius: 0,
      borderWidth: 0,
    },
    rightView: {
      width: RIGHT_VIEW_WIDTH,
      height: HEIGHT,
      backgroundColor: palette.white,
      padding: 10,
    },
  });

  return (
    <TouchableOpacity onPress={props.onPress} style={styles.item}>
      <HStack>
        <Image
          uri={props.uri}
          defaultSource={props.defaultSource}
          style={[styles.leftView]}
          imgStyle={[styles.leftView]}
          uploading={uploading}
        />
        <View style={[styles.rightView, props.style]} pointerEvents="box-none">
          {props.children}
        </View>
      </HStack>
    </TouchableOpacity>
  );
};

export default GridListItem;
