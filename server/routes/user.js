const passport = require("passport");
const { generateToken, verifyToken } = require("../middlewares/auth");
const User = require("../models/User");
require("../utils/passport")();

module.exports = app => {
  app.post(
    "/api/auth",
    passport.authenticate("facebook-token", { session: false }),
    generateToken,
    (req, res) => {
      return res.json({
        status: "success",
        data: { token: req.token }
      });
    }
  );
};
