import { Text, ScrollView, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, router, useLocalSearchParams } from "expo-router";
import CustomButton from "../../components/CustomButton";
import { completeTask } from "../../api/task";

const TaskDetails = () => {
  const { id } = useLocalSearchParams();

  const handleComplete = async () => {
    const response = await completeTask(id);
    if (response) {
      console.log("task completed");
      router.back();
    } else {
      console.log("task not completed");
    }
  };

  return (
    <SafeAreaView edges={["right", "left"]} className="">
      <Stack.Screen
        options={{ headerTitle: `Detalles de tarea`, headerBackTitle: "Atras" }}
      />
      <ScrollView contentContainerStyle={{ height: "100%" }} className="">
        <View className="p-5">
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

export default TaskDetails;
