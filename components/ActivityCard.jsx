import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import {
  faExclamationCircle,
  faBell,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";

const ActivityCard = ({ title, icon, message, status, handlePress }) => {
  return (
    <TouchableOpacity onPress={handlePress}>
      <View className="bg-white p-2 rounded-xl flex flex-row mb-1">
        <View className="flex flex-col justify-center items-center mr-2 ml-1">
          <FontAwesomeIcon
            icon={
              icon == "alert"
                ? faExclamationCircle
                : icon == "check"
                ? faCircleCheck
                : faBell
            }
            size={20}
            color={status == "pending" ? "#ffbe26" : "#22c55e"}
          />
        </View>
        <View className=" flex-1">
          <View className="flex flex-row justify-between ">
            <Text className="font-bold">{title}</Text>
            <Text className="text-gray-400">Date</Text>
          </View>
          <Text>{message}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ActivityCard;
