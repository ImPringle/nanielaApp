import { Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useLocalSearchParams } from "expo-router";
import CustomButton from "../../components/CustomButton";
import { completeIssue } from "../../api/maintenance";

const MaintenanceDetails = () => {
  const { id } = useLocalSearchParams();

  return (
    <SafeAreaView edges={["right", "left"]} className="">
      <Stack.Screen options={{ headerTitle: `Details #${id}` }} />
      <ScrollView contentContainerStyle={{ height: "100%" }} className="">
        <Text className="font-bold text-3xl mb-1 m-5">Details {id}</Text>

        <CustomButton
          title={"Complete Issue"}
          containerStyles={"bg-primary w-full mt-5"}
          handelPress={() => {
            completeIssue(id);
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default MaintenanceDetails;
