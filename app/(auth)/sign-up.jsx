import { View, Text, ScrollView, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import FormField from "../../components/FormField";
import { registerUser } from "../../api/auth";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordC, setPasswordC] = useState("");

  const handleRegister = async () => {
    console.log(
      "handleRegister: " +
        username +
        " - " +
        email +
        " " +
        password +
        " " +
        passwordC
    );
    if (password == passwordC) {
      const response = await registerUser(username, email, password, "admin");
      if (response) {
        console.log("User registered succesfullys");
        router.replace("/sign-in");
      } else {
        console.log("Error de register");
      }
    } else {
      console.log("Las contrasenas no coinciden");
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
            <Text className="font-bold text-2xl">Registrar</Text>
            <FormField
              title={"Nombre de usuario"}
              otherStyles={""}
              handleChangeText={setUsername}
            />
            <FormField
              title={"E-mail"}
              otherStyles={"mt-2"}
              handleChangeText={setEmail}
            />
            <FormField
              title={"Contraseña"}
              otherStyles={"mt-2"}
              isPassword={true}
              handleChangeText={setPassword}
            />
            <FormField
              title={"Confirmar contraseña"}
              otherStyles={"mt-2"}
              isPassword={true}
              handleChangeText={setPasswordC}
            />
          </View>
          <View className="w-full flex flex-col items-center">
            <CustomButton
              title={"Registrar"}
              containerStyles={"bg-primary w-full mt-5"}
              handelPress={handleRegister}
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
