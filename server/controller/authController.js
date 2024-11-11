import Users from "../model/UserModel.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";

export const login = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  if (!email.trim() || !password.trim()) {
    res.status(400).json({ message: "Please enter all the fields" });
    return;
  }
  const existingUser = await Users.findOne({ email });
  console.log(existingUser);
  if (!existingUser) {
    res.status(400).json({ message: "Invalid Email" });
    return;
  }
  const isPasswordCorrect = await bcrypt.compare(
    password,
    existingUser.password
  );

  if (!isPasswordCorrect) {
    res.status(400).json({ message: "Invalid Password" });
    return;
  }
  if (isPasswordCorrect) {
    console.log(process.env.NODE_ENV)
    const token = generateToken(existingUser);
    res.cookie("token", token, {
      httpOnly: true,  // Makes the cookie inaccessible to JavaScript, increasing security.
      secure:false,  // Ensures cookie is only sent over HTTPS in production
      maxAge: 60 * 60 * 1000, // Cookie expiry in milliseconds (1 hour)
      sameSite: "Lax", 
    });
    
    res.status(201).json({
      _id: existingUser._id,
      name: existingUser.name,
      email: existingUser.email,
      pic: existingUser.pic,
      token: token,
    });
  } else {
    res.status(400);
    throw new Error("Login failed");
  }
};
export const signup = async (req, res) => {
  const { email, password, username } = req.body;
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
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user),
    });
  } else {
    res.status(400);
    throw new Error("Login failed");
  }
};
export const user = async (req, res) => {
  console.log(req.user.id);
  const existingUser = await Users.findById();
};
