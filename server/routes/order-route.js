import express from "express";
import * as orderController from "../controllers/order/order-controller.js";

const router = express.Router();

// Define route for searching
router.get("/search", orderController.search);

// get all api
router.route("/").get(orderController.find).post(orderController.post);

// Define routes for specific order by ID
router
  .route("/:id")
  .get(orderController.get)
  .put(orderController.put)
  .delete(orderController.remove);

export default router;
