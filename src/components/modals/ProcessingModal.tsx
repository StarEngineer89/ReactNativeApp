import React from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { palette, fonts } from 'src/config';
import ModalContainer from './ModalContainer';
import { isTablet } from 'src/functions';
import { VStack } from 'react-native-stacks';
import { Text } from 'react-native';

const SPIN_SIZE = isTablet() ? 'large' : 'small';
const FONT_SIZE = isTablet() ? 14 : 10;

const ProcessingModal = ({ processingText = 'PLEASE WAIT' }) => {
  return (
    <ModalContainer visible={true}>
      <VStack spacing={10}>
        <ActivityIndicator animating={true} size={SPIN_SIZE} color={palette.primary} />
        <Text
          style={{
            fontSize: FONT_SIZE,
            fontFamily: fonts.bold,
            textAlign: 'center',
            color: palette.primary,
          }}
        >
          {processingText}
        </Text>
      </VStack>
    </ModalContainer>
  );
};

export default ProcessingModal;
