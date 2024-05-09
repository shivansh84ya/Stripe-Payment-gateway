const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const router = require("./router");

mongoose
  .connect("mongodb://127.0.0.1:27017/strippayments")
  .then((resp) => {
    console.log("database connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });


app.use(
  cors({
    "Access-Control-Allow-Origin": "*",
  })
);
app.use(express.json());
app.use("/", router);




// Endpoint to create a Payment Intent
// app.post("/create-payment-intent", async (req, res) => {
//   try {
//     console.log("works");

//     const { amount, currency } = req.body;
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: amount,
//       currency: "usd",
//       description: "A beautiful t-shirt",
//     });

//     if (!paymentIntent) {
//       console.log(paymentIntent);
//     } else {
//       console.log(paymentIntent);
//       res.status(200).json({ clientSecret: paymentIntent.client_secret });
//     }
//   } catch (error) {
//     console.error("Error creating Payment Intent:", error);
//     res.status(500).json({ error: "Failed to create Payment Intent" });
//   }
// });

// app.post("/payment", async (req, res) => {
//   try{
//   let data = {
//     amount: req.body.amount,
//     currency: req.body.currency,
//     description: req.body.description,
//     status: req.body.status,
//   };

//   let paymentInfo = new pay(data);
//   paymentInfo.save().then((resp) => {
//     console.log(resp);
//   });

// }
// catch(error){
//   console.log("i am a error");
// }
// });

app.listen(4000, () => {
  console.log("server is working on 4000");
});
