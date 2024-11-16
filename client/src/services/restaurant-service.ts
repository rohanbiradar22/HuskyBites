import Restaurant from "@/models/restaurant";
import axios, { AxiosResponse } from "axios";

const baseURL = "http://localhost:8080";
const API_URL = "/restaurant";

// restaurant services for restaurant actions
export const getRestaurants = async (): Promise<Restaurant[]> => {
  try {
    const response: AxiosResponse<Restaurant[]> = await axios.get(
      `${baseURL}${API_URL}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// get restaurant by id
export const getRestaurantById = async (
  restaurantId: string
): Promise<Restaurant> => {
  try {
    const response: AxiosResponse<Restaurant> = await axios.get(
      `${baseURL}${API_URL}/${restaurantId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// delete restaurant by id
export const deleteRestaurantById = async (restaurantId: string) => {
  try {
    const response = await axios.delete(`${baseURL}${API_URL}/${restaurantId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
