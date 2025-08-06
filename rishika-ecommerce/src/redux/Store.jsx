import { configureStore } from "@reduxjs/toolkit";
import wishlistReducer from "./WishlistSlice";
import cartReducer from "./CartSlice";
import authReducer from "./AuthSlice";



export const store = configureStore({
  reducer: {
    wishlist: wishlistReducer,
    cart: cartReducer,
    auth: authReducer,
  },
});
