const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
  createdAt: { type: Date, default: Date.now() },
  meal: { type: Schema.Types.ObjectId, ref: "meals", required: true },
  quantity: { type: Number, required: true },
  price: { type: Number },
  totalPrice: { type: Number },
  seller: { type: Schema.Types.ObjectId, ref: "users", required: true },
  customer: { type: Schema.Types.ObjectId, ref: "users", required: true }
});

module.exports = mongoose.model("orders", orderSchema);
