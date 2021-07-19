const asyncHandler = require("express-async-handler");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// @route POST /meeting
// @desc Create a meeting
// @access Private
exports.postPayment = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  const paymentIntent = await stripe.paymentIntent.create({
    amount: 500,
    currency: "usd",
    metadata: { integration_check: "accept_a_payment" },
    recipient_email: email,
  });

  res.json({ client_secret: paymentIntent["client_secret"] });
});
