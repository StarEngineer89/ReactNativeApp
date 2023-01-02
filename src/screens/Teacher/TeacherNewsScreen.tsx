import React, { useEffect, useCallback, useState } from 'react';
import { RefreshControl } from 'react-native';
import { STUDENTS, TABS } from 'src/constants/routes';
import { ProgressComponent, ErrorComponent } from 'components/main';
import { HomeHeaderView, NewsList } from 'components/custom';
import { useTeacher } from 'src/hooks';
import { ContainerView } from 'components/base';
import { palette } from 'src/config';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { IHomeDrawerNavigatorParamsList, IHomeStackNavigatorParamsList, IHomeTabNavigatorParamsList } from 'src/navigations/_types';
import { DrawerScreenProps } from '@react-navigation/drawer';

const wait = (timeout: number) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

interface Props
  extends CompositeScreenProps<
    BottomTabScreenProps<IHomeTabNavigatorParamsList, TABS.NOTIFICATION>,
    CompositeScreenProps<NativeStackScreenProps<IHomeStackNavigatorParamsList>, DrawerScreenProps<IHomeDrawerNavigatorParamsList>>
  > {}

const TeacherNewsScreen = ({ navigation }: Props) => {
  const { state, getProfile, clearError } = useTeacher();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      tabBarStyle: { display: state.profileInfo !== null ? 'flex' : 'none' },
    });
    setTimeout(() => {
      getProfile();
    }, 100);
  }, []);

  useEffect(() => {
    navigation.setOptions({
      tabBarStyle: {
        display: state.profileInfo != null && state.error == null ? 'flex' : 'none',
      },
    });
  }, [state.profileInfo, state.error]);

  if (state.profileInfo === null && state.loading) return <ProgressComponent />;

  if (state.error)
    return (
      <ErrorComponent
        onRetry={() => {
          clearError();
          getProfile();
        }}
      />
    );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getProfile();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <ContainerView header={false}>
      <HomeHeaderView
        data={{ name: state.profileInfo.name, uri: state.profileInfo.image }}
        uploading={state.profileInfo.uploading ? state.profileInfo.uploading : undefined}
      />

      <NewsList
        refreshControl={<RefreshControl tintColor={palette.primary} refreshing={refreshing} onRefresh={onRefresh} />}
        sectionTitle="Latest News"
        data={state.news}
        onPressItem={item => {
          navigation.navigate(STUDENTS.MAIN, {
            screen: STUDENTS.CLASS_SET_ITEMS,
            params: {
              title: item.category.name,
              studentId: item.student._id,
              classroomId: item.classroom,
              catId: item.category._id,
              predefined: item.category.predefined,
            },
          });
        }}
      />
    </ContainerView>
  );
};

export default TeacherNewsScreen;
