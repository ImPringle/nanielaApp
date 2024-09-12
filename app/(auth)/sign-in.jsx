import { View, Text, ScrollView, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import FormField from "../../components/FormField";
import { loginUser } from "../../api/auth";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    // console.log("handlelogin" + username + " - " + password);
    const response = await loginUser(username, password);
    if (response) {
      console.log("Login succesful");
      router.replace("/activity");
    } else {
      console.log("Error de login");
    }
  };

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
            <Text className="font-bold text-2xl">Iniciar Sesion</Text>
            <FormField
              title={"Username"}
              otherStyles={""}
              handleChangeText={setUsername}
            />
            <FormField
              title={"Password"}
              otherStyles={"mt-2"}
              isPassword={true}
              handleChangeText={setPassword}
            />
          </View>
          <View className="w-full flex flex-col items-center">
            <Text>
              {password}
              {username}
            </Text>
            <CustomButton
              title={"Iniciar Sesion"}
              containerStyles={"bg-primary w-full mt-5"}
              handelPress={handleLogin}
            />
            <View className="flex flex-row mt-4">
              <Text className="">No tienes cuenta? </Text>
              <Link href={"/sign-up"} className="text-primary font-bold">
                Crear una
              </Link>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
