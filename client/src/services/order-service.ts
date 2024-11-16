import { User } from "@/models/auth";
import { Order } from "@/models/order";
import { UserResponse } from "@/models/types";
import axios, { AxiosResponse } from "axios";

const baseURL = "http://localhost:8080";
const API_URL = "/orders";

// order slice for order actions
export const getAllOrders = async (): Promise<Order[]> => {
  try {
    const response: AxiosResponse<Order[]> = await axios.get(
      `${baseURL}${API_URL}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateOrder = async (
  orderId: string,
  updateData: Partial<Order>
): Promise<Order> => {
  try {
    const response = await axios.put(
      `${baseURL}${API_URL}/${orderId}`,
      updateData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// search orders
export const searchOrders = async (
  page: number = 1,
  pageSize: number = 10,
  userId?: string,
  restaurantId?: string
): Promise<Order[]> => {
  try {
    const params: Record<string, string | number | undefined> = {
      page,
      pageSize,
    };

    if (userId) {
      params.userId = userId;
    }

    if (restaurantId) {
      params.restaurantId = restaurantId;
    }

    const response: AxiosResponse<Order[]> = await axios.get(
      `${baseURL}${API_URL}/search`,
      {
        params,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

//  get all usesrs
export const getAllUsers = async (): Promise<User[]> => {
  try {
    const response: AxiosResponse<UserResponse> = await axios.get(
      `${baseURL}/user/getUsers`
    );
    return response.data.users;
  } catch (error) {
    throw error;
  }
};
