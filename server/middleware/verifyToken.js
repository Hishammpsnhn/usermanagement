import jwt from "jsonwebtoken";

function verifyToken(req, res, next) {
    const token = req.cookies.token; 
  
    console.log("Token:", token);
  if (token) {
    jwt.verify(token, process.env.SECRET, async (err, decoded) => {
      if (err) return res.status(401).send("Invalid Token");
      req.user = decoded; 
      next();
    });
  } else {
    return res.status(403).send("Token required");
  }
}

export default verifyToken;