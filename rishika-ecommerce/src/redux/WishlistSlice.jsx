// src/redux/wishlistSlice.js
import { createSlice } from "@reduxjs/toolkit";

const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
const userEmail = loggedInUser?.email;

const initialState = userEmail
  ? JSON.parse(localStorage.getItem(`wishlist_${userEmail}`)) || []
  : [];

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    toggleWishlist: (state, action) => {
      const book = action.payload;
      const index = state.findIndex((item) => item.id === book.id);

      if (index >= 0) {
        state.splice(index, 1);
      } else {
        state.push(book);
      }

      // ✅ Persist updated wishlist to localStorage
      const user = JSON.parse(localStorage.getItem("loggedInUser"));
      if (user?.email) {
        localStorage.setItem(`wishlist_${user.email}`, JSON.stringify(state));
      }
    },

    clearWishlist: (state) => {
      const user = JSON.parse(localStorage.getItem("loggedInUser"));
      if (user?.email) {
        localStorage.removeItem(`wishlist_${user.email}`);
      }
      state.length = 0; // ✅ Clear the array in-place
    },
  },
});

export const selectIsInWishlist = (state, bookId) =>
  state.wishlist.some((item) => item.id === bookId);

export const { toggleWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
