import { createSelector } from "reselect";

// INPUT SELECTOR
// GIVES SLICE OF THE STATE
const selectCart = (state) => state.cart;

// OUTPUT SELECTOR
// BUILT USING INPUT SELECTOR
// RETURNS SPECIFIC OBJECT DATA BY USING INPUT SELECTOR'S OUTPUT
export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.cartItems
);

export const selectCartHidden = createSelector(
  [selectCart],
  (cart) => cart.hidden
);

// SENDING DATA
export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (cartItems) =>
    cartItems.reduce((totalQty, cartItem) => totalQty + cartItem.quantity, 0)
);
