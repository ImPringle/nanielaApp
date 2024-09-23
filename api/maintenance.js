import axios from "axios";

const API_URL = "http://localhost:5001/api/maintenance";

export const postMaintenance = async (machine, machineNumber, type, action) => {
  try {
    const response = await axios.post(`${API_URL}/create`, {
      machine,
      machineNumber,
      type,
      action,
    });
    return response.data;
  } catch (error) {
    console.error("Create maintenance error:", error.response.data.message);
  }
};
