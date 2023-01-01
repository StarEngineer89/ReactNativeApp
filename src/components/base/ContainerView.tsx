import React from 'react';
import { StyleSheet, View, ViewProps, ImageBackground, ViewStyle } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { palette } from 'src/config';
import { images } from 'src/constants';
import { isPad } from 'src/functions';

export interface ContainerViewProps extends ViewProps {
  header?: Boolean;
  containerStyle?: ViewStyle;
  bottom?: Boolean;
  background?: Boolean;
}

const ContainerView = ({ header = true, bottom = true, background = true, ...props }: ContainerViewProps) => {
  const insets = useSafeAreaInsets();
  let containerStyle = [styles.container, header && header === true && styles.header] as ViewStyle[];

  if (bottom) containerStyle.push({ paddingBottom: insets.bottom });

  return (
    <SafeAreaView edges={['left', 'top', 'right']} style={[containerStyle, props.containerStyle]}>
      {background && <ImageBackground source={images.BACKGROUND} style={StyleSheet.absoluteFill} />}
      <View {...props} style={[styles.inner, props.style]}>
        {props.children}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'transparent',
    backgroundColor: palette.link_water,
  },
  inner: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  header: {
    paddingTop: isPad() ? 44 : 56,
  },
});

export default ContainerView;
