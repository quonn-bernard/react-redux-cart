import React, { useState } from "react";
import useCustomForm from "../hooks/useCustomForm";
import Fade from "react-reveal/Fade";
import { connect, useDispatch } from "react-redux";
import { removeFromCart } from "../actions/cartActions";
import { Button } from "react-bootstrap";
import { AiFillMinusCircle } from "react-icons/ai";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";

const Cart = ({ cartItems, remove, createOrder }) => {
  const dispatch = useDispatch();
  const [showCheckout, setShowCheckout] = useState(false);
  const initialValues = {
    email: "",
    name: "",
    address: 0,
  };
  const { values, handleChange, handleSubmit } = useCustomForm({
    initialValues,
  });
  const addOrder = (e) => {
    let order = {
      email: values.email,
      name: values.name,
      address: values.address,
      cartItems: cartItems,
    };
    createOrder(order);
    handleSubmit(e);
  };

  const removeItem = (item) => {
    dispatch(removeFromCart(item));
  };

  const showForm = () => {
    setShowCheckout((prevState) => !prevState);
  };

  return (
    <div>
      <Fade right cascade>
        {" "}
        <ul className="cart list-unstyled p-3">
          <h5 className="m-0 p-0">
            {" "}
            <h1 className="text-center font-weight-bold text-success">
              ${cartItems.reduce((a, c) => a + c.price * c.count, 0)}
            </h1>
          </h5>
          <hr />
          {cartItems.map((item) => (
            <li key={item._id}>
              <div className="d-flex flex-col">
                <img alt={item.title} src={item.image} />
                <div
                  style={{ display: "flex", width: "100%" }}
                  className="text-white jusify-content-between"
                >
                  <div className="d-inline col-11">
                    <h6 className="mb-0 pb-0">
                      <strong>{item.title}</strong>
                    </h6>
                    <p> X {item.count} </p>
                  </div>
                  <div
                    style={{ height: "50px", maxWidth: "21px" }}
                    className="border"
                  >
                    <TiArrowSortedUp
                      size="1.5rem"
                      className="pr-1 mb-0 pb-0 d-block"
                      color="#28a745"
                    />
                    <TiArrowSortedDown
                      size="1.5rem"
                      className="pr-1 mt-0 pt-0"
                      color="#28a745"
                    />
                  </div>
                </div>
              </div>
              <Button
                onClick={() => removeItem(item)}
                className="btn-dark btn-sm btn-block mb-3"
              >
                <span>
                  <AiFillMinusCircle
                    color="red"
                    className="pr-2"
                    size="1.5rem"
                  />
                  REMOVE ITEM
                </span>
              </Button>
            </li>
          ))}
          {cartItems.length === 0 && (
            <p className="text-danger">CART IS EMPTY</p>
          )}
          {showCheckout && cartItems.length > 0 && (
            <Fade right cascade>
              <hr />
              <form onSubmit={(e) => addOrder(e)}>
                <input
                  type="email"
                  placeholder="Enter Email"
                  name="email"
                  onChange={(e) => handleChange(e)}
                />
                <input
                  type="text"
                  placeholder="Enter Name"
                  name="name"
                  required
                  onChange={(e) => handleChange(e)}
                />
                <Button type="submit" className="btn btn-block btn-dark">
                  <small>CHECKOUT</small>
                </Button>
              </form>
            </Fade>
          )}
          <hr className="mt-0 pt-0" />
          {cartItems.length && (
            <Button
              className="btn btn-block btn-success checkoutbtn"
              onClick={() => showForm()}
            >
              {showCheckout ? "Continue Shopping" : "CHECKOUT"}
            </Button>
          )}
        </ul>
      </Fade>
    </div>
  );
};

export default connect(
  (state) => ({
    cartItems: state.cart.cartItems,
  }),
  { removeFromCart }
)(Cart);
