const asyncHandler = require("express-async-handler");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { isDev } = require("../utils/isDev");

// @route POST /stripe/pay
// @desc Processes subscription
// @access Private
exports.handlePayment = asyncHandler(async (req, res, next) => {
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: req.body.priceId,
          // For metered billing, do not pass quantity
          quantity: 1,
        },
      ],
      success_url: `${isDev()}/success`,
      cancel_url: `${isDev()}/dashboard`,
    });

    res.status(303);
    res.json(session.url);
  } catch (error) {
    res.status(400).send({ error });
  }
});
