import React from 'react';
import { FlatList, FlatListProps } from 'react-native';
import { StyleGuide } from 'src/config';

interface HListProps extends FlatListProps<any> {
  snapwidth?: number;
}

const HList = React.forwardRef<FlatList, FlatListProps<any>>((props, ref) => {
  return (
    <FlatList
      ref={ref}
      {...props}
      horizontal
      decelerationRate={'fast'}
      snapToAlignment={'start'}
      alwaysBounceHorizontal={false}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={{
        marginVertical: StyleGuide.main.spacing,
        paddingRight: StyleGuide.sizes.padding + StyleGuide.main.spacing,
      }}
      style={[{ paddingHorizontal: StyleGuide.sizes.padding }, props.style]}
    />
  );
});

export default HList;
