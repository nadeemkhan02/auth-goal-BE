const config = require("config");
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Accedd denied. No token provided!");
  try {
    const decode = jwt.verify(token, config.get("jwtPrivateKey"));
    res.user = decode;
    next();
  } catch (err) {
    res.status(400).send("Invalid token provided!");
  }
};

module.exports = auth;
