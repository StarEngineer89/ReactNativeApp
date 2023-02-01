import uuid from 'react-native-uuid';
import { getDownloadURL, getStorage, ref, uploadBytes, FirebaseStorage } from 'firebase/storage'; //access the storage
import { initializeApp, FirebaseApp, getApps, getApp } from 'firebase/app'; //validate yourselfdatabase
import { firebaseConfig } from 'src/config';
import { Auth, getAuth, signInAnonymously, onAuthStateChanged, signOut, initializeAuth } from 'firebase/auth';
import { getReactNativePersistence } from 'firebase/auth/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import storage from '@react-native-firebase/storage';

/**
 * NOTE>>>>>>>>>>>>>>>>>>>>>>>>>> The package "firebase" was already added to the app and was coupled
 * but since it didn't have crashlytics support, I had to add the "react-native-firebase" package as well
 * might need to remove "firebase" package itself in the future
 */

let fb: FirebaseApp;
let auth: Auth;
let storageFB: FirebaseStorage;
if (getApps().length < 1) {
  fb = initializeApp(firebaseConfig);
  auth = initializeAuth(fb, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
  storageFB = getStorage(fb);
} else {
  fb = getApp();
  auth = getAuth();
  storageFB = getStorage(fb);
}

export const uploadToDirectory = async (directory: string, uri: string) => {
  try {
    const fileExtension = uri
      .substring(uri.lastIndexOf('/') + 1)
      .split('.')
      .pop();
    const filename = uuid.v4();

    //the storage itself
    const _ref = ref(storageFB, `${directory}/${filename}.${fileExtension}`); //how the image will be addressed inside the storage
    
    const reference = storage().ref(`${directory}/${filename}.${fileExtension}`);
    //convert image to array of bytes
    //const img = await fetch(uri);
    //const bytes = await img.blob();
    await reference.putFile(uri);
    
    //await uploadBytesResumable(_ref, bytes); //upload images

    const url = await getDownloadURL(_ref);

    // Return the URL
    return url;
  } catch (error) {
    console.log('could not upload', error);
  }
};

export const checkFirebaseAuth = async (cb: Function) => {
  onAuthStateChanged(auth, user => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      // const uid = user.uid;
      cb(true);

      // ...
    } else {
      // User is signed out
      // ...
      cb(false);
    }
  });
};

export const anonymousLogOut = async () => {
  signOut(auth);
};

export const anonymousLogin = async () => {
  signInAnonymously(auth)
    .then(() => {
      // Signed in..
      onAuthStateChanged(auth, user => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          // const uid = user.uid;
          // ...
        } else {
          // User is signed out
          // ...
        }
      });
    })
    .catch(() => {
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // ...
    });
};
