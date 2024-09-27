import { Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useLocalSearchParams } from "expo-router";
import CustomButton from "../../components/CustomButton";
import { completeIssue, getMaintenanceById } from "../../api/maintenance";
import { postNotification } from "../../api/notification";

const MaintenanceDetails = () => {
  const { id } = useLocalSearchParams();

  // checkpoint
  const [data, setData] = useState([]);

  const completingMaint = async () => {
    const response = completeIssue(id);
    if (response) {
      const title =
        data.machine + " #" + data.machineNumber + " (" + data.type + ")";
      const message = "Se realizo " + data.action + " correctamente!";
      const status = "completed";
      postNotification(title, message, status);
      console.log("tdb");
    } else {
      console.log("error xd");
    }
  };

  const fetchMaint = async () => {
    const response = getMaintenanceById(id);
    if (response) {
      const maintData = await response;
      setData(maintData);
      console.log("done:", maintData);
    } else {
      console.log("donent xd");
    }
  };
  useEffect(() => {
    fetchMaint();
  });

  return (
    <SafeAreaView edges={["right", "left"]} className="">
      <Stack.Screen options={{ headerTitle: `Details #${id}` }} />
      <ScrollView contentContainerStyle={{ height: "100%" }} className="">
        <Text className="font-bold text-3xl mb-1 m-5">Details {id}</Text>

        <CustomButton
          title={"Complete Issue"}
          handelPress={() => {
            completingMaint();
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default MaintenanceDetails;
