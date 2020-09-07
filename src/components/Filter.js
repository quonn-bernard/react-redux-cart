import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { filterProducts, sortProducts } from "../redux/actions/productActions";

const Filter = ({ size, sort, products, filteredProducts}) => {
    const dispatch = useDispatch()

    const getSorterVals = (a,b) => {
        dispatch(sortProducts(a, b))
    }

    const getFilterVals = (a,b) => {
        dispatch(filterProducts(a, b))
    }
   
    return ( 
        <div className="col-12 row mb-5 p-0">
            <div className='filter-sort col-6'>
                Order by Price<select className="custom-select" value={sort} onChange={(e)=>getSorterVals(filteredProducts, e.target.value)}>
                    <option value="latest">Latest</option>
                    <option value="lowest">Lowest</option>
                    <option value="highest">Highest</option>
                </select>
            </div>
            <div className='filter-size col-6'>
                Filter By Size{" "}
                <select className="custom-select" value={size} onChange={(e)=>getFilterVals(products, e.target.value)}>
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