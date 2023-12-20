import { createSlice } from '@reduxjs/toolkit';
import { calculatePrice } from '../utils/cartUtils';

const initialState = localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart'))
    : { cartItems: [] };

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const itemExist = state.cartItems.find((i) => i._id === item._id);
            if (itemExist) {
               state.cartItems =  state.cartItems.map((i) =>
                    i._id === itemExist._id ? item : i
                );
            } else {
                state.cartItems = [...state.cartItems, item];
            }

            return calculatePrice(state);
        },
    },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
