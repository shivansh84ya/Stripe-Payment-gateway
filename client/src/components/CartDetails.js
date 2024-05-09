import React, { useEffect, useState } from "react";
import CheckoutForm from "./CheckoutForm";
import "./cartstyle.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeToCart,
  removeSingleIteams,
  emptycartIteam,
} from "../redux/features/cartSlice";
import toast from "react-hot-toast";
import axios from "axios";

const CartDetails = () => {
  const { carts } = useSelector((state) => state.allCart);

  const [totalprice, setPrice] = useState(0);
  const [totalquantity, setTotalQuantity] = useState(0);
  const [showCheck, setCheck] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const [paymentError, setPaymentError] = useState(null);
  const [name, setName] = useState(""); // State for the user's name

  const dispatch = useDispatch();

  // add to cart
  const handleIncrement = (e) => {
    dispatch(addToCart(e));
  };

  // remove to cart
  const handleDecrement = (e) => {
    dispatch(removeToCart(e));
    toast.success("Item Remove From Your Cart");
  };

  // remove single item
  const handleSingleDecrement = (e) => {
    dispatch(removeSingleIteams(e));
  };

  // empty cart
  const emptycart = () => {
    dispatch(emptycartIteam());
    toast.success("Your Cart is Empty");
  };

  // count total price
  const total = () => {
    let totalprice = 0;
    carts.map((ele, ind) => {
      totalprice = ele.price * ele.qnty + totalprice;
    });
    setPrice(totalprice);
  };

  // count total quantity
  const countquantity = () => {
    let totalquantity = 0;
    carts.map((ele, ind) => {
      totalquantity = ele.qnty + totalquantity;
    });
    setTotalQuantity(totalquantity);
  };

  useEffect(() => {
    total();
  }, [total]);

  useEffect(() => {
    countquantity();
  }, [countquantity]);

  const createPaymentIntent = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/create-payment-intent",
        {
          amount: totalprice, //Amount in cents
          currency: "usd",
          product: "T-shirt",
          description: "A beautiful t-shirt",
        }
      );
      setClientSecret(response.data.clientSecret);
      console.log(response);
      alert("intent created successfully");
      setCheck(false); // Redirect to CheckoutForm
    } catch (error) {
      console.error("Error creating Payment Intent:", error);
      setPaymentError("Failed to create Payment Intent");
    }
  };

  // Handler for input field change
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  return (
    <>
      {showCheck ? (
        <div className="row justify-content-center m-0">
          <div className="col-md-8 mt-5 mb-5 cardsdetails">
            <div className="card">
              <div className="card-header bg-dark p-3">
                <div className="card-header-flex">
                  <h5 className="text-white m-0">
                    Cart Calculation
                    {carts.length > 0 ? `(${carts.length})` : ""}
                  </h5>
                  {carts.length > 0 ? (
                    <button
                      className="btn btn-danger mt-0 btn-sm"
                      onClick={emptycart}
                    >
                      <i className="fa fa-trash-alt mr-2"></i>
                      <span>EmptyCart</span>
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="card-body p-0">
                {carts.length === 0 ? (
                  <table className="table cart-table mb-0">
                    <tbody>
                      <tr>
                        <td colSpan={6}>
                          <div className="cart-empty">
                            <i className="fa fa-shopping-cart"></i>
                            <p>Your Cart Is Empty</p>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                ) : (
                  <table className="table cart-table mb-0 table-responsive-sm">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th className="text-right">
                          <span id="amount" className="amount">
                            Total Amount
                          </span>
                        </th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {carts.map((data, index) => {
                        return (
                          <>
                            <tr>
                              <td>
                                <div className="product-img">
                                  <img src={data.imgdata} alt="" />
                                </div>
                              </td>
                              <td>
                                <div className="product-name">
                                  <p>{data.dish}</p>
                                </div>
                              </td>
                              <td>{data.price}</td>
                              <td>
                                <div className="prdct-qty-container">
                                  <button
                                    className="prdct-qty-btn"
                                    type="button"
                                    onClick={
                                      data.qnty <= 1
                                        ? () => handleDecrement(data.id)
                                        : () => handleSingleDecrement(data)
                                    }
                                  >
                                    <i className="fa fa-minus"></i>
                                  </button>
                                  <input
                                    type="text"
                                    className="qty-input-box"
                                    value={data.qnty}
                                    disabled
                                    name=""
                                    id=""
                                  />
                                  <button
                                    className="prdct-qty-btn"
                                    type="button"
                                    onClick={() => handleIncrement(data)}
                                  >
                                    <i className="fa fa-plus"></i>
                                  </button>
                                </div>
                              </td>
                              <td className="text-right">
                                ₹ {data.qnty * data.price}
                              </td>
                              <td>
                                <button
                                  className="prdct-delete"
                                  onClick={() => handleDecrement(data.id)}
                                >
                                  <i className="fa fa-trash-alt"></i>
                                </button>
                              </td>
                            </tr>
                          </>
                        );
                      })}
                    </tbody>
                    <tfoot>
                      <tr>
                        <th>&nbsp;</th>
                        <th colSpan={2}>&nbsp;</th>
                        <th>
                          Items In Cart{" "}
                          <span className="ml-2 mr-2">:</span>
                          <span className="text-danger">{totalquantity}</span>
                        </th>
                        <th className="text-right">
                          Total Price<span className="ml-2 mr-2">:</span>
                          <span className="text-danger">₹ {totalprice}</span>
                        </th>
                        <th className="text-right">
                          <input
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={handleNameChange}
                            style={{ marginRight: "10px" }}
                          />
                          <button
                            className="btn btn-success"
                            onClick={createPaymentIntent}
                            type="button"
                          >
                            Checkout
                          </button>
                        </th>
                      </tr>
                    </tfoot>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <CheckoutForm clientSecret={clientSecret} name={name} />
      )}
    </>
  );
};

export default CartDetails;
