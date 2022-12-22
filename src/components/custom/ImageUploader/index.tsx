import React, { useEffect, useState } from 'react';
import { openImagePicker } from 'src/helpers/uploadHelper';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { StyleSheet, Alert, Image, Platform } from 'react-native';
import { Camera } from 'expo-camera';
import { navigate, navigationRef } from 'src/refs';
import { images } from 'src/constants';
import { isTablet } from 'src/functions';
import { palette } from 'src/config';
import { VStack } from 'react-native-stacks';
import { Button } from 'components/base';

const IMAGE_WIDTH = isTablet() ? 240 : 200;
const IMAGE_RADIUS = isTablet() ? 35 : 30;

const ImageUploader = ({ source = null, onSelectImage, imgStyle, ...props }) => {
  const [image, setImage] = useState(source);
  const { showActionSheetWithOptions } = useActionSheet();

  const _showImagePicker = async () => {
    const imageUri = await openImagePicker();
    setImage(imageUri);
    onSelectImage(imageUri);
  };

  useEffect(() => {
    const route = navigationRef.current.getCurrentRoute();

    if (route.params?.image) {
      setImage(route.params?.image);
      onSelectImage(route.params?.image);
    }

    return () => {};
  }, [navigationRef.current.getCurrentRoute()]);

  const _prompt = () => {
    const options = ['Choose from library', 'Take a Photo', 'Cancel'];

    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          _showImagePicker();
        } else if (buttonIndex === 1) {
          Camera.requestCameraPermissionsAsync()
            .then(({ status }) => {
              if (status === 'granted') {
                // navigationRef.current.navigate()
                navigate('Camera', { backRoute: navigationRef.current.getCurrentRoute() });
              } else {
                Alert.alert(`Camera not found`);
              }
              //  Alert.alert(`Camera Status is ${status}`)
            })
            .catch((e) => {
              // handle Error
            });
        }
        // Do something here depending on the button index selected
      }
    );
  };

  return (
    <VStack spacing={12} {...props}>
      <Image source={{ uri: image }} style={[styles.imageStyle, imgStyle]} />

      <Button variant='gradient' size='lg' title='Upload Image' onPress={_prompt} />
    </VStack>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    backgroundColor: palette.primary,
    width: IMAGE_WIDTH,
    height: IMAGE_WIDTH,
    borderRadius: IMAGE_RADIUS,
  },
});

export default ImageUploader;
