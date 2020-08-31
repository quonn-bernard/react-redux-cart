import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { filterProducts, sortProducts } from "../actions/productActions";

const Filter = ({ size, sort, products, filteredProducts}) => {
    const dispatch = useDispatch()

    const getSorterVals = (a,b) => {
        dispatch(sortProducts(a, b))
    }

    const getFilterVals = (a,b) => {
        dispatch(filterProducts(a, b))
    }
   
    return ( 
        <div>
            <div className='filter-result'>{filterProducts.length} Products</div>
            <div className='filter-sort'>
                Order <select value={sort} onChange={(e)=>getSorterVals(filteredProducts, e.target.value)}>
                    <option value="latest">Latest</option>
                    <option value="lowest">Lowest</option>
                    <option value="highest">Highest</option>
                </select>
            </div>
            <div className='filter-size'>
                Filter{" "}
                <select value={size} onChange={(e)=>getFilterVals(products, e.target.value)}>
                    <option value="">ALL</option>
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="XXL">XXL</option>
                </select>
            </div>
        </div>
     );
}
 
export default connect((state) => ({
    size: state.products.size,
    sort: state.products.sort,
    products: state.products.items,
    filteredProducts: state.products.filteredItems
}),{
    filterProducts,
    sortProducts    
})(Filter);