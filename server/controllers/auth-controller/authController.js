// Importing libraries and models

import validator from "validator";

import User from "../../model/User.js";
import { generateAuthToken, generateOTP, maskPassword } from "../../services/authService.js";
import bcryptjs from "bcryptjs";
import { sendEmail } from "../../services/emailService.js";

import crypto from "crypto";
import RestaurantModel from "../../model/Restaurant.js";

// Controller for validating user regostration
export const registerController = async (req, res) => {
  const { firstName, lastName, email, password, phone, profilePhoto, role } = req.body;
  try {
    if (!firstName) {
      throw new Error("Please enter first name");   /* Validating first Name */
    }
    if (!lastName) {
      throw new Error("Please enter last name");   /* Validating last Name */
    }
    if (!email) {
      throw new Error("Please enter email");  /* Validating email */
    }
    if (!password) {
      throw new Error("Please enter password");  /* Validating password */
    }
    if (!phone) {
      throw new Error("Please enter phone no.");   /* Validating phone number */
    }
    if (!role) {
      throw new Error("Role is required");    /* Validating role */
    }

    if (!validator.isEmail(email)) {
      throw new Error("Please enter valid email");   /* Validating email */
    }

    const isExistingUser = await User.findOne({ email }).exec();       /* Validating if user already exists */
    if (isExistingUser) {
      throw new Error("Email already exists");
    }

    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    const isValidPassword = regex.test(password);          /* Validation for password*/
    if (!isValidPassword) {
      throw new Error(
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, and be at least 8 characters long"
      );
    }

    if (phone.length !== 10) {
      throw new Error("Phone number should be 10 digits long");    /* Validation for phone number */
    }

    let user = new User(req.body);

    user.password = await maskPassword(password);
    user = await user.save();

    // Sending welcome email to new user
    let subject = `Welcome to Husky Bites!`;
    let text = `Hello ${user.firstName},  We are excited to have you aboard!`;
    let content = `<h4>Hello ${user.firstName}, </ph4> <div><h6>We are excited to have you aboard<h6></div> <br> <br> <h6>From <br> Husky Bites </h6>`;
    sendEmail(user.email, subject, text, content);

    res.status(201).json({       /**Sending success response */
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.log("Error while registering user. ", error);
    res.status(500).json({       /* Handling errors*/
      success: false,
      message: "Failed to register user",
      error: error.message,
    });
  }
};

export const loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email) {
      throw new Error("Please enter email");
    }
    if (!password) {
      throw new Error("Please enter password");
    }

    if (!validator.isEmail(email)) {
      throw new Error("Please enter valid email");
    }

    let isExistingUser = await User.findOne({ email }).exec();
    if (!isExistingUser) {
      throw new Error("Account not found");
    }

    const isMatch = await bcryptjs.compare(password, isExistingUser.password);
    if (!isMatch) {
      throw new Error("Password not matching");
    }

    const token = generateAuthToken(isExistingUser._id);    /* Generating auth token */

    if(isExistingUser.role === "RESTAURANT"){
      isExistingUser = await RestaurantModel.findOne({ email }).exec();
    }

    res.status(200).json({
      success: true,   /**Sending success response */
      message: `Login successful`,
      user: isExistingUser,
      token: token,
    });
  } catch (error) {
    console.log("Error while logging user ", error);
    res.status(500).json({   /* Handling errors*/
      success: false,
      message: "Failed to login user",
      error: error.message,
    });
  }
};

export const generateOtpController = async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) {
      throw new Error("Please enter email");
    }

    const isExistingUser = await User.findOne({ email }).exec();
    if (!isExistingUser) {
      throw new Error("Email is not registered");
    }

    const otp = generateOTP(4);

    isExistingUser.otp = otp;
    await isExistingUser.save();

    // Sending email with OTP to reset password
    let subject = `Forgot Password!`;
    let text = `Hello ${isExistingUser.firstName},  Your otp to generate new password is ${otp}`;
    let content = `<h4>Hello ${isExistingUser.firstName}, </ph4> <div><h6>Please find your otp below to generate new password<h6></div> <br> <h2>${otp}</h2> <br> <h6>From <br> Husky Bites </h6>`;
    sendEmail(isExistingUser.email, subject, text, content);

    res.status(201).json({
      success: true,
      message: "Otp sent successfully",
    });
  } catch (error) {
    console.log("Error while generating otp ", error);
    res.status(401).json({
      success: false,
      message: "Failed to generate otp",
      error: error.message,
    });
  }
};

// Resetting password
export const createNewPasswordController = async (req, res) => {
  const { otp, password, email } = req.body;

  try {
    if (!email) {
      throw new Error("Please enter email");
    }
    if (!otp) {
      throw new Error("Please enter otp");
    }
    if (!password) {
      throw new Error("Please enter new password");
    }

    let user = await User.findOne({ email }).exec();
    if (!user) {
      throw new Error("Something went wrong");
    }

    if (otp !== user.otp) {
      throw new Error("Invalid Otp");
    }

    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    const isValidPassword = regex.test(password);
    if (!isValidPassword) {
      throw new Error(        /* Validating password */
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, and be at least 8 characters long"
      );
    }

    user.password = await maskPassword(password);   /* Masking password */
    user.otp = "";
    user = await user.save();

    res.status(200).json({    /**Sending success response */
      success: true,
      message: "Password updated successfully",
      user: user,
    });
  } catch (error) {    /* Handling errors*/
    console.log("Error while creating new password", error);
    res.status(500).json({
      success: false,
      message: "Failed to generate otp",
      error: error.message,
    });
  }
};

export const getCurrentUserController = (req, res) => {
  try {
    res.status(200).json({
      success: true,     /**Sending success response */
      message: "User authenticated successfully",
      user: req.user,
      token: req.token,
    });
  } catch (error) {
    console.log("Error while registering user. ", error);
    res.status(500).json({
      success: false,   /* Handling errors*/
      message: "Failed to authenticate user",
      error: error.message,
    });
  }
};
