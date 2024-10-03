import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import moment from "moment";

import {
  faExclamationCircle,
  faBell,
  faCircleCheck,
  faGear,
} from "@fortawesome/free-solid-svg-icons";

const MachineCard = ({
  type,
  machineNumber,
  block,
  letter,
  brand,
  model,
  status,
  id,
}) => {
  return (
    <View className="bg-white p-2 rounded-xl flex flex-row mb-1">
      <View className="flex flex-col justify-center items-center mr-2 ml-1">
        <FontAwesomeIcon icon={faGear} size={20} color={"#C9C9C9"} />
      </View>
      <View className=" flex-1">
        <View className="flex flex-row justify-between ">
          <Text className="font-bold">
            {type ? type : "n/a"} {machineNumber ? machineNumber : "n/a"}
          </Text>
        </View>
        <Text>{brand ? brand : "n/a"}</Text>
        <Text>{id}</Text>
      </View>
    </View>
  );
};

export default MachineCard;
