import { View, Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Scanner = () => {
  return (
    <SafeAreaView edges={["right", "left", "top"]} className="p-5">
      <Text className="font-bold text-3xl mb-1">QR Scanner</Text>
      <ScrollView
        contentContainerStyle={{ height: "100%" }}
        className=""
      ></ScrollView>
    </SafeAreaView>
  );
};

export default Scanner;