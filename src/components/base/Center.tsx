import { View, ViewProps } from 'react-native';
import React from 'react';

const Center = (props: ViewProps) => {
  return (
    <View {...props} style={[{ justifyContent: 'center', alignItems: 'center' }, props.style]}>
      {props.children}
    </View>
  );
};

export default Center;
