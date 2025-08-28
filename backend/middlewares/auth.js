const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  console.log("Auth Header:", authorization); // 👀 log header

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).send({ message: "Authorization required" });
  }

  const token = authorization.replace("Bearer ", "");
  console.log("Extracted token:", token); // 👀 log token

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    return next();
  } catch (err) {
    console.error("JWT Verify Error:", err.message); // 👀 log error
    return res.status(401).send({ message: "Authorization required" });
  }
};
