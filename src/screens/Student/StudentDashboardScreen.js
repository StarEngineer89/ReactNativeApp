import React, { useEffect, useCallback, useState } from "react";
import { RefreshControl, Text } from "react-native";
import { VStack } from "react-native-stacks";
import { ProgressComponent, ErrorComponent } from "components/main";
import { ContainerView, GridList } from "components/base";
import { useStudent, useAuth } from "src/hooks";
import { STUDENT } from "src/constants/routes";
import {
  GridListItem,
  HomeHeaderView,
  ProgressLineBar,
} from "components/custom";
import { palette, StyleGuide } from "src/config";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const StudentDashboardScreen = ({ navigation }) => {
  const { state, getProfile } = useStudent();
  const {
    state: { authId },
  } = useAuth();

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getProfile(authId);
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getProfile(authId);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  if (state._id === null && state.loading) {
    return <ProgressComponent />;
  }

  if (state.error) return <ErrorComponent onRetry={() => getProfile(authId)} />;
  return (
    <ContainerView header={false}>
      <HomeHeaderView data={{ name: state.name, uri: state.image }} />

      {state.classroom && (
        <GridList
          refreshControl={
            <RefreshControl
              tintColor={palette.primary}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          data={state.classroom.categories.filter((c) => c.total > 0)}
          style={{ flexGrow: 1 }}
          renderDetails={({ item, index }) => (
            <GridListItem
              uri={item.image}
              onPress={() =>
                navigation.navigate(STUDENT.CLASS_SET, {
                  title: item.name,
                  cid: state.classroom._id,
                  catId: item._id,
                  predefined: item.predefined,
                })
              }
            >
              <VStack spacing={5} style={{ flex: 1 }} alignment="leading">
                <Text
                  numOfLines={2}
                  style={StyleGuide.typography.gridItemHeader}
                >
                  {item.name}
                </Text>

                <Text
                  style={StyleGuide.typography.gridItemSubHeader}
                >{`${item.recorded} of ${item.total} Voice Clips`}</Text>
                <ProgressLineBar
                  width={130}
                  height={10}
                  percentage={item.recorded / item.total}
                />
              </VStack>
            </GridListItem>
          )}
        />
      )}
    </ContainerView>
  );
};

export default StudentDashboardScreen;
