import axiosInstance from "./axiosInstance";
import ENDPOINTS from "./Endpoints";

export const updateStatus = async (status: string) => {
  try {
    const response = await axiosInstance.put(`${ENDPOINTS.UPDATE_STATUS}`, {
      status,
    });
    console.log("status",response);
    return response.data;
  } catch (error) {
    console.log("Failed to update status", error);
    throw error;
  }
};
