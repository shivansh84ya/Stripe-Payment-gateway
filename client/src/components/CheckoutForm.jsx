import React, { useState, useEffect } from "react";
import { useStripe } from "@stripe/react-stripe-js";
import axios from "axios";

const CheckoutForm = ({ clientSecret ,name}) => {
  const stripe = useStripe();
  const [elements, setElements] = useState(null);
  const [paymentError, setPaymentError] = useState(null);
  const [message, setMessage] = useState("");

  const appearance = {
    theme: 'stripe'
  };

  const options = {
    layout: {
      type: 'tabs',
      defaultCollapsed: true,
    }
  };

  useEffect(() => {
    if (stripe) {
      const stripeElements = stripe.elements({ clientSecret, appearance });
      const paymentElement = stripeElements.create("card", options);
      paymentElement.mount("#card-element");
      setElements(stripeElements);
    }
  }, [stripe, clientSecret]);

  const confirmPayment = async () => {
    if (!stripe || !elements) return;

    try {
      const cardElement = elements.getElement("card");
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            email: `${name}@gmail.com`,
            name: "John Doe",
            address: {
              line1: "123 Main St",
              city: "Anytown",
              postal_code: "12345",
              country: "US",
            },
          },
        },
      });

      if (result.error) {
        console.error("Error confirming payment:", result.error);
        setPaymentError(result.error.message);
      } else {
        console.log("Payment confirmed:", result.paymentIntent);
        setMessage("Your payment was successful");
        // Save payment information to the backend
        savePaymentInformation(result.paymentIntent);
      }
    } catch (error) {
      console.error("Error confirming payment:", error);
      setPaymentError("Failed to confirm payment");
    }
  };

  // Function to save payment information to the backend
  const savePaymentInformation = async (paymentIntent) => {
    try {
      const response = await axios.post("http://localhost:4000/payment", {
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
        description: paymentIntent.description,
        status: paymentIntent.status,
      });
      console.log("Payment information saved to the backend:", response.data);
    } catch (error) {
      console.error("Error saving payment information:", error);
    }
  };

  return (
    <>
      {!message ? (
        <div>
          <center><h1>Stripe Payment Gateway </h1>
          <div
            id="card-element"
            style={{
              border: "1px solid #ccc",
              padding: "10px",
            width:"500px",
              marginBottom: "20px",
            }}
          ></div>
          <button onClick={confirmPayment}>Confirm Payment</button>
          </center>
          {paymentError && <div>Error: {paymentError}</div>}
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h1>{message}</h1>
          <h2>Thank you for being here</h2>
        </div>
      )}
    </>
  );
};

export default CheckoutForm;
