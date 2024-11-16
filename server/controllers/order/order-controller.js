import { response } from "express";
import * as orderService from "../../services/Order/order-service.js";
import { setResponse, setErrorResponse } from "../response-handler.js";

export const find = async (request, response) => {
  try {
    const params = { ...request.query }; //cloning the object as dont want to manipulate real req
    const order = await orderService.getAll(params);
    setResponse(response, order);
  } catch (error) {
    setErrorResponse(response, error);
  }
};
// Creating new order
export const post = async (request, response) => {
  try {
    const newOrder = { ...request.body }; // to get actual json
    const order = await orderService.save(newOrder);
    setResponse(response, order);
  } catch (error) {
    setErrorResponse(response, error);
  }
};
// Searching order by ID
export const get = async (request, response) => {
  try {
    const id = request.params.id;
    const order = await orderService.find(id);
    setResponse(response, order);
  } catch (error) {
    setErrorResponse(response, error);
  }
};

export const search = async (request, response) => {
  const { page, pageSize, userId, restaurantId } = request.query;
  try {
    const orders = await orderService.search(
      { userId, restaurantId },
      page,
      pageSize
    );
    setResponse(response, orders);
  } catch (error) {
    console.error(error);
    setErrorResponse(response, error);
  }
};

export const put = async (request, response) => {
  try {
    try {
      const id = request.params.id;
      const updatedOrder = { ...request.body };
      const order = await orderService.update(updatedOrder, id);
      setResponse(response, order);
    } catch (error) {
      setErrorResponse(response, error);
    }
  } catch (error) {}
};

export const remove = async (request, response) => {
  try {
    const id = request.params.id;
    const order = await orderService.remove(id);
    setResponse(response, {});
  } catch (error) {
    setErrorResponse(response, error);
  }
};
