import React, { useEffect, useState } from "react";
import data from "./data.json";
import Products from "./components/Products";
import Filter from "./components/Filter";

const App = () => {
  const [products, setProducts] = useState(data.products);
  const [size, setSize] = useState("");
  const [sort, setSort] = useState("");

  useEffect(()=> {

  },[products])
  
  const sortProducts = (e) => {
    console.log(e.target.value);
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
      console.log(e.target.value)
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
    console.log(data.products);
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
        <Products products={products} />
        <hr />
        <div>Cart</div>
      </main>
      <hr />
      <footer>Footer</footer>
    </>
  );
};

export default App;
