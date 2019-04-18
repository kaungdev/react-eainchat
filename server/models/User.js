const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, default: "" },
  fbId: { type: String, default: "" },
  email: { type: String, default: "" },
  phone: { type: String, default: "" },
  address: { type: String, default: "" },
  points: { type: Number, default: 0 },
  acceptedOrders: [{ type: Schema.Types.ObjectId, ref: "orders" }],
  receivedOrders: [{ type: Schema.Types.ObjectId, ref: "orders" }],
  meals: [{ type: Schema.Types.ObjectId, ref: "meals" }],
  township: { type: Schema.Types.ObjectId, ref: "townships", default: null },
  isCompleteSetup: { type: Boolean, default: false }
});

userSchema.statics.upsertFbUser = function(accessToken, refreshToken, profile) {
  return new Promise(async (resolve, reject) => {
    const that = this;
    const foundUser = await this.findOne({ fbId: profile.id });
    if (!foundUser) {
      const newUser = new that({
        name: profile.displayName,
        email: profile.emails[0].value,
        fbId: profile.id
      });
      try {
        const savedUser = await newUser.save();
        resolve(savedUser);
      } catch (error) {
        reject(error);
      }
    } else {
      resolve(foundUser);
    }
  });
};

module.exports = mongoose.model("users", userSchema);
