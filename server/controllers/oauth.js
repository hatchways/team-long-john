const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const generator = require('generate-password');

// @route GET /login/register/user
// @desc Login if user exists else Register user
// @access Private
exports.loginRegisterUser = asyncHandler(async (req, res, next) => {
    let user = await User.findOne({ email: req.user.email })

    if (!user) {
        user = new User({ username: req.user.displayName, email: req.user.email })
        user.password = generator.generate({ length: 10, numbers: true })

        try {
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

