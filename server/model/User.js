import mongoose from "mongoose";
import { Schema } from "mongoose";
import validator from "validator";
import OrderModel from "./order.js";
import { foodItemSchema } from "./order.js";

const userSchema = new Schema({
  firstName: {
    type: String,
    required: [function () {
      if(this.role ===  "USER"){
        return true;
      }else {
        return false;
      }
    }, "User first name required"],
  },
  lastName: {
    type: String,
    required: [function () {
      if(this.role ===  "USER"){
        return true;
      }else {
        return false;
      }
    }, "User last name required"],
  },
  email: {
    type: String,
    unique: true,
    validate: {
      validator: function (value) {
        return validator.isEmail(value);
      },
      message: "Invalid email",
    },
    required: [true, "User email required"],
  },
  phone: {
    type: String,
    validate: {
      validator: function (v) {
        return v.length === 10;
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    required: [true, "User phone number required"],
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        return regex.test(value);
      },
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, and be at least 8 characters long.",
    },
  },
  otp: {
    type: String,
    required: false,
    default: ""
  },
  profilePhoto: {
    type: String,
    required: false,
    // validate: {
    //   validator: function (value) {
    //     return validator.isURL(value);
    //   },
    //   message: "Please enter valid url"
    // }
  },
  //   addresses: {
  //     type: [address],
  //     required: false
  //   },
  //   cards:{
  //     type: [card],
  //     required: false
  //   },
  orderHistory: {
    type: [OrderModel.Schema],
    required: false
  },
  cart: {
    type: [
      {
        foodItem: foodItemSchema,
        quantity: { type: Number, required: true },
      },
    ],
    required: false
  },
  role:{
    type: String,
    enum: ["USER", "RESTAURANT", "ADMIN"],
    required: [true, "Role is required"]
  }
  //   favourites: {
  //     type: [restaurant],
  //     required: [false]
  //   },
  //   ongoingOrder: {
  //     type: order,
  //     required: false
  //   }
}, {
  versionKey: false,
  timestamps: true
});

const User = mongoose.model("user", userSchema);

export default User;
