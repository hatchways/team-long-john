const express = require('express');
const router = express.Router();
const passport = require('passport');
const { loginRegisterUser, auth, urlCallback } = require('../controllers/oauth');
const isLoggedIn = require('../middleware/isLoggedIn');

router.get('/auth/google',
    passport.authenticate('google', { scope : ['email', 'profile'] }))

router.get('/google/callback',
    passport.authenticate('google', {
        successRedirect: '/oauth/login/register/user',
}));

router.route('/login/register/user').get(isLoggedIn, loginRegisterUser);

module.exports = router;

