import React from 'react';
import { CgShoppingCart } from 'react-icons/cg';

const CartLogo = ({count, color}) => {
  
    return ( 
          <div className="mr-3 d-inline">
            <CgShoppingCart color={color || "white"} size="2.5rem" />
            <span style={{ color: color || "white" }}> ({count}) </span>
          </div>
     );
}
 
export default CartLogo;