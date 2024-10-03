import { View, Text, ScrollView, RefreshControl, FlatList } from "react-native";
import React, { useEffect, useState } from "react";

import { SafeAreaView } from "react-native-safe-area-context";
import ActivityCard from "../../components/ActivityCard";
import { router } from "expo-router";
import { getNotifications } from "../../api/notification";
import IssueCard from "../../components/IssueCard";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

  const [userData, setUserData] = useState("");
  const fetchUser = async () => {
    try {
      const value = await AsyncStorage.getItem("user");
      if (value !== null) {
        console.log("USER:", value);
        const parsedValue = JSON.parse(value);
        setUserData(parsedValue);
      }
    } catch (error) {
      console.log("error fetching user: " + error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchNotifications();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchNotifications();
    fetchUser();
  }, []);

  useEffect(() => {
    console.log("Updated activData:", activityData);
  }, [activityData]);

  const renderDataItem = ({ item }) =>
    userData.role == "operator" ? (
      item.status == "completed" && (
        <ActivityCard
          title={item.title}
          message={item.message}
          status={item.status}
          date={item.createdAt}
          handlePress={() => {
            router.push(`/activity/${item._id}`);
          }}
        />
      )
    ) : (
      <ActivityCard
        title={item.title}
        message={item.message}
        status={item.status}
        date={item.createdAt}
        handlePress={() => {
          router.push(`/activity/${item._id}`);
        }}
      />
    );

  return (
    <SafeAreaView edges={["right", "left", "top"]} className="p-5">
      <Text className="font-bold text-3xl mb-1">Actividad</Text>
      <View className="h-full">
        <FlatList
          data={activityData}
          renderItem={renderDataItem}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      </View>
    </SafeAreaView>
  );
};

export default Activity;
