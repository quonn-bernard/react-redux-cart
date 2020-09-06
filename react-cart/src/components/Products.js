import React, { useState, useEffect } from "react";
import { Fade, Zoom } from "react-reveal";
import Modal from "react-modal";
import { connect, useDispatch } from "react-redux";
import { fetchProducts } from "../redux/actions/productActions";
import { addToCart } from "../redux/actions/cartActions";
import { Button } from "react-bootstrap";

const Products = ({ products }) => {
  const [product, setProduct] = useState(null);
  const openModal = (product) => {
    setProduct(product);
  };

  const closeModal = () => {
    setProduct(null);
  };

  const dispatch = useDispatch();
  const addItem = (product) => {
    dispatch(addToCart(product));
  };
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const renderProducts = () => {
    return products.map((product) => {
      return (
        <li key={product._id}>
          <a href={"#" + product._id} onClick={() => openModal(product)}>
            <img
              alt={product.title}
              src={product.image}
              className="img-fluid"
            />
          </a>
          <p>
            <a alt={product.title} href="/">
              {product.title}
            </a>
          </p>
          <p>
            <strong>${product.price}.00</strong>
          </p>
          
          <Button className="btn-dark" onClick={() => addItem(product)}>
            ADD TO CART
          </Button>
        </li>
      );
    });
  };

  return (
    <div>
      <Fade bottom cascade>
        <ul className="list-unstyled products">
          {products ? renderProducts() : <div>Loading...</div>}
        </ul>
      </Fade>
      {product && (
        <Modal isOpen={true}>
          <Zoom clear cascade>
            <div>
              <p onClick={() => closeModal()}>X CLOSE</p>
              <img alt={product.title} src={product.image} />
            </div>
            <div>
              <p>{product.title}</p>
              <p>${product.price}.00</p>
              Sizes
              <p>
                Available Sizes
                {product.availableSizes.map((size) => {
                  return (
                    <>
                      <br />
                      <span> {size} </span>
                    </>
                  );
                })}
              </p>
              <button
                onClick={() => {
                  addToCart(product);
                  closeModal();
                }}
              >
                ADD TO CART
              </button>
            </div>
          </Zoom>
        </Modal>
      )}
    </div>
  );
};

export default connect(
  (state) => ({ products: state.products.filteredItems }),
  {
    fetchProducts,
    addToCart,
  }
)(Products);
