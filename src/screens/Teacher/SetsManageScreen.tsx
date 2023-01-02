import React from 'react';
import { Text } from 'react-native';
import { SETS } from 'src/constants/routes';
import { VStack, Spacer } from 'react-native-stacks';
import { useTeacher } from 'src/hooks';
import Animated, { Layout, SlideInLeft } from 'react-native-reanimated';
import { ContainerView, GridList } from 'components/base';
import { GridListItem } from 'components/custom';
import { StyleGuide } from 'src/config';
import { CompositeScreenProps } from '@react-navigation/native';
import { IHomeDrawerNavigatorParamsList, IHomeStackNavigatorParamsList, ISetStackNavigatorParamsList } from 'src/navigations/_types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DrawerScreenProps } from '@react-navigation/drawer';

interface Props
  extends CompositeScreenProps<
    NativeStackScreenProps<ISetStackNavigatorParamsList, SETS.MANAGE>,
    CompositeScreenProps<NativeStackScreenProps<IHomeStackNavigatorParamsList>, DrawerScreenProps<IHomeDrawerNavigatorParamsList>>
  > {}

const SetsManageScreen = ({ navigation }: Props) => {
  const { state } = useTeacher();

  return (
    <ContainerView>
      <GridList
        paginated={true}
        itemsPerPage={7}
        data={state.categories}
        renderDetails={({ item, index }) => {
          return (
            <Animated.View entering={SlideInLeft.delay(index * 10)} layout={Layout.delay(200)}>
              <GridListItem
                uri={item.image}
                defaultSource={item.slug}
                onPress={() => navigation.navigate(SETS.DETAILS, { title: item.name, id: item._id, predefined: item.predefined })}>
                <VStack spacing={5} style={{ flex: 1 }} alignment="leading">
                  <Text numberOfLines={2} style={StyleGuide.typography.gridItemHeader}>
                    {item.name}
                  </Text>

                  <Text style={StyleGuide.typography.gridItemSubHeader}>{`${item.size} Voice Clips`}</Text>

                  <Spacer />
                </VStack>
              </GridListItem>
            </Animated.View>
          );
        }}
      />
    </ContainerView>
  );
};

export default SetsManageScreen;
