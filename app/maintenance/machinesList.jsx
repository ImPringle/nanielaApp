import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  FlatList,
  Modal,
  Touchable,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";

import { SafeAreaView } from "react-native-safe-area-context";
import { getMachines } from "../../api/machines";
import MachineCard from "../../components/MachineCard";
import { Stack } from "expo-router";
import QRCode from "react-native-qrcode-svg";
import { LOCALHOST } from "@env";

const MachineList = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [type, setType] = useState("");
  const [machineNumber, setMachineNumber] = useState("");
  const [brand, setBrand] = useState("");
  const [block, setBlock] = useState("");
  const [letter, setLetter] = useState("");
  const [model, setModel] = useState("");
  const [status, setStatus] = useState("");
  const [id, setId] = useState("");

  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      const response = getMachines();
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

  const renderDataItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        setType(item.type);
        setMachineNumber(item.machineNumber);
        setBrand(item.brand);
        setBlock(item.block);
        setLetter(item.letter);
        setStatus(item.status);
        setModel(item.model);
        setId(item._id);
        setModalVisible(true);
        console.log(`http://${LOCALHOST}:5001/api/machines/get/${id}`);
        console.log(type, machineNumber, brand);
      }}
    >
      <MachineCard
        type={item.type}
        machineNumber={item.machineNumber}
        brand={item.brand}
      />
    </TouchableOpacity>
    // <Text>{item.type}</Text>
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <SafeAreaView edges={["right", "left", ""]} className="p-5 mb-8">
      <Stack.Screen
        options={{ headerTitle: "Machines", headerBackTitle: "Atras" }}
      />
      <View className=" h-full">
        <FlatList
          data={data}
          renderItem={renderDataItem}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        style={{}}
      >
        <View className=" flex-1 justify-end">
          <View className=" bg-white h-[70%] rounded-t-3xl p-5 ">
            <View className="flex h-full justify-between ">
              <View>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(false);
                  }}
                >
                  <Text className=" text-primary text-lg">Close</Text>
                </TouchableOpacity>
                {data ? (
                  <View>
                    <View className="flex flex-row justify-between">
                      <Text>Type:</Text>
                      <Text>{type}</Text>
                    </View>
                    <View className="flex flex-row justify-between">
                      <Text>N°:</Text>
                      <Text>{machineNumber}</Text>
                    </View>
                    <View className="flex flex-row justify-between">
                      <Text>Block:</Text>
                      <Text>{block}</Text>
                    </View>
                    <View className="flex flex-row justify-between">
                      <Text>Letter:</Text>
                      <Text>{letter}</Text>
                    </View>
                    <View className="flex flex-row justify-between">
                      <Text>Brand:</Text>
                      <Text>{brand}</Text>
                    </View>
                    <View className="flex flex-row justify-between">
                      <Text>Model:</Text>
                      <Text>{model}</Text>
                    </View>
                    <View className="flex flex-row justify-between">
                      <Text>Status:</Text>
                      <Text>{status}</Text>
                    </View>
                    <View className="flex flex-row justify-between">
                      <Text>ID:</Text>
                      <Text>{id}</Text>
                    </View>
                    <View className="flex flex-row justify-center mt-2">
                      <QRCode
                        value={`http://${LOCALHOST}:5001/api/machines/get/${id}`}
                        size={200}
                      />
                    </View>
                  </View>
                ) : (
                  <Text>Loading...</Text>
                )}
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default MachineList;
