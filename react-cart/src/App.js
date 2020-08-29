import React, {useEffect, useState} from 'react';
import data from './data.json';
import Products from './components/Products';

const App = () => {
    const [products, setProducts] = useState('')

    useEffect(()=>{
        setProducts(data.products)
    },[products])
    return ( 
        <>
        <header>
            <a href='/'>React Cart</a>
        </header>
        <hr/>
        <main>
            <Products products={data.products}/>
            <hr/>
            <div>
                Cart
            </div>
        </main>
        <hr/>
        <footer>
            Footer
        </footer>
        </>
     );
}
 
export default App;