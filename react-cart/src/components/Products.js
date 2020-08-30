import React, { useState } from "react";
import { Fade, Zoom } from "react-reveal";
import Modal from "react-modal";

const Products = ({ products, add }) => {
  const [product, setProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const openModal = (product) => {
    setProduct(product);
  };

  const closeModal = () => {
    setProduct(null);
  };

  const renderProducts = () => {
    return products.map((product) => {
      return (
        <li key={product._id}>
          <a href={"#" + product._id} onClick={() => openModal(product)}>
            <img src={product.image}></img>
          </a>

          <p>
            <a href="#">{product.title}</a>
          </p>
          <p>
            <strong>${product.price}.00</strong>
          </p>
          <button onClick={() => add(product)}>ADD TO CART</button>
        </li>
      );
    });
  };

  return (
    <div>
      <Fade top cascade>
        <ul>{renderProducts()}</ul>
      </Fade>
      {product && (
        <Modal isOpen={true}>
          <Zoom clear cascade>
            <div>
              <p onClick={() => closeModal()}>X CLOSE</p>
              <img src={product.image} />
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
                  add(product);
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

export default Products;
// <li key={product._id}>
//     <div>
//         <a href={"#" + product}>
//             <img src={product.image} alt={product.title}></img>
//             <p>
//                 {product.title}
//             </p>
//         </a>
//         <div>
//             {product.price}
//         </div>
//         <button>
//             Add To Cart
//         </button>
//     </div>
// </li>
