import FoodItem, { FoodItemPayload } from "@/models/foodItem";
import axios, { AxiosResponse } from "axios";

const baseURL = "http://localhost:8080";

/**
 * Creates a new food item for a specific restaurant.
 */
export const createFoodItem = async (
  restaurantId: string,
  foodItem: FoodItemPayload
): Promise<FoodItem> => {
  try {
    const response: AxiosResponse<FoodItem> = await axios.post(
      `${baseURL}/restaurant/${restaurantId}/foodItems/add`,
      foodItem
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Gets a list of food items for a specific restaurant.
 */
export const getFoodItems = async (
  restaurantId: string
): Promise<FoodItem[]> => {
  try {
    const response: AxiosResponse<FoodItem[]> = await axios.get(
      `${baseURL}/restaurant/${restaurantId}/foodItems/all`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Deletes a specific food item for a given restaurant.
 */
export const deleteFoodItem = async (
  restaurantId: string,
  foodItemId: string
): Promise<void> => {
  try {
    await axios.delete(
      `${baseURL}/restaurant/${restaurantId}/foodItems/${foodItemId}`
    );
  } catch (error) {
    throw error;
  }
};

/**
 * Updates a specific food item for a given restaurant.
 */
export const updateFoodItem = async (
  restaurantId: string,
  foodItemId: string,
  updatedFoodItemData: FoodItem
): Promise<FoodItem> => {
  try {
    const response: AxiosResponse<FoodItem> = await axios.put(
      `${baseURL}/restaurant/${restaurantId}/foodItems/${foodItemId}`,
      updatedFoodItemData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
