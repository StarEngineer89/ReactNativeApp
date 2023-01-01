import React from 'react';
import { FlatList, FlatListProps } from 'react-native';
import { StyleGuide } from 'src/config';

const HList = <T,>(props: FlatListProps<T>) => {
  return (
    <FlatList
      {...props}
      horizontal
      decelerationRate={'fast'}
      snapToAlignment={'start'}
      alwaysBounceHorizontal={false}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(_, index) => index.toString()}
      contentContainerStyle={{
        marginVertical: StyleGuide.main.spacing,
        paddingRight: StyleGuide.sizes.padding + StyleGuide.main.spacing,
      }}
      style={[{ paddingHorizontal: StyleGuide.sizes.padding }, props.style]}
    />
  );
};

export default HList;
