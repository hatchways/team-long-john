const express = require('express');
const router = express.Router();
const passport = require('passport');
const { loginRegisterUser } = require('../controllers/oauth');
const isLoggedIn = require('../middleware/isLoggedIn');

// Authenticate via google.
router.route('/auth/google',
    passport.authenticate('google', { scope : ['email', 'profile'] })).get();

// Callback URL in case successful authentication.
router.route('/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/login/register/user'
})).get();

router.route('/login/register/user').get(isLoggedIn, loginRegisterUser);

module.exports = router;

