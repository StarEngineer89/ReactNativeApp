import React, { useEffect, useState } from 'react';
import { SelectList } from 'components/custom';
import { useTeacher } from 'src/hooks';
import { CompositeScreenProps } from '@react-navigation/native';
import { IHomeDrawerNavigatorParamsList, IHomeStackNavigatorParamsList, IStudentStackNavigatorParamsList } from 'src/navigations/_types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { STUDENTS } from 'src/constants/routes';
import { DrawerScreenProps } from '@react-navigation/drawer';

const MODEL_NAME = 'sets';

interface Props
  extends CompositeScreenProps<
    NativeStackScreenProps<IStudentStackNavigatorParamsList, STUDENTS.SELECT_SETS>,
    CompositeScreenProps<NativeStackScreenProps<IHomeStackNavigatorParamsList>, DrawerScreenProps<IHomeDrawerNavigatorParamsList>>
  > {}

const StudentSetsSelectScreen = ({ navigation, route }: Props) => {
  const [selected, setselected] = useState([]);
  const { state } = useTeacher();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (route.params?.items) {
        setselected(route.params.items);
        navigation.setOptions({
          title: `Selected ${route.params.items.length} ${MODEL_NAME}`,
        });
      } else {
        navigation.setOptions({
          title: `Selected 0 ${MODEL_NAME}`,
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, [route.params]);

  const _navigateBack = (array: any[]) => {
    navigation.navigate(route.params?.parent, {
      sets: array,
      id: route.params.id,
    });
  };

  return (
    <SelectList
      data={[...state.categories, ...state.customSets]}
      selected={selected}
      setSelected={setselected}
      navigation={navigation}
      navigateBack={_navigateBack}
    />
  );
};

export default StudentSetsSelectScreen;
