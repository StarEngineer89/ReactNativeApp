import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { Spacer, VStack } from "react-native-stacks";
import { ErrorModal, ProcessingModal } from "components/modals";
import { ImageUploader, LabelTextInput } from "components/custom";
import { useTeacher } from "src/hooks";
import { ContainerView, Button } from "components/base";

const CustomSetEditScreen = ({ route }) => {
  const { id } = route.params;
  const { state, clearError, editSet } = useTeacher();
  const _set = state.customSets.find((s) => s._id.toString() === id.toString());

  const [customSet, setCustomSet] = useState({
    name: _set.name,
    image: _set.image,
  });

  return (
    <ContainerView>
      {state.savingSet.loading && <ProcessingModal />}
      {state.savingSet.error && (
        <ErrorModal
          clearAction={() => clearError("SET")}
          errorText={state.savingSet.error}
        />
      )}
      <ScrollView>
        <VStack spacing={15}>
          <ImageUploader
            source={customSet.image}
            onSelectImage={(uri) => setCustomSet({ ...customSet, image: uri })}
          />
          <LabelTextInput
            label="Change Set Name"
            value={customSet.name}
            onChangeText={(value) =>
              setCustomSet({ ...customSet, name: value })
            }
          />

          <Spacer />
          <View
            style={[
              {
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "transparent",
                width: "100%",
                marginBottom: 20,
              },
            ]}
          >
            <Button
              size="lg"
              variant="gradient"
              title="Save"
              onPress={() => {
                editSet(
                  id,
                  customSet.name,
                  customSet.image,
                  customSet.image != _set.image
                );
              }}
            />
          </View>
        </VStack>
      </ScrollView>
    </ContainerView>
  );
};

export default CustomSetEditScreen;
