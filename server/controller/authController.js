import Users from "../model/UserModel.js";

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email.trim() || !password.trim()) {
    res.status(400).json({ message: "Please enter all the fields" });
    return;
  }
  const existingUser = await Users.findOne({ email });
  if (!existingUser) {
    res.status(400).json({ message: "Invalid Email" });
  }
  const isPasswordCorrect = await bcrypt.compare(
    password,
    existingUser.password
  );

  if (!isPasswordCorrect) {
    res.status(400).json({ message: "Invalid Password" });
  }
  if (isPasswordCorrect) {
    res.status(201).json({
      _id: existingUser._id,
      name: existingUser.name,
      email: existingUser.email,
      pic: existingUser.pic,
      token: generateToken(existingUser._id),
    });
  } else {
    res.status(400);
    throw new Error("Login failed");
  }
};
export const signup = async (req, res) => {
  const { email, password, username} = req.body;
  if (!email.trim() || !password.trim() || !username.trim()) {
    res.status(400).json({ message: "Please enter all the fields" });
    return;
  }
  const existingUser = await Users.findOne({ email });
  if (existingUser) {
    res.status(400).json({ message: "User Already Exist" });
  }
  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await Users.create({
    username,
    email,
    password: hashedPassword,
  });
  if (user) {
    res.status(201).json({
      _id: existingUser._id,
      name: existingUser.name,
      email: existingUser.email,
      token: generateToken(existingUser._id),
    });
  } else {
    res.status(400);
    throw new Error("Login failed");
  }
};
