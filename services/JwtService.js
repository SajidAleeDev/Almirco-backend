const { JWT_SECRET } = require("../config/index.js");
const jwt = require("jsonwebtoken");

class JwtService {
  static sign(payload, expiry = "15m", secret = JWT_SECRET) {
    return jwt.sign(payload, secret, { expiresIn: expiry });
  }
  static verify(token, secret = JWT_SECRET) {
    return jwt.verify(token, secret);
  }
}

module.exports = JwtService;
