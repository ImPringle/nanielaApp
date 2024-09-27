import { Text, ScrollView, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useLocalSearchParams } from "expo-router";
import { completeIssue } from "../../api/maintenance";
import { postNotification } from "../../api/notification";
import CustomButton from "../../components/CustomButton";

const NotificationDetail = () => {
  const { id } = useLocalSearchParams();

  const handleComplete = async () => {
    const response = await completeIssue(id);
    if (response) {
      console.log("issue completed");
      postNotification(id, "terminado", "completed");
      router.back();
    } else {
      console.log("issue not completed");
    }
  };

  return (
    <SafeAreaView edges={["right", "left"]} className="">
      <Stack.Screen
        options={{ headerTitle: `${id}`, headerBackTitle: "Atras" }}
      />
      <ScrollView contentContainerStyle={{ height: "100%" }} className="">
        <View className="p-5">
          <Text className="font-bold text-3xl mb-1 m-5"> {id}</Text>

          <CustomButton
            title={"Completar"}
            containerStyles={"bg-primary w-full mt-5"}
            handelPress={handleComplete}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NotificationDetail;
