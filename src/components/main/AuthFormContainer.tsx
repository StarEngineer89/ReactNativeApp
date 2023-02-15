import React, { useEffect } from 'react';
import { View, ViewProps, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import { Spacer, VStack } from 'react-native-stacks';
import { ContainerView, Logo } from 'components/base';
import { AuthSocial } from 'components/custom';
import { FACEBOOK_APP_ID, WEB_CIENT_ID } from '@env';
import { useAuth } from 'src/hooks';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { Settings } from 'react-native-fbsdk-next';
import { LoginManager } from "react-native-fbsdk-next";
import { Profile } from "react-native-fbsdk-next";

import appleAuth, {
} from "@invertase/react-native-apple-authentication";

Settings.setAppID(FACEBOOK_APP_ID);
Settings.initializeSDK();


interface AuthFormContainerProps extends ViewProps {
  children: JSX.Element | JSX.Element[];
  divider?: string;
}

const AuthFormContainer = (props: AuthFormContainerProps) => {
  const { socialLogin } = useAuth();

  useEffect(() => {
    // Initial configuration
    GoogleSignin.configure({
      webClientId: WEB_CIENT_ID,
      forceCodeForRefreshToken: true,
      //iosClientId: '391143990532-9c7lidvpr85pv70mq63u3rg4e3flqffr.apps.googleusercontent.com',
    });
  }, []);

  async function signInWithGoogleAsync() {
    try {
      /* await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      }); */
      const userInfo = await GoogleSignin.signIn();
      const { user } = userInfo;
      console.log(user);
      socialLogin(user.name, user.email, user.id, 'google', user.photo);
    } catch (error) {
      console.log('Message', JSON.stringify(error));
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        alert('User Cancelled the Login Flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        alert('Signing In');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        alert('Play Services Not Available or Outdated');
      } else {
        alert(error.message);
      }
    }
  }
  /**
   * CallBack function for the button.
   */
  const logInApple = async () => {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    });

    const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);
    console.log("APPLE USER", appleAuthRequestResponse);
    if (credentialState === appleAuth.State.AUTHORIZED) {
      // user is authenticated
      console.log("APPLE STATUS", credentialState);
      const {
        email,
        identityToken,
        fullName
      } = appleAuthRequestResponse;
      const name = fullName.givenName ? fullName.givenName : fullName.middleName ? fullName.middleName : fullName.familyName ? fullName.familyName : fullName.nickname ? fullName.nickname : "AppleLogin"
      socialLogin(name, email, identityToken, 'apple', "");

    }

  };

  async function logInFacebook() {
    LoginManager.logInWithPermissions(["public_profile"]).then(
      function (result) {
        if (result.isCancelled) {
          console.log("Login cancelled");
        } else {
          console.log(
            "Login success with permissions: " +
            result.grantedPermissions.toString()

          );
          const currentProfile = Profile.getCurrentProfile().then(
            function (currentProfile) {
              if (currentProfile) {
                const user = currentProfile;
                try {
                  socialLogin(user.name, user.email, user.userID, 'facebook', user.imageURL);
                }
                catch (error) {

                }

                console.log("The current logged user is: " +
                  currentProfile.name
                  + ". His profile id is: " +
                  currentProfile.userID
                );
              }
            }
          );
          console.log("DATA===", currentProfile)
        }
      },
      function (error) {
        console.log("Login fail with error: " + error);
      }
    );
  }


  return (
    <ContainerView header={false}>
      <View style={{ flex: 1 }}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1, backgroundColor: 'transparent' }}>
          <TouchableWithoutFeedback onPressOut={Keyboard.dismiss} style={{ backgroundColor: 'transparent' }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'transparent',
              }}>
              <VStack style={{ backgroundColor: 'transparent' }} spacing={10}>
                <Spacer />
                <Logo type={'main'} size={'sm'} />
                <View>{props.children}</View>
                <Spacer />
              </VStack>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        {props.divider && (
          <View style={{ position: 'absolute', bottom: 40, width: '100%' }}>
            <AuthSocial dividerText={props.divider} onPressGoogle={signInWithGoogleAsync} onPressFacebook={logInFacebook} onPressApple={logInApple} />
          </View>
        )}
      </View>
    </ContainerView>
  );
};

export default AuthFormContainer;
