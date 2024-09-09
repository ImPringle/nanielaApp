import { StatusBar } from "expo-status-bar";
import {
  Button,
  Image,
  ScrollView,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/CustomButton";
import { router } from "expo-router";

export default function App() {
  return (
    <SafeAreaView className="bg-white">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View
          className={"flex flex-col justify-center items-center h-full p-5"}
        >
          <Image
            source={require("../assets/images/tshirtguys.png")}
            className="h-[100px]"
            resizeMode="contain"
          />
          <Text className="font-bold text-3xl">QR Service</Text>
          <Text className="font-bold text-xl text-gray-500">Bienvenido!</Text>
          <CustomButton
            title={"Continuar"}
            containerStyles={"bg-primary w-full mt-5"}
            handelPress={() => {
              router.push("/sign-in");
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
