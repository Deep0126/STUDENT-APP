const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {

  const authHeader = req.header("Authorization");
  //token not stop acess and give 401 error 
  if (!authHeader) {
    return res.status(401).send("Access Denied: No Token Provided");
  }


  const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;

  try {
    // process.env.JWT_SECRET env file se aayega(verify token with secert key)
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next(); //if token valid send request
  } catch (err) {
    res.status(401).send("Invalid or Expired Token");
  }
};

module.exports = verifyToken;
