import { Text, ScrollView, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, router, useLocalSearchParams } from "expo-router";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { postTask } from "../../api/task";

const NewTask = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const submitForm = async () => {
    try {
      const response = await postTask(title, message, "pending");
      if (response) {
        console.log("posted");
        router.back();
      } else {
        console.log("not posted");
      }
    } catch (error) {
      console.log("Error posting the task:", error);
    }
  };

  return (
    <SafeAreaView edges={["right", "left"]} className="">
      <Stack.Screen
        options={{ headerTitle: `New Task`, headerBackTitle: "Back" }}
      />
      <ScrollView contentContainerStyle={{ height: "100%" }} className=" p-5">
        <View className="flex flex-1 justify-between">
          <View>
            <FormField
              title={"Title"}
              value={title}
              handleChangeText={setTitle}
            />

            <FormField
              title={"Description"}
              value={message}
              handleChangeText={setMessage}
            />
          </View>
          <CustomButton
            title={"Upload"}
            containerStyles={"bg-primary w-full mt-5"}
            handelPress={submitForm}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NewTask;
