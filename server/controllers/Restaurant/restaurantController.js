import * as restaurantService from "../../services/Restaurant/restaurant-service.js";
import { setResponse, setErrorResponse } from "../response-handler.js";
import validator from "validator";

import User from "../../model/User.js";
import { maskPassword } from "../../services/authService.js";

import crypto from "crypto";
import RestaurantModel from "../../model/Restaurant.js";

export const createRestaurantController = async (request, response) => {
  try {
    const newRestaurant = { ...request.body };
    const { name, firstName, lastName, email, password, address, phone, role } = request.body;

    if (!name) {
      throw new Error("Please enter restaurant name");
    }
    if (!firstName) {
      throw new Error("Please enter first name");
    }
    if (!lastName) {
      throw new Error("Please enter last name");
    }
    if (!email) {
      throw new Error("Please enter email");
    }
    if (!password) {
      throw new Error("Please enter password");
    }
    if (!phone) {
      throw new Error("Please enter phone no.");
    }
    if (!role) {
      throw new Error("Role is required");
    }

    if (!validator.isEmail(email)) {
      throw new Error("Please enter valid email");
    }

    const isExistingUser = await User.findOne({ email }).exec();
    if (isExistingUser) {
      throw new Error("Email already exists");
    }

    const isExistingRestaurant = await RestaurantModel.findOne({ email }).exec();
    if (isExistingRestaurant) {
      throw new Error("Email already exists");
    }

    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    const isValidPassword = regex.test(password);
    if (!isValidPassword) {
      throw new Error(
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, and be at least 8 characters long"
      );
    }

    if (phone.length !== 10) {
      throw new Error("Phone number should be 10 digits long");
    }

    let restaurant = await restaurantService.createRestaurant(newRestaurant);
    restaurant.password = await maskPassword(password);
    restaurant = await restaurant.save();

    response.status(201).json({
      success: true,
      message: "Restaurant registered successfully",
      restaurant,
    });
  } catch (error) {
    console.log("Error while registering restaurant. ", error);
    response.status(500).json({
      success: false,
      message: "Failed to register restaurant",
      error: error.message,
    });
  }
};

export const findRestaurantById = async (request, response) => {
  try {
    const id = request.params.id;
    const restaurant = await restaurantService.findRestaurantById(id);
    setResponse(response, restaurant);
  } catch (error) {
    setErrorResponse(response, error);
  }
};

export const getAllRestaurants = async (request, response) => {
  try {
    const allRestaurants = await restaurantService.getAllRestaurants();
    setResponse(response, allRestaurants);
  } catch (error) {
    setErrorResponse(response, error);
  }
};

export const updateRestaurant = async (request, response) => {
  try {
    const id = request.params.id;
    const restaurantUpdateData = { ...request.body };
    const updatedRestaurant = await restaurantService.updateRestaurant(id, restaurantUpdateData);
    console.log(updateRestaurant);
    setResponse(response, updatedRestaurant);
  } catch (error) {
    setErrorResponse(response, error);
  }
};

export const deleteRestaurant = async (request, response) => {
  try {
    const id = request.params.id;
    const course = await restaurantService.deleteRestaurant(id);
    setResponse(response, {});
  } catch (error) {
    setErrorResponse(response, error);
  }
};
