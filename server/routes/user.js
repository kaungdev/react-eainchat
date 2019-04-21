const passport = require("passport");
const { generateToken, verifyToken } = require("../middlewares/auth");
const User = require("../models/User");
const Township = require("../models/Township");
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

  app.get("/api/user", verifyToken, async (req, res) => {
    const user = await User.findById(req.userId)
      .populate("township")
      .populate("receivedOrders")
      .populate("requestedOrders")
      .populate({
        path: "receivedOrders",
        populate: { path: "meal" }
      })
      .populate({
        path: "receivedOrders",
        populate: { path: "seller" }
      })
      .populate({
        path: "receivedOrders",
        populate: { path: "customer" }
      })
      .populate({
        path: "requestedOrders",
        populate: { path: "meal" }
      })
      .populate({
        path: "requestedOrders",
        populate: { path: "seller" }
      })
      .populate({
        path: "requestedOrders",
        populate: { path: "customer" }
      });
    res.json({
      status: "success",
      data: { user }
    });
  });

  app.put("/api/user", verifyToken, async (req, res) => {
    const { address, phone } = req.body.payload;
    let user = await User.findById(req.userId);
    const township = await Township.findOne({});
    user.address = address;
    user.phone = phone;
    user.township = township;
    user.isCompleteSetup = true;
    user.points = 10000;
    const saved = await user.save();
    res.json({ status: "success", data: { user: saved } });
  });
};
