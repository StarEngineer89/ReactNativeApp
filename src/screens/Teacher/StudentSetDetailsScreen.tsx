import React, { useEffect } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { HStack, Spacer, VStack } from 'react-native-stacks';
import Animated, { SlideInLeft, Layout } from 'react-native-reanimated';
import { useTeacher } from 'src/hooks';
import { GridListItem, ProgressBarView, RateView } from 'components/custom';
import { ContainerView, GridList } from 'components/base';
import { StyleGuide } from 'src/config';
import { ProgressComponent, ErrorComponent } from 'components/main';
import { Listen } from 'components/svgs';
import { CompositeScreenProps } from '@react-navigation/native';
import { IHomeDrawerNavigatorParamsList, IHomeStackNavigatorParamsList, IStudentStackNavigatorParamsList } from 'src/navigations/_types';
import { STUDENTS } from 'src/constants/routes';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { playSound } from 'src/helpers';

interface Props
  extends CompositeScreenProps<
    NativeStackScreenProps<IStudentStackNavigatorParamsList, STUDENTS.CLASS_SET_ITEMS>,
    CompositeScreenProps<NativeStackScreenProps<IHomeStackNavigatorParamsList>, DrawerScreenProps<IHomeDrawerNavigatorParamsList>>
  > {}

const StudentSetDetailsScreen = ({ route, navigation }: Props) => {
  const { studentId, classroomId, catId, predefined } = route.params;

  const { state, getStudentClassroomCategory, clearStudentClassroomCategory, rateVoice } = useTeacher();

  useEffect(() => {
    getStudentClassroomCategory(studentId, classroomId, catId, predefined);
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', () => {
      clearStudentClassroomCategory();
    });

    return () => {
      unsubscribe();
    };
  }, [route.params]);

  if (state.studentCategory.loading) {
    return <ProgressComponent />;
  }

  return state.studentCategory.error ? (
    <ErrorComponent onRetry={() => getStudentClassroomCategory(studentId, classroomId, catId, predefined)} />
  ) : (
    <ContainerView>
      {state.studentCategory.category != null && (
        <GridList
          data={state.studentCategory.category.children.filter(p => p.studentVoiceURL != null)}
          ListHeaderComponentStyle={{ marginBottom: 10, justifyContent: 'center', alignItems: 'center' }}
          ListHeaderComponent={
            <ProgressBarView value={state.studentCategory.category.recorded} total={state.studentCategory.category.total} overall />
          }
          renderDetails={({ item, index }) => (
            <Animated.View entering={SlideInLeft.delay(index * 50)} layout={Layout.delay(200)}>
              <GridListItem uri={item.image} activeOpacity={0}>
                <VStack spacing={2}>
                  <Spacer />
                  <HStack style={{ backgroundColor: 'transparent', paddingLeft: 2 }} alignment="center">
                    <Text numberOfLines={2} style={StyleGuide.typography.gridItemHeader}>
                      {item.name}
                    </Text>
                    <Spacer />
                    <TouchableOpacity onPress={() => playSound(item.studentVoiceURL)} activeOpacity={1} style={{ padding: 10 }}>
                      <Listen width={StyleGuide.sizes.listenIcon} height={StyleGuide.sizes.listenIcon} />
                    </TouchableOpacity>
                  </HStack>
                  <RateView
                    value={item.score}
                    onPress={score => {
                      rateVoice(studentId, item._id, classroomId, score);
                    }}
                  />
                  <Spacer />
                </VStack>
              </GridListItem>
            </Animated.View>
          )}
        />
      )}
    </ContainerView>
  );
};

export default StudentSetDetailsScreen;
