import { Role } from "@/enums/constants";
import Restaurant from "@/models/restaurant";
import axiosInstance from "@/services/axios-service";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// restaurant actions for restaurantSlice
export const getRestaurants = createAsyncThunk(
  "restaurant/getRestaurants",
  async () => {
    toast.dismiss();
    try {
      const response = await axiosInstance.get("/restaurant");
      const data = await response.data;
      return data;
    } catch (error: any) {
      toast.error(error.response.data.error, { autoClose: 900 });
      throw new Error(error.response.data.error);
    }
  }
);

// export const updateRestaurant = createAsyncThunk(
//   "restaurant/updateRestaurant",
//   async (restaurantdata: string) => {
//     toast.dismiss();
//     try {
//       const response = await axiosInstance.post(
//         `/restaurant/${restaurantdata}`,
//         restaurantdata
//       );
//       const data = await response.data;
//       if (data.success) {
//         if (restaurantdata.role !== Role.USER) {
//           toast.success(data.message, { autoClose: 900 });
//         }
//       }
//       return data;
//     } catch (error: any) {
//       toast.error(error.response.data.error, { autoClose: 900 });
//       throw new Error(error.response.data.error);
//     }
//   }
// );

// export const getRestaurantMenu = createAsyncThunk(
//     "restaurant/menu",
//     async (restaurantMenuId) => {

//     }
// );
