import React from 'react';
import { Text, TextInput, TextInputProps, TextStyle } from 'react-native';
import { VStack } from 'react-native-stacks';
import { palette, StyleGuide } from 'src/config';

type LabelTextInputProps = TextInputProps & {
  label: string;
};

const LabelTextInput = ({ label, ...props }: LabelTextInputProps) => {
  const textStyle = [StyleGuide.typography.inputLabel];
  const inputContainerStyle = [StyleGuide.sizes.inputLabel, props.style] as TextStyle[];
  return (
    <VStack alignment="leading">
      <Text style={textStyle}>{label}</Text>

      <TextInput
        {...props}
        {...{
          autoCapitalize: 'none',
          autoCorrect: false,
          placeholderTextColor: palette.primary,
        }}
        style={inputContainerStyle}
      />
    </VStack>
  );
};

export default LabelTextInput;
