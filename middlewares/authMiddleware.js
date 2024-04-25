import JWT from "jsonwebtoken";

export const requireSignin = (req, res, next) => {
  try {
    // Check if authorization header is present
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ error: "Authorization token missing" });
    }

    // Verify the JWT token
    const decoded = JWT.verify(token, process.env.JWT_SECRET);

    // Attach the decoded user information to the request object
    req.user = decoded;

    // Call the next middleware
    next();
  } catch (error) {
    // If JWT verification fails, return an error response
    console.error("JWT verification error:", error);
    return res.status(401).json({ error: "Unauthorized" });
  }
};
