import React, { useEffect, useState } from 'react';
import { useAuth, useTeacher } from 'src/hooks';
import { CompositeScreenProps } from '@react-navigation/native';
import { IAuthStackNavigatorParamsList, IHomeDrawerNavigatorParamsList, IHomeStackNavigatorParamsList } from 'src/navigations/_types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AUTH, SETS, TEACHER } from 'src/constants/routes';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { LanguageList, SelectInterestList } from "components/custom";
import { navigationRef } from 'src/refs';
import { HeaderBackButton } from "@react-navigation/elements";

interface Props
  extends CompositeScreenProps<
    NativeStackScreenProps<IAuthStackNavigatorParamsList, AUTH.INTEREST, SETS.INTEREST>,
    CompositeScreenProps<NativeStackScreenProps<IHomeStackNavigatorParamsList>, DrawerScreenProps<IHomeDrawerNavigatorParamsList>>
  > { }

const IntermediateChooseInterest = ({ navigation, route }: Props) => {
  const { item } = route.params;
  const [selected, setselected] = useState(item.isUpdate ? item.interest : []);
  const { state, getProfile, getLanguage, getPublicInterest } = useTeacher();
  const { selectProfile, updateProfile } = useAuth();
  const [isDone, setIsDone] = useState(false);
  const [language, setLanguage] = useState([]);
  const [dialects, setDialects] = useState([]);
  const [accents, setAccents] = useState([]);

  const [showLanguage, setShowLanguage] = useState(false);
  const [showDialect, setShowDialect] = useState(false);
  const [showAccent, setShowAccent] = useState(false);

  const [languageValue, setLanguageValue] = useState("");
  const [dialectValue, setDialectValue] = useState("");
  const [accentValue, setAccentValue] = useState("");

  const [publicInterestData, setPublicInterestData] = useState([]);
  const [showPublicInterest, setShowPublicInterest] = useState(false);

  const languageList = async () => {
    const result = await getLanguage();
    if (result.data.success) {
      setLanguage(result.data.language);
      setShowLanguage(true);
    }
  };
  useEffect(() => {
    languageList();
    /* setTimeout(() => {
      getProfile();
    }, 5); */
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <HeaderBackButton tintColor="black" pressColor="black" onPress={() => {
        if (showLanguage) {
          navigationRef.current.goBack();
        } else if (showDialect) {
          setShowDialect(false);
          setShowLanguage(true);
        } else if (showAccent) {
          setShowDialect(true);
          setShowAccent(false);
        } else if (showPublicInterest) {
          setShowPublicInterest(false);
          setShowAccent(true);
        }
      }} />
    });
  }, [showLanguage, showDialect, showAccent, showPublicInterest]);

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
      {showPublicInterest ?
        <SelectInterestList
          data={publicInterestData}
          selected={selected}
          setSelected={setselected}
          navigation={navigation}
          navigateBack={_navigateBack}
          onPress={() => setIsDone(true)}
        /> : null}
      {showLanguage ?
        <LanguageList
          data={language}
          navigation={navigation}
          onItemPress={(item: any) => {
            setShowLanguage(false);
            setShowDialect(true);
            setDialects(item.dialects);
            setLanguageValue(item.language);
          }}
          dataFlag={"Language"}
        /> : null}
      {showDialect ?
        <LanguageList
          data={dialects}
          navigation={navigation}
          onItemPress={(item: any) => {
            setShowLanguage(false);
            setShowDialect(false);
            setAccents(item.accents);
            setShowAccent(true);
            setDialectValue(item.name);
          }}
          dataFlag={"Dialect"}
        /> : null}
      {showAccent ?
        <LanguageList
          data={accents}
          navigation={navigation}
          onItemPress={async (item: any) => {
            setAccentValue(item);
            const result = await getPublicInterest(languageValue, dialectValue, item);
            setPublicInterestData(result.data.category);
            setShowAccent(false);
            setShowPublicInterest(true);
          }}
          dataFlag={"Accent"}
        /> : null}
    </>
  );
};

export default IntermediateChooseInterest;
