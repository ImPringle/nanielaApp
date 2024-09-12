import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://192.168.100.125:5000/api/auth";

export const registerUser = async (username, email, password) => {
  try {
    console.log("olaaa");
    const response = await axios.post(`${API_URL}/register`, {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Registration error:", error.response.data.message);
  }
};

export const loginUser = async (username, password) => {
  try {
    console.log(username, password);
    const response = await axios.post(`${API_URL}/login`, {
      username,
      password,
    });
    const { token } = response.data;
    await AsyncStorage.setItem("token", token);
    return response.data;
  } catch (error) {
    console.error("Login error:", error.response.data.message);
  }
};

export const logoutUser = async () => {
  try {
    await AsyncStorage.removeItem("token");
  } catch (error) {
    console.error("Logout error:", error);
  }
};
