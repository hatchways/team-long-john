const mongoose = require("mongoose");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

const User = require("../models/User");
const { userCreationEmail } = require("./emailSender");

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

      const newUser = await new User({
        name: profile.displayName,
        email: profile.emails[0].value,
        google: {
          id: profile.id,
          refreshToken: refreshToken,
        },
      });
      newUser.save();
      userCreationEmail(newUser);

      await new Meeting({
        userId: newUser._id,
        name: "DEFAULT 60 MIN MEETING",
        duration: 60,
      }).save();

      await new ProfileImage({
        userId: newUser._id,
        url: "http://res.cloudinary.com/calend-app/image/upload/v1626886286/DO_NOT_DELETE.png",
        secureUrl:
          "https://res.cloudinary.com/calend-app/image/upload/v1626886286/DO_NOT_DELETE.png",
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
