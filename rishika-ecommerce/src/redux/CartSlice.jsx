// src/redux/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Safely load cart from localStorage for the logged-in user
const getInitialCart = () => {
  try {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    const email = user?.email;

    if (email) {
      const data = JSON.parse(localStorage.getItem(`cart_${email}`));
      return Array.isArray(data) ? data : [];
    }
  } catch (err) {
    console.error("Failed to parse cart from localStorage", err);
  }

  return []; // fallback
};

const cartSlice = createSlice({
  name: "cart",
  initialState: getInitialCart(),
  reducers: {
    addToCart: (state, action) => {
      const book = action.payload;
      const index = state.findIndex((item) => item.id === book.id);

      if (index >= 0) {
        state[index].quantity += 1;
      } else {
        state.push({ ...book, quantity: 1 });
      }

      const user = JSON.parse(localStorage.getItem("loggedInUser"));
      if (user?.email) {
        localStorage.setItem(`cart_${user.email}`, JSON.stringify(state));
      }
    },

    removeFromCart: (state, action) => {
  const bookId = action.payload;

  // Remove the item from the cart
  const index = state.findIndex((item) => item.id === bookId);
  if (index !== -1) {
    state.splice(index, 1);
  }

  // Persist the updated cart to localStorage
  try {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (user?.email) {
      localStorage.setItem(`cart_${user.email}`, JSON.stringify(state));
    }
  } catch (error) {
    console.error("Error updating localStorage:", error);
  }
},
    decrementQuantity: (state, action) => {
      const item = state.find((item) => item.id === action.payload.id);
      if (item) {
        if (item.quantity === 1) {
          return state.filter((i) => i.id !== item.id);
        } else {
          item.quantity -= 1;
        }
      }
    },
restoreCart: (state, action) => {
  const restoredCart = action.payload;
  return restoredCart;
},
    clearCart: (state) => {
      state.length = 0;

      const user = JSON.parse(localStorage.getItem("loggedInUser"));
      if (user?.email) {
        localStorage.removeItem(`cart_${user.email}`);
      }
    },
    
  },
});
export const selectIsInCart = (state, bookId) =>
  state.cart.some((item) => item.id === bookId);

export const { addToCart, removeFromCart, clearCart , decrementQuantity,restoreCart} = cartSlice.actions;
export default cartSlice.reducer;
