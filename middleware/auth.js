import jwt from "jsonwebtoken";

const secret = "careergateway"; 

const auth = async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
  
      if (!token) {
        return res.status(401).json({ message: "Authorization token is missing" });
      }
  
      const decodedData = jwt.verify(token, secret);
      req.userId = decodedData?.id;
  
      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token expired" });
      } else if (error.name === "JsonWebTokenError") {
        return res.status(401).json({ message: "Invalid token" });
      } else {
        return res.status(500).json({ message: "Internal server error" });
      }
    }
  };
  
  export default auth;