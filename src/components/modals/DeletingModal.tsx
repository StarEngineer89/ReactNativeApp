import React from 'react';
import { Text } from 'react-native';
import { VStack } from 'react-native-stacks';
import { fonts, palette } from 'src/config';
import { isTablet } from 'src/functions';
import ConfirmModal from './ConfirmModal';

const FONT_SIZE = isTablet() ? 16 : 12;

const DeletingModal = ({ show, onDelete, onCancel }) => {
  return (
    <ConfirmModal visible={show} onConfirm={onDelete} onCancel={onCancel}>
      <VStack spacing={20}>
        <Text
          style={{
            fontSize: FONT_SIZE,
            fontFamily: fonts.bold,
            marginHorizontal: 5,
            textAlign: 'center',
            color: palette.danger,
          }}
        >
          Are you sure? This action cannot be undone.
        </Text>
      </VStack>
    </ConfirmModal>
  );
};

export default DeletingModal;
