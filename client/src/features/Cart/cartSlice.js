import { createSlice } from '@reduxjs/toolkit';
import PropTypes from 'prop-types';

const ItemCart = {
    id: PropTypes.string.isRequired,
    nameProduct: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    type: PropTypes.bool.isRequired
};
const initialState = {
    dataStore: [ItemCart],
    totalPrice: PropTypes.number
};
const CartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setTotalPrice: (state, action) => {},
        cleanCart: (state, action) => {
            state.dataStore = [];
        },
        setAddToCart: (state, action) => {
            const { nameProduct, quantity, type, id } = action.payload;
            if (state.dataStore.length) {
                const existingStore = state.dataStore.find((item) => item.nameProduct === nameProduct && item.id === id);
                if (existingStore) {
                    if (type) {
                        state.dataStore.find((item) => item.nameProduct === nameProduct && item.id === id).quantity = quantity;
                    } else {
                        state.dataStore.find((item) => item.nameProduct === nameProduct && item.id === id).quantity = existingStore.quantity + 1;
                    }
                } else {
                    state.dataStore = [...state.dataStore, action.payload];
                }
            } else {
                state.dataStore = [...state.dataStore, action.payload];
            }
        },
        deleteCart: (state, action) => {
            // xóa 1 sản phẩm trong quantity item
            const { nameProduct, id } = action.payload;
            const existingStore = state.dataStore.find((item) => item.nameProduct === nameProduct && item.id === id);
            state.dataStore.find((item) => item.nameProduct === nameProduct && item.id === id).quantity = existingStore.quantity - 1;
        },
        removerCart: (state, action) => {
            // xóa hẳn sản phẩm đó trong cart
            const { nameProduct, id } = action.payload;
            state.dataStore = state.dataStore.filter((item) => item.id !== id);
        }
    },
    extraReducers: (builder) => {}
});

export const { setAddToCart, deleteCart, removerCart, cleanCart } = CartSlice.actions;

export default CartSlice.reducer;
