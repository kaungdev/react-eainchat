const passport = require("passport");
const FacebookTokenStrategy = require("passport-facebook-token");
const User = require("../models/User");

module.exports = function() {
  passport.use(
    new FacebookTokenStrategy(
      {
        clientID: process.env.FB_APP_ID,
        clientSecret: process.env.FB_APP_SECRET
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const user = await User.upsertFbUser(
            accessToken,
            refreshToken,
            profile
          );
          done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  );
};
