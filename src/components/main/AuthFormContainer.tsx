import React from 'react';
import { View, ViewProps, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import { Spacer, VStack } from 'react-native-stacks';
import { ContainerView, Logo } from 'components/base';
import { AuthSocial } from 'components/custom';
import { GOOGLE_IOS_IDENTIFIER, GOOGLE_ANDROID_IDENTIFIER, FACEBOOK_APP_ID } from '@env';
import * as Google from 'expo-google-app-auth';
import * as Facebook from 'expo-facebook';
import { useAuth } from 'src/hooks';

interface AuthFormContainerProps extends ViewProps {
  children: JSX.Element | JSX.Element[];
  divider?: string;
}

const AuthFormContainer = (props: AuthFormContainerProps) => {
  const { socialLogin } = useAuth();

  async function signInWithGoogleAsync() {
    try {
      const result = await Google.logInAsync({
        androidClientId: GOOGLE_ANDROID_IDENTIFIER,
        iosClientId: GOOGLE_IOS_IDENTIFIER,
        scopes: ['profile', 'email'],
      });

      console.log('After click result: ', result);

      if (result.type === 'success') {
        const user = result.user;
        socialLogin(user.name, user.email, user.id, 'google', user.photoUrl);
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  }

  async function logInFacebook() {
    try {
      await Facebook.initializeAsync({
        appId: FACEBOOK_APP_ID,
      });
      const result: Facebook.FacebookLoginResult = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['email', 'user_photos', 'public_profile'],
      });
      if (result.type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(`https://graph.facebook.com/me?access_token=${result.token}`);
        const res = await response.json();

        const respone2 = await fetch(`https://graph.facebook.com/${res.id}?fields=id,name,email,picture&access_token=${result.token}`);

        const user = await respone2.json();
        socialLogin(user.name, user.email, user.id, 'facebook', user.picture.data.url);
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      // console.log(`Facebook Login Error: ${message}`);
    }
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
            <AuthSocial dividerText={props.divider} onPressGoogle={signInWithGoogleAsync} onPressFacebook={logInFacebook} />
          </View>
        )}
      </View>
    </ContainerView>
  );
};

export default AuthFormContainer;
