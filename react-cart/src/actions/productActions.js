import { FETCH_PRODUCTS } from "../components/types";

const fetchProducts = () => async(dispatch) => {
    const result = await fetch('data/data.json');
    const data = await result.json()
    dispatch({
        type: FETCH_PRODUCTS,
        payload: data.products   
    })
}
export default fetchProducts