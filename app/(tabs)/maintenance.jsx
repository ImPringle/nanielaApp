import { View, Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";

const Maintenance = () => {
  return (
    <SafeAreaView edges={["right", "left", "top"]} className="p-5">
      <Text className="font-bold text-3xl mb-1">Maintenance</Text>
      <ScrollView contentContainerStyle={{ height: "100%" }} className="">
        <FormField title={"Title"} />
        <FormField title={"Type"} />
        <FormField title={"Description"} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Maintenance;
