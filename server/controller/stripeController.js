const stripe = require("stripe")(
  
);

const Payment = require("../models/paymentModels");

const createPaymentIntent = async (req, res) => {
  try {
    console.log("works");

    const { amount, currency } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      description: "payment created",
    });

    if (!paymentIntent) {
      console.log(paymentIntent);
    } else {
      console.log(paymentIntent);
      res.status(200).json({ clientSecret: paymentIntent.client_secret });
    }
  } catch (error) {
    console.error("Error creating Payment Intent:", error);
    res.status(500).json({ error: "Failed to create Payment Intent" });
  }
};

const confirmPayment = async (req, res) => {
  try {
    const { amount, currency, description, status } = req.body;

    // Create a new payment object
    const newPayment = new Payment({
      amount,
      currency,
      description,
      status,
    });

    // Save the payment object to the database
    const savedPayment = await newPayment.save();
    console.log('Payment saved successfully:', savedPayment);

    res.status(200).json({ message: 'Payment saved successfully' });
  } catch (error) {
    console.error('Error saving payment:', error);
    res.status(500).json({ error: 'Failed to save payment' });
  }
};

module.exports = { createPaymentIntent, confirmPayment };
