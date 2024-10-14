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

const Maintenance = () => {
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
        statusValue
      );
      const actualMaintenance = await response;
      console.log("actual", actualMaintenance.id);
      const title =
        machineValue + " #" + machineNumber + " (" + typeValue + ")";
      const message = "Se requiere realizar " + action;
      const status = statusValue == "Completado" ? "completed" : "pending";
      const eventId = actualMaintenance.id;
      if (response) {
        postNotification(title, message, status, eventId);
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
            <Text className="text-base text-gray-400 font-bold">Maquina</Text>
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
            title={"No. Maquina"}
            otherStyles={"mb-2"}
            value={machineNumber}
            placeholder={machineNumber}
            handleChangeText={setMachineNumber}
          />
        );
      case "Tipo":
        return (
          <View className="space-y-2 mb-2">
            <Text className="text-base text-gray-400 font-bold">Tipo</Text>
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
              Accion Realizada
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
              Accion Realizada
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
              <Text className="text-base text-gray-400 font-bold">Estatus</Text>
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
            title={"Describe la accion"}
            otherStyles={"mb-2"}
            value={other}
            placeholder={other}
            handleChangeText={setOther}
          />
        );
      case "Button":
        return (
          <CustomButton
            title={"Crear Mantenimiento"}
            containerStyles={"bg-primary w-full mt-5"}
            handelPress={createMaintenance}
          />
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView edges={["right", "left", "top"]} className="p-5">
      <View className="flex flex-row justify-between items-center">
        <Text className="font-bold text-3xl mb-1">Mantenimiento</Text>
        <TouchableOpacity
          onPress={() => {
            router.push("/maintenance/machinesList");
          }}
        >
          <Text className="text-xl text-primary">Lista</Text>
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
                <Picker.Item label="Seleccionar" value={"Seleccionar"} />
                <Picker.Item label="Preventivo" value={"Preventivo"} />
                <Picker.Item label="Correctivo" value={"Correctivo"} />
              </Picker>
            )}

            {actionModalVisible &&
              machineValue == "Printer" &&
              typeValue == "Preventivo" && (
                <Picker
                  selectedValue={actionValue}
                  onValueChange={(itemValue) => {
                    setActionValue(itemValue);
                    setOther("");
                  }}
                >
                  <Picker.Item label="Seleccionar" value={"Seleccionar"} />
                  <Picker.Item
                    label="Limp. de boquilla"
                    value={"Limp. de boquilla"}
                  />
                  <Picker.Item
                    label="Limp. de wipers"
                    value={"Limp. de wipers"}
                  />
                  <Picker.Item
                    label="Cambio de caps"
                    value={"Cambio de caps"}
                  />
                  <Picker.Item
                    label="Cambio de filtro"
                    value={"Cambio de filtro"}
                  />
                  <Picker.Item
                    label="Relleno de humidificador"
                    value={"Relleno de humidificador"}
                  />
                  <Picker.Item
                    label="Eliminar deshechos"
                    value={"Eliminar deshechos"}
                  />
                  <Picker.Item
                    label="Limp. estacion lado blanco"
                    value={"Limp. estacion lado blanco"}
                  />
                  <Picker.Item
                    label="Limp. de tarjetas"
                    value={"Limp. de tarjetas"}
                  />
                  <Picker.Item
                    label="Limp. tira codificadora"
                    value={"Limp. tira codificadora"}
                  />
                  <Picker.Item
                    label="Limp. de ventiladores"
                    value={"Limp. de ventiladores"}
                  />
                  <Picker.Item label="Limp. Int." value={"Limp. Int."} />
                  <Picker.Item label="Limp. Ext." value={"Limp. Ext."} />
                  <Picker.Item label="Engrasar riel" value={"Engrasar riel"} />
                  <Picker.Item label="Otro" value={"Otro"} />
                </Picker>
              )}
            {actionModalVisible &&
              machineValue == "Printer" &&
              typeValue == "Correctivo" && (
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
                    label="Fallo de banda o tabla"
                    value={"Fallo de banda o tabla"}
                  />
                  <Picker.Item label="Otro" value={"Otro"} />
                </Picker>
              )}

            {actionModalVisible &&
              machineValue == "Dryer" &&
              typeValue == "Preventivo" && (
                <Picker
                  selectedValue={actionValue}
                  onValueChange={(itemValue) => {
                    setActionValue(itemValue);
                  }}
                >
                  <Picker.Item label="Seleccionar" value={"Seleccionar"} />
                  <Picker.Item label="Limp. Int." value={"Limp. Int."} />
                  <Picker.Item label="Limp. Ext." value={"Limp. Ext."} />
                  <Picker.Item
                    label="Limp. Banda trasera y rodillos"
                    value={"Limp. Banda trasera y rodillos"}
                  />
                  <Picker.Item
                    label="Limp. Sensores de flama"
                    value={"Limp. Sensores de flama"}
                  />
                  <Picker.Item
                    label="Limp. de filtros"
                    value={"Limp. de filtros"}
                  />
                  <Picker.Item
                    label="Engrase de chumaceras"
                    value={"Engrase de chumaceras"}
                  />
                  <Picker.Item
                    label="Limp. de bujia"
                    value={"Limp. de bujia"}
                  />
                  <Picker.Item label="Otro" value={"Otro"} />
                </Picker>
              )}
            {actionModalVisible &&
              machineValue == "Dryer" &&
              typeValue == "Correctivo" && (
                <Picker
                  selectedValue={actionValue}
                  onValueChange={(itemValue) => {
                    setActionValue(itemValue);
                  }}
                >
                  <Picker.Item label="Seleccionar" value={"Seleccionar"} />
                  <Picker.Item
                    label="Remendar banda"
                    value={"Remendar banda"}
                  />
                  <Picker.Item
                    label="Cambio de fusible"
                    value={"Cambio de fusible"}
                  />
                  <Picker.Item label="Otro" value={"Otro"} />
                </Picker>
              )}

            {actionModalVisible &&
              machineValue == "Synergy" &&
              typeValue == "Preventivo" && (
                <Picker
                  selectedValue={actionValue}
                  onValueChange={(itemValue) => {
                    setActionValue(itemValue);
                  }}
                >
                  <Picker.Item label="Seleccionar" value={"Seleccionar"} />
                  <Picker.Item label="Purga de agua" value={"Purga de agua"} />
                  <Picker.Item
                    label="Limp. Tarjetas"
                    value={"Limp. Tarjetas"}
                  />
                  <Picker.Item label="Limp. Int." value={"Limp. Int."} />
                  <Picker.Item label="Limp. Ext." value={"Limp. Ext."} />
                  <Picker.Item
                    label="Lavado de bandas"
                    value={"Lavado de bandas"}
                  />
                  <Picker.Item
                    label="Limp. de filtros"
                    value={"Limp. de filtros"}
                  />
                  <Picker.Item
                    label="Limp. de lineas"
                    value={"Limp. de lineas"}
                  />
                  <Picker.Item label="Otro" value={"Otro"} />
                </Picker>
              )}
            {actionModalVisible &&
              machineValue == "Synergy" &&
              typeValue == "Correctivo" && (
                <Picker
                  selectedValue={actionValue}
                  onValueChange={(itemValue) => {
                    setActionValue(itemValue);
                  }}
                >
                  <Picker.Item label="Seleccionar" value={"Seleccionar"} />
                  <Picker.Item
                    label="Cambio de valvula selenoide"
                    value={"Cambio de valvula selenoide"}
                  />
                  <Picker.Item
                    label="Cambio de tarjeta"
                    value={"Cambio de tarjeta"}
                  />
                  <Picker.Item label="Otro" value={"Otro"} />
                </Picker>
              )}

            {actionModalVisible &&
              machineValue == "Schulze" &&
              typeValue == "Preventivo" && (
                <Picker
                  selectedValue={actionValue}
                  onValueChange={(itemValue) => {
                    setActionValue(itemValue);
                  }}
                >
                  <Picker.Item label="Seleccionar" value={"Seleccionar"} />
                  <Picker.Item
                    label="Limp. de filtro"
                    value={"Limp. de filtro"}
                  />
                  <Picker.Item
                    label="Limp. de lineas"
                    value={"Limp. de lineas"}
                  />
                  <Picker.Item
                    label="Lavado de nozzels"
                    value={"Lavado de nozzels"}
                  />
                  <Picker.Item
                    label="Engrase de rieles"
                    value={"Engrase de rieles"}
                  />
                  <Picker.Item
                    label="Sacar deshechos"
                    value={"Sacar deshechos"}
                  />
                  <Picker.Item label="Limp. Int." value={"Limp. Int."} />
                  <Picker.Item label="Limp. Ext." value={"Limp. Ext."} />
                  <Picker.Item label="Otro" value={"Otro"} />
                </Picker>
              )}
            {actionModalVisible &&
              machineValue == "Synergy" &&
              typeValue == "Correctivo" && (
                <Picker
                  selectedValue={actionValue}
                  onValueChange={(itemValue) => {
                    setActionValue(itemValue);
                  }}
                >
                  <Picker.Item label="Seleccionar" value={"Seleccionar"} />
                  <Picker.Item
                    label="Cambio de valvula selenoide"
                    value={"Cambio de valvula selenoide"}
                  />
                  <Picker.Item
                    label="Cambio de nozzels"
                    value={"Cambio de nozzels"}
                  />
                  <Picker.Item label="Otro" value={"Otro"} />
                </Picker>
              )}
            {statusModalVisible && (
              <Picker
                selectedValue={statusValue}
                onValueChange={(itemValue) => {
                  setStatusValue(itemValue);
                }}
              >
                <Picker.Item label="Seleccionar" value={"Seleccionar"} />
                <Picker.Item label="Pendiente" value={"Pendiente"} />
                <Picker.Item label="Completado" value={"Completado"} />
              </Picker>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Maintenance;
