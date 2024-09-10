import { View, Text, ScrollView } from "react-native";
import React from "react";

import { SafeAreaView } from "react-native-safe-area-context";
import ActivityCard from "../../components/ActivityCard";
import { router } from "expo-router";

const Activity = () => {
  return (
    <SafeAreaView edges={["right", "left", "top"]} className="p-5">
      <Text className="font-bold text-3xl mb-1">Activity</Text>
      <ScrollView contentContainerStyle={{ height: "100%" }} className="">
        <View className="flex flex-col">
          <ActivityCard
            title={"Maquina #3"}
            icon={"alert"}
            message={"Se requiere hacer mantenimiento"}
            status={"pending"}
            handlePress={() => {
              router.push("/activity/1");
            }}
          />
          <ActivityCard
            title={"Maquina #2"}
            icon={"reminder"}
            message={"Aun no se ha hecho el mantenimiento"}
            status={"pending"}
          />
          <ActivityCard
            title={"Impresora #1"}
            icon={"check"}
            message={"Se realizo mantenimiento"}
            status={"done"}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Activity;
