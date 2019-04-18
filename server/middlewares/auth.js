const jwt = require("jsonwebtoken");

const createToken = auth => {
  return jwt.sign(
    {
      id: auth.id
    },
    "!$#",
    {
      expiresIn: "10y"
    }
  );
};

module.exports = {
  generateToken: (req, res, next) => {
    req.token = createToken(req.user.id);
    next();
  },

  verifyToken: (req, res, next) => {
    let token;
    if (req.token) token = req.token;
    if (req.body.token) token = req.body.token;
    if (!token)
      return res.json({
        status: "failed",
        message: "failed user verification"
      });
    const { id } = jwt.verify(token, "!$#");
    req.userId = id;
    next();
  }
};
