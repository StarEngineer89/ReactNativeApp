import React, { useEffect, useState } from "react";
import { SelectList } from "components/custom";
import { useTeacher } from "src/hooks";

const MODEL_NAME = "sets";

const StudentSetsSelectScreen = ({ navigation, route }) => {
  const [selected, setselected] = useState([]);
  const { state } = useTeacher();

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
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

  const _navigateBack = (array) => {
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
