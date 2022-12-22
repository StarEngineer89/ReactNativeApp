import React from 'react';
import { Text } from 'react-native';
import { VStack } from 'react-native-stacks';
import { isTablet } from 'src/functions';
import { fonts } from 'src/config';
import ModalContainer from './ModalContainer';

const FONT_SIZE = isTablet() ? 14 : 10;

const RejectModal = ({ clearAction, rejectText }) => {
  return (
    <ModalContainer visible={true} hasAction actionTitle='TRY AGAIN' onPressAction={clearAction}>
      <VStack spacing={20}>
        <Text style={{ fontSize: FONT_SIZE, fontFamily: fonts.bold }}>{rejectText}</Text>
      </VStack>
    </ModalContainer>
  );
};

export default RejectModal;
