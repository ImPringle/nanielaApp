import { Text, ScrollView, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { completeIssue, getMaintenanceById } from "../../api/maintenance";
import { getNotificationById, postNotification } from "../../api/notification";
import CustomButton from "../../components/CustomButton";

import moment from "moment";
import QRCode from "react-native-qrcode-svg";

import { LOCALHOST } from "@env";

const NotificationDetail = () => {
  const { id } = useLocalSearchParams();
  const [notiData, setNotiData] = useState([]);

  const [eventData, setEventData] = useState([]);

  const fetchNotificationData = async () => {
    try {
      const response = getNotificationById(id);
      if (response) {
        const data = await response;
        setNotiData(data);
        const eventId = data.eventId;
        console.log(data);
        console.log(eventId);
        fetchMaintenanceData(eventId);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMaintenanceData = async (eventId) => {
    try {
      const response = getMaintenanceById(eventId);
      if (response) {
        const data = await response;
        setEventData(data);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNotificationData();
  }, []);

  // useEffect(() => {
  //   console.log(eventData);
  // }, [notiData]);

  const handleComplete = async () => {
    const eventId = eventData._id;
    const response = await completeIssue(eventId);
    if (response) {
      console.log("issue completed");
      const title =
        eventData.machine +
        " #" +
        eventData.machineNumber +
        " (" +
        eventData.type +
        ")";
      const message = "Se realizo " + eventData.action + " con exito.";

      const res = await postNotification(title, message, "completed", eventId);
      console.log(res);
      router.back();
    } else {
      console.log("issue not completed");
    }
  };

  return (
    <SafeAreaView edges={["right", "left"]} className="">
      <Stack.Screen
        options={{ headerTitle: `Detalles`, headerBackTitle: "Atras" }}
      />
      <ScrollView contentContainerStyle={{ height: "100%" }} className="">
        <View className="p-5">
          <Text className="font-bold text-3xl mb-1 ">{notiData.title} </Text>
          <Text className="text-xl mb-1 ">{notiData.message}</Text>
          <Text className="text-xl mb-1 ">
            En: {moment(notiData.createdAt).format("YYYY-MM-DD")}
          </Text>

          <View className="flex flex-row w-full justify-center">
            <QRCode
              value={`http://${LOCALHOST}:5001/api/maintenance/get/${eventData._id}`}
              size={200}
            />
          </View>

          {eventData.status == "Pendiente" && (
            <CustomButton
              title={"Completar"}
              containerStyles={"bg-primary w-full mt-5"}
              handelPress={handleComplete}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NotificationDetail;
