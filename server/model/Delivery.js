import mongoose from "mongoose";
const { Schema } = mongoose;

const deliverySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        default: 0, 
    },
    completedOrders: {
        type: Number,
        default: 0,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    profilePhoto: {
        type: String, // Assuming the profile photo is stored as a URL or file path
    },
    status: {
        type: String,
        enum: ["available", "busy"],
        default: "available",
    },
});

const Delivery = mongoose.model("Delivery", deliverySchema);

export default Delivery;
