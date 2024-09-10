import { View, Text } from "react-native";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import {
  faExclamationCircle,
  faPlugCircleBolt,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

const ActivityCard = () => {
  return (
    <View className="bg-white p-2 rounded-xl flex flex-row">
      <View className="flex flex-col justify-center items-center mr-2 ml-1">
        <FontAwesomeIcon icon={faExclamationCircle} size={20} color="#ffbe26" />
      </View>
      <View className=" flex-1">
        <View className="flex flex-row justify-between ">
          <Text className="font-bold">Title</Text>
          <Text className="text-gray-400">Date</Text>
        </View>
        <Text>Description</Text>
      </View>
    </View>
  );
};

export default ActivityCard;
