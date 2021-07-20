const asyncHandler = require("express-async-handler");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { isDev } = require("../utils/isDev");

// @route POST /meeting
// @desc Create a meeting
// @access Private
exports.handlePayment = asyncHandler(async (req, res, next) => {
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
    // {CHECKOUT_SESSION_ID} is a string literal; do not change it!
    // the actual Session ID is returned in the query parameter when your customer
    // is redirected to the success page.
    success_url:
      "https://example.com/success.html?session_id={CHECKOUT_SESSION_ID}",
    cancel_url: `${isDev()}/dashboard`,
  });

  res.status(302);
  res.json(session.url);
});
