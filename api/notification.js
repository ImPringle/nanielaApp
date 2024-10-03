import axios from "axios";
import { LOCALHOST } from "@env";

const API_URL = `http://${LOCALHOST}:5001/api/notification`;

export const getNotifications = async () => {
  try {
    const response = await axios.get(`${API_URL}/all`);
    return response.data;
  } catch (error) {
    console.error("Error fetching notifications:", error.response.data.message);
  }
};

export const postNotification = async (title, message, status, eventId) => {
  try {
    const response = await axios.post(`${API_URL}/create`, {
      title,
      message,
      status,
      eventId,
    });
    return response.data;
  } catch (error) {
    console.error("Create notification error:", error.response.data.message);
  }
};

export const getNotificationById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/get/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching noti:", error.response.data.message);
  }
};
