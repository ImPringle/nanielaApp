import axios from "axios";

const API_URL = "http://localhost:5001/api/maintenance";

export const completeIssue = async (id) => {
  try {
    const response = await axios.put(`${API_URL}/complete/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error completing issue:", error.response.data.message);
  }
};

export const postMaintenance = async (
  machine,
  machineNumber,
  type,
  action,
  status
) => {
  try {
    const response = await axios.post(`${API_URL}/create`, {
      machine,
      machineNumber,
      type,
      action,
      status,
    });
    return response.data;
  } catch (error) {
    console.error("Create maintenance error:", error.response.data.message);
  }
};

export const getPendingMantainances = async () => {
  try {
    const response = await axios.get(`${API_URL}/pending`);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching pending issues:",
      error.response.data.message
    );
  }
};

export const getMaintenanceById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/get/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching pending issues:",
      error.response.data.message
    );
  }
};
