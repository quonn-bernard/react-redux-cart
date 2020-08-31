const { FETCH_PRODUCTS } = require("../components/types");
const data = require('../data.json')
const productsReducer = (state = {}, action) =>{
    switch(action.type){
        case FETCH_PRODUCTS:
            return {items: action.payload}
            default:
                return state;
    }
}
export default productsReducer;