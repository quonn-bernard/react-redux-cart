import React, { useEffect, useState } from "react";
import data from "./data.json";
import Products from "./components/Products";
import Filter from "./components/Filter";
import Cart from "./components/Cart";
import store from "./store";
import { Provider } from "react-redux";
import { fetchProducts } from "./actions/productActions";
const App = () => {
  const [products, setProducts] = useState(data.products);
  const [size, setSize] = useState("");
  const [sort, setSort] = useState("");
  const [cartItems, setCartItems] = useState([]);

//   useEffect(() => {}, [products]);


  

  const removeFromCart = (item) => {
    const items = cartItems.slice();
    setCartItems(items.filter((elem) => elem._id !== item._id));
  };
  


  

  return (
    <>
      <Provider store={store}>
        <header>
          <a href="/">React Cart</a>
        </header>
        <Filter
          
        />
        <hr />
        <main>
          <Products />
          <hr />
          <div>
            <Cart
        
            />
          </div>
        </main>
        <hr />
        <footer>Footer</footer>
      </Provider>
    </>
  );
};

export default App;
