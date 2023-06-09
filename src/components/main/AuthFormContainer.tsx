import React, { useEffect } from 'react';
import { View, ViewProps, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import { Spacer, VStack } from 'react-native-stacks';
import { ContainerView, Logo } from 'components/base';
import { AuthSocial } from 'components/custom';
import { FACEBOOK_APP_ID, WEB_CIENT_ID } from '@env';
import { useAuth } from 'src/hooks';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { Settings } from 'react-native-fbsdk-next';
import { LoginManager, AccessToken, } from 'react-native-fbsdk-next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';

Settings.setAppID(FACEBOOK_APP_ID);
Settings.initializeSDK();

interface AuthFormContainerProps extends ViewProps {
  children: JSX.Element | JSX.Element[];
  divider?: string;
}

interface myEmail {
  email: string;
}

const AuthFormContainer = (props: AuthFormContainerProps) => {
  const { socialLogin, getUser } = useAuth();

  useEffect(() => {
    // Initial configuration
    GoogleSignin.configure({
      webClientId: WEB_CIENT_ID,
      forceCodeForRefreshToken: true,
      //iosClientId: '391143990532-9c7lidvpr85pv70mq63u3rg4e3flqffr.apps.googleusercontent.com',
    });
    if(Platform.OS === 'ios'){
      const {appleAuth} = require('@invertase/react-native-apple-authentication');
      // onCredentialRevoked returns a function that will remove the event listener. useEffect will call this function when the component unmounts
      return appleAuth.onCredentialRevoked(async () => {
        console.warn('If this function executes, User Credentials have been Revoked');
        console.log('APPLE CREDENTIALS REVOKED');
      });
    }
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
    const {appleAuth} = require('@invertase/react-native-apple-authentication');
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    });

    const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);
    console.log('APPLE USER', appleAuthRequestResponse);
    if (credentialState === appleAuth.State.AUTHORIZED) {
      // user is authenticated
      console.log('APPLE STATUS', credentialState);
      const { email, identityToken, fullName } = appleAuthRequestResponse;

      if (email) {
        const name = fullName.givenName
          ? fullName.givenName
          : fullName.middleName
          ? fullName.middleName
          : fullName.familyName
          ? fullName.familyName
          : fullName.nickname
          ? fullName.nickname
          : 'AppleLogin';
        await AsyncStorage.setItem('APPLELOGIN', JSON.stringify(appleAuthRequestResponse));
        socialLogin(name, email, identityToken, 'apple', '');
      } else {
        //const getUser = await AsyncStorage.getItem('APPLELOGIN');
        const result = await getUser(jwt_decode<myEmail>(appleAuthRequestResponse.identityToken).email, "apple");
        alert(JSON.stringify(result.data.user))
        socialLogin(result.data.user.name, result.data.user.email, result.data.user.socialId, 'apple', '');
      }
    }
  };

  const initUser = (token: any) => {
    fetch('https://graph.facebook.com/v2.5/me?fields=email,first_name,last_name,friends,picture&access_token=' + token)
      .then((response) => {
        response.json().then((json) => {
          socialLogin(json.first_name, json.email, json.id, 'facebook', json.picture.data.url);
        });
      })
      .catch(() => {
        console.log('ERROR GETTING DATA FROM FACEBOOK');
      });
  };

  async function logInFacebook() {
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      function (result) {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          AccessToken.getCurrentAccessToken().then(
            async (data) => {
              console.log('FB Token', data);
              const { accessToken } = data;
              initUser(accessToken);
            }
          );
        }
      },
      function (error) {
        console.log('Login fail with error: ' + error);
      },
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
