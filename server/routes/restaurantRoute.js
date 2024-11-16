import express from "express";
import * as restaurantController from "../controllers/Restaurant/restaurantController.js";
import * as foodItemController from "../controllers/Restaurant/foodItemController.js";

const router = express.Router();


router.post("/register", restaurantController.createRestaurantController);
router.route('/:id')
    .get(restaurantController.findRestaurantById)
    .put(restaurantController.updateRestaurant)
    .delete(restaurantController.deleteRestaurant);

router.get('/', restaurantController.getAllRestaurants);



router.route('/:id/foodItems/add').post(foodItemController.createfoodItem);
router.route("/:id/foodItems/all").get(foodItemController.getAllfoodItems);
router.route('/:id/foodItems/:foodItemId')
    .get(foodItemController.findfoodItemById)
    .put(foodItemController.updatefoodItem)
    .delete(foodItemController.deletefoodItem);


export default router;