import { setErrorResponse } from "../../../controllers/response-handler.js";
import FoodItemModel from "../../../model/FoodItem.js";
import RestaurantModel from "../../../model/Restaurant.js";

// Creates foodItem
export const createFoodItem = async (newFoodItem, restaurantId) => {
  const restaurant = await RestaurantModel.findById(restaurantId).exec();
  if (!restaurant) {
    throw new Error("Restaurant not found");
  }
  if (restaurant.id !== newFoodItem.restaurantId) {
    throw new Error("food item is not linked with restaurant id");
  }
  const foodItem = new FoodItemModel(newFoodItem);
  // restaurant.foodItems.push(foodItem);
  // restaurant.save();
  return await foodItem.save();
};

// Fetches foodItems
export const getAllFoodItems = async (restaurantId) => {
  try {
    // const restaurant = await RestaurantModel.findById(restaurantId).exec();
    const foodItems = await FoodItemModel.find({ restaurantId });
    // foodItems.forEach(foodItem => {
    //     if (foodItem.restaurantId === restaurantId) {
    //         result.push(foodItem);
    //     }
    // });
    return foodItems;
  } catch (error) {
    console.error(error);
  }
};

// Get foodItem by id
export const findFoodItemById = async (foodItemId, restaurantId) => {
  console.log("Get foodItemById: " + foodItemId);
  let foodItem = await FoodItemModel.findById(foodItemId);
  console.log(foodItem);
  if (foodItem.restaurantId !== restaurantId) {
    throw new Error(
      "Database Error. Correct FoodItem Id to the correct restaurant"
    );
  }
  if (!foodItem) {
    const restaurant = await RestaurantModel.findById(restaurantId);
    for (let restaurantFoodItem of restaurant.foodItems) {
      if (foodItemId === restaurantFoodItem.id) {
        foodItem = restaurantFoodItem;
        break;
      }
    }
  }
};
//   return foodItem;
// };

// Update foodItem
export const updateFoodItem = async (id, foodItemUpdateData) => {
  console.log(id, foodItemUpdateData);
  const foodItem = await FoodItemModel.findByIdAndUpdate(
    id,
    foodItemUpdateData,
    {
      new: true,
    }
  ).exec();
  return foodItem;
};
// Delete foodItem
export const deleteFoodItem = async (id) => {
  const foodItem = await FoodItemModel.findByIdAndDelete(id);
  return foodItem;
};
