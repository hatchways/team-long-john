const express = require('express');
const router = express.Router();
const passport = require('passport');
const { loginUser } = require('../controllers/oauth');
const isLoggedIn = require('../middleware/isLoggedIn');

router.get('/auth/google',
    passport.authenticate('google', { scope : ['email', 'profile'] }));

router.get('/google/callback',
    passport.authenticate('google', {
        successRedirect: '/oauth/login',
}));

router.route('/login').get(isLoggedIn, loginUser);

module.exports = router;

