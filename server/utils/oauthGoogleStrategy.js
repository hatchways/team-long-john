const GoogleStrategy = require("passport-google-oauth2").Strategy;
const passport = require("passport");
const User = require("../models/User");

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ email: profile.email });

      if (existingUser) {
        await User.findOneAndUpdate(
          { email: profile.email },
          { $set: { googleRefreshToken: refreshToken } }
        );
        return done(null, existingUser);
      }

      await new User({
        email: profile.email,
        googleRefreshToken: refreshToken
      }).save();

      return done(null, profile);
    }
  )
);
