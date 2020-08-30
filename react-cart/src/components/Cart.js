import React, {useState} from 'react'
import useCustomForm from '../hooks/useCustomForm'

const Cart = ({cartItems, remove, createOrder}) => {
    const [showCheckout, setShowCheckout] = useState(false)
    const initialValues = {
        email: "",
        name: "",
        address: 0
      };
    const {values, errors, touched, handleChange, handleBlur, handleSubmit } = useCustomForm({initialValues, onSubmit: values => console.log('from cart',values)});
    // console.log(cartItems)
    const addOrder = (e) => {
        let order = {
            email: values.email,
            name: values.name,
            address: values.address,
            cartItems: cartItems
        }
        createOrder(order)
        handleSubmit(e)
    }
    
    const showForm = () => {
        console.log('clicked', showCheckout)
        setShowCheckout(prevState => !prevState)
    }

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
            {showCheckout && cartItems.length && <form onSubmit={(e)=>addOrder(e)}>
                <input type="email" placeholder="Enter Email" name="email" onChange={(e)=> handleChange(e)}/>
                <input type="text" placeholder="Enter Name" name="name" required onChange={(e)=> handleChange(e)} />
                <input type="text" placeholder="Enter Address" name="address" required onChange={(e)=> handleChange(e)}/>
                <button type="submit" >CHECKOUT</button>
            </form>}
            {" "}
            {cartItems.length && <button style={{margin: '15px 0 0 0'}} onClick={()=> showForm()}>{showCheckout ? 'Continue Shopping' : 'Checkout'}</button>}
            </div>

     );
}
 
export default Cart;