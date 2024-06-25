import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authMiddleware = (req, res, next) => {
  const token = req.headers.cookie.split("=")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log(err)
      return res.sendStatus(403)
    };
    req.user = decoded;
    next();
  });
};

export const middleware = (req,res,next) => {
  const token = req.cookies.token;

  if(!token) {
    return res.status(401).json({ messsage: "No token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.userId = decoded.id
    next();
  }catch(error){
    return res.status(401).json({ message: "Invalid token "});
  }
}

export default authMiddleware;