import React, { useState, useRef } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import { MaterialIcons } from '@expo/vector-icons';
import { navigate, navigateBack, navigationRef } from 'src/refs';
import * as ImageManipulator from 'expo-image-manipulator';
import { palette, StyleGuide } from 'src/config';
import { isTablet } from 'src/functions';
import { HStack, Spacer, VStack } from 'react-native-stacks';
import { Button } from 'components/base';
import { useDeviceInfo } from 'src/hooks';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SIZES = StyleGuide.main;

const SIZE = isTablet() ? 96 : 48;
const CameraComponent = () => {
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [pause, setpause] = useState(false);
  const cam = useRef(null);

  const { width, height, isTablet, isLandscape } = useDeviceInfo();
  const insets = useSafeAreaInsets();

  const _takePicture = async () => {
    if (cam.current) {
      const options = { quality: 0.5, skipProcessing: true };
      let photo = await cam.current.takePictureAsync(options);

      cam.current.pausePreview();
      setpause(true);

      const manipResult = await ImageManipulator.manipulateAsync(photo.uri, [{ resize: { width: photo.width < 720 ? photo.width : 720 } }], {
        compress: 0.8,
        format: ImageManipulator.SaveFormat.JPEG,
      });

      setImage(manipResult.uri);
    }
  };

  return (
    <View style={styles.container}>
      <Camera style={{ width, height, backgroundColor: 'transparent' }} type={type} ref={cam} />
      <VStack style={StyleSheet.absoluteFillObject}>
        <HStack style={{ padding: 20, paddingTop: 44, width, backgroundColor: 'rgba(20, 20, 52, 0.5)' }}>
          {isLandscape && <Spacer />}
          <TouchableOpacity
            onPress={() => {
              setType(type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back);
            }}>
            <MaterialIcons name="flip-camera-ios" size={isTablet ? 60 : 36} color={palette.primary} />
          </TouchableOpacity>
          <Spacer />
          <TouchableOpacity onPress={() => navigateBack()}>
            <MaterialIcons name="close" size={isTablet ? 60 : 36} color={palette.white} />
          </TouchableOpacity>
          {isLandscape && <Spacer />}
        </HStack>

        <Spacer />
        <HStack style={{ padding: 10, paddingBottom: insets.bottom + 20, width, backgroundColor: 'rgba(20, 20, 52, 0.5)' }}>
          {isLandscape && <Spacer />}
          <View>
            {pause && (
              <Button
                variant="gradient"
                title="Retake"
                size="md"
                onPress={() => {
                  cam.current.resumePreview();
                  setpause(false);
                }}
              />
            )}
          </View>
          <Spacer />
          <TouchableOpacity onPress={_takePicture}>
            <View
              style={{
                width: SIZE,
                height: SIZE,
                borderRadius: SIZE / 2,
                borderColor: palette.primary,
                borderWidth: 2,
                backgroundColor: palette.gradient_2,
              }}
            />
          </TouchableOpacity>
          <Spacer />
          <View>
            {pause && (
              <Button
                variant="filled"
                title="Select"
                size="md"
                onPress={() => {
                  const route: any = navigationRef.current.getCurrentRoute();
                  cam.current.resumePreview();
                  setpause(false);

                  navigate(route.params.backRoute.name, { ...route.params.backRoute.params, image });
                }}
              />
            )}
          </View>
          {isLandscape && <Spacer />}
        </HStack>
      </VStack>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.ebony,
  },
  camera: {
    width: SIZES.width,
    height: SIZES.width,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
  button: {
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});

export default CameraComponent;
