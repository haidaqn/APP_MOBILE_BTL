// reducers/index.js

import { combineReducers } from 'redux';
import authReducer from '../views/auth/AuthSlice';
import categoryReducer from '../features/Category/categorySlice';
import productReducer from '../features/Product/productSlice';
import cartReducer from '../features/Cart/cartSlice';

const rootReducer = combineReducers({
    auth: authReducer,
    category: categoryReducer,
    product: productReducer,
    cart: cartReducer
});

export default rootReducer;
