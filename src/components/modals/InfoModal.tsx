import React from 'react';
import { Text } from 'react-native';
import ModalContainer from './ModalContainer';
import { isTablet } from 'src/functions';
import { VStack } from 'react-native-stacks';
import { fonts, palette } from 'src/config';

const FONT_SIZE = isTablet() ? 14 : 10;

const InfoModal = ({ clearAction, body }) => {
  return (
    <ModalContainer visible={true} hasAction actionTitle='GO BACK' onPressAction={clearAction}>
      <VStack spacing={10}>
        <Text
          style={{
            fontSize: FONT_SIZE,
            fontFamily: fonts.bold,
            marginHorizontal: 5,
            textAlign: 'center',
            color: palette.primary,
          }}
        >
          {body}
        </Text>
      </VStack>
    </ModalContainer>
  );
};

export default InfoModal;
