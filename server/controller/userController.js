import Users from "../model/UserModel.js";

export const user = async (req, res) => {
  try {
    const user = await Users.findById(req.user.id).select("-password");
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: "Something went wrong", error: error.message });
  }
};
