import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const foodItemSchema = new Schema({
  name: { type: String, required: false },
  foodImage: { type: String, required: false },
  restaurantId: { type: String, required: false },
  price: { type: Number, required: false },
  rating: { type: Number, required: false },
});

const paymentDetailsSchema = new mongoose.Schema({
  cardUsed: {
    cardNumber: { type: String, required: true },
    expiryDate: { type: String, format: "date", required: true },
    cardHolderName: { type: String, required: true },
  },
  cash: { type: Number, required: true },
});

const orderSchema = new mongoose.Schema({
  userId: { type: String, format: "uuid", required: true },
  customerName: { type: String, required: true },
  customerPhoneNumber: { type: String, required: true },
  orderItems: [
    {
      foodItem: foodItemSchema,
      quantity: { type: Number, required: true },
    },
  ],
  promoCode: { type: String },
  status: { type: String, required: true },
  restaurantId: { type: String, format: "uuid", required: true },
  paymentDetails: paymentDetailsSchema,
  finalAmount: { type: Number, format: "double", required: true },
  restaurantName: { type: String, required: true },
  specialInstructions: { type: String },
  ETA: { type: Date },
  deliveredIn: { type: String },
  tip: { type: Number, format: "double" },
  deliveryExecutiveId: { type: String, format: "uuid" },
  createdDateTime: { type: Date, default: Date.now },
});

const OrderModel = mongoose.model("order", orderSchema);
export default OrderModel;
