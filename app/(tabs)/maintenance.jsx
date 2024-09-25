import { View, Modal, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import { Picker } from "@react-native-picker/picker";
import CustomButton from "../../components/CustomButton";
import { postMaintenance } from "../../api/maintenance";
import { postNotification } from "../../api/notification";

const Maintenance = () => {
  const [machineValue, setMachineValue] = useState("Seleccionar");
  const [machineModalVisible, setMachineModalVisible] = useState(false);

  const [machineNumber, setMachineNumber] = useState(null);

  const [typeValue, setTypeValue] = useState("Seleccionar");
  const [typeModalVisible, setTypeModalVisible] = useState(false);

  const [actionValue, setActionValue] = useState("Seleccionar");
  const [actionModalVisible, setActionModalVisible] = useState(false);

  const createMaintenance = async () => {
    const response = postMaintenance(
      machineValue,
      machineNumber,
      typeValue,
      actionValue,
      "pending"
    );

    console.log(
      machineValue +
        " | " +
        machineNumber +
        " | " +
        typeValue +
        " | " +
        actionValue
    );
    if (response) {
      console.log("Mantenimiento posteado");
      const title =
        machineValue + " #" + machineNumber + " (" + typeValue + ")";
      const message =
        "Se requiere " +
        actionValue +
        " en " +
        machineValue +
        " #" +
        machineNumber;
      const status = "pending";
      postNotification(title, message, status);
    } else {
      console.log("Error al postear mantenimiento");
    }
  };

  return (
    <SafeAreaView edges={["right", "left", "top"]} className="p-5">
      <Text className="font-bold text-3xl mb-1">Maintenance</Text>
      <ScrollView contentContainerStyle={{ height: "100%" }} className="">
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

        <FormField
          title={"No. Maquina"}
          otherStyles={"mb-2"}
          value={machineNumber}
          placeholder={machineNumber}
          handleChangeText={setMachineNumber}
        />

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

        <CustomButton
          title={"Crear Mantenimiento"}
          containerStyles={"bg-primary w-full mt-5"}
          handelPress={createMaintenance}
        />

        <Modal
          animationType="slide"
          transparent={true}
          visible={
            machineModalVisible || typeModalVisible || actionModalVisible
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
                  }}
                >
                  <Picker.Item label="Printer" value={"Printer"} />
                  <Picker.Item label="Dryer" value={"Dryer"} />
                  <Picker.Item label="Synergy" value={"Synergy"} />
                  <Picker.Item label="Thermal" value={"Thermal"} />
                  <Picker.Item label="Fan" value={"Fan"} />
                </Picker>
              )}

              {typeModalVisible && (
                <Picker
                  selectedValue={typeValue}
                  onValueChange={(itemValue) => {
                    setTypeValue(itemValue);
                  }}
                >
                  <Picker.Item label="Preventivo" value={"Preventivo"} />
                  <Picker.Item label="Correctivo" value={"Correctivo"} />
                </Picker>
              )}
              {actionModalVisible && machineValue == "Printer" && (
                <Picker
                  selectedValue={actionValue}
                  onValueChange={(itemValue) => {
                    setActionValue(itemValue);
                  }}
                >
                  <Picker.Item
                    label="Limp. de boquilla"
                    value={"Limp. de boquilla"}
                  />
                  <Picker.Item
                    label="Limp. de wipers"
                    value={"Limp. de wipers"}
                  />
                  <Picker.Item label="Cambio de ?" value={"Cambio de ?"} />
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
                  <Picker.Item label="Engrasar ?" value={"Engrasar ?"} />
                </Picker>
              )}
              {actionModalVisible && machineValue == "Dryer" && (
                <Picker
                  selectedValue={actionValue}
                  onValueChange={(itemValue) => {
                    setActionValue(itemValue);
                  }}
                >
                  <Picker.Item label="Limp. Int." value={"Limp. Int."} />
                  <Picker.Item label="Limp. Ext." value={"Limp. Ext."} />
                  <Picker.Item
                    label="Limp. Banda Trasera y rodillo"
                    value={"Limp. Banda Trasera y rodillo"}
                  />
                  <Picker.Item
                    label="Limp. Sensores y flama"
                    value={"Limp. Sensores y flama"}
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
                </Picker>
              )}
              {actionModalVisible && machineValue == "Synergy" && (
                <Picker
                  selectedValue={actionValue}
                  onValueChange={(itemValue) => {
                    setActionValue(itemValue);
                  }}
                >
                  <Picker.Item label="Purga de agua" value={"Purga de agua"} />
                  <Picker.Item
                    label="Limp. de tarjetas"
                    value={"Limp. de tarjetas"}
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
                </Picker>
              )}
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Maintenance;
