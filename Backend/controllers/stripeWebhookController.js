import stripe from "../config/stripe.js";
import HostelPayment from "../Models/HostelPayment.js";

export const stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object;
    const paymentId = paymentIntent.metadata.paymentId;

    await HostelPayment.findByIdAndUpdate(paymentId, {
      status: "paid",
      paidAt: new Date(),
      stripePaymentIntentId: paymentIntent.id,
    });
  }

  res.json({ received: true });
};
