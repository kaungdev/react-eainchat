const mongoose = require("mongoose");
const { Schema } = mongoose;

const customerSchema = new Schema({
  name: { type: String, default: "" },
  fbId: { type: String, default: "" },
  email: { type: String, default: "" },
  phone: [{ type: String, default: "" }],
  address: { type: String, default: "" },
  points: { type: Number, default: 0 },
  acceptedOrders: [{ type: Schema.Types.ObjectId, ref: "orders" }],
  receivedOrders: [{ type: Schema.Types.ObjectId, ref: "orders" }],
  meals: [{ type: Schema.Types.ObjectId, ref: "meals" }],
  township: { type: Schema.Types.ObjectId, ref: "townships" }
});

module.exports = mongoose.model("customers", customerSchema);
