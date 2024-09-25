import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { router } from "expo-router";

const IssueCard = ({ issue }) => {
  // console.log("item data:", item);
  if (!issue) {
    return <Text>Loading</Text>;
  }
  return (
    <TouchableOpacity
      onPress={() => {
        router.push(`/maintenance/${issue._id}`);
      }}
    >
      <View className="bg-white p-2 rounded-xl flex flex-row mb-1">
        <View className="flex flex-col justify-center items-center mr-2 ml-1">
          <FontAwesomeIcon
            icon={faExclamationCircle}
            size={20}
            color={"#ffbe26"}
          />
        </View>
        <View className=" flex-1">
          <View className="flex flex-row justify-between ">
            <Text className="font-bold">
              {issue.machine} #{issue.machineNumber}
            </Text>
            <Text className="text-gray-400">
              {moment(issue.createdAt).format("YYYY-MM-DD")}
            </Text>
          </View>
          <Text>{issue.action}</Text>
          <Text>Tipo: {issue.type}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default IssueCard;
