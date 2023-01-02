import React from 'react';
import { VStack } from 'react-native-stacks';
import { Text } from 'react-native';
import { useTeacher } from 'src/hooks';
import { STUDENTS } from 'src/constants/routes';
import Animated, { SlideInLeft, Layout } from 'react-native-reanimated';
import { GridListItem, ProgressBarView, ProgressLineBar } from 'components/custom';
import { ContainerView, GridList } from 'components/base';
import { StyleGuide } from 'src/config';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { IHomeDrawerNavigatorParamsList, IHomeStackNavigatorParamsList, IStudentStackNavigatorParamsList } from 'src/navigations/_types';
import { DrawerScreenProps } from '@react-navigation/drawer';

interface Props
  extends CompositeScreenProps<
    NativeStackScreenProps<IStudentStackNavigatorParamsList, STUDENTS.CLASS_SETS>,
    CompositeScreenProps<NativeStackScreenProps<IHomeStackNavigatorParamsList>, DrawerScreenProps<IHomeDrawerNavigatorParamsList>>
  > {}

const StudentClassScreen = ({ navigation, route }: Props) => {
  const { studentId } = route.params;
  const { state } = useTeacher();

  const _classroom = state.students.find(std => std._id === studentId).classroom;
  return (
    <ContainerView>
      {_classroom ? (
        <GridList
          data={_classroom.categories.filter(c => c.total > 0)}
          ListHeaderComponentStyle={{ marginBottom: 10 }}
          ListHeaderComponent={<ProgressBarView value={_classroom.recorded} total={_classroom.total} overall />}
          renderDetails={({ item, index }) => (
            <Animated.View entering={SlideInLeft.delay(index * 50)} layout={Layout.delay(200)}>
              <GridListItem
                uri={item.image}
                onPress={() =>
                  navigation.navigate(STUDENTS.CLASS_SET_ITEMS, {
                    title: item.name,
                    studentId,
                    classroomId: _classroom._id,
                    catId: item._id,
                    predefined: item.predefined,
                  })
                }>
                <VStack spacing={5} style={{ flex: 1 }} alignment="leading">
                  <Text numberOfLines={2} style={StyleGuide.typography.gridItemHeader}>
                    {item.name}
                  </Text>

                  <Text style={StyleGuide.typography.gridItemSubHeader}>{`${item.recorded} of ${item.total} Voice Clips`}</Text>
                  <ProgressLineBar width={130} height={10} percentage={item.recorded / item.total} />
                </VStack>
              </GridListItem>
            </Animated.View>
          )}
        />
      ) : (
        <Text style={[StyleGuide.typography.inputLabel, { marginTop: 20, alignSelf: 'center' }]}>No Progress Available</Text>
      )}
    </ContainerView>
  );
};

export default StudentClassScreen;
