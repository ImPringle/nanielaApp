import { Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useLocalSearchParams } from "expo-router";
import CustomButton from "../../components/CustomButton";
import { completeIssue, getMaintenanceById } from "../../api/maintenance";
import { postNotification } from "../../api/notification";

const ScannedDetails = () => {
  const { query } = useLocalSearchParams();

  return (
    <SafeAreaView edges={["right", "left"]} className="">
      <Stack.Screen options={{ headerTitle: `Details #${query}` }} />
      <ScrollView contentContainerStyle={{ height: "100%" }} className="">
        <Text className="font-bold text-3xl mb-1 m-5">Details {query}</Text>

        <CustomButton title={"Complete Issue"} handelPress={() => {}} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ScannedDetails;
