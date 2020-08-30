import React, { useEffect, useState } from "react";
import data from "./data.json";
import Products from "./components/Products";
import Filter from "./components/Filter";
import Cart from "./components/Cart";

const App = () => {
  const [products, setProducts] = useState(data.products);
  const [size, setSize] = useState("");
  const [sort, setSort] = useState("");
  const [cartItems, setCartItems] = useState([])

  useEffect(()=> {

  },[products])
  
  const addtoCart = (product) => {
      
      const items = cartItems.slice()
      let alreadyInCart = false;
      items.forEach(element => {
          if(element._id === product._id){
                element.count++
                alreadyInCart = true
          }
      });
      if(!alreadyInCart){
          items.push({...product, count: 1})
      }
      setCartItems(items)
  }

  const removeFromCart = (item) => {
      const items = cartItems.slice()
    setCartItems(items.filter(elem => elem._id !== item._id))
  }
  const sortProducts = (e) => {
    const sort = e.target.value;
    setSort(sort);
    setProducts(
      products
        .slice()
        .sort((a, b) =>
          sort === "lowest"
            ? a.price < b.price
              ? 1
              : -1
            : sort === "highest"
            ? a.price > b.price
              ? 1
              : -1
            : a._id < b._id
            ? 1
            : -1
        )
    );
  };

  const filterProducts = (e) => {
    if (e.target.value === "") {
      setProducts(data.products);
      setSize(e.target.value);
    } else {
      setSize(e.target.value);
      setProducts(
        data.products.filter(
          (product) => product.availableSizes.indexOf(e.target.value) >= 0
        )
      );
    }
  };

  return (
    <>
      <header>
        <a href="/">React Cart</a>
      </header>
      <Filter
        size={size}
        filter={filterProducts}
        sort={sortProducts}
        count={data.products.length}
      />
      <hr />
      <main>
        <Products add={addtoCart} products={products} />
        <hr />
        <div><Cart remove={removeFromCart} cartItems={cartItems} /></div>
      </main>
      <hr />
      <footer>Footer</footer>
    </>
  );
};

export default App;
