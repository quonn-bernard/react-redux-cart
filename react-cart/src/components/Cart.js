import React, { useState, useEffect } from "react";
import useCustomForm from "../hooks/useCustomForm";
import Fade from "react-reveal/Fade";
import { connect, useDispatch } from "react-redux";
import { removeFromCart, addToCart, removeAnItemFromCart } from "../redux/actions/cartActions";
import { Button } from "react-bootstrap";
import { AiFillMinusCircle } from "react-icons/ai";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";

const Cart = ({ cartItems, createOrder, count }) => {
  const dispatch = useDispatch();
  const [showCheckout, setShowCheckout] = useState(false);
  const [cartCount, setCartCount] = useState();
  useEffect(()=>{
    setCartCount(cartItems.length)
  },[cartItems.length])
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

  const add = (item) => {
    dispatch(addToCart(item));
  };

  const removeItem = (item) => {
    dispatch(removeFromCart(item));
  };

  const removeSingleItem = (item) => {
    dispatch(removeAnItemFromCart(item));
    console.log(cartCount)
  }; 

  const showForm = () => {
    setShowCheckout((prevState) => !prevState);
  };

  return (
    <div>
      <Fade right cascade>
        {" "}
        <ul className="cart list-unstyled p-3">
            {" "}
            <h1 className="pb-0 mb-0 text-center font-weight-bold text-success">
              ${cartItems.reduce((a, c) => a + c.price * c.count, 0)}
            </h1>
          <hr />
          { cartItems.map((item) => (
            item.count > 0 && <li key={item._id}>
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
          <p> X {item.count} = <span className="text-success">${item.count * item.price}</span> </p>
                  </div>
                  <div
                    style={{ height: "50px", maxWidth: "21px" }}
                    className="border"
                  >
                    <TiArrowSortedUp
                    onClick={() => add(item)}
                      size="1.5rem"
                      className="pr-1 mb-0 pb-0 d-block"
                      color="#28a745"
                    />
                    <TiArrowSortedDown
                    onClick={() => removeSingleItem(item)}
                      size="1.5rem"
                      className="pr-1 mt-0 pt-0"
                      color="#28a745"
                    />
                  </div>
                </div>
              </div>
              <Button
                onClick={() => removeItem(item)}
                className="border btn-dark btn-sm btn-block mb-3"
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
         {count < 1 && <h3 className="text-danger h4 d-block text-center">CART IS EMPTY</h3>}
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
          {count > 0 && (
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
  { removeFromCart, addToCart, removeAnItemFromCart }
)(Cart);
