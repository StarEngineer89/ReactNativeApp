import React, { useRef, useState } from 'react';
import { ProcessingModal, ErrorModal } from 'components/modals';
import { Formik } from 'formik';
import { HStack, VStack } from 'react-native-stacks';
import { Button, TextInput } from 'components/base';
import { AuthFormContainer } from 'components/main';
import { useDeviceInfo, useAuth } from 'src/hooks';
import { AUTH } from 'src/constants/routes';
import { Text, TextInput as RNTextInput } from 'react-native';
import { fonts, palette } from 'src/config';
import { isTablet } from 'src/functions';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { IAuthStackNavigatorParamsList } from 'src/navigations/_types';

interface Props extends NativeStackScreenProps<IAuthStackNavigatorParamsList, AUTH.LOGIN> {}

const LoginScreen = ({ navigation }: Props) => {
  const { state, login, clearError } = useAuth();
  const [showAttemptsError, setshowAttemptsError] = useState(false);
  const emailRef = useRef<RNTextInput>();
  const passwordRef = useRef<RNTextInput>();
  const { isLandscape } = useDeviceInfo();

  return (
    <>
      {state.loading && <ProcessingModal />}
      {state.error && <ErrorModal clearAction={clearError} errorText={state.error} />}
      {showAttemptsError && <ErrorModal clearAction={() => setshowAttemptsError(false)} errorText={'Account Locked. Please reset your password.'} />}
      <AuthFormContainer divider="or login with">
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={async values => {
            if (state.loginAttempts === 3) {
              setshowAttemptsError(true);
            } else {
              login(values.email, values.password);
            }
          }}>
          {({ handleSubmit, handleChange, values }) => (
            <VStack>
              <VStack spacing={8} style={isLandscape && { flexDirection: 'row' }}>
                <TextInput
                  placeholder="Email"
                  keyboardType="email-address"
                  onChangeText={handleChange('email')}
                  value={values.email}
                  ref={emailRef}
                  onSubmitEditing={() => passwordRef.current?.focus()}
                  returnKeyType="next"
                  style={[isLandscape && { marginHorizontal: 8 }]}
                />

                <TextInput
                  placeholder="Password"
                  onChangeText={handleChange('password')}
                  value={values.password}
                  secureTextEntry
                  ref={passwordRef}
                  onSubmitEditing={() => handleSubmit()}
                  style={[isLandscape && { marginHorizontal: 8 }]}
                />
              </VStack>
              <VStack spacing={8}>
                <Button variant="ghost" onPress={() => navigation.navigate(AUTH.RESET)}>
                  <HStack spacing={2}>
                    <Text style={{ fontFamily: fonts.light, fontSize: isTablet() ? 14 : 9, color: palette.primary }}>Forgot Password?</Text>
                    <Text style={{ fontFamily: fonts.bold, fontSize: isTablet() ? 14 : 9, color: palette.primary }}>RESET PASSWORD</Text>
                  </HStack>
                </Button>

                <Button variant="gradient" onPress={() => handleSubmit()} title="Login" />
              </VStack>
            </VStack>
          )}
        </Formik>
      </AuthFormContainer>
    </>
  );
};

export default LoginScreen;
