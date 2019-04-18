const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
  createdAt: { type: Date, default: Date.now() },
  isVegetarian: { type: Boolean, default: false, required: true },
  meat: { type: String, default: "", required: true },
  category: { type: String, default: "", required: true },
  seller: { type: Schema.Types.ObjectId, ref: "users", required: true },
  customer: { type: Schema.Types.ObjectId, ref: "users", required: true }
});

module.exports = mongoose.model("orders", orderSchema);
