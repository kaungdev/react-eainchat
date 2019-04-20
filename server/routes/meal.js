const { verifyToken } = require("../middlewares/auth");
const Meal = require("../models/Meal");
const User = require("../models/User");

module.exports = app => {
  app.post("/api/meals", verifyToken, async (req, res) => {
    const { payload } = req.body;
    const { _id } = payload;
    let mealResponse;
    if (!_id) {
      delete payload._id;
      const user = await User.findById(req.userId);
      mealResponse = await new Meal({ ...payload, seller: req.userId }).save();
      if (!user.meals) user.meals = [];
      user.meals.push(mealResponse);
      await user.save();
    } else {
      mealResponse = await Meal.findByIdAndUpdate(_id, {
        ...payload,
        seller: req.userId
      });
    }

    res.json({
      status: "success",
      data: { meal: mealResponse }
    });
  });

  app.get("/api/meals", async (req, res) => {
    const { seller, township } = req.query;
    if (seller) {
      const meals = await Meal.find({ seller });
      return res.json({
        status: "success",
        data: { meals }
      });
    } else if (township) {
      let mealsResponse = [];
      const users = await User.find({ township }).populate("meals");
      users.forEach(({ meals }) => {
        meals.forEach(meal => {
          mealsResponse.push(meal);
        });
      });
      return res.json({
        status: "success",
        data: { meals: mealsResponse, users }
      });
    }
  });
};
