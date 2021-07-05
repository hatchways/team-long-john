const GoogleStrategy = require('passport-google-oauth2').Strategy;
const passport = require('passport');
const User = require('../models/User');

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: '/auth/google/callback',
			passReqToCallback: true,
			proxy: true
		},
		async function (request, accessToken, refreshToken, profile, done) {
			const existingUser = await User.findOne({ email: profile.email });

			// If the user already has an account, return their data
			if (existingUser) return done(null, existingUser);

			// Otherwise, let's put this user in our database
			await new User({ email: profile.email }).save();

			return done(null, profile);
		}
	)
);

passport.serializeUser(function (user, done) {
	done(null, user);
});

passport.deserializeUser(function (user, done) {
	done(null, user);
});
