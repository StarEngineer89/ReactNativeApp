import React, { useState } from 'react';
import { VStack } from 'react-native-stacks';
import { ErrorModal, ProcessingModal } from 'components/modals';
import { LabelTextInput } from 'components/custom';
import { Button, ContainerView } from 'components/base';
import { useAuth } from 'src/hooks';

const ChangePasswordScreen = () => {
  const { state, clearError, changePassword } = useAuth();

  const [oldPassword, setoldPassword] = useState('');
  const [newPassword, setnewPassword] = useState('');

  return (
    <ContainerView>
      {state.loading && <ProcessingModal />}
      {state.error && <ErrorModal clearAction={clearError} errorText={state.error} />}
      <VStack spacing={15} style={{ marginTop: 20 }}>
        <LabelTextInput
          label='Enter Current Password'
          placeholder='Old Password'
          value={oldPassword}
          onChangeText={setoldPassword}
          secureTextEntry
        />
        <LabelTextInput
          label='Enter New Password'
          placeholder='New Password'
          value={newPassword}
          onChangeText={setnewPassword}
          secureTextEntry
        />

        <Button
          variant='gradient'
          size='lg'
          title='Change Password'
          disabled={oldPassword === '' || newPassword === ''}
          onPress={() => changePassword(oldPassword, newPassword)}
        />
      </VStack>
    </ContainerView>
  );
};

export default ChangePasswordScreen;
