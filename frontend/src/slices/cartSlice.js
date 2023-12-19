import { createSlice } from '@reduxjs/toolkit';

const initialState = localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart'))
    : { cartItems: [] };

const addDecimals = (deci) => {
    return (Math.round(deci * 100) / 100).toFixed(2);
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const itemExist = state.cartItems.find((i) => i._id === item._id);
            if (itemExist) {
                state.cartItems.map((i) =>
                    i._id === itemExist._id ? item : i
                );
            } else {
                state.cartItems = [...state.cartItems, item];
            }

            // Calculate items price
            state.itemsPrice = addDecimals(
                state.cartItems.reduce(
                    (acc, item) => acc + item.price * item.qty,
                    0
                )
            );
            // Calculate shipping price (if order is over $250 then free, else $5 shipping)
            state.shippingPrice = addDecimals(state.itemsPrice > 250 ? 0 : 5);
            // Calculate tax price (6%)
            state.taxPrice = addDecimals(
                Number((0.06 * state.itemsPrice).toFixed(2))
            );
            // Calculate total price
            state.totalPrice = (
                Number(state.itemsPrice) +
                Number(state.shippingPrice) +
                Number(state.taxPrice)
            ).toFixed(2);
            localStorage.setItem('cart', JSON.stringify(state));
        },
    },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
