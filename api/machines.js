import axios from "axios";
import { LOCALHOST } from "@env";

const API_URL = `http://${LOCALHOST}:5001/api/machines`;

export const getMachines = async () => {
  try {
    const response = await axios.get(`${API_URL}/all`);
    return response.data;
  } catch (error) {
    console.error("Error fetching machines:", error.response.data.message);
  }
};

export const getMachineById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/get/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching machine:", error.response.data.message);
  }
};

export const getMachineByUrl = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching machine:", error.response.data.message);
  }
};
