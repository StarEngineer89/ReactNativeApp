import React from 'react';
import { StyleSheet, StatusBar, Platform, Text } from 'react-native';
import { HStack, Spacer, VStack } from 'react-native-stacks';
import { isTablet } from 'src/functions';
import { Image } from 'components/base';
import { palette, StyleGuide } from 'src/config';
import { GearButton } from 'components/svgs';
import preloaded from 'src/constants/preloaded';
import { navigationRef } from 'src/refs';
import { DrawerActions } from '@react-navigation/native';

interface Props {
  data: { uri: string; name: string };
  uploading?: Boolean;
}

const HomeHeaderView = ({ data: { uri, name }, uploading }: Props) => {
  return (
    <HStack style={styles.wrapper}>
      <VStack spacing={4} alignment='leading'>
        <Image uri={uri} size='sm' uploading={uploading} />
        <Text style={StyleGuide.typography.homeHeaderName}>{name}</Text>
      </VStack>
      <Spacer />
      <GearButton
        style={{ marginBottom: 26 }}
        onPress={() => navigationRef.current.dispatch(DrawerActions.toggleDrawer())}
      />
    </HStack>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingLeft: isTablet() ? 50 : 35,
    paddingRight: 25,
    paddingBottom: 10,
    borderBottomColor: palette.primary,
    borderBottomWidth: 1,
  },
  imageStyle: {
    width: isTablet() ? 120 : 60,
    height: isTablet() ? 120 : 60,
    borderRadius: isTablet() ? 15 : 10,
  },
});

export default HomeHeaderView;
