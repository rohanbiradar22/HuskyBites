import User from "../../model/User.js";

export const getUsersController = async (req, res) => {
  try {
    const users = await User.find({ role: "USER" }).exec();

    res.status(200).json({
      success: true,
      message: "",
      users
    });
  } catch (error) {
    console.log("Error while getting users. ", error);
    res.status(500).json({
      success: false,
      message: "Failed to get users",
      error: error.message,
    });
  }
};


export const deleteUserController = async (req, res) => {
  try {
    const userId = req.params.id;
    const users = await User.findByIdAndDelete({ _id: userId }).exec();

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      users
    });
  } catch (error) {
    console.log("Error while deleting user. ", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete user",
      error: error.message,
    });
  }
};
