const mongoose = require("mongoose");
const { Schema } = mongoose;

const imageSchema = new Schema({
  publicId: { type: String, default: "" }
});

module.exports = mongoose.model("images", imageSchema);
