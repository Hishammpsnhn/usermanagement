import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();
const generateToken = (id) => {
return jwt.sign({ id },"test", {
    expiresIn: "30d",
  });
};

module.exports = generateToken;