const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  // Authorization header se token nikaalna
  const authHeader = req.header("Authorization");
  
  if (!authHeader) {
    return res.status(401).send("Access Denied: No Token Provided");
  }

  // Agar token 'Bearer TOKEN_HERE' format mein hai, toh token extract karein
  const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;

  try {
    // process.env.JWT_SECRET env file se aayega
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next(); // Valid token hai to request aage bhejein
  } catch (err) {
    res.status(401).send("Invalid or Expired Token");
  }
};

module.exports = verifyToken;
