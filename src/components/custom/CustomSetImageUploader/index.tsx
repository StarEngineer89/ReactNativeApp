import React, { useEffect } from 'react';
import { openImagePicker } from 'src/helpers/uploadHelper';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { Alert } from 'react-native';
import { Camera } from 'expo-camera';
import { navigate, navigationRef } from 'src/refs';
import { palette, StyleGuide } from 'src/config';
import { MaterialIcons } from '@expo/vector-icons';

interface Props {
  onSelectImage: (image: string) => void;
}

const CustomSetImageUploader = ({ onSelectImage }: Props) => {
  const { showActionSheetWithOptions } = useActionSheet();

  const _showImagePicker = async () => {
    const imageUri = await openImagePicker();
    onSelectImage(imageUri);
  };

  useEffect(() => {
    const route = navigationRef.current.getCurrentRoute();
    const image = (route.params as any)?.image;

    if (image) {
      onSelectImage(image);
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
      buttonIndex => {
        if (buttonIndex === 0) {
          _showImagePicker();
        } else if (buttonIndex === 1) {
          Camera.requestCameraPermissionsAsync()
            .then(({ status }) => {
              if (status === 'granted') {
                // navigationRef.current.navigate()
                navigate('Camera', {
                  backRoute: navigationRef.current.getCurrentRoute(),
                });
              } else {
                Alert.alert(`Camera not found`);
              }
              //  Alert.alert(`Camera Status is ${status}`)
            })
            .catch(() => {
              // handle Error
            });
        }
        // Do something here depending on the button index selected
      },
    );
  };

  return <MaterialIcons name="add-box" size={StyleGuide.sizes.navButton} color={palette.primary} onPress={_prompt} />;
};

export default CustomSetImageUploader;
