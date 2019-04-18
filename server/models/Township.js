const mongoose = require("mongoose");
const { Schema } = mongoose;

const townshipSchema = new Schema({
  name: { type: String, default: "" }
});

module.exports = mongoose.model("townships", townshipSchema);
