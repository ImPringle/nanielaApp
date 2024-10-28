import axios from "axios";
import { LOCALHOST } from "@env";

const API_URL = `http://${LOCALHOST}:5001/api/maintenance`;

export const completeIssue = async (id, by) => {
  try {
    const response = await axios.put(`${API_URL}/complete/${id}/${by}`);
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
  status,
  createdBy,
  createdById,
  solvedBy,
) => {
  try {
    const response = await axios.post(`${API_URL}/create`, {
      machine,
      machineNumber,
      type,
      action,
      status,
      createdBy,
      createdById,
      solvedBy,
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

export const getMaintenanceByUrl = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching pending issues:",
      error.response.data.message
    );
  }
};
