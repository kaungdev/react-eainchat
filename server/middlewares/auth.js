const jwt = require("jsonwebtoken");

const key = "!$#";

const createToken = id => {
  return jwt.sign({ id }, key, { expiresIn: "10y" });
};

module.exports = {
  generateToken: (req, res, next) => {
    req.token = createToken(req.user.id);
    next();
  },

  verifyToken: (req, res, next) => {
    let token;
    if (req.query.token) token = req.query.token;
    if (req.body.token) token = req.body.token;
    if (!token)
      return res.json({
        status: "failed",
        message: "failed user verification"
      });
    const { id } = jwt.verify(token, key);
    req.userId = id;
    next();
  }
};
