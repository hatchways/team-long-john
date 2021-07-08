const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

const User = require("../models/User");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({
        email: profile.emails[0].value
      });

      if (existingUser) {
        await User.findOneAndUpdate(
          { email: profile.emails[0].value },
          { $set: { googleRefreshToken: refreshToken } }
        );

        return done(null, existingUser);
      }

      await new User({
        username: profile.name,
        email: profile.emails[0].value,
        googleRefreshToken: refreshToken
      }).save();

      return done(null, profile);
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});
