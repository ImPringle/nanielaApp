import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LOCALHOST } from "@env";

const API_URL = `http://${LOCALHOST}:5001/api/auth`;

export const registerUser = async (username, email, password, role) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      username,
      email,
      password,
      role,
    });
    return response.data;
  } catch (error) {
    console.error("Registration error:", error.response.data.message);
  }
};

export const loginUser = async (username, password) => {
  try {
    // console.log(username, password);
    const response = await axios.post(`${API_URL}/login`, {
      username,
      password,
    });
    const { token, user } = response.data;
    console.log(response);
    await AsyncStorage.setItem("token", token);
    await AsyncStorage.setItem("user", JSON.stringify(user));
    // console.log(AsyncStorage);
    return response.data;
  } catch (error) {
    console.error("Login error:", error.response.data.message);
  }
};

export const logoutUser = async () => {
  try {
    await AsyncStorage.removeItem("token");
    console.log("Logged out");
  } catch (error) {
    console.error("Logout error:", error);
  }
};
