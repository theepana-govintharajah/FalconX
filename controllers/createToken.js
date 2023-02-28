const jwt = require("jsonwebtoken");
const secretKey = "your_secret_key";

const createToken = (userId) => {
  return jwt.sign({ userId }, secretKey, { expiresIn: "1h" });
};

module.exports = createToken;
