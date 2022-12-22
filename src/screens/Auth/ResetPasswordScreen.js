import React from "react";
import { ProcessingModal, ErrorModal, InfoModal } from "components/modals";
import { Formik } from "formik";
import { VStack } from "react-native-stacks";
import { Button, TextInput } from "components/base";
import { AuthFormContainer } from "components/main";
import { useAuth } from "src/hooks";

const ResetPasswordScreen = () => {
  const { state, resetPassword, clearError, clearReset } = useAuth();

  return (
    <>
      {state.loading && <ProcessingModal />}
      {state.reset.completed && (
        <InfoModal
          body={"A Reset Link is sent to your email"}
          clearAction={clearReset}
        />
      )}
      {state.error && (
        <ErrorModal clearAction={clearError} errorText={state.error} />
      )}
      <AuthFormContainer>
        <Formik
          initialValues={{ email: "" }}
          onSubmit={(values) => {
            resetPassword(values.email);
          }}
        >
          {({ handleSubmit, handleChange, values }) => (
            <VStack spacing={8}>
              <TextInput
                placeholder="Email"
                keyboardType="email-address"
                onChangeText={handleChange("email")}
                value={values.email}
              />
              <Button
                variant="gradient"
                onPress={handleSubmit}
                title="Reset Password"
              />
            </VStack>
          )}
        </Formik>
      </AuthFormContainer>
    </>
  );
};

export default ResetPasswordScreen;
