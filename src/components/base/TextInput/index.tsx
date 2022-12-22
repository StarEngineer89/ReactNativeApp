import React from 'react';
import { TextInput as RNTextInput, TextInputProps } from 'react-native';
import { palette, StyleGuide } from 'src/config';

const TextInput = React.forwardRef<RNTextInput, TextInputProps>((props, ref) => {
  const inputContainerStyle = [StyleGuide.sizes.input, props.style];
  return (
    <RNTextInput
      {...props}
      style={inputContainerStyle}
      {...{
        ref,
        autoCapitalize: 'none',
        autoCorrect: false,
        placeholderTextColor: palette.primary,
      }}
    />
  );
});

export default TextInput;
