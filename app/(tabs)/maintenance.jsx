import {
  View,
  Modal,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import { Picker } from "@react-native-picker/picker";
import CustomButton from "../../components/CustomButton";
import { postMaintenance } from "../../api/maintenance";
import { postNotification } from "../../api/notification";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useLocalSearchParams } from 'expo-router';

const Maintenance = () => {
  const { data } = useLocalSearchParams();

  // Parse the data and ensure it's an object
  const parsedData = data ? JSON.parse(decodeURIComponent(data)) : null;

  

  useEffect(() => {
    fetchUser();
  }, []);

  

  // const [parsedData, setParsedData] = useState([])
  // const { data } = useLocalSearchParams();
  // setParsedData(JSON.stringify(data))
  
  // console.log("parsed data:",parsedData)

  const componentsData = [
    { id: "1", type: "picker", title: "Maquina" },
    { id: "2", type: "text", title: "No. Maquina" },
    { id: "3", type: "picker", title: "Tipo" },
    { id: "4", type: "picker", title: "Accion Realizada" },
    { id: "5", type: "picker", title: "Estatus" },
    { id: "6", type: "text", title: "Otro" },
    { id: "7", type: "button", title: "Button" },
  ];

  const [machineValue, setMachineValue] = useState("Seleccionar");
  const [machineModalVisible, setMachineModalVisible] = useState(false);

  const [machineNumber, setMachineNumber] = useState(null);
  const [other, setOther] = useState("");

  const [typeValue, setTypeValue] = useState("Seleccionar");
  const [typeModalVisible, setTypeModalVisible] = useState(false);

  const [actionValue, setActionValue] = useState("Seleccionar");
  const [actionModalVisible, setActionModalVisible] = useState(false);

  const [statusValue, setStatusValue] = useState("Seleccionar");
  const [statusModalVisible, setStatusModalVisible] = useState(false);

  const [userData, setUserData] = useState("");
  const fetchUser = async () => {
    try {
      const value = await AsyncStorage.getItem("user");
      if (value !== null) {
        console.log("USER:", value);
        const parsedValue = JSON.parse(value);
        setUserData(parsedValue);
      }
    } catch (error) {
      console.log("error fetching user: " + error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const createMaintenance = async () => {
    try {
      const action = other == "" ? actionValue : other;
      const response = await postMaintenance(
        machineValue,
        machineNumber,
        typeValue,
        action,
        statusValue,
        userData.username,
        userData._id,
        "none"
      );
      const actualMaintenance = await response;
      console.log("actual", actualMaintenance.id);
      const title =
        machineValue + " #" + machineNumber + " (" + typeValue + ")";
      const message = "Se requiere realizar " + action;
      const status = statusValue == "Completado" ? "completed" : "pending";
      const eventId = actualMaintenance.id;
      if (response) {
        postNotification(title, message, status, eventId, userData.username,
          userData._id,
          "none");
        console.log("noti posted");
      } else {
        console.log("noti not posted");
      }
    } catch (error) {
      console.log("Error posting new maintenance:", error);
    }
  };

  const renderComponent = ({ item }) => {
    switch (item.title) {
      case "Maquina":
        return (
          <View className="space-y-2 mb-2">
            {/* <Text>{parsedData._id}</Text> */}
            <Text className="text-base text-gray-400 font-bold">Machine</Text>
            <TouchableOpacity
              onPress={() => {
                setMachineModalVisible(true);
                console.log("machine modal visible");
              }}
            >
              <View className="w-full h-16 px-4 bg-black-100 border-black-200 border-2 rounded-2xl focus:border-secondary items-center flex-row">
                <Text className="text-black font-p-semibold text-base">
                  {machineValue}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        );
      case "No. Maquina":
        return (
          <FormField
            title={"Machine Number"}
            otherStyles={"mb-2"}
            value={machineNumber}
            placeholder={machineNumber}
            handleChangeText={setMachineNumber}
          />
        );
      case "Tipo":
        return (
          <View className="space-y-2 mb-2">
            <Text className="text-base text-gray-400 font-bold">Type</Text>
            <TouchableOpacity
              onPress={() => {
                setTypeModalVisible(true);
              }}
            >
              <View className="w-full h-16 px-4 bg-black-100 border-black-200 border-2 rounded-2xl focus:border-secondary items-center flex-row">
                <Text className="text-black font-p-semibold text-base">
                  {typeValue}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        );
      case "Accion Realizada":
        return typeValue == "Seleccionar" ? (
          <View className="space-y-2 mb-2">
            <Text className="text-base text-gray-400 font-bold">
              Action
            </Text>

            <View className="w-full h-16 px-4 bg-black-100 border-gray-400 border-2 rounded-2xl focus:border-secondary items-center flex-row">
              <Text className="text-gray-400 font-p-semibold text-base">
                {actionValue}
              </Text>
            </View>
          </View>
        ) : (
          <View className="space-y-2 mb-2">
            <Text className="text-base text-gray-400 font-bold">
              Action
            </Text>
            <TouchableOpacity
              onPress={() => {
                setActionModalVisible(true);
              }}
            >
              <View className="w-full h-16 px-4 bg-black-100 border-black-200 border-2 rounded-2xl focus:border-secondary items-center flex-row">
                <Text className="text-black font-p-semibold text-base">
                  {actionValue}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        );
      case "Estatus":
        return (
          (userData.role == "admin" || userData.role == "tecnico") && (
            <View className="space-y-2 mb-2">
              <Text className="text-base text-gray-400 font-bold">Status</Text>
              <TouchableOpacity
                onPress={() => {
                  setStatusModalVisible(true);
                }}
              >
                <View className="w-full h-16 px-4 bg-black-100 border-black-200 border-2 rounded-2xl focus:border-secondary items-center flex-row">
                  <Text className="text-black font-p-semibold text-base">
                    {statusValue}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )
        );
      case "Otro":
        return machineValue == "Fan" ||
          machineValue == "Thermal" ||
          actionValue == "Otro" ? (
          <FormField
            title={"Describe la accion"}
            otherStyles={"mb-2"}
            value={other}
            placeholder={other}
            handleChangeText={setOther}
          />
        ) : (
          <FormField
            title={"Description"}
            otherStyles={"mb-2"}
            value={other}
            placeholder={other}
            handleChangeText={setOther}
          />
        );
      case "Button":
        return (
          <CustomButton
            title={"Upload"}
            containerStyles={"bg-primary w-full mt-5"}
            handelPress={() => {
              createMaintenance();
              router.replace("/activity");
            }}
          />
  
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView edges={["right", "left", "top"]} className="p-5">
      <View className="flex flex-row justify-between items-center">
        <Text className="font-bold text-3xl mb-1">Maintenance</Text>
        <TouchableOpacity
          onPress={() => {
            router.push("/maintenance/machinesList");
          }}
        >
          <Text className="text-xl text-primary">List</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={componentsData}
        keyExtractor={(item) => item.id}
        renderItem={renderComponent}
        className="mb-6"
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={
          machineModalVisible ||
          typeModalVisible ||
          actionModalVisible ||
          statusModalVisible
        }
        style={{}}
      >
        <View className=" flex-1 justify-end">
          <View className=" bg-white h-[50%] rounded-t-3xl p-5">
            <TouchableOpacity
              onPress={() => {
                if (machineModalVisible) {
                  setMachineModalVisible(false);
                } else if (typeModalVisible) {
                  setTypeModalVisible(false);
                } else if (actionModalVisible) {
                  setActionModalVisible(false);
                } else if (statusModalVisible) {
                  setStatusModalVisible(false);
                }
              }}
            >
              <Text className=" text-primary text-lg">Close</Text>
            </TouchableOpacity>
            {machineModalVisible && (
              <Picker
                selectedValue={machineValue}
                onValueChange={(itemValue) => {
                  setMachineValue(itemValue);
                  setMachineNumber("");
                  setTypeValue("Seleccionar");
                  setActionValue("Seleccionar");
                  setOther("");
                }}
              >
                <Picker.Item label="Seleccionar" value={"Seleccionar"} />
                <Picker.Item label="Printer" value={"Printer"} />
                <Picker.Item label="Dryer" value={"Dryer"} />
                <Picker.Item label="Synergy" value={"Synergy"} />
                <Picker.Item label="Thermal" value={"Thermal"} />
                <Picker.Item label="Schulze" value={"Schulze"} />
                <Picker.Item label="Fan" value={"Fan"} />
              </Picker>
            )}

            {typeModalVisible && (
              <Picker
                selectedValue={typeValue}
                onValueChange={(itemValue) => {
                  setTypeValue(itemValue);
                  setActionValue("Seleccionar");
                  setOther("");
                }}
              >
                <Picker.Item label="Select" value={"Select"} />
                <Picker.Item label="Preventive" value={"Preventive"} />
                <Picker.Item label="Corrective" value={"Corrective"} />
              </Picker>
            )}

            {actionModalVisible &&
              machineValue == "Printer" &&
              typeValue == "Preventive" && (
                <Picker
                  selectedValue={actionValue}
                  onValueChange={(itemValue) => {
                    setActionValue(itemValue);
                    setOther("");
                  }}
                >
                  <Picker.Item label="Select" value={"Select"} />
                  <Picker.Item
                    label="Nozzle Cleaning"
                    value={"Nozzle Cleaning"}
                  />
                  <Picker.Item
                    label="Wipers cleaning"
                    value={"Wipers cleaning"}
                  />
                  <Picker.Item
                    label="Change of caps"
                    value={"Change of caps"}
                  />
                  <Picker.Item
                    label="Filter change"
                    value={"Filter change"}
                  />
                  <Picker.Item
                    label="Humidifier filling"
                    value={"Humidifier filling"}
                  />
                  <Picker.Item
                    label="Eliminate waste"
                    value={"Eliminate waste"}
                  />
                  <Picker.Item
                    label="Clean station white side"
                    value={"Clean station white side"}
                  />
                  <Picker.Item
                    label="Cards cleaning"
                    value={"Cards cleaning"}
                  />
                  <Picker.Item
                    label="Encoder strip cleaning"
                    value={"Encoder strip cleaning"}
                  />
                  <Picker.Item
                    label="Fan cleaning"
                    value={"Fan cleaning"}
                  />
                  <Picker.Item label="Internal cleaning" value={"Internal cleaning"} />
                  <Picker.Item label="External cleaning" value={"External cleaning"} />
                  <Picker.Item label="Rail grease" value={"Rail grease"} />
                  <Picker.Item label="Other" value={"Other"} />
                </Picker>
              )}
            {actionModalVisible &&
              machineValue == "Printer" &&
              typeValue == "Corrective" && (
                <Picker
                  selectedValue={actionValue}
                  onValueChange={(itemValue) => {
                    setActionValue(itemValue);
                  }}
                >
                  <Picker.Item label="Seleccionar" value={"Seleccionar"} />
                  <Picker.Item label="5442" value={"5442"} />
                  <Picker.Item label="5422" value={"5422"} />
                  <Picker.Item label="6231" value={"6231"} />
                  <Picker.Item label="6101" value={"6101"} />
                  <Picker.Item label="6111" value={"6111"} />
                  <Picker.Item
                    label="Conveyor belt failure"
                    value={"Conveyor belt failure"}
                  />
                  <Picker.Item label="Other" value={"Other"} />
                </Picker>
              )}

            {actionModalVisible &&
              machineValue == "Dryer" &&
              typeValue == "Preventive" && (
                <Picker
                  selectedValue={actionValue}
                  onValueChange={(itemValue) => {
                    setActionValue(itemValue);
                  }}
                >
                  <Picker.Item label="Select" value={"Select"} />
                  <Picker.Item label="Internal cleaning" value={"Internal cleaning"} />
                  <Picker.Item label="External cleaning" value={"External cleaning"} />
                  <Picker.Item
                    label="Rear belt and rollers cleaning"
                    value={"Rear belt and rollers cleanings"}
                  />
                  <Picker.Item
                    label="Clean Flame Sensor"
                    value={"Clean Flame Sensor"}
                  />
                  <Picker.Item
                    label="Filter Cleaning"
                    value={"Filter Cleaning"}
                  />
                  <Picker.Item
                    label="Bearings grease"
                    value={"Bearings grease"}
                  />
                  <Picker.Item
                    label="Spark plug cleaning"
                    value={"Spark plug cleaning"}
                  />
                  <Picker.Item label="Other" value={"Other"} />
                </Picker>
              )}
            {actionModalVisible &&
              machineValue == "Dryer" &&
              typeValue == "Corrective" && (
                <Picker
                  selectedValue={actionValue}
                  onValueChange={(itemValue) => {
                    setActionValue(itemValue);
                  }}
                >
                  <Picker.Item label="Select" value={"Select"} />
                  <Picker.Item
                    label="Patch belt"
                    value={"Patch belt"}
                  />
                  <Picker.Item
                    label="Fuse replacement"
                    value={"Fuse replacement"}
                  />
                  <Picker.Item label="Other" value={"Other"} />
                </Picker>
              )}

            {actionModalVisible &&
              machineValue == "Synergy" &&
              typeValue == "Preventive" && (
                <Picker
                  selectedValue={actionValue}
                  onValueChange={(itemValue) => {
                    setActionValue(itemValue);
                  }}
                >
                  <Picker.Item label="Select" value={"Select"} />
                  <Picker.Item label="Water purge" value={"Water purge"} />
                  <Picker.Item
                    label="Card cleaning"
                    value={"Card cleaning"}
                  />
                  <Picker.Item label="Internal cleaning" value={"Internal cleaning"} />
                  <Picker.Item label="External cleaning" value={"External cleaning"} />
                  <Picker.Item
                    label="Belt cleaning"
                    value={"Belt cleaning"}
                  />
                  <Picker.Item
                    label="Filter cleaning"
                    value={"Filter cleaning"}
                  />
                  <Picker.Item
                    label="Line cleaning"
                    value={"Line cleaning"}
                  />
                  <Picker.Item label="Other" value={"Other"} />
                </Picker>
              )}
            {actionModalVisible &&
              machineValue == "Synergy" &&
              typeValue == "Corrective" && (
                <Picker
                  selectedValue={actionValue}
                  onValueChange={(itemValue) => {
                    setActionValue(itemValue);
                  }}
                >
                  <Picker.Item label="Select" value={"Select"} />
                  <Picker.Item
                    label="Selenoid valve replacement"
                    value={"Selenoid valve replacement"}
                  />
                  <Picker.Item
                    label="Card replacement"
                    value={"Card replacement"}
                  />
                  <Picker.Item label="Other" value={"Other"} />
                </Picker>
              )}

            {actionModalVisible &&
              machineValue == "Schulze" &&
              typeValue == "Preventive" && (
                <Picker
                  selectedValue={actionValue}
                  onValueChange={(itemValue) => {
                    setActionValue(itemValue);
                  }}
                >
                  <Picker.Item label="Select" value={"Select"} />
                  <Picker.Item
                    label="Filter cleaning"
                    value={"Filter cleaning"}
                  />
                  <Picker.Item
                    label="Line cleaning"
                    value={"Line cleaning"}
                  />
                  <Picker.Item
                    label="Nozzles cleaning"
                    value={"Nozzles cleaning"}
                  />
                  <Picker.Item
                    label="Rail grease"
                    value={"Rail grease"}
                  />
                  <Picker.Item
                    label="Eliminate waste"
                    value={"Eliminate waste"}
                  />
                  <Picker.Item label="Internal cleaning" value={"Internal cleaning"} />
                  <Picker.Item label="External cleaning" value={"External cleaning"} />
                  <Picker.Item label="Other" value={"Other"} />
                </Picker>
              )}
            {actionModalVisible &&
              machineValue == "Synergy" &&
              typeValue == "Corrective" && (
                <Picker
                  selectedValue={actionValue}
                  onValueChange={(itemValue) => {
                    setActionValue(itemValue);
                  }}
                >
                  <Picker.Item label="Select" value={"Select"} />
                  <Picker.Item
                    label="Selenoid valve replacement"
                    value={"Selenoid valve replacement"}
                  />
                  <Picker.Item
                    label="Nozzels cleaning"
                    value={"Nozzels cleaning"}
                  />
                  <Picker.Item label="Other" value={"Other"} />
                </Picker>
              )}
            {statusModalVisible && (
              <Picker
                selectedValue={statusValue}
                onValueChange={(itemValue) => {
                  setStatusValue(itemValue);
                }}
              >
                <Picker.Item label="Select" value={"Select"} />
                <Picker.Item label="Pending" value={"Pending"} />
                <Picker.Item label="Complet" value={"Completado"} />
              </Picker>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Maintenance;