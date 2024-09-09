import { View, Text, ScrollView, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import { Link } from "expo-router";
import FormField from "../../components/FormField";

const SignUp = () => {
  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="flex flex-col justify-between items-center  h-full p-5">
          <Image
            source={require("../../assets/images/tshirtguys.png")}
            className="h-[60px]"
            resizeMode="contain"
          />

          <View className="flex flex-col justify-center w-full">
            <Text className="font-bold text-2xl">Registrar</Text>
            <FormField title={"Username"} otherStyles={""} />
            <FormField title={"Email"} otherStyles={"mt-2"} />
            <FormField
              title={"Password"}
              otherStyles={"mt-2"}
              isPassword={true}
            />
            <FormField
              title={"Confirm password"}
              otherStyles={"mt-2"}
              isPassword={true}
            />
          </View>
          <View className="w-full flex flex-col items-center">
            <CustomButton
              title={"Registrar"}
              containerStyles={"bg-primary w-full mt-5"}
            />
            <View className="flex flex-row mt-4">
              <Text className="">Ya tienes una cuenta? </Text>
              <Link href={"/sign-in"} className="text-primary font-bold">
                Inicia sesion
              </Link>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
