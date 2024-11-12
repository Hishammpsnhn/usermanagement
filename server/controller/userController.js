import Users from "../model/UserModel.js";
import bcrypt from "bcrypt";
export const getAllUsers = async (req, res) => {
  try {
    const users = await Users.find({isAdmin:false});

    res.status(200).json(users);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Something went wrong", error: error.message });
  }
};

export const user = async (req, res) => {
  try {
    const user = await Users.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Something went wrong", error: error.message });
  }
};

export const updateUser = async (req, res) => {
  console.log(req.body);

  const { email, name, id } = req.body;

  try {
    const user = await Users.findByIdAndUpdate(
      id,
      {
        username: name,
        email,
      },
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log(user);
    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating user", error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const user = await Users.findByIdAndDelete(id);
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully", user });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating user", error: error.message });
  }
};

export const createUser = async (req, res) => {

  const { email, password } = req.body;
  const username = req.body.name
  console.log("create suer",req.body)
  if (!email.trim() || !password.trim() || !username.trim()) {
    res.status(400).json({ message: "Please enter all the fields" });
    return;
  }
  const existingUser = await Users.findOne({ email });
  if (existingUser) {
    res.status(400).json({ message: "User Already Exist" });
    return;
  }
  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await Users.create({
    username,
    email,
    password: hashedPassword,
  });
  if (user) {
    res.status(201).json({ message: "user created", user });
  } else {
    res.status(400);
    throw new Error("Login failed");
  }
};
