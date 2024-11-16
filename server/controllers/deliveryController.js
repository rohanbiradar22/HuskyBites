import Delivery from "../model/Delivery.js";

export const createProfile = async (req, res) => {
  try {
    const { name, rating, completedOrders, phoneNumber, profilePhoto, status } = req.body;

    const newProfile = new Delivery({
      name,
      rating,
      completedOrders,
      phoneNumber,
      profilePhoto,
      status,
    });   

    const savedProfile = await newProfile.save();

    res.status(201).json({
      success: true,
      message: "Profile created successfully",
      data: savedProfile,
    });
  } catch (error) {
    console.error("Error creating profile", error);
    res.status(500).json({
      success: false,
      message: "Failed to create profile",
      error: error.message,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Use findByIdAndUpdate to find by _id and update
    const updatedProfile = await Delivery.findByIdAndUpdate(id, { $set: updateData }, { new: true });

    // Check if the document exists
    if (!updatedProfile) {
      throw new Error();
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedProfile,
    });
  } catch (error) {
    console.error("Error updating profile", error);
    res.status(500).json({
      success: false,
      message: "Failed to update profile",
      error: error.message,
    });
  }
};

export const getProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const profile = await Delivery.findById(id);

    // Check if the document exists
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile retrieved successfully",
      data: profile,
    });
  } catch (error) {
    console.error("Error getting profile", error);
    res.status(500).json({
      success: false,
      message: "Failed to get profile",
      error: error.message,
    });
  }
};
