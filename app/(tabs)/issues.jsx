import { View, Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import IssueCard from "../../components/IssueCard";

const Issues = () => {
  return (
    <SafeAreaView edges={["right", "left", "top"]} className="p-5">
      <Text className="font-bold text-3xl mb-1">Issues</Text>
      <ScrollView contentContainerStyle={{ height: "100%" }} className="">
        <IssueCard />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Issues;
