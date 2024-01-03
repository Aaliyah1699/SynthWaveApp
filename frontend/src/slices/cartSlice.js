import { createSlice } from '@reduxjs/toolkit';
import { calculatePrice } from '../utils/cartUtils';

const initialState = localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart'))
    : { cartItems: [], shippingAddress: {}, paymentMethod: 'PayPal' };

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const { ...item } = action.payload;

            const itemExist = state.cartItems.find((i) => i._id === item._id);
            if (itemExist) {
                state.cartItems = state.cartItems.map((i) =>
                    i._id === itemExist._id ? item : i
                );
            } else {
                state.cartItems = [...state.cartItems, item];
            }

            return calculatePrice(state);
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(
                (x) => x._id !== action.payload
            );
            return calculatePrice(state);
        },
        saveShippingAddress: (state, action) => {
            state.shippingAddress = action.payload;
            localStorage.setItem('cart', JSON.stringify(state));
        },
        savePaymentMethod: (state, action) => {
            state.paymentMethod = action.payload;
            localStorage.setItem('cart', JSON.stringify(state));
        },
        clearCartItems: (state, action) => {
            state.cartItems = [];
            localStorage.setItem('cart', JSON.stringify(state));
        },
        resetCart: (state) => (state = initialState),
    },
});

export const {
    addToCart,
    removeFromCart,
    saveShippingAddress,
    savePaymentMethod,
    clearCartItems,
    resetCart,
} = cartSlice.actions;

export default cartSlice.reducer;
