import React, { useState } from 'react';
import { ErrorModal, InfoModal, ProcessingModal } from 'components/modals';
import { Button, TextInput, ContainerView } from 'components/base';
import { useDeviceInfo, useTeacher } from 'src/hooks';
import { VStack } from 'react-native-stacks';
import { ScrollView } from 'react-native';
import { LabelTextInput } from 'components/custom';
import { StyleGuide } from 'src/config';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { IContactUsStackNavigatorParamsList, IHomeDrawerNavigatorParamsList } from 'src/navigations/_types';
import { CONTACT_US } from 'src/constants/routes';
import { DrawerScreenProps } from '@react-navigation/drawer';

let SIZES = StyleGuide.main;

interface Props
  extends CompositeScreenProps<
    NativeStackScreenProps<IContactUsStackNavigatorParamsList, CONTACT_US.MAIN>,
    DrawerScreenProps<IHomeDrawerNavigatorParamsList>
  > {}

const ContactUsScreen = ({ navigation }: Props) => {
  const [subject, setsubject] = useState('');
  const [body, setbody] = useState('');
  const { state, sendMessage, clearMessage } = useTeacher();
  const { isTablet } = useDeviceInfo();
  const _submit = () => {
    sendMessage(subject, body);
  };

  return (
    <ContainerView>
      {state.sendingMessage.loading && <ProcessingModal />}
      {state.sendingMessage.error && <ErrorModal clearAction={clearMessage} />}
      {state.sendingMessage.success && (
        <InfoModal
          body={'Message Sent Successfully'}
          clearAction={() => {
            clearMessage();
            navigation.goBack();
          }}
        />
      )}

      <ScrollView alwaysBounceVertical={false}>
        <VStack alignment={isTablet ? 'leading' : 'center'} spacing={20} style={[{ flex: 1, marginTop: 35 }, isTablet && { paddingLeft: 40 }]}>
          <LabelTextInput value={subject} placeholder="Title" label="Subject Title" onChangeText={setsubject} />

          <TextInput
            multiline
            numberOfLines={0}
            style={{
              height: isTablet ? 400 : 300,
              width: SIZES.width - (isTablet ? 80 : 60),
              paddingTop: 10,
              paddingLeft: 10,
              margin: 0,
            }}
            placeholder="Body"
            value={body}
            onChangeText={setbody}
          />
          <Button size="lg" variant="gradient" title="Send" disabled={body.length === 0 || subject.length === 0} onPress={_submit} />
        </VStack>
      </ScrollView>
    </ContainerView>
  );
};

export default ContactUsScreen;
