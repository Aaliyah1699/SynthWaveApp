export const addDecimals = (deci) => {
    return (Math.round(deci * 100) / 100).toFixed(2);
};

export const calculatePrice = (state) => {
    // Calculate items price
    state.itemsPrice = addDecimals(
        state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
    // Calculate shipping price (if order is over $250 then free, else $5 shipping)
    state.shippingPrice = addDecimals(state.itemsPrice > 250 ? 0 : 5);
    // Calculate tax price (6%)
    state.taxPrice = addDecimals(Number((0.06 * state.itemsPrice).toFixed(2)));
    // Calculate total price
    state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
    ).toFixed(2);
    localStorage.setItem('cart', JSON.stringify(state));

    return state;
};
