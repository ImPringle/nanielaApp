import {
  View,
  Text,
  ScrollView,
  Button,
  Touchable,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { router } from "expo-router";
import { getMaintenanceByUrl } from "../../api/maintenance";
import CustomButton from "../../components/CustomButton";
import { getMachineById, getMachineByUrl } from "../../api/machines";

const Scanner = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [camActive, setCamActive] = useState(true);
  const [qrModalIsVisible, setQrModalIsVisible] = useState(false);
  const [scannedData, setScannedData] = useState("");
  const [data, setData] = useState([]);

  const fetchData = async (url) => {
    try {
      const response = getMachineByUrl(url);
      if (response) {
        const data = await response;
        setData(data);
        console.log(data);
      } else {
        console.log("there's no response");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <SafeAreaView edges={["right", "left", "top"]} className="p-5 ">
        <View className="flex h-full justify-center items-center">
          <Text>Necesitas dar permisos para usar la camara</Text>
          <Button onPress={requestPermission} title="Dar permisos" />
        </View>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView edges={["right", "left", "top"]} className="p-5">
      <View className=" flex flex-row justify-between items-center">
        <Text className="font-bold text-3xl mb-1">Escaner QR</Text>
        <TouchableOpacity
          onPress={() => {
            if (camActive) {
              setCamActive(false);
            } else {
              setCamActive(true);
            }
          }}
        >
          <Text className="text-xl text-primary">
            {camActive ? "Apagar" : "Encender"}
          </Text>
        </TouchableOpacity>
      </View>
      {!camActive ? (
        <Text>Camara no disponible</Text>
      ) : (
        <CameraView
          className=" h-full w-full"
          onBarcodeScanned={(res) => {
            if (camActive) {
              setCamActive(false);
              setTimeout(async () => {
                console.log(res.data);
                setScannedData(res.data);
                setQrModalIsVisible(true);
                fetchData(res.data);
                console.log("modal abierto");
              }, 500);
            }
          }}
          active={false}
        ></CameraView>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={qrModalIsVisible}
        style={{}}
      >
        <View className=" flex-1 justify-end">
          <View className=" bg-white h-[50%] rounded-t-3xl p-5 ">
            <View className="flex h-full justify-between ">
              <View>
                <TouchableOpacity
                  onPress={() => {
                    setQrModalIsVisible(false);
                    setCamActive(true);
                  }}
                >
                  <Text className=" text-primary text-lg">Close</Text>
                </TouchableOpacity>
                {data ? (
                  <View>
                    <View className="flex flex-row justify-between">
                      <Text>Tipo:</Text>
                      <Text>{data.type}</Text>
                    </View>
                    <View className="flex flex-row justify-between">
                      <Text>Numero:</Text>
                      <Text>{data.machineNumber}</Text>
                    </View>
                    <View className="flex flex-row justify-between">
                      <Text>Block:</Text>
                      <Text>{data.block}</Text>
                    </View>
                    <View className="flex flex-row justify-between">
                      <Text>Letter:</Text>
                      <Text>{data.letter}</Text>
                    </View>
                    <View className="flex flex-row justify-between">
                      <Text>Brand:</Text>
                      <Text>{data.brand}</Text>
                    </View>
                    <View className="flex flex-row justify-between">
                      <Text>Model:</Text>
                      <Text>{data.model}</Text>
                    </View>
                    <View className="flex flex-row justify-between">
                      <Text>Status:</Text>
                      <Text>{data.status}</Text>
                    </View>
                    <View className="flex flex-row justify-between">
                      <Text>ID:</Text>
                      <Text>{data.id}</Text>
                    </View>
                  </View>
                ) : (
                  <Text>Loading...</Text>
                )}
              </View>
              <CustomButton
                title={"Hacer mantenimiento"}
                containerStyles={"bg-primary w-full mt-5"}
                handelPress={() => {}}
              />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Scanner;
