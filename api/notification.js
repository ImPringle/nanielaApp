import axios from "axios";

const API_URL = "http://localhost:5001/api/notification";

export const getNotifications = async () => {
  try {
    const response = await axios.get(`${API_URL}/all`);
    return response.data;
  } catch (error) {
    console.error("Error fetching notifications:", error.response.data.message);
  }
};

export const postNotification = async (title, message, status) => {
  try {
    const response = await axios.post(`${API_URL}/create`, {
      title,
      message,
      status,
    });
    return response.data;
  } catch (error) {
    console.error("Create notification error:", error.response.data.message);
  }
};
