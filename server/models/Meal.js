const mongoose = require("mongoose");
const { Schema } = mongoose;

const mealSchema = new Schema({
  name: { type: String, default: "", required: true },
  description: { type: String, default: "", required: true },
  isVegetarian: { type: Boolean, default: false, required: true },
  meat: { type: String, default: "", required: true },
  category: { type: String, default: "", required: true },
  price: { type: String, required: true },
  image: { type: String, required: true },
  seller: { type: Schema.Types.ObjectId, ref: "users", required: true }
});

module.exports = mongoose.model("meals", mealSchema);
