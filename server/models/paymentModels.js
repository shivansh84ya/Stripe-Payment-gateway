const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  name: String,
  amount: {
    type: Number,
    // required: true,
  },
  currency: {
    type: String,
    // required: true,
  },
  description: {
    type: String,
    // required: true,
  },
  status: {
    type: String,
    // required: true,
  },
  payment_method_types:{
    type:String,
    // required:true
  },
  payment_id:{  //id
    type:String,
    // required:true
  }
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
