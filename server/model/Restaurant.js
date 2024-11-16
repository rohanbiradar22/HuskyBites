import mongoose, { Schema } from 'mongoose';
import FoodItemModel from './FoodItem.js';
import AddressModel from './Address.js';

const restaurantSchema = new Schema({
    name: {
        type: String,
        required: false
    },
    foodItems: {
        type: [FoodItemModel.schema],
        required: false,
    },
    rating: {
        type: Number,
        required: false,
        default: "1"
    },
    address: {
        type: AddressModel.schema,
        required: false,
    },
    phone: {
        type: String,
        required: false,
    },
    profilePhoto: {
        type: String,
        required: false,
        default: "/images/restaurants/r-4.webp"
    },
    email: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: false,
    },
    cuisine: {
        type: [String],
        required: false,
    },
    offers: {
        type: [String],
        required: false,
    },
    role: {
        type: String,
        enum: ["RESTAURANT"],
        required: [true, "Role is required"]
    }
});

const RestaurantModel = mongoose.model('Restaurant', restaurantSchema);

export default RestaurantModel;