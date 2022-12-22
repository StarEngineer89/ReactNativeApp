import React, { useEffect } from 'react';
import { View, StyleSheet, Modal, Animated } from 'react-native';
import { palette } from 'src/config';
import { VStack } from 'react-native-stacks';
import { isTablet } from 'src/functions';
import { Button } from 'components/base';

const SPACING = isTablet() ? 15 : 10;
const MODAL_WIDTH = isTablet() ? 238 : 175;
const MODAL_HEIGHT = isTablet() ? 170 : 120;

const ModalContainer = ({ visible, hasAction = false, actionTitle = '', onPressAction = () => {}, children }) => {
  const [showModal, setShowModal] = React.useState(visible);
  const scaleValue = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    toggleModal();
  }, [visible]);

  const toggleModal = () => {
    if (visible) {
      setShowModal(true);
      Animated.spring(scaleValue, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    } else {
      setTimeout(() => setShowModal(false), 200);
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <Modal transparent visible={showModal}>
      <View style={styles.modalBackGround}>
        <Animated.View style={[styles.modalContainer, { transform: [{ scale: scaleValue }] }]}>
          <VStack spacing={SPACING}>
            <View style={styles.modalChildrenContainer}>{children}</View>
            <View style={{ height: 30 }}>
              {hasAction && <Button variant='gradient' size='lg' title={actionTitle} onPress={onPressAction} />}
            </View>
          </VStack>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackGround: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    elevation: 20,
    width: MODAL_WIDTH,
  },
  header: {
    width: '100%',
    height: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  modalChildrenContainer: {
    width: MODAL_WIDTH,
    height: MODAL_HEIGHT,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: palette.link_water,
    borderColor: palette.primary,
    borderWidth: 1,
  },
});

export default ModalContainer;
