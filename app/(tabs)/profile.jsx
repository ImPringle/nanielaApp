import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import CustomButton from "../../components/CustomButton";
import { logoutUser } from "../../api/auth";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = ({}) => {
  const [userId, setUserId] = useState("");
  const fetchUser = async () => {
    try {
      const value = await AsyncStorage.getItem("user");
      if (value !== null) {
        console.log("USER:", value);
        const parsedValue = JSON.parse(value);
        setUserId(parsedValue);
      }
    } catch (error) {
      console.log("error fetching user: " + error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <SafeAreaView edges={["right", "left", "top", "bottom"]} className="p-5">
      <View className="flex flex-row justify-between">
        <Text className="font-bold text-3xl mb-1">Profile</Text>
      </View>
      <ScrollView contentContainerStyle={{ height: "100%" }} className="">
        <View className="flex-col flex-1 justify-between items-center">
          <View className="">
            <View className="flex items-center">
              <Image
                source={require("../../assets/images/logo.png")}
                className="w-[160px] h-[160px] rounded-full border-4 border-white "
              />
            </View>
            <View className="w-full flex flex-row justify-between my-2 flex-wrap">
              <Text className="font-bold text-xl flex-wrap">User:</Text>

              <Text className="text-xl text-gray-500 flex-wrap">
                {userId.username}
              </Text>

              {/* <Text className="text-xl text-gray-500">{user.username}</Text> */}
            </View>

            <View className="w-full flex flex-row justify-between my-2 flex-wrap">
              <Text className="font-bold text-xl flex-wrap">E-mail:</Text>
              <Text className="text-xl text-gray-500 flex-wrap">
                {userId.email}
              </Text>
            </View>
            <View className="w-full flex flex-row justify-between my-2 flex-wrap">
              <Text className="font-bold text-xl flex-wrap">Rol:</Text>
              <Text className="text-xl text-gray-500 flex-wrap">
                {userId.role}
              </Text>
            </View>
          </View>

          <CustomButton
            title={"Log out"}
            containerStyles={"bg-white w-full"}
            textStyles={"text-red-500"}
            handelPress={() => {
              logoutUser;
              router.replace("/");
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
