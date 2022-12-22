import React, { useEffect, useCallback, useState } from "react";
import { RefreshControl } from "react-native";
import { STUDENTS } from "src/constants/routes";
import { ProgressComponent, ErrorComponent } from "components/main";
import { HomeHeaderView, NewsList } from "components/custom";
import { useAuth, useTeacher } from "src/hooks";
import { ContainerView } from "components/base";
import { palette } from "src/config";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const TeacherNewsScreen = ({ navigation }) => {
  const { state, getProfile, clearError } = useTeacher();
  const {
    state: { authId },
  } = useAuth();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      tabBarStyle: { display: state.profileInfo !== null ? "flex" : "none" },
    });
    setTimeout(() => {
      getProfile(authId);
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

  if (state.profileInfo === null && state.loading) return <ProgressComponent />;

  if (state.error)
    return (
      <ErrorComponent
        onRetry={() => {
          clearError();
          getProfile(authId);
        }}
      />
    );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getProfile(authId);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <ContainerView header={false}>
      <HomeHeaderView
        data={{ name: state.profileInfo.name, uri: state.profileInfo.image }}
        uploading={
          state.profileInfo.uploading ? state.profileInfo.uploading : undefined
        }
      />

      <NewsList
        refreshControl={
          <RefreshControl
            tintColor={palette.primary}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        sectionTitle="Latest News"
        data={state.news}
        onPressItem={(item) => {
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
