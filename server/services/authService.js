import bycrptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const maskPassword = async (password) => {
  try {
    return await bycrptjs.hash(password, 8);
  } catch (error) {
    console.log(err);
    throw new Error("Failed to mask password");
  }
};

const generateAuthToken = (id) => {
  try {
    const token = jwt.sign({ userId: id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });
    if (!token) {
      throw new Error();
    }
    return token;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to generate token");
  }
};

const generateOTP = (otpLength) => {
  const chars = "0123456789";
  let OTP = "";

  for (let i = 0; i < otpLength; i++) {
    const index = Math.floor(Math.random() * chars.length);
    OTP += chars[index];
  }

  return OTP;
};

export { maskPassword, generateAuthToken, generateOTP };
