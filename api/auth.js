import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "localhost:5000/api/auth";

export const registerUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Registration error:", error.response.data.message);
  }
};

export const loginUser = async (username, password) => {
  try {
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
