const router = require('express').Router();
const {createPaymentIntent,confirmPayment } = require("./controller/stripeController")

router.post("/create-payment-intent", createPaymentIntent);
router.post("/payment", confirmPayment);


module.exports = router;