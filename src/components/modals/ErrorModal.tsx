import React from 'react';
import { Text } from 'react-native';
import ModalContainer from './ModalContainer';
import { ErrorIcon } from 'components/svgs';
import { isTablet } from 'src/functions';
import { VStack } from 'react-native-stacks';
import { fonts, palette } from 'src/config';

const ICON_WIDTH = isTablet() ? 120 : 90;
const ICON_HEIGHT = isTablet() ? 75 : 55;
const FONT_SIZE = isTablet() ? 14 : 10;

const ErrorModal = ({ clearAction, errorText }) => {
  return (
    <ModalContainer visible={true} hasAction actionTitle='TRY AGAIN' onPressAction={clearAction}>
      <VStack spacing={10}>
        <ErrorIcon width={ICON_WIDTH} height={ICON_HEIGHT} />
        <Text
          style={{
            fontSize: FONT_SIZE,
            fontFamily: fonts.bold,
            marginHorizontal: 5,
            textAlign: 'center',
            color: palette.primary,
          }}
        >
          {errorText || 'SOMETHING WENT WRONG!'}
        </Text>
      </VStack>
    </ModalContainer>
  );
};

export default ErrorModal;
