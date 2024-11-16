import Address from "./address";
import FoodItem from "./foodItem";

// types for restaurant
interface Restaurant {
  _id: string;
  name: string;
  foodItems: FoodItem[];
  rating: number;
  address: Address;
  phone: string;
  profilePhoto: string;
  email: string;
  password: string;
  cuisine: string[];
  offers: string[];
  role: string;
}

export default Restaurant;
