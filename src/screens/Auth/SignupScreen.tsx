import React, { useRef } from 'react';
import { VStack } from 'react-native-stacks';
import { Formik } from 'formik';
import { ProcessingModal, ErrorModal } from 'components/modals';
import { Button, TextInput } from 'components/base';
import { AuthFormContainer } from 'components/main';
import { useAuth, useDeviceInfo } from 'src/hooks';
import { TextInput as RNTextInput } from 'react-native';

const SignupScreen = () => {
  const { state, signup, clearError } = useAuth();
  const nameRef = useRef<RNTextInput>();
  const emailRef = useRef<RNTextInput>();
  const passwordRef = useRef<RNTextInput>();
  const { isLandscape } = useDeviceInfo();

  return (
    <>
      {state.loading && <ProcessingModal />}
      {state.error && <ErrorModal clearAction={clearError} errorText={state.error} />}
      <AuthFormContainer divider="or sign in with">
        <Formik
          initialValues={{ email: '', name: '', password: '' }}
          onSubmit={values => {
            signup(values.name, values.email, values.password);
          }}>
          {({ handleSubmit, handleChange, values }) => (
            <VStack spacing={8}>
              <VStack spacing={8} style={isLandscape && { flexDirection: 'row' }}>
                <TextInput
                  placeholder="Name"
                  onChangeText={handleChange('name')}
                  value={values.name}
                  ref={nameRef}
                  onSubmitEditing={() => emailRef.current?.focus()}
                  returnKeyType="next"
                  style={[isLandscape && { marginHorizontal: 8 }]}
                />

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

              <Button variant="gradient" onPress={() => handleSubmit()} title="Sign Up" />
            </VStack>
          )}
        </Formik>
      </AuthFormContainer>
    </>
  );
};

export default SignupScreen;
