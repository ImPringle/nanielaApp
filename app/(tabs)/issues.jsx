import { View, Text, ScrollView, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import IssueCard from "../../components/IssueCard";
import { getPendingMantainances } from "../../api/maintenance";

const Issues = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [mainData, setMainData] = useState([]);
  const fetchMaintenances = async () => {
    const response = getPendingMantainances();
    if (response) {
      console.log("mantenimientos fetcheados correctamente");
      const data = await response;

      // console.log(data);

      setMainData(data);
    } else {
      console.log("error al fetchear los mantenimientos");
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchMaintenances();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchMaintenances();
    // console.log("DATA:", mainData);
  }, []);

  useEffect(() => {
    console.log("Updated maindata:", mainData); // This will log the mainData after the state has been updated
  }, [mainData]);

  return (
    <SafeAreaView edges={["right", "left", "top"]} className="p-5">
      <Text className="font-bold text-3xl mb-1">Issues</Text>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{ height: "100%" }}
        className=""
      >
        {mainData.map((item) => (
          <IssueCard key={item._id} issue={item} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Issues;
