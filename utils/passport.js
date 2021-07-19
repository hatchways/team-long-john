const mongoose = require("mongoose");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

const User = require("../models/User");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({
        email: profile.emails[0].value,
      });

      if (existingUser) {
        await User.findOneAndUpdate(
          { email: profile.emails[0].value },
          { $set: { google: { refreshToken: refreshToken } } }
        );

        return done(null, existingUser);
      }

      await new User({
        name: profile.displayName,
        email: profile.emails[0].value,
        google: {
          id: profile.id,
          refreshToken: refreshToken,
        },
      }).save();

      return done(null, profile);
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  if (mongoose.isValidObjectId(id)) {
    const oldUser = await User.findById(id);
    done(null, oldUser);
  } else {
    const newUser = await User.findOne({ "google.id": id });
    done(null, newUser);
  }
});
