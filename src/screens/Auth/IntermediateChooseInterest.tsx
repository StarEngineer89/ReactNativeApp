import React, { useEffect, useState } from 'react';
import { useAuth, useTeacher } from 'src/hooks';
import { CompositeScreenProps } from '@react-navigation/native';
import { IAuthStackNavigatorParamsList, IHomeDrawerNavigatorParamsList, IHomeStackNavigatorParamsList } from 'src/navigations/_types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AUTH, SETS, TEACHER } from 'src/constants/routes';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { SelectInterestList } from "components/custom";

interface Props
  extends CompositeScreenProps<
    NativeStackScreenProps<IAuthStackNavigatorParamsList, AUTH.INTEREST, SETS.INTEREST >,
    CompositeScreenProps<NativeStackScreenProps<IHomeStackNavigatorParamsList>, DrawerScreenProps<IHomeDrawerNavigatorParamsList>>
  > { }

const IntermediateChooseInterest = ({ navigation, route }: Props) => {
  const { item } = route.params;
  const [selected, setselected] = useState(item.isUpdate ? item.interest : []);
  const { state, getProfile } = useTeacher();
  const { selectProfile, updateProfile } = useAuth();
  const [isDone, setIsDone] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      getProfile();
    }, 5);
  }, []);

  useEffect(() => {
    if (isDone && selected.length > 0) {
      updateProfile(item._id, item.type, selected).then((result) => {
        if (result) {
          _navigateByType(item._id, item.type);
          setIsDone(false);
        } else {
          setIsDone(false);
        }
      }).catch((error) => {
        setIsDone(false);
      });
    }
  }, [selected, isDone]);


  const _navigateByType = async (id: string, type: number) => {
    if (item.isUpdate) {
      navigation.navigate(TEACHER.MAIN);
    } else {
      selectProfile({ id, type });
    }
  };

  const _navigateBack = (array: any[]) => { };

  return (
    <>
      <SelectInterestList
        data={[...state.categories, ...state.customSets]}
        selected={selected}
        setSelected={setselected}
        navigation={navigation}
        navigateBack={_navigateBack}
        onPress={() => setIsDone(true)}
      />
    </>
  );
};

export default IntermediateChooseInterest;
