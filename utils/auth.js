import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://localhost:5000/api/user";

export const fetchUserInfo = async () => {
  try {
    const token = await AsyncStorage.getItem("token");

    if (!token) {
      throw new Error("No token found");
    }

    const response = await axios.get(`${API_URL}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch {
    console.error("Error fetching user information:", error.message);
    throw error;
  }
};
