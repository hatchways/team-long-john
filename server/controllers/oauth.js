const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const generator = require('generate-password');

// @route GET /login/register/user
// @desc Login if user exists else Register user
// @access Private
exports.loginRegisterUser = asyncHandler(async (req, res, next) => {
    console.log('username emails is ', req.user.email)
    // check if the user already exists.
    let user = await User.findOne({ email: req.user.email })

    if (!user) {
        user = new User({ username: req.user.displayName, email: req.user.email })
        user.password = generator.generate({ length: 10, numbers: true })
        console.log('user is: ', user)

        try {
            console.log('lets go to save')
            await user.save()
        } catch(err) {
            res.send(err)
        }

        res.status(201).json({
          success: {
            user: {
              id: user._id,
              username: user.username,
              email: user.email
            }
          }
        });
    }
    // Login
    else {
        res.status(200).json({
          success: {
            user: {
              id: user._id,
              username: user.username,
              email: user.email
            }
          }
        });
    }
});

