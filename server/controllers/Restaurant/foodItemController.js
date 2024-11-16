import { response } from "express";
import * as foodItemService from '../../services/Restaurant/FoodItem/food-item-service.js';
import { setResponse, setErrorResponse } from "../response-handler.js";

export const createfoodItem = async (request, response) => {
    try {
        const restaurantId = request.params.id;
        const newfoodItem = { ...request.body };
        const foodItem = await foodItemService.createFoodItem(newfoodItem, restaurantId);
        setResponse(response, foodItem);
    } catch (error) {
        setErrorResponse(response, error);
    }
};

export const findfoodItemById = async (request, response) => {
    try {
        const restaurantId = request.params.id;
        const foodItemId = request.params.foodItemId;
        const foodItem = await foodItemService.findFoodItemById(foodItemId, restaurantId);
        setResponse(response, foodItem);
    } catch (error) {
        setErrorResponse(response, error);
    }
};

export const getAllfoodItems = async (request, response) => {
    try {
        const restaurantId = request.params.id;
        const allfoodItems = await foodItemService.getAllFoodItems(restaurantId);
        setResponse(response, allfoodItems);
    } catch (error) {
        setErrorResponse(response, error);
    }
};

export const updatefoodItem = async (request, response) => {
    try {
        const id = request.params.foodItemId;
        // console.log(request.params);
        const foodItemUpdateData = { ...request.body };
        const updatedfoodItem = await foodItemService.updateFoodItem(id, foodItemUpdateData);
        setResponse(response, updatedfoodItem);
    } catch (error) {
        setErrorResponse(response, error);
    }
};

export const deletefoodItem = async (request, response) => {
    console.log("delete food item requested");
    try {
        const id = request.params.foodItemId;
        const deleted = await foodItemService.deleteFoodItem(id);
        setResponse(response, deleted);
    } catch (error) {
        setErrorResponse(response, error);
    }
}