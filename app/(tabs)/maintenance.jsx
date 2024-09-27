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
  const [other, setOther] = useState("");

  const [typeValue, setTypeValue] = useState("Seleccionar");
  const [typeModalVisible, setTypeModalVisible] = useState(false);

  const [actionValue, setActionValue] = useState("Seleccionar");
  const [actionModalVisible, setActionModalVisible] = useState(false);

  const createMaintenance = async () => {
    const response = null;
    if (other == "") {
      console.log("se envio un mantenimiento con other");
      response = await postMaintenance(
        machineValue,
        machineNumber,
        typeValue,
        actionValue,
        "pending"
      );
    } else {
      console.log("se envio un mantenimiento con action");

      response = await postMaintenance(
        machineValue,
        machineNumber,
        typeValue,
        other,
        "pending"
      );
    }

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
      const message = "";

      if (other == "") {
        message =
          "Se requiere " +
          actionValue +
          " en " +
          machineValue +
          " #" +
          machineNumber;
      } else {
        message =
          "Se requiere " + other + " en " + machineValue + " #" + machineNumber;
      }
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

        {typeValue == "Seleccionar" ? (
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
        )}

        {(machineValue == "Fan" ||
          machineValue == "Thermal" ||
          actionValue == "Otro") && (
          <FormField
            title={"Describe la accion"}
            otherStyles={"mb-2"}
            value={other}
            placeholder={other}
            handleChangeText={setOther}
          />
        )}

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
                    <Picker.Item
                      label="Engrasar riel"
                      value={"Engrasar riel"}
                    />
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
                    <Picker.Item
                      label="Purga de agua"
                      value={"Purga de agua"}
                    />
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
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Maintenance;
