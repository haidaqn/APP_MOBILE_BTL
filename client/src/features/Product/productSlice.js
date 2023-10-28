import { createSlice } from '@reduxjs/toolkit';
import * as actions from './productAction';

const initialState = {
    smartphone: [],
    tablet: [],
    laptop: [],
    accessories: [] 
};

const ProductSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setSmartPhone: (state, action) => {
            return { ...state, smartphone: action?.payload?.products };
        },
        setTablet: (state, action) => {
            return { ...state, tablet: action?.payload?.products };
        },
        setLaptop: (state, action) => {
            return { ...state, laptop: action?.payload?.products };
        },
        setAccessories: (state, action) => {
            return { ...state, accessories: action?.payload?.products };
        }
    },
    extraReducers: (builder) => {}
});

export const { setSmartPhone, setTablet, setLaptop, setAccessories } = ProductSlice.actions;

export default ProductSlice.reducer;
