import React, { useEffect, useCallback, useState } from "react";
import { FlatList, RefreshControl } from "react-native";
import { STUDENTS, SETS } from "src/constants/routes";
import { useTeacher } from "src/hooks";
import { HomeHeaderView } from "components/custom";
import { ProgressComponent, ErrorComponent } from "components/main";
import { ContainerView } from "components/base";
import { palette, StyleGuide } from "src/config";
import StudentsList from "./_StudentsList";
import CustomSetsList from "./_CSetsList";
import SetsList from "./_SetsList";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const TeacherClassroomScreen = ({ navigation }) => {
  const { state, getProfile, clearError, confirmTutorial, addStudent, addSet } =
    useTeacher();

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      tabBarStyle: { display: state.profileInfo !== null ? "flex" : "none" },
    });
    setTimeout(() => {
      getProfile();
    }, 100);
  }, []);

  useEffect(() => {
    navigation.setOptions({
      tabBarStyle: {
        display:
          state.profileInfo != null && state.error == null ? "flex" : "none",
      },
    });
  }, [state.profileInfo, state.error]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getProfile();
    wait(2000).then(() => setRefreshing(false));
  }, []);

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

  return (
    <ContainerView
      header={false}
      containerStyle={{ flex: 1, paddingBottom: 0 }}
    >
      {!state.error && (
        <HomeHeaderView
          data={{ name: state.profileInfo.name, uri: state.profileInfo.image }}
          uploading={
            state.profileInfo.uploading
              ? state.profileInfo.uploading
              : undefined
          }
        />
      )}
      <FlatList
        refreshControl={
          <RefreshControl
            tintColor={palette.primary}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        style={{
          paddingTop: StyleGuide.sizes.padding,
          flexGrow: 1,
        }}
        ListHeaderComponentStyle={{ marginBottom: StyleGuide.sizes.padding }}
        ListHeaderComponent={
          <StudentsList
            data={state.students}
            showEdit={state.students.length > 0 && state.tutorial.students}
            onEdit={() =>
              navigation.navigate(STUDENTS.MAIN, {
                screen: STUDENTS.MANAGE,
              })
            }
            onConfirmTutorial={() => confirmTutorial(true, false)}
            showList={state.tutorial.students}
            onAdd={addStudent}
            onPressItem={(item) => {
              if (!item.categories || item.categories.length === 0) {
                navigation.navigate(STUDENTS.MAIN, {
                  screen: STUDENTS.EDIT,
                  params: { id: item._id },
                });
              } else {
                navigation.navigate(STUDENTS.MAIN, {
                  screen: STUDENTS.CLASS_SETS,
                  params: { title: item.name, studentId: item._id },
                });
              }
            }}
          />
        }
        data={[]}
        ListFooterComponentStyle={{ marginBottom: StyleGuide.sizes.padding }}
        ListFooterComponent={
          state.tutorial.students && state.students.length > 0 ? (
            <>
              <SetsList
                data={state.categories}
                showEdit={
                  state.tutorial.categories && state.categories.length > 0
                }
                onEdit={() =>
                  navigation.navigate(SETS.MAIN, { screen: SETS.MANAGE })
                }
                onConfirmTutorial={() => confirmTutorial(true, true)}
                showList={state.tutorial.categories}
                onPressItem={(item) => {
                  navigation.navigate(SETS.MAIN, {
                    screen: SETS.DETAILS,
                    params: {
                      title: item.name,
                      id: item._id,
                      predefined: item.predefined,
                    },
                  });
                }}
              />

              {state.tutorial.categories && state.categories.length > 0 && (
                <CustomSetsList
                  data={state.customSets}
                  showEdit={state.customSets.length > 0}
                  showAdd={state.customSets.length < 3}
                  onEdit={() =>
                    navigation.navigate(SETS.MAIN, {
                      screen: SETS.MANAGE_CUSTOMS,
                    })
                  }
                  showList={true}
                  onAdd={addSet}
                  onPressItem={(item) => {
                    navigation.navigate(SETS.MAIN, {
                      screen: SETS.DETAILS,
                      params: {
                        title: item.name,
                        id: item._id,
                        predefined: item.predefined,
                        length: item.size,
                      },
                    });
                  }}
                />
              )}
            </>
          ) : null
        }
      />
    </ContainerView>
  );
};

export default TeacherClassroomScreen;
