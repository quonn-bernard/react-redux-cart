import React from 'react'

const Cart = ({cartItems, remove}) => {
    console.log(cartItems)
    return ( 
        <div>
            {cartItems.length === 0 ? 'cart is empty': <ul> ${cartItems.map(item=>(
               <li key={item._id}>
                   <div>
                       <img src={item.image} />
                       <strong>{item.title}</strong>
                       <p>count:{item.count}</p>
                       <button onClick={()=>remove(item)}>Remove</button>
                   </div>
               </li> 
            ))}</ul>  }
            {" "} | 
            Cart Total:
            ${cartItems.reduce((a,c) => a + c.price * c.count, 0)}
            <br/>
            {" "}
            {cartItems.length && <button style={{margin: '15px 0 0 0'}}>CheckOut</button>}
            </div>
     );
}
 
export default Cart;