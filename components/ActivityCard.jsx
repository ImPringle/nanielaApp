import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import moment from "moment";

import {
  faExclamationCircle,
  faBell,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";

const ActivityCard = ({ title, message, status, handlePress, date }) => {
  return (
    <TouchableOpacity onPress={handlePress}>
      <View className="bg-white p-2 rounded-xl flex flex-row mb-1">
        <View className="flex flex-col justify-center items-center mr-2 ml-1">
          <FontAwesomeIcon
            icon={
              status == "pending"
                ? faExclamationCircle
                : status == "completed"
                ? faCircleCheck
                : faBell
            }
            size={20}
            color={status == "completed" ? "#22c55e" : "#ffbe26"}
          />
        </View>
        <View className=" flex-1">
          <View className="flex flex-row justify-between ">
            <Text className="font-bold">{title}</Text>
            <Text className="text-gray-400">
              {moment(date).format("YYYY-MM-DD")}
            </Text>
          </View>
          <Text>{message}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ActivityCard;
