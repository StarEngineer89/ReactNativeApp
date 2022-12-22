import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import Animated, { FadeInUp, FadeOutUp, Layout } from 'react-native-reanimated';
import { HStack, Spacer } from 'react-native-stacks';
import { Chevron } from 'components/svgs';
import { StyleGuide } from 'src/config';

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'red',
    padding: 15,
  },
  items: {
    flexGrow: 1,
    overflow: 'hidden',
  },
});

interface ListProps {
  title: string;
  children: JSX.Element | JSX.Element[];
}

const ExpandableList = ({ title, children }: ListProps) => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <TouchableWithoutFeedback
        onPress={() => {
          setOpen((o) => !o);
        }}
      >
        <Animated.View layout={Layout} style={[styles.container]}>
          <HStack style={{ width: '100%' }}>
            <Text style={StyleGuide.typography.menuItem}>{title}</Text>
            <Spacer />
            <Chevron open={open} />
          </HStack>
        </Animated.View>
      </TouchableWithoutFeedback>
      {open && (
        <Animated.View entering={FadeInUp} exiting={FadeOutUp} layout={Layout} style={{ width: '100%' }}>
          <View collapsable={false} style={{ width: '100%', paddingLeft: 15 }}>
            {children}
          </View>
        </Animated.View>
      )}
    </>
  );
};

export default ExpandableList;
