import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import CustomButton from "../../components/CustomButton";

const Profile = () => {
  return (
    <SafeAreaView edges={["right", "left", "top", "bottom"]} className="p-5">
      <View className="flex flex-row justify-between">
        <Text className="font-bold text-3xl mb-1">Perfil</Text>
        <TouchableOpacity>
          <FontAwesomeIcon icon={faCamera} size={25} color="#9ca3af" />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={{ height: "100%" }} className="">
        <View className="flex-col flex-1 justify-between items-center">
          <View className="">
            <View className="flex items-center">
              <Image
                source={require("../../assets/images/capybara.jpg")}
                className="w-[160px] h-[160px] rounded-full border-4 border-white "
              />
            </View>
            <View className="w-full flex flex-row justify-between my-2">
              <Text className="font-bold text-xl">Nombre:</Text>
              <Text className="text-xl text-gray-500">Capy</Text>
            </View>
            <View className="w-full flex flex-row justify-between my-2">
              <Text className="font-bold text-xl">Apellido:</Text>
              <Text className="text-xl text-gray-500">Bara</Text>
            </View>

            <View className="w-full flex flex-row justify-between my-2">
              <Text className="font-bold text-xl">Correo:</Text>
              <Text className="text-xl text-gray-500">capybara@gmail.com</Text>
            </View>
            <View className="w-full flex flex-row justify-between my-2">
              <Text className="font-bold text-xl">Permisos:</Text>
              <Text className="text-xl text-gray-500">Admin</Text>
            </View>
          </View>

          <CustomButton
            title={"Cerrar Sesion"}
            containerStyles={"bg-white w-full"}
            textStyles={"text-red-500"}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
