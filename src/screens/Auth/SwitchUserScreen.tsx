import React, { useEffect } from 'react';
import { Pressable, View, Text } from 'react-native';
import { VStack } from 'react-native-stacks';
import { useAuth, useTeacher, useStudent } from 'src/hooks';
import { GridList, Center } from 'components/base';
import { ContainerView, Image } from 'components/base';
import { ProgressComponent, ErrorComponent } from 'components/main';
import { StyleGuide } from 'src/config';
import { AUTH } from "src/constants/routes";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { IAuthStackNavigatorParamsList } from 'src/navigations/_types';

interface Props extends NativeStackScreenProps<IAuthStackNavigatorParamsList, AUTH.SWITCH_USERS> { }

const SwitchUserScreen = ({ navigation }: Props) => {
  const { state, getProfiles, selectProfile } = useAuth();
  const { clearState } = useTeacher();
  const { clearStudentState } = useStudent();

  const _navigateByType = (id: string, type: number) => {
    selectProfile({ id, type });
  };

  useEffect(() => {
    getProfiles();
    clearState();
    clearStudentState();

    return () => { };
  }, []);

  return state.profiles.loading ? (
    <ProgressComponent />
  ) : (
    <ContainerView header={false}>
      <Center style={[{ flex: 1 }]}>
        {state.profiles.error ? (
          <ErrorComponent onRetry={getProfiles} />
        ) : (
          <>
            <View
              style={[
                {
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: StyleGuide.sizes.headerHeight,
                  position: 'absolute',
                  top: 0,
                },
              ]}>
              <Text style={[StyleGuide.typography.customHeader]}>Switch User</Text>
            </View>
            <GridList
              data={state.profiles.data}
              style={{ width: '100%', marginTop: StyleGuide.sizes.headerHeight }}
              numOfColumns={{ mobile: 2 }}
              renderDetails={({ item, index }) => {
                return (
                  <Pressable key={`profile-grid-${index}`} onPress={() => {
                    if (item.type == 1) {
                      if (item.interest.length > 0) {
                        _navigateByType(item._id, item.type);
                      } else {
                        navigation.navigate(AUTH.INTEREST, { item: item });
                      }
                    } else {
                      _navigateByType(item._id, item.type);
                    }
                  }} style={{ marginHorizontal: 10 }}>
                    <VStack spacing={5}>
                      <Image size="xl" uri={item.image} />
                      <Text style={[StyleGuide.typography.switchUser]}>{item.name}</Text>
                    </VStack>
                  </Pressable>
                );
              }}
            />
          </>
        )}
      </Center>
    </ContainerView>
  );
};

export default SwitchUserScreen;
