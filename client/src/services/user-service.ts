import { User } from "@/models/auth";
import axios, { AxiosResponse } from "axios";

// Base URL for the API
const baseURL = "http://localhost:8080";
// API endpoint for user-related operations
const API_URL = "/user";

// Function to get user by ID
export const getUserById = async (userId: string): Promise<User> => {
  try {
    const response: AxiosResponse<User> = await axios.get(
      `${baseURL}${API_URL}/${userId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to delete a user by ID
export const deleteUserById = async (userId: string): Promise<void> => {
  try {
    await axios.delete(`${baseURL}${API_URL}/${userId}`);
  } catch (error) {
    throw error;
  }
};
