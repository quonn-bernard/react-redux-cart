import React, { useState } from "react";
import Products from "./components/Products";
import Filter from "./components/Filter";
import Cart from "./components/Cart";
import store from "./store";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import AppNav from "./components/Navbar";

const App = () => {
  const [count, setCount] = useState();
  store.subscribe(() => {
    setCount(store.getState().cart.cartItems.reduce((a, c) => a + c.count, 0));
  });

  return (
    <>
      <Provider store={store}>
        <AppNav count={count} />
        
        <hr />
        <main className="p-5">
        <Filter />
          <Products />
          <Cart count={count}/>
        </main>
      </Provider>
    </>
  );
};

export default App;
