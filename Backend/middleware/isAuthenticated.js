import jwt from "jsonwebtoken";

const authenticatedToken = (req, res, next) => {
  try {
    let token = req.cookies?.token;

    // ✅ check header if cookie not present
    if (!token && req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        message: "No token provided",
        success: false,
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.id = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token",
      success: false,
    });
  }
};

export default authenticatedToken;