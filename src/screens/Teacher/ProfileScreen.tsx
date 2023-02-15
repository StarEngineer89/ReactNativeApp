import React, { useState } from 'react';
import { Spacer, VStack, HStack } from 'react-native-stacks';
import { Button, Center, ContainerView } from 'components/base';
import { ErrorModal, ProcessingModal, DeletingModal } from 'components/modals';
import { useAuth, useDeviceInfo, useTeacher } from 'src/hooks';
import { ImageUploader, LabelTextInput } from 'components/custom';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { IHomeDrawerNavigatorParamsList, IProfileStackNavigatorParamsList } from 'src/navigations/_types';
import { PROFILE } from 'src/constants/routes';
import { DrawerScreenProps } from '@react-navigation/drawer';

interface Props
  extends CompositeScreenProps<
    NativeStackScreenProps<IProfileStackNavigatorParamsList, PROFILE.MAIN>,
    DrawerScreenProps<IHomeDrawerNavigatorParamsList>
  > {}

const ProfileScreen = ({ navigation }: Props) => {
  const { state, updateTeacher, clearError, setDrawerItem } = useTeacher();
  const { state: authState, deactivate } = useAuth();

  const { isLandscape } = useDeviceInfo();
  const [showConfirm, setshowConfirm] = useState(false);
  const [image, setImage] = useState(state.profileInfo.image);
  const [name, setname] = useState(state.profileInfo.name);

  const _submit = async () => {
    let isNewImage = image !== state.profileInfo.image;
    updateTeacher(name, image, isNewImage);
    setDrawerItem('Home');
  };

  return (
    <>
      <DeletingModal
        show={showConfirm}
        // deleteTitle={'Deactivate'}
        onCancel={() => setshowConfirm(false)}
        onDelete={() => {
          deactivate();
          setshowConfirm(false);
        }}
      />

      {state.savingProfile.error && <ErrorModal clearAction={() => clearError('PROFILE')} errorText={state.error} />}

      {state.savingProfile.loading && <ProcessingModal />}

      <ContainerView style={{ marginTop: 44 }}>
        <Center>
          <VStack spacing={5}>
            {authState.accountType === 'email' && (
              <>
                <ImageUploader source={image} onSelectImage={setImage} />
                <VStack spacing={10}>
                  <LabelTextInput label="Change Name" placeholder="My Name" value={name} onChangeText={setname} />

                  <Button variant="gradient" title="Save Profile" size="lg" onPress={_submit} />
                </VStack>
              </>
            )}
            <HStack spacing={0} style={{ marginTop: isLandscape ? 0 : 60 }}>
              {authState.accountType === 'email' && (
                <Button
                  variant="filled"
                  title="Change Password"
                  size="lg"
                  onPress={() => navigation.navigate(PROFILE.CHANGE_PASSWORD)}
                  style={{ marginHorizontal: 8 }}
                />
              )}

              <Button variant="danger" title="Delete Account" size="lg" onPress={() => setshowConfirm(true)} style={{ marginHorizontal: 8 }} />
            </HStack>
            <Spacer />
          </VStack>
        </Center>
      </ContainerView>
    </>
  );
};

export default ProfileScreen;
