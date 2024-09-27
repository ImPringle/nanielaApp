import { View, Text, ScrollView, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";

import { SafeAreaView } from "react-native-safe-area-context";
import ActivityCard from "../../components/ActivityCard";
import { router } from "expo-router";
import { getNotifications } from "../../api/notification";

const Activity = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [activityData, setActivityData] = useState([]);
  const fetchNotifications = async () => {
    const response = getNotifications();
    if (response) {
      console.log("notifications fetcheados correctamente");
      const data = await response;
      setActivityData(data);
    } else {
      console.log("error al fetchear notifications");
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchNotifications();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  useEffect(() => {
    console.log("Updated activData:", activityData);
  }, [activityData]);

  return (
    <SafeAreaView edges={["right", "left", "top"]} className="p-5">
      <Text className="font-bold text-3xl mb-1">Actividad</Text>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{ height: "100%" }}
        className=""
      >
        <View className="flex flex-col">
          {activityData.map((item) => (
            <ActivityCard
              key={item._id}
              title={item.title}
              message={item.message}
              status={item.status}
              handlePress={() => {
                router.push(`/activity/${item._id}`);
              }}
              date={item.createdAt}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Activity;
