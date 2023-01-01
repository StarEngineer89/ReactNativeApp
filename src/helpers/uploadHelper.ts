import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { Alert } from 'react-native';
import { Camera } from 'expo-camera';
Camera;

export const getBlob = async (uri: string) => {
  return await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      resolve(xhr.response);
    };
    xhr.onerror = () => {
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });
};

export const openImagePicker = async () => {
  // Ask the user for the permission to access the media library
  const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (permissionResult.granted === false) {
    Alert.alert("You've refused to allow this app to access your photos!");
    return;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
    // allowsMultipleSelection: true,
  });

  if (result.cancelled === true) {
    return;
  }

  const manipResult = await ImageManipulator.manipulateAsync(result.uri, [{ resize: { width: result.width < 720 ? result.width : 720 } }], {
    compress: 0.8,
    format: ImageManipulator.SaveFormat.JPEG,
  });

  return manipResult.uri;
};
