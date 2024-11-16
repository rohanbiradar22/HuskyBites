import Restaurant from "@/models/restaurant";
import { User } from "./auth";
import { Order } from "./order";
import FoodItem from "./foodItem";


//  common types
interface SidebarDataItem {
  title: string;
  icon?: any;
  //   icon: React.ReactElement | React.ComponentType<any>;
  link: string;
}
export default SidebarDataItem;

export interface UserResponse {
  success: boolean;
  message: string;
  users: User[];
}

export interface AdminState {
  loading: boolean;
  error: null | string;
  users: User[];
  orders: Order[];
  restaurants: Restaurant[];
}
export interface RestaurantHomeState {
  loading: boolean;
  error: null | string;
  menu: FoodItem[];
  orders: Order[];
}
