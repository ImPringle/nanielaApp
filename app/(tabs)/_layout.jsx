import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Tabs } from "expo-router";
import {
  faUser,
  faBell,
  faQrcode,
  faScrewdriverWrench,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { fetchUserInfo } from "../../utils/auth";

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="items-center justify-center gap-2">
      <FontAwesomeIcon icon={icon} size={25} color={color} />
      <Text
        className={`${
          focused ? "font-psemibold" : "font-pregular"
        } text-[10px]`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const userData = await fetchUserInfo();
        setUser(userData);
        console.log(userData);
        console.log(user);
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    };
    getUserInfo();
  }, []);
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#059dc0",
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarStyle: {
            backgroundColor: "#fff",
            borderTopWidth: 1,
            borderTopColor: "#f2f2f2",
            height: 100,
          },
        }}
      >
        <Tabs.Screen
          name="maintenance"
          options={{
            title: "Maintenance",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={faScrewdriverWrench}
                color={color}
                name={"Mantenimientos"}
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="activity"
          options={{
            title: "Activity",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={faBell}
                color={color}
                name={"Actividad"}
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="scanner"
          options={{
            title: "QR",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={faQrcode}
                color={color}
                name={"QR"}
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="issues"
          options={{
            title: "Issues",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={faExclamationTriangle}
                color={color}
                name={"Tareas"}
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          initialParams={{ user: user }}
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={faUser}
                color={color}
                name={"Perfil"}
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
