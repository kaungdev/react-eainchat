const { verifyToken } = require("../middlewares/auth");
const Meal = require("../models/Meal");
const User = require("../models/User");
const Order = require("../models/Order");

module.exports = app => {
  app.post("/api/orders", verifyToken, async (req, res) => {
    const customer = await User.findById(req.userId);
    const { quantity } = req.body.payload;
    const mealId = req.body.payload.meal;
    const meal = await Meal.findById(mealId);
    const { price } = meal;
    const seller = await User.findById(meal.seller);
    const totalPrice = price * quantity;
    const order = await new Order({
      meal,
      quantity,
      price,
      totalPrice,
      seller,
      customer
    }).save();
    customer.requestedOrders.push(order);
    customer.points -= totalPrice / 10;
    seller.points += totalPrice / 10;
    seller.receivedOrders.push(order);
    await customer.save();
    await seller.save();
    res.json({
      status: "success",
      data: { order, seller, customer }
    });
  });
};
