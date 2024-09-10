import { View, Text, ScrollView } from "react-native";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import ActivityCard from "../../components/ActivityCard";

const Activity = () => {
  return (
    <SafeAreaView className="">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="flex flex-col p-5">
          <Text className="font-bold text-3xl">Activity</Text>
          <ActivityCard />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Activity;
