import jwt from "jsonwebtoken";
import dotenv from 'dotenv'

dotenv.config();
const generateToken = (user) => {
  return jwt.sign(
    { 
      id: user._id, 
      email: user.email, 
      isAdmin: user.isAdmin,
      username: user.username, 
    },
    process.env.SECRET,
    {
      expiresIn: "1d",
    }
  );
};

export default generateToken;
