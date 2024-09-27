import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import IssueCard from "../../components/IssueCard";
import { getPendingMantainances } from "../../api/maintenance";
import { getTasks } from "../../api/task";
import ActivityCard from "../../components/ActivityCard";
import { router } from "expo-router";

const Issues = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const response = getTasks();
    if (response) {
      console.log("tasks fetched successfully");
      const data = await response;
      setData(data);
    } else {
      console.log("error fetching tasks");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderDataItem = ({ item }) => (
    // <View>
    //   <Text>{item.title}</Text>
    // </View>
    <ActivityCard
      title={item.title}
      message={item.message}
      status={item.status}
      date={item.createdAt}
      handlePress={() => {
        router.push(`/issues/${item._id}`);
      }}
    />
  );

  // -------------------

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  return (
    <SafeAreaView edges={["right", "left", "top"]} className="p-5">
      <View className="flex flex-row justify-between items-center mb-1">
        <Text className="font-bold text-3xl ">Tareas</Text>
        <TouchableOpacity
          onPress={() => {
            router.push("/issues/newTask");
          }}
        >
          <Text className="text-3xl text-primary">+</Text>
        </TouchableOpacity>
      </View>

      <View className="h-full ">
        <FlatList
          data={data}
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

export default Issues;
