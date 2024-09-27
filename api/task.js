import axios from "axios";

const API_URL = "http://localhost:5001/api/tasks";

export const getTasks = async () => {
  try {
    const response = await axios.get(`${API_URL}/all`);
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error.response.data.message);
  }
};

export const postTask = async (title, message, status) => {
  try {
    const response = await axios.post(`${API_URL}/create`, {
      title,
      message,
      status,
    });
    return response.data;
  } catch (error) {
    console.error("Create task error:", error.response.data.message);
  }
};

export const completeTask = async (id) => {
  try {
    const response = await axios.put(`${API_URL}/complete/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error completing issue:", error.response.data.message);
  }
};
