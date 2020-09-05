import React from "react";
import { Navbar } from "react-bootstrap";
import CartLogo from "./CartLogo";
import { FaReact } from "react-icons/fa";

const AppNav = ({ count }) => {
  return (
    <>
      <Navbar
        bg="dark"
        className="navbar d-flex justify-content-between position-fixed col-12"
        variant="dark"
      >
          <FaReact color="#28a745" spin size="3rem" />
        <Navbar.Brand href="#home"><h2>React-Redux Shopping Cart</h2></Navbar.Brand>
        <CartLogo color="white" count={count} />
      </Navbar>
    </>
  );
};

export default AppNav;
